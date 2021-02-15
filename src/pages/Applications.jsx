import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function Applications(props) {
    return (
        <div>
            <DataTable value={props.applications} emptyMessage='No Applications Found'
                    header='Applications' className='m-t-10'>
                        <Column field="name" header="Title"></Column>
                        <Column field="fileName" header="Resume"></Column>
                        <Column field="title" header="Applied For"></Column>
                    </DataTable>
        </div>
      )
}

export default Applications
