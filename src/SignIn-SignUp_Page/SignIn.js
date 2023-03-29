import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./style.css"
import { TextField, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = () =>{
        const url = "http://localhost/Backend_API/signin.php";
        let fData = new FormData();
        fData.append('email', email);
        fData.append('password', password);

        axios.post(url, fData)
        .then(response => {
            if(response.data.trim() === "Success" ){
                alert("Login Successful");
                navigate("/ClippedDrawer");
            }else{
                alert(response.data);
            }
        })
        .catch(error => alert(error));
    }

    return (
        <div className='super-container'>
            <div className='container'>
                <div className='content'>
                    <div className='input_field1'>
                        <TextField
                        onChange={e => setEmail(e.target.value)}
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
                        onChange={e => setPassword(e.target.value)}
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
                    <div className='buttons'>
                        <Button onClick={signIn} variant="contained"><Link to={""}>Sign In</Link></Button>
                        <Button variant="text"><Link to={"/SignUp"}>Create an account</Link></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
