import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { NavLink, Link } from 'react-router-dom';

function Adduser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [UserStatus, setUserStatus] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState('');
    var user_id = localStorage.getItem('user_id');
    
    

    const handleUser = (e) => {
        e.preventDefault();
        if (handleValidations()) {
            return;
        }
        setLoader(true);
        axios.post(`https://6679063a18a459f6394da4bc.mockapi.io/users`, {
            username: username,
            password: password,
            userstatus: UserStatus,
            created_by:localStorage.getItem('user_id'),
        }).then(() => {
            Swal.fire({
                title: user_id ? 'User Added!' : "New User Created!",
                text: user_id ? 'User has been created...!' :"New User has been created...!",
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            setTimeout(() => {
                window.location.href = '/';
            }, 1200);
        }).finally(() => {
            setLoader(false);
        });
    
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') {
            setUsername(value);
        }
        if (name === 'password') {
            setPassword(value);
        }
        if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleRadioChange = (value) => {
        setUserStatus(value);
    };

    const handleValidations = () => {
        if (password === username) {
            setError('Username and password cannot be same');
            return true;
        }
        else if(password.length < 6){
            setError("Password length must be greater than or equal to  6")
            return true;
        }
        if (password !== confirmPassword) {
            setError('Password does not match');
            return true;
        }
        if (confirmPassword && password !== confirmPassword) {
            setError("Passwords does not match");
            return true
        }
        return false
    }

    useEffect(() => {

        setError('');

    }, [username, password, confirmPassword]);

    return (
        <>
            <section className='backgrounds'>
                <div className='container'>
                    <div className='d-flex vh-100 justify-content-center align-items-center'>
                     <div data-aos="zoom-in">
                           <form className="form align shadow-lg" onSubmit={handleUser} >
                               <div className='text-center'>
                                   <h3><i className="fa-solid fa-user"></i>
                                   {
                                    user_id ? " Add User": " New User"
                                   }
                                    </h3>
                               </div>
                               <div className="flex-column">
                                   <label>Username </label>
                               </div>
                               <div className="inputForm">
                                   <svg height={20} width={20} xmlns="http://www.w3.org/2000/svg" viewBox="-64 0 512 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" /></svg>
                                   <input type="text" name="username" className="input" placeholder="Please enter your username" onChange={handleInputChange} />
                               </div>
                               <div className="flex-column">
                                   <label>Password </label>
                               </div>
                               <div className="inputForm">
                                   <svg height={20} viewBox="-64 0 512 512" width={20} xmlns="http://www.w3.org/2000/svg"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" /><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" /></svg>
                                   <input type={showPassword ? 'text' : 'password'} name="password" className="input" placeholder="Please enter your password" onChange={handleInputChange} />
                                   <i onClick={handleShowPassword} style={{ cursor: 'pointer' }} className={showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'}></i>
                               </div>
                               <div className="flex-column">
                                   <label>Confirm Password</label>
                               </div>
                               <div className="inputForm">
                                   <svg height={20} viewBox="-64 0 512 512" width={20} xmlns="http://www.w3.org/2000/svg"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" /><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" /></svg>
                                   <input type={showPassword ? 'text' : 'password'} name="confirmPassword" className="input" placeholder="Please confirm your password" onChange={handleInputChange} />
                                   <i onClick={handleShowPassword} style={{ cursor: 'pointer' }} className={showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'}></i>
                               </div>
                               <div>
                                {
                                    user_id ? <> <div className="form-check">
                                    <input className="form-check-input" type="radio" id="UserStatus1" checked={UserStatus === 1} name="UserStatus" onClick={() => handleRadioChange(1)} />
                                    <label className="form-check-label" htmlFor="UserStatus1">
                                        User
                                    </label>
                                </div>
                                <div className="form-check mt-3">
                                    <input className="form-check-input" type="radio" id="UserStatus2" checked={UserStatus === 2} name="UserStatus" onClick={() => handleRadioChange(2)} />
                                    <label className="form-check-label" htmlFor="UserStatus2">
                                        Admin
                                    </label>
                                </div> </> :
                                ("")
                                }
                                   
                               </div>
                        
                               {error && <p style={{ color: 'red' }}>{error}</p>}
                        
                               <button className="btn btn-dark log1" type='submit' disabled={!username || !password || !confirmPassword || loader}>{loader ? 'Please wait..' : 'Save'}</button>
                        
                           </form>
                     </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Adduser;
