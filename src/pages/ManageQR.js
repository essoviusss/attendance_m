import React, { useState, useEffect } from 'react';
import Pagination  from "https://cdn.skypack.dev/rc-pagination@3.1.15";
import axios from 'axios';
import { Button } from '@mui/material';


export default function ManageQR(){
    const [rooms, setRooms] = useState([]);


    useEffect(() => {
        axios.get('http://localhost/Backend_API/manage_qr.php')
          .then(response => {
           setRooms(response.data);
            console.log(response.data)
          })
          .catch(error => {
            console.log(error);
          });
      }, [rooms, ]);

      function downloadQR(qr){
        const link = document.createElement('a');
        link.href = qr;
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      const [perPage] = useState(4);
      const [size, setSize] = useState(perPage);
      const [current, setCurrent] = useState(1);
      
  
      const PerPageChange = (value) => {
          setSize(value);
          const newPerPage = Math.ceil(rooms.length / value);
          if (current > newPerPage) {
              setCurrent(newPerPage);
          }
      }
  
      const getData = (current, pageSize) => {
          return rooms.slice((current - 1) * pageSize, current * pageSize);
      };
  
      const PaginationChange = (page, pageSize) => {
          setCurrent(page);
          setSize(pageSize)
      }
  
      const PrevNextArrow = (type, originalElement) => {
          if (type === 'prev') {
              return <button><i className="fa fa-angle-double-left"></i></button>;
          }
          if (type === 'next') {
              return <button><i className="fa fa-angle-double-right"></i></button>;
          }
          return originalElement;
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
                                                <th style={{ backgroundColor: '#006738' }}>ID</th>
                                                <th style={{ backgroundColor: '#006738' }}>Rooms</th>
                                                <th style={{ backgroundColor: '#006738' }}>QR Code</th>
                                                <th style={{ backgroundColor: '#006738' }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            getData(current, size).map((room, index) => {
                                                return ( 
                                                    <tr key={room.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{room.id}</td>
                                                    <td>{room.room}</td>
                                                    <td><img src={room.qr_img} width="30%" height="30%" alt="QR Code" /></td>
                                                    <td><Button onClick={() => downloadQR(room.qr_img)} variant='text'>Download</Button></td> 
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
                                        total={rooms.length}
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
