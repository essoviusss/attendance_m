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
        <div className='super-container' style={{ 
            backgroundImage: `url(https://scontent.xx.fbcdn.net/v/t1.15752-9/340434145_255178260342976_9006440708701531089_n.jpg?stp=dst-jpg_p1080x2048&_nc_cat=110&ccb=1-7&_nc_sid=aee45a&_nc_eui2=AeGiqywuGEmh9GMF86xGS7Vd2Cdx2LTIBZbYJ3HYtMgFlgFCokdoql2N6kIg9Il0RozLKKO8E4xbujL8TFKfbJmO&_nc_ohc=2pYzU8WcWBUAX9DdBOW&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSNkpdUfSMBY8J83u9-llVGCtCLKZ1GWBmmJjRaLf-1ZQ&oe=645B7227)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            height: '100vh',
            width: '100vw',
          }}>
            
            <div className='container'>
            <img src="https://2020.lorma.edu/wp-content/uploads/2020/02/LORMA2_2x4in_transparent-bg.png"alt="Example Image" style={{ maxWidth: '500px', maxHeight: '500px' }} /> 
            <p style={{ fontSize: '40px', fontWeight: 'bold', marginTop: '20px', color: 'green' }}>Attendance Monitoring</p>
                
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
