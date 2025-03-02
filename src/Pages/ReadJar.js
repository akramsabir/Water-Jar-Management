import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { Header } from '../Components/Header';
import { ToastContainer, toast } from 'react-toastify';

const ReadJar = () => {
    const [apidata, setApiData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loader, setLoader] = useState(true);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [day, setDay] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);



    const formatDate = (GettedDate) => {
        if (!GettedDate) {
            return ` `;
        }

        const date = new Date(GettedDate);
        if (isNaN(date.getTime())) {
            return ` `;
        }

        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const day = date.getDate();
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();

        return `${day.toString().padStart(2, '0')}-${month}-${year}`;
    };

    const convertTo12HourFormat = (datetimeString) => {
        if (!datetimeString) {
            return "";
        }

        var timeComponents = datetimeString.split(':');
        var hours = parseInt(timeComponents[0]);
        var minutes = parseInt(timeComponents[1]);
        var meridiem = (hours < 12) ? 'AM' : 'PM';
        hours = (hours % 12 === 0) ? 12 : hours % 12;
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        var formattedTime = hours + ':' + minutes + ' ' + meridiem;

        return formattedTime;
    };

    setTimeout(() => {
        setLoader(false);
    }, 1200);

    const setStorage = (id, date, jars, time, day) => {
        localStorage.setItem('id', id);
        localStorage.setItem('date', date);
        localStorage.setItem('day', day);
        localStorage.setItem('time', time);
        localStorage.setItem('jars', jars);
    };

    const handleRead = () => {
        axios.get('https://6679063a18a459f6394da4bc.mockapi.io/jarsRecords')
            .then((response) => {
                if (response.data.length > 90) {
                    toast.warning("You Have Almost Reached The Data Limit, Please Export It To Excel For Backup...!", {
                        className: 'custom-toast'
                    });
                }
                if (response.data.length == 100) {
                    handleDownload();
                }
                setApiData(response.data);
                setFilteredData(response.data);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`https://6679063a18a459f6394da4bc.mockapi.io/jarsRecords/${id}`)
            .then(() => {
                handleRead();
            });
    };

    useEffect(() => {
        handleRead();
    }, []);

    const filterData = () => {
        let data = apidata;

        if (fromDate) {
            data = data.filter(item => new Date(item.date) >= new Date(fromDate));
        }

        if (toDate) {
            data = data.filter(item => new Date(item.date) <= new Date(toDate));
        }

        if (day) {
            data = data.filter(item => item.day.toLowerCase() === day.toLowerCase());
        }

        setFilteredData(data);
        setCurrentPage(1); // Reset to the first page whenever filters change
    };

    const clearFilters = () => {
        setFromDate('');
        setToDate('');
        setDay('');
        setFilteredData(apidata);
        setCurrentPage(1); // Reset to the first page when clearing filters
    };


    const handleDownload = () => {
        if (!filteredData || filteredData.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'No Data Available',
                text: 'There is no data to download!',
            });
            return;
        }
    
        const formattedData = filteredData.map(item => ({
            ...item,
            date: formatDate(item.date),
            time: convertTo12HourFormat(item.time)
        }));
    
        let date = new Date();
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Water Jars Records");
        XLSX.writeFile(workbook, `WaterJarsRecords${date.toISOString().split('T')[0]}.xlsx`);
    };
    

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        loader === true ? (
            <div className='loader-container'>
                <div className="custom-loader"></div>
            </div>
        ) : (
            <>
                <ToastContainer />
                <Header />

                <div className='container mt-5'>
                    <div className='row mb-3'>
                        <div className='col-md-8'>
                            <div className='row'>
                                <div className='col-md-4 mt-2'>
                                    <label>From Date</label>
                                    <input
                                        type='date'
                                        className='form-control'
                                        placeholder='From Date'
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                    />
                                </div>
                                <div className='col-md-4 mt-2'>
                                    <label>To Date</label>
                                    <input
                                        type='date'
                                        className='form-control'
                                        placeholder='To Date'
                                        value={toDate}
                                        onChange={(e) => setToDate(e.target.value)}
                                    />
                                </div>
                                <div className='col-md-4 mt-2'>
                                    <label>Select Day</label>
                                    <select
                                        className="form-select"
                                        id="day"
                                        name="day"
                                        onChange={(e) => setDay(e.target.value)}
                                        value={day}
                                    >
                                        <option value="">Select day</option>
                                        <option value="Monday">Monday</option>
                                        <option value="Tuesday">Tuesday</option>
                                        <option value="Wednesday">Wednesday</option>
                                        <option value="Thursday">Thursday</option>
                                        <option value="Friday">Friday</option>
                                        <option value="Saturday">Saturday</option>
                                        <option value="Sunday">Sunday</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 mt-4'>
                            <div>
                                <button className='btn btn-primary btn-sm' onClick={filterData} disabled={!toDate && !fromDate && !day} title='Filter'><i className="fa-solid fa-filter"></i></button>
                                <button className='btn btn-secondary btn-sm ms-2' onClick={clearFilters} disabled={!toDate && !fromDate && !day} title='Clear Filter'><i className="fa-solid fa-filter-circle-xmark"></i></button>
                                <button className='btn btn-outline-success btn-sm ms-2' onClick={handleDownload} title='Excel Download'><i className="fa fa-download"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5 table-r ' style={{ marginBottom: "90px" }}>
                        <table className='table table-bordered table-striped table-hover mt-3 table-m '>
                            <thead>
                                <tr className='text-center'>
                                    <th style={{ width: "10%" }}><i className="fa fa-list-ul"></i> ID</th>
                                    <th style={{ width: "20%" }}><i className="fa-solid fa-calendar-days"></i> DATE</th>
                                    <th style={{ width: "10%" }}><i className="fa fa-flask"></i> JAR</th>
                                    <th style={{ width: "20%" }}><i className="fa-regular fa-clock"></i> TIME</th>
                                    <th style={{ width: "20%" }}><i className="fa-regular fa-calendar"></i> DAY</th>
                                    <th style={{ width: "10%" }}><i className="fa-regular fa-calendar"></i> Create By</th>
                                    <th style={{ width: "10%" }}>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                currentItems?.length > 0 ?
                                currentItems?.map((item) => (
                                    <tr className='text-center' data-aos="fade-up" key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{formatDate(item.date)}</td>
                                        <td>{item.jars}</td>
                                        <td>{convertTo12HourFormat(item.time)}</td>
                                        <td>{item.day}</td>
                                        <td>{item.create_by}</td>
                                        <td>
                                            <div className='d-flex justify-content-around align-items-center'>
                                                <Link to={'/editjar'}>
                                                    <button data-aos="flip-left"
                                                        className='btn btn-outline-primary btn-sm'
                                                        onClick={() => { setStorage(item.id, item.date, item.jars, item.time, item.day); }}
                                                    >
                                                        <i className="fa-regular fa-pen-to-square"></i>
                                                    </button>
                                                </Link>

                                                <button  data-aos="flip-right"
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
                                                                handleDelete(item.id);
                                                                Swal.fire({
                                                                    title: "Deleted!",
                                                                    text: "Your Data has been deleted.",
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
                                ))
                            :(
                                <tr>
                                    <td colSpan={"8"} className='text-center'>
                                        Sorry!No Records Found
                                    </td>
                                </tr>
                            )
                            }
                            </tbody>
                        </table>
                        <div className='d-flex justify-content-between align-items-center mt-3'>
                            <div>
                                <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} className='form-select d-inline-block w-auto'>
                                    <option value={10}>Limit: 10</option>
                                    <option value={30}>Limit: 30</option>
                                    <option value={50}>Limit: 50</option>
                                    <option value={apidata.length}>See All</option>
                                </select>
                            </div>
                            <div>
                                <button className='btn btn-outline-primary btn-sm me-2' onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                                    Previous
                                </button>
                                <button className='btn btn-outline-primary btn-sm' onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                                    Next
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    );
};

export default ReadJar;
