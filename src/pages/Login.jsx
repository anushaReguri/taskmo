import React,{useState} from 'react'
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router-dom';

function Login() {
const [state, setState] = useState({email:'',otp:''})
let history=useHistory();

const onEnterEmail = (e) =>{
  setState({...state,email:e.target.value,
     isValidEmail:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(e.target.value)})
}

const getOTP=(e)=>{
  e.preventDefault()  
setState({...state,sentOTP:true})
}

const onEnterOTP=(e)=>{
  setState({...state,otp:e.target.value})
} 

const login =(userType)=>{
  localStorage.setItem('isLoggedin', JSON.stringify(true));
  localStorage.setItem('userEmail', JSON.stringify(state.email));
history.push(`${userType==='employer'?'/employer':'user'}`);
}

  return (
    <div className='login'>
      <Card title='Login' className='login-card'>
        <form onSubmit={getOTP}>
      <div className='col-md-8 margin-auto'> 
      <span className="p-float-label">
    <InputText id="in" value={state.email} 
    type='email'
     onChange={onEnterEmail} />
    <label htmlhtmlFor="in">Email</label>
</span>
{!state.isValidEmail&& <small className='color-red'>Invalid Email entered</small>}
      </div>
      {state.sentOTP?  <div className='col-md-8 margin-auto m-t-10'>
         <InputText className='m-t-10'  value={state.otp} 
     onChange={onEnterOTP} />
     <Button label="Login As Employer" disabled={state.otp===''} onClick={()=>login('employer')}></Button>
     <Button label="Login As User"  disabled={state.otp===''} onClick={login}></Button>
     </div>:
      <Button label="Get OTP" className='m-t-10' disabled={state.email===''}></Button>}
      </form>
</Card>
    </div>
  )
  
}

export default Login
