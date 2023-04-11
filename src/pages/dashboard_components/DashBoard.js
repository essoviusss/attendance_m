import React, { useState, useEffect } from 'react';
import Pagination  from "https://cdn.skypack.dev/rc-pagination@3.1.15";
import './dStyle.css'
import axios from 'axios';


export default function DashBoard() {
    const [instructors, setInstructors] = useState([]);
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        axios.get('http://localhost/Backend_API/verified_instructors.php')
          .then(response => {
            setInstructors(response.data);
            console.log(response.data)
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

      useEffect(() => {
        axios.get('http://localhost/Backend_API/read_attendance.php')
          .then(response => {
            setAttendance(response.data);
            console.log(response.data)
          })
          .catch(error => {
            console.log(error);
          });
      }, [attendance]);

      const [perPage] = useState(10);
      const [size, setSize] = useState(perPage);
      const [current, setCurrent] = useState(1);
      
  
      const PerPageChange = (value) => {
          setSize(value);
          const newPerPage = Math.ceil(attendance.length / value);
          if (current > newPerPage) {
              setCurrent(newPerPage);
          }
      }
  
      const getData = (current, pageSize) => {
          return attendance.slice((current - 1) * pageSize, current * pageSize);
      };
  
      const PaginationChange = (page, pageSize) => {
          setCurrent(page);
          setSize(pageSize)
      }
  
      const PrevNextArrow = (current, type, originalElement) => {
          if (type === 'prev') {
              return <button><i className="fa fa-angle-double-left"></i></button>;
          }
          if (type === 'next') {
              return <button><i className="fa fa-angle-double-right"></i></button>;
          }
          return originalElement;
      }

    return (
        <div className='body'>
            <div className="parent_cont">
                <div className="child_cont1">
                    <div className='child1_content'>
                        <h3># of Instructors</h3>
                        {instructors.length}
                    </div>
                </div>
                <div className="child_cont2">
                    <div className='child2_content'>
                        blank
                    </div>
                </div>
                <div className="child_cont3">
                    <div className='child3_content'>
                        blank
                    </div>
                </div>
            </div>
            <div className='table'>
                <div className="container-fluid mt-5 mb-5" style={{ width: '100%' }}>
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="card">
                                <div className="card-body p-0">
                                    <div className="table-responsive" style={{ overflowX: "auto" }}>
                                        <table className="table table-text-small mb-0" style={{ width: '100%' }}>
                                            <thead className="thead-primary table-sorting">
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Room ID</th>
                                                    <th>Instructor ID</th>
                                                    <th>Instructor Name</th>
                                                    <th>Time-In Date</th>
                                                    <th>Time-In Time</th>
                                                    <th>Time-Out Date</th>
                                                    <th>Time-Out Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                getData(current, size).map((attendance, index) => {
                                                    return (
                                                        <tr key={attendance.ID}>
                                                        <td>{attendance.ID}</td>
                                                        <td>{attendance.Room_ID}</td>
                                                        <td>{attendance.Instructor_ID}</td>
                                                        <td>{attendance.Name}</td>
                                                        <td>{attendance.TimeIn_Date}</td>
                                                        <td>{attendance.TimeIn_Time}</td>
                                                        <td>{attendance.TimeOut_Date}</td>
                                                        <td>{attendance.TimeOut_Time}</td>
                                                        
                                                    </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                        </table>
                                    </div>
                                    <div className="table-filter-info">

                                        <Pagination
                                            className="pagination-data"
                                            showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
                                            onChange={PaginationChange}
                                            total={attendance.length}
                                            current={current}
                                            pageSize={size}
                                            showSizeChanger={false}
                                            itemRender={PrevNextArrow}
                                            onShowSizeChange={PerPageChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}