import React, { Component } from 'react'
import MUIDataTable from "mui-datatables";
import * as Constants from '../constants';

const columns = ["Name", "Company", "City", "State"];

const _data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
];

const options = {
    filterType: 'checkbox',
    selectedRows: {

    }
};

class DataTable extends Component {

    constructor(props) {
        super(props);
        const { data_set, data, title, table_columns } = props;
        // const _table_columns = Object.keys(table_columns).map(key => table_columns[key]);
        console.log(table_columns)
        this.state = {
            // button_box: button_box,
            // search_box: search_box,
            data_set: data_set,
            data: data,
            title: title,
            table_columns: table_columns
        };
    }

    render() {
        const { data, title, table_columns } = this.state;
        return (
            <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="x_panel">
                    <div className="x_title">
                        <h2> {title} Data </h2>
                        <div className="clearfix"></div>
                    </div>
                    <div className="x_content">
                        <MUIDataTable
                            title={title}
                            data={_data}
                            columns={columns}
                            options={options}
                            isRowSelectable={false}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default DataTable;
