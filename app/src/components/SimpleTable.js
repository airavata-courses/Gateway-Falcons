import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};

// TODO: Abstract headings to text files ...
function SimpleTable(props) {
  const { classes, data, data_set } = props;
  console.log(data_set, data)
  if (data_set === 'fitness') {
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Avg. Cadence</TableCell>
              <TableCell align="right">Avg HR</TableCell>
              <TableCell align="right">Max HR</TableCell>
              <TableCell align="right">Avg Speed</TableCell>
              <TableCell align="right">Max Speed</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Timezone</TableCell>
              <TableCell align="right">Starting Lat/Lon</TableCell>
              <TableCell align="right">Ending Lat/Lon</TableCell>
              <TableCell align="right">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(record => (
              <TableRow key={record.activity_id}>
                <TableCell component="th" scope="row"> {record.name} </TableCell>
                <TableCell align="right">{record.average_cadence}</TableCell>
                <TableCell align="right">{record.average_heartrate}</TableCell>
                <TableCell align="right">{record.max_heartrate}</TableCell>
                <TableCell align="right">{record.average_speed}</TableCell>
                <TableCell align="right">{record.max_speed}</TableCell>
                <TableCell align="right">{record.calories || 0}</TableCell>
                <TableCell align="right">{record.timezone}</TableCell>
                <TableCell align="right">{record.start_latlng}</TableCell>
                <TableCell align="right">{record.end_latlng}</TableCell>
                <TableCell align="right">{record.description || 'none'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
  else if (data_set === 'diet') {
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell >Date</TableCell>
              <TableCell align="right"># of Meals</TableCell>
              <TableCell align="right">calories</TableCell>
              <TableCell align="right">carbs</TableCell>
              <TableCell align="right">fat</TableCell>
              <TableCell align="right">protein</TableCell>
              <TableCell align="right">sodium</TableCell>
              <TableCell align="right">sugar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(record => (
              <TableRow key={record._id}>
                <TableCell component="th" scope="row"> {record.date} </TableCell>
                <TableCell align="right">{record.meals.length}</TableCell>
                <TableCell align="right">{record.totals.calories}</TableCell>
                <TableCell align="right">{record.totals.carbohydrates}</TableCell>
                <TableCell align="right">{record.totals.fat}</TableCell>
                <TableCell align="right">{record.totals.protein}</TableCell>
                <TableCell align="right">{record.totals.sodium}</TableCell>
                <TableCell align="right">{record.totals.sugar}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
  else {
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
          </TableHead>
          <TableBody>
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
