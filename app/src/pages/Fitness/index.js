import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import ChartPanel from '../../components/ChartPanel'
import TopTile from '../../components/TopTile'
import { Page, PageTitle } from 'react-gentelella';
import DataTable from '../../components/DataTable';
import ChartSlicerPanel from '../../components/ChartSlicerPanel';
import * as Constants from '../../constants';
import kpi_data from './fitness-kpi_data';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },
});

const options = {
    CHART_TITLE: [
        { title: 'HR', value: 'calories' },
        { title: 'Speed', value: 'fat' },
        { title: 'Hydration', value: 'water' },
        { title: 'MPH', value: 'somethig...' },
    ]
}


class FitnessPage extends Component {

    state = {
        open: true,
        data_set: "fitness",
        loading: true,
        data: []
    };

    componentDidMount() {
        fetch(`${Constants.serverUrl}/fitness`)
            .then(res => res.json())
            .then(res => this.setState({
                data: [].concat(res)
            }))
    }

    render() {

        const { data, classes, data_set, chart_title } = this.state;
        return (
            <Page>
                <PageTitle title={'Fitness Data'} />

                <TopTile kpi_data={kpi_data} />

                <div>
                    <Row>
                        {/* Left Chart */}
                        <Col md={5} sm={12} xs={12}>
                            <ChartPanel
                                data_set={data_set}
                                title={"Left Chart"}
                                chart_type="scatter"
                            // data={left_chart_data}
                            />
                        </Col>

                        {/* Slicers */}
                        <Col md={2} sm={2} xs={2}>
                            <ChartSlicerPanel
                                options={options.CHART_TITLE}
                                sliceDateRange={this.sliceDateRange}
                                sliceChart={this.sliceChart}
                            />
                        </Col>

                        {/* Right Chart */}
                        <Col md={5} sm={12} xs={12}>
                            <ChartPanel
                                data_set='diet'
                                title={"Right Chart"}
                                chart_type="line"
                            // data={left_chart_data}
                            />
                        </Col>

                    </Row>

                    <div className="clearfix" />

                    <Row>
                        <Col md={12} sm={12} xs={12}>
                        </Col>
                    </Row>

                    <div className="clearfix"> </div>

                    <Row>
                        <Col md={12} sm={12} xs={12}>
                            Data table coming soon!
                            {/* <DataTable
                                data={data}
                                button_box={true}
                                search_box={true}
                                data_set='diet'
                                title='Diet'
                                table_columns={Constants.diet_data_columns}
                            /> */}
                        </Col>
                    </Row>
                </div>

                <div className="clearfix"> </div>

            </Page>
        )
    }
}

// FitnessPage.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default FitnessPage;
