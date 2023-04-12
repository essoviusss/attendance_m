import React, { useState, useEffect } from 'react';
import Pagination  from "https://cdn.skypack.dev/rc-pagination@3.1.15";
import './dStyle.css'
import axios from 'axios';


export default function DashBoard() {
    const [instructors, setInstructors] = useState([]);
    const [selectedInstructor, setSelectedInstructor] = useState('');
    const [attendance, setAttendance] = useState([]);
    const [room, setRoom] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState('');

    useEffect(() => {
        axios.get('http://localhost/Backend_API/verified_instructors.php')
          .then(response => {
            setInstructors(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

      useEffect(() => {
        axios.get('http://localhost/Backend_API/read_attendance.php')
          .then(response => {
            setAttendance(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

      useEffect(() => {
        axios.get('http://localhost/Backend_API/read_room.php')
          .then(response => {
            setRoom(response.data);
            console.log(response.data)
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

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
  
      const getData = (current, pageSize, selectedInstructors = '') => {
        let filteredAttendance = attendance;
        if (selectedInstructors !== '') {
          filteredAttendance = attendance.filter((attendance) => {
            return attendance.Instructor_ID === selectedInstructors;
          });
        }
      
        const startIndex = (current - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        
        return filteredAttendance.slice(startIndex, endIndex);
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

      const instructorNames = [...new Set(instructors?.map(instructor => instructor.Name))];

        // Create the options for the instructor filter
        const instructorOptions = Array.isArray(instructorNames) && instructorNames?.map(name => (
            <option key={name} value={name}>{name}</option>
            
        ));
        
        // Handle the change event of the instructor filter
        const handleInstructorChange = event => {
            setSelectedInstructor(event.target.value);
        };

        const roomRoom = [...new Set(room?.map(room => room.room))];
    
        const roomOptions = roomRoom?.map(room => (
            <option key={room} value={room}>{room}</option>
            
        ));
        const handleRoomChange = event => {
            setSelectedRoom(event.target.value);
        };


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
                                                    <th>Instructor ID</th>
                                                    <th>
                                                        <select value={selectedInstructor} onChange={handleInstructorChange} style={{border: "none", backgroundColor: "#1769aa", color: "white", fontWeight: "bold"}}>
                                                            <option value="">Instructor Name</option>
                                                            {instructorOptions}
                                                        </select>
                                                    </th>
                                                    <th>
                                                        <select value={selectedRoom} onChange={handleRoomChange} style={{border: "none", backgroundColor: "#1769aa", color: "white", fontWeight: "bold"}}>
                                                            <option value="">Room</option>
                                                            {roomOptions}
                                                        </select>
                                                    </th>
                                                    <th>Time-In Date</th>
                                                    <th>Time-In Time</th>
                                                    <th>Time-Out Date</th>
                                                    <th>Time-Out Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                 getData(current, size)?.map((attendance) => {
                                                   if(selectedInstructor == '' || selectedInstructor == attendance.InstructorName){
                                                        if(selectedRoom == '' || selectedRoom == attendance.RoomName){
                                                            return (
                                                                <tr key={attendance.ID}>
                                                                <td>{attendance.Instructor_ID}</td>
                                                                <td>{attendance.InstructorName}</td>
                                                                <td>{attendance.RoomName}</td>
                                                                <td>{attendance.TimeIn_Date}</td>
                                                                <td>{attendance.TimeIn_Time}</td>
                                                                <td>{attendance.TimeOut_Date}</td>
                                                                <td>{attendance.TimeOut_Time}</td>
                                                                </tr>
                                                            );
                                                        }
                                                   }
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