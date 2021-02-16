import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function Task(props) {
    return (
        <div>
            <DataTable value={props.tasks} emptyMessage='No Tasks Found'
            paginator={true}
            rows={10}
                    header='Tasks' className='m-t-10'>
                        <Column field="task_id" header="Task ID"></Column>
                        <Column field="user_id" header="User ID"></Column>
                        {props.questions.map(que=>(
                        <Column field={que} header={que}></Column>
                        ))}
                    </DataTable>
        </div>
      )
}

export default Task
