"use client"
import ListingComponent from "./listingComponent";
import axios from 'axios';
import styles from '../../styles/listingpage/ListingArea.module.scss'
import { useEffect, useRef, useState } from "react";
import { useDispatch,useSelector } from 'react-redux';
import {read,rewrite } from '../../flightoptions/slice.js';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const ListingArea = () => {

  const cities = ["ADANA","ADIYAMAN", "AFYONKARAHISAR", "AGRI", "AMASYA", "ANKARA", "ANTALYA","ARTVIN","AYDIN"];

    const [flights,setFlights] = useState([]);
    const flightoptions = useSelector((state)=>state.flightoptionsReducer);
    const selectRef = useRef(null);
    const dispatch = useDispatch();

    const [departureDate,setDepartureDate] = useState(flightoptions.departureDate);
    const [returnDate,setReturnDate] = useState(flightoptions.returnDate);
    const [from,setFrom] = useState(flightoptions.from);
    const [to,setTo] = useState(flightoptions.to);

    const readValues = () => {
      setDepartureDate(flightoptions.departureDate);
      setReturnDate(flightoptions.returnDate);
      setFrom(flightoptions.from);
      setTo(flightoptions.to);
    };

    useEffect(()=>{
    readData();
    // değerlerin düzgün şekilde güncellenmesi için aşağıdaki dependency'leri girmem grekti.
},[flightoptions.departureDate,flightoptions.returnDate,flightoptions.from,flightoptions.to])
    
    const reWrite = ()=>{
      console.log('departureDate'+departureDate);

        const readableDate1 = new Date(departureDate).toLocaleDateString(); // Dönüştürülen tarih
        const readableDate2 = new Date(returnDate).toLocaleDateString(); // Dönüştürülen tarih
        console.log('readableDate1'+readableDate1);

        dispatch(rewrite({departureDate:readableDate1,returnDate:readableDate2,
        from:from,to:to}));
       
   
}

    const readData = () => {
        console.log("use Effect flightoptions.departureDate===="+flightoptions.departureDate);
        console.log("use Effect flightoptions.returnDate===="+flightoptions.returnDate);
        console.log("use Effect flightoptions.from===="+flightoptions.from);
        console.log("use Effect flightoptions.to===="+flightoptions.to);
        axios.get("http://localhost:5000/flights/")
        .then((response)=>{
            //handle success
            //setFlights(response.data);
            console.log(response.data);

            const appropriateFlights = response.data.filter ((flight) => flight.departureDate == flightoptions.departureDate 
            && flight.to == flightoptions.to && flight.from == flightoptions.from)
            console.log(appropriateFlights);
            setFlights(appropriateFlights);
        })
        .catch((error) => {
            console.log(error);
        }) 
      };

    const sortByOption = () =>{
        const value=selectRef.current.value;
        console.log(value);
        var sortedFlights = flights;
        if(value === "Kalkış saati"){
          // direkt flights üzerinden sort yaparsam state değişikliklerini doğru algılayamıyor.
          // bu yüzden [...flights].sort() seklinde yapmak gerekiyor. 
            sortedFlights = [...flights].sort((a,b) => sortBydepartureTime(a,b));
            //console.log("çalışıyor1");
            //console.log("sortedFlights",sortedFlights[0]);
            setFlights(sortedFlights);
        }
        else if(value === "Uçuş süresi"){
            sortedFlights = [...flights].sort((a,b) => sortByDuration(a,b));
            //console.log("çalışıyor2")
            //console.log("sortedFlights",sortedFlights[0]);
             setFlights(sortedFlights);
       }
       else if(value === "Fiyat"){
        sortedFlights = [...flights].sort((a,b) =>sortByPrice(a,b));
        //console.log("çalışıyor3")
        //console.log("sortedFlights",sortedFlights[0]);
        setFlights(sortedFlights);
       }

       setFlights(sortedFlights);
    
    }
    // duration ve departureTime'a göre sıralamak için bu kullanılacak.
    const sortBydepartureTime = (time1,time2) => {
        const [hour1, minute1] = time1.departureTime.split(":").map(Number);
        const [hour2, minute2] = time2.departureTime.split(":").map(Number);
      
        if (hour1 < hour2) {
          return -1;
        } else if (hour1 > hour2) {
          return 1;
        } else {
          // Saatler eşitse dakikaları karşılaştır
          if (minute1 < minute2) {
            return -1;
          } else if (minute1 > minute2) {
            return 1;
          } else {
            return 0; // Saat ve dakika eşitse
          }
        }
    } 

    const sortByDuration = (time1,time2) => {
        const [hour1, minute1] = time1.duration.split(":").map(Number);
        const [hour2, minute2] = time2.duration.split(":").map(Number);
      
        if (hour1 < hour2) {
          return -1;
        } else if (hour1 > hour2) {
          return 1;
        } else {
          // Saatler eşitse dakikaları karşılaştır
          if (minute1 < minute2) {
            return -1;
          } else if (minute1 > minute2) {
            return 1;
          } else {
            return 0; // Saat ve dakika eşitse
          }
        }
    } 

    const sortByPrice = (price1, price2) =>{
        const [fiyat1,] = price1.price.split(" ");
        const [fiyat2,] = price2.price.split(" ");
        if(parseFloat(fiyat1)  < parseFloat(fiyat2)) {
            return -1;
        }
        else 
        {return 1}
    }
    
    return (
        <div className={styles.mainDiv}>       
        <div className={styles.filterDiv}>
        <div className={styles.selectDiv}>
        <select className={styles.selectList} ref={selectRef} onChange={sortByOption} >
         <option value="Kalkış saati">Kalkış saati</option>
         <option value="Uçuş süresi">Uçuş süresi</option>
         <option value="Fiyat"> Fiyat</option>
        </select>
        </div>
        <div className={styles.optionsDiv}>
          
        <Autocomplete
      disablePortal
      className={styles.from}
      options={cities}
      value ={from}
      onChange = {(event,newValue) =>{
        setFrom(newValue);
        console.log("from:"+from);
      }}
      renderInput={(params) => <TextField {...params} label="Kalkış Havaalanı" 
      />}
    />
            <Autocomplete
      disablePortal
      className={styles.to}
      value ={to}
      onChange = {(event,newValue) =>{
        setTo(newValue);
      }}
      options={cities}
      sx={{ width: '100%' }}
      renderInput={(params) => <TextField {...params} label="Varış Havaalanı" 
      />}
    />
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker 
                id='departureDate'
                label="Gidiş tarihi" 
                disablePast
                sx ={{width:"40%"}}  
                value={departureDate}
                format='DD/MM/YYYY'
                onChange={(date)=>{
                    setDepartureDate(date);
                    console.log("departure date onchange kısmı:"+ departureDate);    
                }}
                  />

            </LocalizationProvider>
            <button  onClick={reWrite} >BUL</button>


        </div>
        </div>
<div  className={styles.div11} >
    { 
        flights.map((flight,index)=>
        {   
        return (
        <ListingComponent key={index}
        companyName={flight.companyName}
        price={flight.price}
        departureTime={flight.departureTime}
        from={flight.from}
        to={flight.to}
        duration={flight.duration}
        />
        )})
    }

</div>
</div>

    );
}

export default ListingArea;