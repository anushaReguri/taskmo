import React ,{useState} from 'react'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { ConfirmDialog } from 'primereact/confirmdialog'; 
import Jobs from './Jobs';
import Applications from './Applications.jsx'

function Employer() {
    let  savedJobs= JSON.parse(localStorage.getItem('jobs'));
    const [jobs, setJobs] = useState(savedJobs?savedJobs:[]);
    let  savedApplications= JSON.parse(localStorage.getItem('applications'));
    const applications = savedApplications?savedApplications:[]
    const [state, setState] = useState({title:'', description:'',expiryDate:null,locality:''});

    const saveRecord=()=>{ 
      let allJobs=[...jobs, {title:state.title,description:state.description,locality:state.locality,
        expiryDate:state.expiryDate.toLocaleDateString('en-US'),
      id:Math.random()}];     
       setJobs(allJobs);
    setState({...state,showModal:false,title:'', description:'',expiryDate:null,locality:''})
    localStorage.setItem('jobs', JSON.stringify(allJobs));
    }

const createJob=()=> {
return(
    <div className='create-job'>
      <div className='row p-b-10'>
<div className='col-md-4 m-t-10'>
  <b>Title</b>
</div>
<div className='col-md-8'>
<InputText className='m-t-10'  value={state.title} onChange={(e)=> setState({...state,title:e.target.value})}/>
</div>
      </div>
      <div className='row'>
<div className='col-md-4 m-t-10'>
  <b>Desciption</b>
</div>
<div className='col-md-8'>
<InputTextarea  value={state.description} 
rows={5}
maxLength={150}
onChange={(e) => setState({...state, description:e.target.value})} />
</div>
      </div>
      <div className='row p-b-10'>
<div className='col-md-4 m-t-10'>
  <b>Locality</b>
</div>
<div className='col-md-8'>
<InputText className='m-t-10'  value={state.locality} onChange={(e)=> setState({...state,locality:e.target.value})}/>
</div>
      </div>
      <div className='row'>
<div className='col-md-4 m-t-10'>
  <b>Expiry Date</b>
</div>
<div className='col-md-8'>
<Calendar value={state.expiryDate} 
appendTo={document.body}
onChange={(e) => setState({...state,expiryDate:e.value})}></Calendar>
</div>
      </div>
    </div>
  )
}

  return (
       <div className="card jobs-div">
       <Button label="Create Job"  className='create-btn' onClick={()=>setState({...state,showModal:true})}/>
              <Jobs jobs={jobs}/>
                <ConfirmDialog visible={state.showModal}
                 onHide={() => setState({...state,showModal:false})}
                 message={createJob()}
                 header= 'Create Job'
                 footer={<Button label="save" disabled={ Object.keys(state).some((key) => {
                  return state[key] === null|| state[key] === ''||
                  !state[key]||
                  ((typeof state[key] === 'string')&&state[key].trim()==='') ;
              }) }   className='save-btn' onClick={saveRecord}/>}
              />
              <Applications applications={applications}/>
            </div>
  )
}

export default Employer
