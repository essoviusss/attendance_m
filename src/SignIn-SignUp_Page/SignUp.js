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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function signUp() {
        const url = 'http://localhost/Backend_API/signup.php';
        
        let fData = new FormData();
        fData.append('email', email);
        fData.append('password', password);
        fData.append('confirm_password', confirmPassword);

        axios.post(url, fData)
          .then(response => {
            response.data.trim() === "Success" ? navigate("/SignIn") : alert(response.data);
          })
          .catch(error => {
            alert(error);
        });
      }

    return (
        <div className='container'>
        <div className='content'>
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
            <div className='input_field3'>
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
    );
}