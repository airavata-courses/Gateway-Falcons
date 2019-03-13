import React, { Component } from 'react'
import MUIDataTable from "mui-datatables";

const options = {
    filterType: 'checkbox',
    selectedRows: {

    }
};

class DataTable extends Component {

    flattenData(data) {
        const ret = [];
        data.map(datum => {
            let totals = [];
            totals.push(datum.date);
            totals = totals.concat(Object.keys(datum.totals).map(key => datum.totals[key]));
            console.log(totals);
            ret.push(totals);
        })
        return ret;
    }

    render() {
        const { data, title, table_columns } = this.props;
        let _data = [];
        if (data) {
            _data = this.flattenData(data);
        }
        return (
            <div >
                <div >
                    <div >
                        <MUIDataTable
                            title={title}
                            data={_data}
                            columns={table_columns}
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
