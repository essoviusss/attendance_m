import { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';
import QRCode from 'qrcode';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import "./style.css"

export default function MyComponent() {
  const [Rm, setRm] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [qr, setQr] = useState('');

  const handleChange = (event) => {
    setRm(event.target.value);
    setSelectedValue(event.target.value);
  };
  const sample = selectedValue;
  const UID = uuidv4();

  console.log(qr.toString());

  async function GenerateQRCode() {
    return new Promise((resolve, reject) => {
      QRCode.toDataURL(UID, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        height: 200,
        width: 200,
        margin: 2,
        color: {
          dark: '#000000FF',
          light: '#FFFFFFFF'
        }
      }, (err, UID) => {
        if (err) {
          reject(err);
        } else {
          resolve(UID);
          setQr(UID);
        }
      });
    });
  }
  
  async function setData() {
    try {
      const qrCodeDataUrl = await GenerateQRCode();
      const url = 'http://localhost/Backend_API/createqr.php';
      const fData = new FormData();
      fData.append('id', UID);
      fData.append('room', sample);
      fData.append('qr_img', qrCodeDataUrl);
  
      const response = await axios.post(url, fData);
      alert(response.data);
    } catch (error) {
      alert(error);
    }
  }
  

  function handleDownload() {
    const link = document.createElement('a');
    link.href = qr;
    link.download = sample +'.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <FormControl fullWidth>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <InputLabel id="select"></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="select"
          value={Rm}
          label=""
          onChange={handleChange}
          style={{ width: '22%' }}
        >
          <MenuItem value={"Room 301"}>Room 301</MenuItem>
          <MenuItem value={"Room 302"}>Room 302</MenuItem>
          <MenuItem value={"Room 303"}>Room 303</MenuItem>
          <MenuItem value={"Room 304"}>Room 304</MenuItem>
          <MenuItem value={"Room 305"}>Room 305</MenuItem>
          <MenuItem value={"Room 306"}>Room 306</MenuItem>
          <MenuItem value={"Room 307"}>Room 307</MenuItem>
        </Select>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button onClick={setData} style={{ width: '22%', backgroundColor: '#006738' }} variant='contained'>Generate QR</Button>
      </div>
      {qr && <>
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={qr} alt="Hi" width="300" height="300" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button variant="contained" onClick={handleDownload} style={{ width: '22%' }}>Download</Button>
        </div>
			</>}
    </FormControl>
  );
}
