import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditJar = () => {
    const [date, setDate] = useState('');
    const [jars, setJar] = useState('');
    const [time, setTime] = useState('');
    const [day, setDay] = useState('');
    const [id, setId] = useState(0);
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setId(localStorage.getItem('id'));
        setDate(localStorage.getItem('date'));
        setJar(localStorage.getItem('jars'));
        setTime(localStorage.getItem('time'));
        setDay(localStorage.getItem('day'));

    }, [])
    setTimeout(() => {
        setLoader(false);
    }, 1200)
    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`https://6679063a18a459f6394da4bc.mockapi.io/jarsRecords/${id}`, {
            date: date,
            jars: jars,
            time: time,
            day: day,
        }).then(() => {
            Swal.fire({
                title: " Success!",
                text: date + " " + "Data has been updated successfully!",
                icon: "success",
                confirmButtonText: 'Ok'
            });
            navigate('/readjar');
        })
    }


    return (
        loader === true ? (
            <div className='loader-container'>
                <div class="custom-loader">
                </div>
            </div>
        ) :
            <>
                      
                 <section className='backgrounds'>
                    <div className="container overflow-hidden">

                        <div className='card p-5 shadow  mb-5' style={{ marginTop: '60px', borderRadius: '10px' }}>
                            <div className='card-header h3 text-center mb-5'>
                                <i className="fa-solid fa-flask"></i> Update Water Jar
                            </div>
                            <form >
                                <div className="row gy-5">
                                    <div className="col-md-6 fs-5">
                                        <label for="date"><i class="fa-solid fa-calendar-days mb-2"></i> Date:</label>
                                        <input type="date" class="form-control" id="date" name="date" onChange={(e) => setDate(e.target.value)} value={date}></input>
                                    </div>
                                    <div className="col-md-6 fs-5">
                                        <label for="jars"><i class="fa fa-flask mb-2"></i> Jars:</label>
                                        <input type="number" class="form-control" id="jars" name="jars" onChange={(e) => setJar(e.target.value)} value={jars}></input>
                                    </div>
                                    <div className="col-md-6 fs-5">
                                        <label for="time"><i class="fa-regular fa-clock mb-2"></i> Time:</label>
                                        <input type="time" class="form-control" id="time" name="time" onChange={(e) => setTime(e.target.value)} value={time} ></input>
                                    </div>
                                  
                                    <div className="col-md-6 fs-5 ">
                                        <label htmlFor="day" className="form-label"><i class="fa-regular fa-calendar mb-2"></i> Day</label>
                                        <select
                                            style={{ marginTop: '-8px' }}
                                            className="form-select"
                                            id="day"
                                            name="day"
                                            onChange={(e) => setDay(e.target.value)}
                                            value={day}  // Bind to the state variable
                                        >
                                            <option value="Monday">Monday</option>
                                            <option value="Tuesday">Tuesday</option>
                                            <option value="Wednesday">Wednesday</option>
                                            <option value="Thursday">Thursday</option>
                                            <option value="Friday">Friday</option>
                                            <option value="Saturday">Saturday</option>
                                            <option value="Sunday">Sunday</option>
                                        </select>
                                    </div>
                                    <div className=''>
                                        <button className='btn btn-success float-end p-2' onClick={handleUpdate}>Update <i className="fa-regular fa-floppy-disk" /></button>
                                        <Link to='/readjar'>
                                            <button class="btn btn-primary p-2" type="submit"><i class="fa-solid fa-arrow-left"></i> Go Back </button>
                                        </Link>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section >
            </>
    )
}

export default EditJar