import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2';

const Header = () => {
    const handleLogout = () => {
        Swal.fire({
            title: 'Logged out!',
            text: 'You have logged out successfully!',
            icon: 'success',
            confirmButtonText: 'Ok'
        });
        setTimeout(() => {
            localStorage.removeItem('user_id');
            localStorage.clear();
            // navigate('/');
            window.location.href = '/';
        }, 1000);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
            <div className="container">
                <img src='./assets/image/Dualsysco-logo.png' width={120} alt='logo-image' />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse " id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {localStorage.getItem('userstatus') == 2 && <>
                            <li className='nav-item'>
                                <NavLink to='/readuser' className="nav-link active" aria-current='page'>Read User</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/signin' className="nav-link active" aria-current='page'>Add User</NavLink>
                            </li>
                        </>}
                        <li className="nav-item ">
                            <NavLink to='/createjar' className="nav-link active" aria-current="page">Add Jar</NavLink>
                        </li>
                        <li className="nav-item ">
                            <NavLink to='/readjar' className="nav-link active" aria-current="page">Read Jar</NavLink>
                        </li>
                        <li className="nav-item" onClick={handleLogout}>
                            <a className="nav-link" href="#">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export { Header }