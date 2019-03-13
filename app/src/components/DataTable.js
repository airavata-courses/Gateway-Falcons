import React, { Component } from 'react'
import MUIDataTable from "mui-datatables";
import { Panel, PanelBody, PanelHeader } from 'react-gentelella';

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
            <Panel>
                <PanelBody>
                    <MUIDataTable
                        title={title}
                        data={_data}
                        columns={table_columns}
                        options={options}
                        isRowSelectable={false}
                    />
                </PanelBody>
            </Panel>
        );
    }
}

export default DataTable;
