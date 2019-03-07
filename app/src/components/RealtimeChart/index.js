import React, { Component } from "react";
import { Col, Container, Row } from 'react-bootstrap';
import { Panel, PanelBody } from 'react-gentelella';
import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    LineChart
} from "react-timeseries-charts";
import { TimeSeries, TimeRange, avg, percentile, median } from "pondjs";
import "moment-duration-format";
import moment from "moment";
import { format } from "d3-format";
import _ from "underscore";

const data = require("./bike.json");

const baselineStyles = {
    speed: {
        stroke: "steelblue",
        opacity: 0.5,
        width: 0.25
    },
    power: {
        stroke: "green",
        opacity: 0.5,
        width: 0.25
    }
};

const speedFormat = format(".1f");

class RealtimeChart extends Component {

    constructor(props) {
        super(props);
        const initialRange = new TimeRange([75 * 60 * 1000, 125 * 60 * 1000]);

        // Storage for all the data channels
        const channels = {
            distance: {
                units: "miles",
                label: "Distance",
                format: ",.1f",
                series: null,
                show: false
            },
            altitude: { units: "feet", label: "Altitude", format: "d", series: null, show: false },
            cadence: { units: "rpm", label: "Cadence", format: "d", series: null, show: true },
            power: { units: "watts", label: "Power", format: ",.1f", series: null, show: true },
            temperature: { units: "deg F", label: "Temp", format: "d", series: null, show: false },
            speed: { units: "mph", label: "Speed", format: ",.1f", series: null, show: true }
        };

        // Channel names list, in order we want them shown
        const channelNames = ["speed", "power", "cadence", "temperature", "distance", "altitude"];

        // Channels we'll actually display on our charts
        const displayChannels = ["speed", "power", "cadence"];

        // Rollups we'll generate to reduce data for the screen
        const rollupLevels = ["1s", "5s", "15s", "25s"];

        this.state = {
            ready: false,
            mode: "channels",
            channels,
            channelNames,
            displayChannels,
            rollupLevels,
            rollup: "1m",
            tracker: null,
            timerange: initialRange,
            brushrange: initialRange
        };
    }

    componentDidMount() {
        const { channelNames, channels, displayChannels, rollupLevels } = this.state;

        //
        // Process the data file into channels
        //

        const points = {};
        channelNames.forEach(channel => {
            points[channel] = [];
        });

        for (let i = 0; i < data.time.length; i += 1) {
            if (i > 0) {
                const deltaTime = data.time[i] - data.time[i - 1];
                const time = data.time[i] * 1000;

                points["distance"].push([time, data.distance[i]]);
                points["altitude"].push([time, data.altitude[i] * 3.28084]); // convert m to ft
                points["cadence"].push([time, data.cadence[i]]);
                points["power"].push([time, data.watts[i]]);
                points["temperature"].push([time, data.temp[i]]);

                // insert a null into the speed data to put breaks in the data where
                // the rider was stationary
                if (deltaTime > 10) {
                    points["speed"].push([time - 1000, null]);
                }

                const speed =
                    (data.distance[i] - data.distance[i - 1]) /
                    (data.time[i] - data.time[i - 1]); // meters/sec
                points["speed"].push([time, 2.236941 * speed]); // convert m/s to miles/hr
            }
        }

        // Make the TimeSeries here from the points collected above
        for (let channelName of channelNames) {
            // The TimeSeries itself, for this channel
            const series = new TimeSeries({
                name: channels[channelName].name,
                columns: ["time", channelName],
                points: points[channelName]
            });

            if (_.contains(displayChannels, channelName)) {
                const rollups = _.map(rollupLevels, rollupLevel => {
                    return {
                        duration: parseInt(rollupLevel.split("s")[0], 10),
                        series: series.fixedWindowRollup({
                            windowSize: rollupLevel,
                            aggregation: { [channelName]: { [channelName]: avg() } }
                        })
                    };
                });

                // Rollup series levels
                channels[channelName].rollups = rollups;
            }

            // Raw series
            channels[channelName].series = series;

            // Some simple statistics for each channel
            channels[channelName].avg = parseInt(series.avg(channelName), 10);
            channels[channelName].max = parseInt(series.max(channelName), 10);
        }

        // Min and max time constraints for pan/zoom, along with the smallest timerange
        // the user can zoom into. These are passed into the ChartContainers when we come to
        // rendering.

        const minTime = channels.altitude.series.range().begin();
        const maxTime = channels.altitude.series.range().end();
        const minDuration = 10 * 60 * 1000;

        this.setState({ ready: true, channels, minTime, maxTime, minDuration });
    }

    handleTrackerChanged = t => {
        this.setState({ tracker: t });
    };

    // Handles when the brush changes the timerange
    handleTimeRangeChange = timerange => {
        const { channels } = this.state;

        if (timerange) {
            this.setState({ timerange, brushrange: timerange });
        } else {
            this.setState({ timerange: channels["altitude"].range(), brushrange: null });
        }
    };

    handleChartResize = width => {
        this.setState({ width });
    };

    handleActiveChange = channelName => {
        const channels = this.state.channels;
        channels[channelName].show = !channels[channelName].show;
        this.setState({ channels });
    };
    renderChart = () => {
        if (this.state.mode === "multiaxis") {
            return this.renderMultiAxisChart();
        } else if (this.state.mode === "channels") {
            return this.renderChannelsChart();
        } else if (this.state.mode === "rollup") {
            return this.renderBoxChart();
        }
        return <div>No chart</div>;
    };

    renderChannelsChart = () => {
        const { timerange, displayChannels, channels, maxTime, minTime, minDuration } = this.state;

        const durationPerPixel = timerange.duration() / 800 / 1000;
        const rows = [];

        for (let channelName of displayChannels) {
            const charts = [];
            let series = channels[channelName].series;
            _.forEach(channels[channelName].rollups, rollup => {
                if (rollup.duration < durationPerPixel * 2) {
                    series = rollup.series.crop(timerange);
                }
            });

            charts.push(
                <LineChart
                    key={`line-${channelName}`}
                    axis={`${channelName}_axis`}
                    series={series}
                    columns={[channelName]}
                    breakLine
                />
            );
            {/* style={style} */}
            charts.push(
                <Baseline
                    key={`baseline-${channelName}`}
                    axis={`${channelName}_axis`}
                    value={channels[channelName].avg}
                />
            );
            // style={baselineStyles.speed}

            // Get the value at the current tracker position for the ValueAxis
            let value = "--";
            if (this.state.tracker) {
                const approx =
                    (+this.state.tracker - +timerange.begin()) /
                    (+timerange.end() - +timerange.begin());
                const ii = Math.floor(approx * series.size());
                const i = series.bisect(new Date(this.state.tracker), ii);
                const v = i < series.size() ? series.at(i).get(channelName) : null;
                if (v) {
                    value = parseInt(v, 10);
                }
            }

            // Get the summary values for the LabelAxis
            const summary = [
                { label: "Max", value: speedFormat(channels[channelName].max) },
                { label: "Avg", value: speedFormat(channels[channelName].avg) }
            ];

            rows.push(
                <ChartRow
                    height="100"
                    visible={channels[channelName].show}
                    key={`row-${channelName}`}
                >
                    <LabelAxis
                        id={`${channelName}_axis`}
                        label={channels[channelName].label}
                        values={summary}
                        min={0}
                        max={channels[channelName].max}
                        width={140}
                        type="linear"
                        format=",.1f"
                    />
                    <Charts>{charts}</Charts>
                    <ValueAxis
                        id={`${channelName}_valueaxis`}
                        value={value}
                        detail={channels[channelName].units}
                        width={80}
                        min={0}
                        max={35}
                    />
                </ChartRow>
            );
        }

        return (
            <ChartContainer
                timeRange={this.state.timerange}
                format="relative"
                showGrid={false}
                enablePanZoom
                maxTime={maxTime}
                minTime={minTime}
                minDuration={minDuration}
                trackerPosition={this.state.tracker}
                onTimeRangeChanged={this.handleTimeRangeChange}
                onChartResize={width => this.handleChartResize(width)}
                onTrackerChanged={this.handleTrackerChanged}
            >
                {rows}
            </ChartContainer>
        );
    };

    render() {
        const { } = this.props
        return (
            <Panel>
                <PanelBody>

                </PanelBody>
            </Panel>
        );
    }
}

{/* <ChartContainer timeRange={series1.timerange()} width={800}>
                        <ChartRow height="200">
                            <YAxis id="axis1" label="AUD" min={0.5} max={1.5} width="60" type="linear" format="$,.2f" />
                            <Charts>
                                <LineChart axis="axis1" series={series1} column={["aud"]} />
                                <LineChart axis="axis2" series={series2} column={["euro"]} />
                            </Charts>
                            <YAxis id="axis2" label="Euro" min={0.5} max={1.5} width="80" type="linear" format="$,.2f" />
                        </ChartRow>
                    </ChartContainer> */}

export default RealtimeChart;
