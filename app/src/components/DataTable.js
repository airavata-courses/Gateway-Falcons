import React, { Component } from 'react'
import MUIDataTable from "mui-datatables";
import { Panel, PanelBody } from 'react-gentelella';

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
        const { data, data_set, title, table_columns } = this.props;
        let _data = [];
        if (data && data_set === 'diet') {
            // console.log(data_set, title, table_columns, data)
            _data = this.flattenData(data);
        } else if(data_set === "location") {
            // console.log('not diet', title, table_columns, data)
            _data = data.map(item => {
                return [
                    item.id,
                    item.date,
                    item.latitude,
                    item.longitude
                ]
            });
        } else if(data_set === "fitness") {
            _data = data.map(item => {
                return [
                    item.date,
                    item.name,
                    item.distance,
                    item.average_cadence,
                    item.average_heartrate,
                    item.max_heartrate,
                    item.average_speed,
                    item.max_speed,
                    item.calories,
                    item.timezone,
                    item.start_latlng,
                    item.end_latlng,
                    item.description
                ]
            });
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
