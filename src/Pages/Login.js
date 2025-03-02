import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login() {
    const [userData, getUserData] = useState([]);
    const [Username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loader, setLoader] = useState(false);
    const [ShowPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getUser();
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoader(true);

        var CheckUser = await CheckUsers();
        if (CheckUser) {
            setLoader(false);
        }
    }

    const CheckUsers = () => {
        
        const userExists = userData.find(user => user.username === Username && user.password === password);
        if (userExists) {
            Swal.fire({
                title: 'Logged in!',
                text: 'You have Logged in Successfully...!',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            setTimeout(() => {
                localStorage.setItem('user_id', userExists.user_id);
                localStorage.setItem('userstatus', userExists.userstatus);
                window.location.href = '/readjar';
            }, 1500);
            return false;
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Invalid username or password',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
            return true;
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') {
            setUsername(value);
        }
        if (name === 'password') {
            setPassword(value);
        }
    }
    const handleShowPassword = () => {
        setShowPassword(!ShowPassword);
    }

    const getUser = () => {
        axios.get(`https://6679063a18a459f6394da4bc.mockapi.io/users`)
            .then((response) => {
                getUserData(response.data);
            })

    }

    return (
        <>
            <section className='backgrounds '>
                <div className='container'>
                    <div className='d-flex vh-100 justify-content-center align-items-center'>
                        <form className="form shadow-lg" onSubmit={handleLogin}>
                            <div className='text-center'>
                                <h3><i className="fa-solid fa-user"></i> Login</h3>
                            </div>
                            <div className="flex-column">
                                <label>Username </label>
                            </div>
                            <div className="inputForm">
                                <svg height={20} width={20} xmlns="http://www.w3.org/2000/svg" viewBox="-64 0 512 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" /></svg>
                                <input type="text" name="username" className="input" placeholder="Please enter username" onChange={handleInputChange} />
                            </div>
                            <div className="flex-column">
                                <label>Password </label>
                            </div>
                            <div className="inputForm">
                                <svg height={20} viewBox="-64 0 512 512" width={20} xmlns="http://www.w3.org/2000/svg"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" /><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" /></svg>
                                <input type={ShowPassword ? 'text' : 'password'} name="password" className="input" placeholder="Please enter password" onChange={handleInputChange} />
                                <i onClick={handleShowPassword} style={{ cursor: 'pointer' }} className={ShowPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'}></i>
                            </div>
                            <button className="btn btn-dark log" type='submit' disabled={!Username || !password || loader}>{loader ? 'please wait..' : 'Login'}</button>
                            <p className="mt-3 text-center">Don't have an account? <span style={{cursor: 'pointer', color: 'blue'}} onClick={() => navigate('/signin')}>Sign up</span></p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
