"use client";
import styles from '../../styles/SelectionCard.module.scss';
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
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import ListingArea from '../../../components/listingpage/listingArea';

const SelectionCard = () => {

    const [defaultDate, setDefaultDate] = useState('');
    const [bilet,setBilet] = useState(false);
    useEffect(()=>{
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setDefaultDate(formattedDate);
    },[]);
    console.log('Rendered with default date=' + defaultDate); // Doğrudan burada yazdırın


    const cities = ['Adana','Adıyaman','Afyon','Ağrı','Aksaray','Amasya','Ankara','Antalya','İzmir','İstanbul'];
    const [tekYon, setTekYon] = useState(true);

    const [departureDate,setDepartureDate] = useState('');
    const [returnDate,setReturnDate] = useState('');
    const [from,setFrom] = useState('');
    const [to,setTo] = useState('');

    const changeEvent = () => {
        setTekYon(tekYon => !tekYon);
    };
    return (
        <div className={styles.divNew}>
          
        <Card className = {styles.card1}>
        <FormControlLabel control={<Checkbox onChange={changeEvent} defaultChecked />} label="Tek yön" />


                <Autocomplete
      disablePortal
      id="from"
      options={cities}
      sx={{ width: '100%' }}
      renderInput={(params) => <TextField {...params} label="Kalkış Havaalanı" 
      onChange ={ (event)=>{setFrom(event.target.value);}}
      />}
    />
             <Autocomplete
      disablePortal
      id="to"
      options={cities}
      sx={{ width: '100%' }}
      onChange ={ (event)=>{
        setTo(event.target.value);
        console.log("setTo="+to);
    }}
      renderInput={(params) => <TextField {...params} label="Varış Havaalanı" />}
    />
            <Stack className ={styles.stack1}>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker 
                id='date1'
                label="Gidiş tarihi" 
                sx ={{width:"45%"}}  
                format='DD/MM/YYYY'
                value={dayjs(`${defaultDate}`)}
                onChange ={ (event)=>{
                    setDepartureDate(event.target.value);
                    console.log("departure date="+departureDate);
                }}
                  />
                {!tekYon &&
                <DatePicker 
                id='returningDate'
                minDate={dayjs(`${defaultDate}`)}
                value={dayjs(`${defaultDate}`)} 
                format='DD/MM/YYYY' 
                label ="Dönüş tarihi" sx ={{width:"45%"}}
                onChange ={ (event)=>{
                    setReturnDate(event.target.value);
                    console.log("return date: " + returnDate);
                }}
                />}
            </LocalizationProvider>
            </Stack>
           
        <Button variant = "contained" className = {styles.buton1}
        onClick={()=>{
            setBilet(bilet => !bilet);
            console.log("deene: "+bilet);
        }} 
        sx={{
            width:'50%'
        }} >BİLET BUL</Button>     
        </Card>
       {bilet && 
       <ListingArea departureDate={departureDate} from={from} to={to}/> 
       }
        </div>

    );
}

export default SelectionCard;