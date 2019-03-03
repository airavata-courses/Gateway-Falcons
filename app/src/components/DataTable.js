import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { fitnessData } from '../data/table-data'

const styles = {
    // root: {
    //   flexGrow: 1,
    //   paddingBottom: 10,
    //   marginBottom: 10,
    // },
    // grow: {
    //   flexGrow: 1,
    // },
};

class DataTable extends Component {

    constructor(props) {
        super(props);
        const { button_box, search_box, data_set, data, title } = props;
        this.state = {
            button_box: button_box,
            search_box: search_box,
            data_set: data_set,
            data: data,
            title: title
        };
    }

    renderTableHead(data_set) {
        if (data_set === 'fitness') {
            return (
                <TableRow>
                    {
                        Object.keys(fitnessData).map(key => (
                            <TableCell> {fitnessData[key]} </TableCell>
                        ))
                    }
                </TableRow>
            );
        }
        else if (data_set === 'diet') {
            return (
                <TableRow>
                    <TableCell >Date</TableCell>
                    <TableCell># of Meals</TableCell>
                    <TableCell>calories</TableCell>
                    <TableCell>carbs</TableCell>
                    <TableCell>fat</TableCell>
                    <TableCell>protein</TableCell>
                    <TableCell>sodium</TableCell>
                    <TableCell>sugar</TableCell>
                </TableRow>
            );
        }
        else if (data_set === 'location') {
            return (
                <TableRow>
                    <TableCell >Location!!!</TableCell>
                    <TableCell>Some other location field entry</TableCell>
                </TableRow>
            );
        }
        else {
            return (
                <TableRow>
                    <TableCell> Looks like your data hasn't finished loading yet!</TableCell>
                </TableRow>
            );
        }
    }

    renderTableData(data_set, data) {
        if (data_set === 'fitness') {
            return (
                <TableBody>
                    {
                        data.map(record => (
                            <TableRow key={record.activity_id}>
                                {
                                    Object.keys(fitnessData).map(key => (
                                        <TableCell>
                                            {record[key]}
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            );
        }
        else if (data_set === 'diet') {
            return (
                <TableBody>
                    {
                        data.map(record => (
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
                        ))
                    }
                </TableBody>
            );
        }
        else if (data_set === 'location') {
            return (
                <TableBody>
                    {data.map(record => (
                        <TableRow key={record._id}>
                            <TableCell component="th" scope="row"> waiting for a moment </TableCell>
                            <TableCell align="right"> of a lifetime</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            );
        }
        // last_five
        else if (data_set === 'last_five') {
            return (
                <TableBody>
                </TableBody>
            );
        }
    }

    render() {
        const { button_box, search_box, data_set, data, title } = this.props;
        return (
            <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="x_panel">
                    <div className="x_title">
                        <h2> {title} Data </h2>
                        <div className="clearfix"></div>
                    </div>
                    <div className="x_content">
                        <div>
                            {
                                button_box ? (
                                    <div>
                                        <button> Copy </button>
                                        <button> Print </button>
                                        <button> Download </button>
                                    </div>
                                ) :
                                    <div />
                            }
                        </div>
                        <div>
                            {
                                search_box ? (
                                        <button className="pull-right"> Search BOX </button>
                                ) :
                                    <div />
                            }
                        </div>
                        <table id="datatable-buttons"
                            className="table table-striped table-bordered"
                        >
                            <thead>
                                {this.renderTableHead(data_set)}
                            </thead>
                            {this.renderTableData(data_set, data)}
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(DataTable);
