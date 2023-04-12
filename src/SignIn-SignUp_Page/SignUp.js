import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./style.css"
import { TextField, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate(); 
    const [id, setID] = useState('');
    const [email, setEmail] = useState('');
    const [fName, setfName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function signUp() {
        const url = 'http://localhost/Backend_API/signup.php';
        
        let fData = new FormData();
        fData.append('id', id);
        fData.append('email', email);
        fData.append('fName', fName);
        fData.append('password', password);
        fData.append('confirm_password', confirmPassword);

        axios.post(url, fData)
          .then(response => {
            response.data.trim() === "Success" ? navigate("/") : alert(response.data);
          })
          .catch(error => {
            alert(error);
        });
      }

    return (
        <div className='super-container' style={{ 
            backgroundImage: `url(https://scontent.xx.fbcdn.net/v/t1.15752-9/340434145_255178260342976_9006440708701531089_n.jpg?stp=dst-jpg_p1080x2048&_nc_cat=110&ccb=1-7&_nc_sid=aee45a&_nc_eui2=AeGiqywuGEmh9GMF86xGS7Vd2Cdx2LTIBZbYJ3HYtMgFlgFCokdoql2N6kIg9Il0RozLKKO8E4xbujL8TFKfbJmO&_nc_ohc=2pYzU8WcWBUAX9DdBOW&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSNkpdUfSMBY8J83u9-llVGCtCLKZ1GWBmmJjRaLf-1ZQ&oe=645B7227)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            height: '100vh',
            width: '100vw',
          }}>
        <div className='container'>
        <div className='content'>
        <div className='input_field'>
                <TextField
                value={id}
                onChange={event => setID(event.target.value)}
                id='id'
                label='ID NO.'
                variant='outlined'
                InputProps={{
                    startAdornment: (
                    <EmailIcon
                        sx={{
                        color: 'gray',
                        marginRight: '10px',
                        }}
                    />
                    ),
                }}
                />
            </div>
            <div className='input_field1'>
                <TextField
                value={email}
                onChange={event => setEmail(event.target.value)}
                id='email'
                label='Email'
                variant='outlined'
                InputProps={{
                    startAdornment: (
                    <EmailIcon
                        sx={{
                        color: 'gray',
                        marginRight: '10px',
                        }}
                    />
                    ),
                }}
                />
            </div>
            <div className='input_field2'>
                <TextField
                value={fName}
                onChange={event => setfName(event.target.value)}
                id='FullName'
                label='FullName'
                variant='outlined'
                InputProps={{
                    startAdornment: (
                    <EmailIcon
                        sx={{
                        color: 'gray',
                        marginRight: '10px',
                        }}
                    />
                    ),
                }}
                />
            </div>
            <div className='input_field3'>
            <TextField
                value={password}
                onChange={event => setPassword(event.target.value)}
                id='password'
                label='Password'
                variant='outlined'
                type='password'
                InputProps={{
                    startAdornment: (
                    <LockIcon
                        sx={{
                        color: 'gray',
                        marginRight: '10px',
                        }}
                    />
                    ),
                }}
                />
            </div>
            <div className='input_field4'>
            <TextField
                value={confirmPassword}
                onChange={event => setConfirmPassword(event.target.value)}
                id='password'
                label='Confirm Password'
                variant='outlined'
                type='password'
                InputProps={{
                    startAdornment: (
                    <LockOpenIcon
                        sx={{
                        color: 'gray',
                        marginRight: '10px',
                        }}
                    />
                    ),
                }}
                />
            </div>
            <div className='buttons'>
                <Button onClick={signUp} variant="contained"><Link to={""}>Sign Up</Link></Button>
                <Button variant="text"><Link to={"/"}>Have an account?</Link></Button>
            </div>
        </div>
    </div>
    </div>
    );
}