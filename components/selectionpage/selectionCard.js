"use client";
import styles from '../../styles/selectionpage/SelectionCard.module.scss';
import Card from '@mui/material/Card';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import { useDispatch,useSelector } from 'react-redux';
import {read,rewrite } from '../../flightoptions/slice.js';
import Link from 'next/link';

const SelectionCard = () => {

    const flightoptions = useSelector((state)=>state.flightoptionsReducer)
    const dispatch = useDispatch()

    const cities = ["ADANA","ADIYAMAN", "AFYONKARAHISAR", "AGRI", "AMASYA", "ANKARA", "ANTALYA","ARTVIN","AYDIN"];
    const [tekYon, setTekYon] = useState(true);

    const [departureDate,setDepartureDate] = useState(null);
    const [returnDate,setReturnDate] = useState(null);
    const [from,setFrom] = useState(cities[0]);
    const [to,setTo] = useState(cities[1]);

    const changeEvent = () => {
        setTekYon(tekYon => !tekYon);
    };

    
    return (
          
      <Card className = {styles.card1}>
      <FormControlLabel control={<Checkbox onChange={changeEvent} defaultChecked />} label="Tek yön" />
      <Autocomplete
      disablePortal
      id="from"
      value ={from}
      onChange = {(event,newValue) =>{
        setFrom(newValue);
        //console.log("from="+from);
      }}
      options={cities}
      sx={{ width: '100%' }}
      renderInput={(params) => <TextField {...params} label="Kalkış Havaalanı" 
      />}
    />
             <Autocomplete
      disablePortal
      id="to"
      options={cities}
      value ={to}
      sx={{ width: '100%' }}
      onChange = {(event,newValue) =>{
        setTo(newValue);
        //console.log("to="+to);
      }}
      renderInput={(params) => <TextField {...params} label="Varış Havaalanı" />}
    />
            <Stack className ={styles.stack1}>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker 
                id='departureDate'
                label="Gidiş tarihi" 
                disablePast
                sx ={{width:"45%"}}  
                format='DD/MM/YYYY'
                value={departureDate}
                onChange={(date)=>{
                    setDepartureDate(date);
                    //console.log("departure date:"+ departureDate);    
                }}
                  />
                {!tekYon &&
                <DatePicker 
                id='returningDate'
                disablePast
                value={returnDate}
                format='DD/MM/YYYY' 
                label ="Dönüş tarihi" sx ={{width:"45%"}}
                onChange={(date)=>{
                    setReturnDate(date);
                    //console.log("returndate:"+returnDate);
                }}
                />}
            </LocalizationProvider>
            </Stack>
        <Link href='/listingpage'>
        <Button variant = "contained" className = {styles.buton1}
        onClick={()=>{
            const readableDate1 = new Date(departureDate).toLocaleDateString(); // Dönüştürülen tarih
            const readableDate2 = new Date(returnDate).toLocaleDateString(); // Dönüştürülen tarih
            dispatch(rewrite({departureDate:departureDate,returnDate:readableDate2,
            from:from,to:to}));
            //console.log("flight options:"+flightoptions.departureDate);
        }} 
        sx={{
            width:'50%'
        }} >BİLET BUL</Button> 
        </Link>
        </Card>
    );
}

export default SelectionCard;