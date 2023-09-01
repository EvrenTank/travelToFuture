"use client"
import {useState,useRef} from 'react';
import TextField  from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';



const Deneme =() => {
     const [input, setInput] = useState('');
     const ref = useRef(null);
     const[value,setValue] = useState(dayjs('2023-08-29'));
     
     const setText = (event) =>{
        //setInput(event.target.value);
        console.log(event.target);        
        console.log("value:"+value);        
     };

     
     return (
            <>   
         <input 
         type='text' placeholder="Metin giriniz..." 
        onChange = { (event) => setText(event)} >
            </input>
            <div>{input}</div>
            <TextField onChange = { (event) => setText(event)}></TextField>
            <div>{input}</div>
            <Autocomplete
      disablePortal
      options={['1','2','3','4','5','6','7']}
      sx={{ width: '100%' }}
      onChange = { (event) => setText(event)}
      renderInput={(params) => <TextField {...params} label="Varış Havaalanı" />}
    />
                <LocalizationProvider dateAdapter={AdapterDayjs} >
     <DatePicker 
                id='departureDate'
                label="Gidiş tarihi" 
                value={value}
                onChange = {(newValue) => setValue(newValue)}
                sx ={{width:"45%"}}  
                format='DD/MM/YYYY'
                
                  />
                  </LocalizationProvider>
            </>

                );
}

export default Deneme;