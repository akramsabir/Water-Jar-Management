import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Header } from '../Components/Header';

const ReadUser = () => {
    const [userdata, setUserData] = useState([]);
    const [loader, setLoader] = useState(true);
    const handleUserData = () => {
        axios.get(`https://6679063a18a459f6394da4bc.mockapi.io/users`)
            .then((response) => {
                setUserData(response.data);
            })
    }
    setTimeout(() => {
        setLoader(false);
    }, 1200);

    const setStorage = (user_id, username, password, userstatus) => {
        localStorage.setItem('id', user_id);
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('edituserstatus', userstatus);
    }


    const handleDelete = (user_id) => {
        axios.delete(`https://6679063a18a459f6394da4bc.mockapi.io/users/${user_id}`)
            .then(() => {
                handleUserData();
            });
    };


    useEffect(() => {
        handleUserData();
    }, [])


    return (
        loader === true ? (
            <div className='loader-container'>
                <div className="custom-loader"></div>
            </div>
        ) : (
            <>
                <Header />
                <div className='container'>
                   <div className='mt-5 table-r'>
                     <table className='table table-bordered table-striped table-hover mt-3 table-m ' style={{marginBottom:"90px"}}>
                         <thead>
                             <tr className='text-center'>
                                 <th style={{ width: "10%" }}><i className="fa fa-list-ul"></i> ID</th>
                                 <th style={{ width: "30%" }} ><i className="fa-solid fa-calendar-days"></i> USERNAME</th>
                                 <th style={{ width: "25%" }}><i className="fa fa-flask"></i> PASSWORD</th>
                                 <th style={{ width: "20%" }}><i className="fa fa-flask"></i> STATUS</th>
                                 <th style={{ width: "20%" }}>ACTION</th>
                             </tr>
                         </thead>
                         <tbody>
                             {
                                 userdata.map((item) => {
                                     return (
                                         <>
                                             <tr className='text-center'  data-aos="fade"  >
                                                 <td>{item.user_id}</td>
                                                 <td>{item.username}</td>
                                                 <td>{item.password}</td>
                                                 <td>{item.userstatus === 1 ? 'User' : 'Admin'}</td>
                                                 <td>
                                                     <div className='d-flex justify-content-around align-items-center'>
                                                         <Link to={'/edituser'}>
                                                             <button
                                                                 className='btn btn-outline-primary btn-sm'
                                                                 onClick={() => { setStorage(item.user_id, item.username, item.password, item.userstatus); }}
                                                             >
                                                                 <i className="fa-regular fa-pen-to-square"></i>
                                                             </button>
                                                         </Link>
                    
                                                         <button
                                                             className='btn btn-danger btn-sm'
                                                             onClick={() => {
                                                                 Swal.fire({
                                                                     title: "Are you sure?",
                                                                     text: "You won't be able to revert this!",
                                                                     icon: "warning",
                                                                     showCancelButton: true,
                                                                     confirmButtonColor: "#3085d6",
                                                                     cancelButtonColor: "#d33",
                                                                     confirmButtonText: "Yes, delete it!"
                                                                 }).then((result) => {
                                                                     if (result.isConfirmed) {
                                                                         handleDelete(item.user_id);
                                                                         Swal.fire({
                                                                             title: "Deleted!",
                                                                             text: "User has been deleted.",
                                                                             icon: "success"
                                                                         });
                                                                     }
                                                                 });
                                                             }}
                                                         >
                                                             <i className="fa-solid fa-trash-can"></i>
                                                         </button>
                                                     </div>
                                                 </td>
                                             </tr>
                                         </>
                                     )
                                 })
                             }
                    
                         </tbody>
                     </table>
                   </div>
                </div>
            </>
        )
    );
};

export default ReadUser