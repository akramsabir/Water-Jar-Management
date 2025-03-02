import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const CreateJar = () => {
    const [date, setDate] = useState('');
    const [jars, setJar] = useState('');
    const [time, setTime] = useState('');
    const [day, setDay] = useState('');
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();

    setTimeout(() => {
        setLoader(false);
    }, 1200);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://6679063a18a459f6394da4bc.mockapi.io/jarsRecords', {
            date: date,
            jars: jars,
            time: time,
            day: day,
            create_by: localStorage.getItem('user_id'),
        }).then(() => {
            Swal.fire({
                title: "Success!",
                text: "Data has been saved successfully!",
                icon: "success",
                confirmButtonText: 'Ok'
            });
            setTimeout(() => {
                // window.location.href = '/readjar';
                navigate('/readjar')
            }, 1200)

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
                    <div className="container overflow-hidden" data-aos="zoom-in">

                        <div className='card p-5 shadow mb-5' style={{ marginTop: '60px', borderRadius: '10px' }}>
                            <div className='card-header h3 text-center mb-5'>
                                <i className="fa-solid fa-flask"></i> Add Water Jar
                            </div>
                            <form>
                                <div className="row gy-5">
                                    <div className="col-md-6 fs-5">
                                        <label for="date"><i class="fa-solid fa-calendar-days mb-2"></i> Date:</label>
                                        <input type="date" class="form-control" id="date" name="date" placeholder='Please select date' onChange={(e) => setDate(e.target.value)} value={date}></input>
                                    </div>
                                    <div className="col-md-6 fs-5">
                                        <label for="jars"><i class="fa fa-flask mb-2"></i> Jars:</label>
                                        <input type="number" class="form-control" id="jars" name="jars" placeholder='Please enter number of jars'  onChange={(e) => setJar(e.target.value)} value={jars}></input>
                                    </div>
                                    <div className="col-md-6 fs-5">
                                        <label for="time"><i class="fa-regular fa-clock mb-2"></i> Time:</label>
                                        <input type="time" class="form-control" id="time" name="time" placeholder='Please enter time' onChange={(e) => setTime(e.target.value)} value={time} ></input>
                                    </div>

                                    <div className="col-md-6 fs-5 ">
                                        <label htmlFor="day" className="form-label"><i class="fa-regular fa-calendar mb-2"></i> Day</label>
                                        <select
                                            style={{ marginTop: '-8px' }}
                                            className="form-select"
                                            id="day"
                                            name="day"
                                            onChange={(e) => setDay(e.target.value)}
                                            value={day}
                                        >
                                            <option value="Select Day">Select Day</option>
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
                                        <button className='btn btn-success float-end p-2' onClick={handleSubmit} disabled={!date || !jars || !time || !day}>Save <i className="fa-regular fa-floppy-disk" /></button>
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

export default CreateJar