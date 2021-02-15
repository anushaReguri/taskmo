import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function Jobs(props) {
  return (
    <div>
        <DataTable value={props.jobs} emptyMessage='No Jobs Found'
                header='Jobs' className='m-t-10'>
                    <Column field="title" header="Title"></Column>
                    <Column field="description" header="Description"></Column>
                    <Column field="locality" header="Locality"></Column>
                    <Column field="expiryDate" header="Expiry Date"></Column>
                    {props.type==='user'&&<Column body={(e)=>props.addButton(e)} header="Expiry Date"></Column> }
                </DataTable>
    </div>
  )
}

export default Jobs
