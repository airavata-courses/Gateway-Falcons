import React, { Component } from "react";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
});

class Timer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            countDownDate: props.nextTimeBoundary.getTime(),
            nextTimeDetermined: props.nextTimeDetermined,
            timerCompleted: false,
            seconds: '00',
            minutes: '00',
            hours: '00',
            days: '0'
        }
    }

    setTimerInterval() {
        var x = setInterval(() => {
            var now = new Date().getTime();
            var distance = this.state.countDownDate - now;
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            var hours = (hours.toLocaleString(undefined, { minimumIntegerDigits: 2 }));
            var minutes = (minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 }));
            var seconds = (seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 }));
            this.setState({
                days, hours, minutes, seconds
            })
            if (distance < 0) {
                this.setState({ timerCompleted: true })
                clearInterval(x);
            }
        });

    }

    componentDidMount() {
        this.setTimerInterval();
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root} >
                {!this.state.nextTimeDetermined ?
                    <Paper>
                        Check back later for next stream time
                    </Paper> :
                    <Paper>
                        {this.state.days} days :
                        {this.state.hours} hours :
                        {this.state.minutes} minutes :
                        {this.state.seconds} seconds
                  </Paper>
                }
            </div >
        )
    }
}

Timer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Timer);

