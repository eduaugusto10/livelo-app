import React from 'react'
import './style.css'
function Header() {

    return (
        <div className='container-header'>
            <img src={require('../../assets/livelo.png')} width={100} height={100} alt='logo Livelo' />
        </div>
    )
}

export default Header