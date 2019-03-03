import React, { Component } from "react";
import PropTypes from 'prop-types';
// import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

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
            hours = (hours.toLocaleString(undefined, { minimumIntegerDigits: 2 }));
            minutes = (minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 }));
            seconds = (seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 }));
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
        const { classes, fontColor } = this.props;
        return (
            <div className={classes.root} >
                {!this.state.nextTimeDetermined ?
                    <h2 style={{color:fontColor}}> Check back later for next stream time </h2> :
                    <div style={{color:fontColor, display: "inline-block"}}>
                        {/* <div style={{color:fontColor, display: "inline-block"}}>
                            <p>
                            {this.state.days} 
                            </p>
                            <p>
                                days
                            </p>
                        </div>
                        <div style={{color:fontColor, display: "inline-block"}}>
                            <p>
                            {this.state.hours} 
                            </p>
                            <p>
                                hours
                            </p>
                        </div> */}
                        {this.state.days} days :
                        {this.state.hours} hours :
                        {this.state.minutes} minutes :
                        {this.state.seconds} seconds
                    </div>
                }
            </div>
        );
    }
}

Timer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Timer);
