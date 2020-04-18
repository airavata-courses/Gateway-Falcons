import React, { Component, Fragment } from 'react';
import { Line } from 'react-chartjs-2';
import {
  ResponsiveContainer,
} from 'recharts';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: '#ed0f51',
      borderColor: '#ed0f51',
      borderCapStyle: 'round',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#ed0f51',
      pointBackgroundColor: '#ffffff',
      pointBorderWidth: 2,
      pointHoverRadius: 10,
      pointHoverBackgroundColor: '#ed0f51',
      pointHoverBorderColor: '#ed0f51',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};


class LineExample extends React.Component {

  render() {
    return (
      <Fragment>
        <div className="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0">
          <ResponsiveContainer width="100%" height={240}>
            <div>
              <Line data={data} />
            </div>
          </ResponsiveContainer>
        </div>
      </Fragment>
    )
  }
}

export default LineExample;