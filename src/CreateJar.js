import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


const CreateJar = () => {
    const [date, setDate] = useState('');
    const [jars, setJar] = useState('');
    const [time, setTime] = useState('');
    const [day, setDay] = useState('');
    const [loader, setLoader] = useState(true);

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
        }).then(() => {
            Swal.fire({
                title: "Success!",
                text: "Data has been saved successfully!",
                icon: "success",
                confirmButtonText: 'Ok'
            });
            setTimeout(() => {
                window.location.href = '/Read';
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
                <section className='backgrounds vh-100'>
                    <div className="container overflow-hidden">

                        <div className='card p-5 shadow' style={{ marginTop: '60px', borderRadius: '10px' }}>
                            <div className='card-header h3 text-center mb-5'>
                                <i className="fa-solid fa-flask"></i> Add Water Jar
                            </div>
                            <form>
                                <div className="row gy-5">
                                    <div className="col-6 fs-5">
                                        <label for="date"><i class="fa-solid fa-calendar-days mb-2"></i> Date:</label>
                                        <input type="date" class="form-control" id="date" name="date" onChange={(e) => setDate(e.target.value)} value={date}></input>
                                    </div>
                                    <div className="col-6 fs-5">
                                        <label for="jars"><i class="fa fa-flask mb-2"></i> Jars:</label>
                                        <input type="number" class="form-control" id="jars" name="jars" onChange={(e) => setJar(e.target.value)} value={jars}></input>
                                    </div>
                                    <div className="col-6 fs-5">
                                        <label for="time"><i class="fa-regular fa-clock mb-2"></i> Time:</label>
                                        <input type="time" class="form-control" id="time" name="time" onChange={(e) => setTime(e.target.value)} value={time} ></input>
                                    </div>
                                    <div className="col-6 fs-5">
                                        <label for="day"><i class="fa-regular fa-calendar mb-2"></i> Day:</label>
                                        <select class="form-control" id="day" name="day" onChange={(e) => setDay(e.target.value)} value={day} >
                                            <option value="Monday"><i class="fa fa-angle-double-right"></i> Monday</option>
                                            <option value="Tuesday"><i class="fa fa-angle-double-right"></i> Tuesday</option>
                                            <option value="Wednesday"><i class="fa fa-angle-double-right"></i> Wednesday
                                            </option>
                                            <option value="Thursday"><i class="fa fa-angle-double-right"></i> Thursday</option>
                                            <option value="Friday"><i class="fa fa-angle-double-right"></i> Friday</option>
                                            <option value="Saturday"><i class="fa fa-angle-double-right"></i> Saturday</option>
                                            <option value="Sunday"><i class="fa fa-angle-double-right"></i> Sunday</option>
                                        </select>
                                    </div>
                                    <div className=''>
                                        <button className='btn btn-success float-end p-2' onClick={handleSubmit}>Save <i className="fa-regular fa-floppy-disk" /></button>
                                        <Link to='/Read'>
                                            <button class="btn btn-primary p-2" type="submit">Go Back <i className="fa-solid fa-arrow-right"></i></button>
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