import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Pagination  from "https://cdn.skypack.dev/rc-pagination@3.1.15";
import './Istyle.css'
import axios from 'axios';


export default function VerifiedInstructor(){
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost/Backend_API/verified_instructors.php')
          .then(response => {
            setInstructors(response.data);
            console.log(response.data)
          })
          .catch(error => {
            console.log(error);
          });
      }, [instructors]);

      const [perPage] = useState(10);
      const [size, setSize] = useState(perPage);
      const [current, setCurrent] = useState(1);
      
  
      const PerPageChange = (value) => {
          setSize(value);
          const newPerPage = Math.ceil(instructors.length / value);
          if (current > newPerPage) {
              setCurrent(newPerPage);
          }
      }
  
      const getData = (current, pageSize) => {
          return instructors.slice((current - 1) * pageSize, current * pageSize);
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
      async function Delete(id, name, email, department, isVerified){
        const url = 'http://localhost/Backend_API/delete_instructors.php';
        const fData = new FormData();
        fData.append('id', id);
        fData.append('name', name);
        fData.append('email', email);
        fData.append('department', department);
        fData.append('isVerified', isVerified);
    
        const response = await axios.post(url, fData);
        alert(response.data);
      }

    return (
        <>
            <div className="container-fluid mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table table-text-small mb-0">
                                        <thead className="thead-primary table-sorting">
                                            <tr>
                                            <th style={{ backgroundColor: '#006738' }}>#</th>
                                                <th style={{ backgroundColor: '#006738' }}>Instructor</th>
                                                <th style={{ backgroundColor: '#006738' }}>Email</th>
                                                <th style={{ backgroundColor: '#006738' }}>Department</th>
                                                <th style={{ backgroundColor: '#006738' }}>Status</th>
                                                <th style={{ backgroundColor: '#006738' }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            getData(current, size).map((instructor, index) => {
                                                return (
                                                    <tr key={instructor.ID}>
                                                    <td>{index + 1}</td>
                                                    <td>{instructor.Name}</td>
                                                    <td>{instructor.Email}</td>
                                                    <td>{instructor.Department}</td>
                                                    <td>{instructor.isVerified == false ? "Not Verified" : "Verified"}</td>
                                                    <span><Button onClick={() => Delete(instructor.ID, instructor.Name, instructor.Email, instructor.Department, instructor.isVerified)} variant="text">Delete</Button></span>
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
                                        total={instructors.length}
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
        </>
    );
}
