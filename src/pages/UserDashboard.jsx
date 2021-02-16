import React ,{useState,useEffect} from 'react'
import Jobs from './Jobs';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { ConfirmDialog } from 'primereact/confirmdialog'; 
import { InputText } from 'primereact/inputtext';
import Applications from './Applications.jsx'
import Task from './Task';

function UserDashboard() {
    let  savedJobs= JSON.parse(localStorage.getItem('jobs'));
    // if(savedJobs) savedJobs= savedJobs.filter(job=> new Date(job.expiryDate) >= new Date());
    const jobs =savedJobs?savedJobs:[];
    let  savedApplications= JSON.parse(localStorage.getItem('applications'));
    const [applications, setApplications] = useState(savedApplications?savedApplications:[])
    const [state, setState] = useState({showModal:false,name:'', fileName:''});
    const [fileUploader, setFileUploader] = useState('');

    useEffect(() => {
     fetch('http://103.212.121.222:3000/task/test/report').then(resp=> resp.json())
     .then(data=>  {
      let tasks=[];
       if(data&&data?.task_answers){
        data.task_answers.forEach(item=>{
          let task={};
          item.answer.forEach((ans)=>{
task[ans.question]= ans.answer;
})
tasks.push({...task,task_id:item.task_id,user_id:item.user_id});
        })
       }
       let questions=       data.task_questions.map(que=> que.question  )
       setState({...state,tasks:tasks,questions:questions})
     }     ).catch(err=> setState({...state,error:err}))
    }, [])
    
    const addButton=(rec)=>{        
      return  <Button label="Apply" disabled={new Date(rec.expiryDate) <= new Date()} onClick={()=> setState({...state,showModal:true, selectedJob:rec})} />
    }

    const applyForTheJob=()=>{
        let app=[...applications,{name:state.name,fileName:state.fileName, title: state.selectedJob.title,
            email:JSON.parse(localStorage.getItem('userEmail')) }]
       setApplications(app)
       setState({...state,showModal:false,name:'', fileName:'',selectedJob:{}});
       localStorage.setItem('applications', JSON.stringify(app));
    }    

    const handleUploadImage = () => {
        fileUploader.click();
    };
    const onBasicUploadAuto = ( value) => {
        value.stopPropagation();
        value.preventDefault();
        var file = value.target.files[0];
        setState({...state,fileName:file.name})
    };

    const applyJob=()=> {
        return(
            <div className='create-job'>
              <div className='row p-b-10'>
        <div className='col-md-4 m-t-10'>
          <b>Name</b>
        </div>
        <div className='col-md-8'>
        <InputText className='m-t-10'  value={state.name} onChange={(e)=> setState({...state,name:e.target.value})}/>
        </div>
              </div>
              <Button size="sm" kind="primary" className="m-r-10" onClick={() => handleUploadImage()}>
                                        Upload Resume
                                    </Button>
                                    <input
                                        type="file"
                                        id="file"
                                        ref={(file) => {
                                            setFileUploader(file);
                                        }}
                                        hidden
                                        onChange={(ev) => onBasicUploadAuto( ev)}
                                    /> 
                                   {state.fileName&& <label className='m-10'>{state.fileName }</label>}           </div>
          )
        }

  return (
    <div>
      {state.error? <div>{state.error}</div>:   <div className="card jobs-div">
             <div className='p-b-10'>
         <Jobs jobs={jobs} addButton={addButton} type='user'/>
         </div>
         <ConfirmDialog visible={state.showModal}
                 onHide={() => setState({...state,showModal:false})}
                 message={applyJob()}
                 header= 'Apply'
                 footer={<Button label="save" disabled={ Object.keys(state).some((key) => {
                  return state[key] === null|| state[key] === ''||
                  !state[key]||
                  ((typeof state[key] === 'string')&&state[key].trim()==='') ;
              }) }   className='save-btn' onClick={applyForTheJob}/>}
              />
              <b>Your Job Applications</b>
              <Applications applications={applications}/>
              <Task tasks={state.tasks} questions={state.questions}/>
            </div>}
    </div>
  )
}

export default UserDashboard
