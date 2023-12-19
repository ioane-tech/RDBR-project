import React, { useState } from 'react'

function Navbar() {
    const [authorized,setAuthorized]=useState(false)
  return (
    <div className='navbar_div'>
        <img className='logo' src="LOGO.png" alt="" />
        {
            authorized==false &&
            <button className='common_button'>შესვლა</button>
        }
    </div>
  )
}

export default Navbar