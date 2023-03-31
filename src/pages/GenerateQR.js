import { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';
import QRCode from 'qrcode';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

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
  
  const GenerateQRCode = () => {
    QRCode.toDataURL(UID, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      margin: 2,
      color: {
        dark: '#000000FF',
        light: '#FFFFFFFF'
      }
    }, function (err, UID) {
      if (err) {
        console.error(UID);
      } else {
        setQr(UID);
      }
    });
    const url = 'http://localhost/Backend_API/createqr.php';
    let fData = new FormData();
    fData.append('id', UID);
    fData.append('room', sample);
    fData.append('qr_img', qr.toString);

    axios.post(url, fData)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        alert(error);
    });
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="select"></InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="select"
        value={Rm}
        label=""
        onChange={handleChange}
      >
        <MenuItem value={"Room 301"}>Room 301</MenuItem>
        <MenuItem value={"Room 302"}>Room 302</MenuItem>
        <MenuItem value={"Room 303"}>Room 303</MenuItem>
        <MenuItem value={"Room 304"}>Room 304</MenuItem>
        <MenuItem value={"Room 305"}>Room 305</MenuItem>
        <MenuItem value={"Room 306"}>Room 306</MenuItem>
        <MenuItem value={"Room 307"}>Room 307</MenuItem>
      </Select>
      <Button onClick={GenerateQRCode} variant='contained'>Generate QR</Button>
      {qr && <>
				<img src={qr} alt="Hi"/>
				<a href={qr} download="qrcode.png">Download</a>
			</>}
    </FormControl>
  );
}
