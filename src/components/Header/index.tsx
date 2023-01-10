import React from 'react'
import './style.css'
function Header() {

    return (
        <div className='container-header'>
            <img className='img-logo' src={require('../../assets/livelo.png')} alt='logo Livelo' />
        </div>
    )
}

export default Header