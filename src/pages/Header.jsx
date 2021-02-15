import React from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router-dom';

function Header() {
    let history=useHistory();

    const logout=()=>{
        localStorage.setItem('isLoggedin', JSON.stringify(false));
        localStorage.setItem('userEmail', JSON.stringify(''));
        history.push('/');
    }
  return (
    <div className='header-div'>
<Card>
   <div className='logout'>
   <label className='m-10'>{JSON.parse(localStorage.getItem('userEmail'))}</label>
        <Button size="sm" kind="primary" className="m-r-10" label='Logout' onClick={logout}/>
        </div>
</Card> 
 </div>
  )
}

export default Header
