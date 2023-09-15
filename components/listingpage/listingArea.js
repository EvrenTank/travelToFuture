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
import LoadingAnimation from "../animation/loadingAnimation";

const ListingArea = () => {

  const cities = ["ADANA","ADIYAMAN", "AFYONKARAHISAR", "AGRI", "AMASYA", "ANKARA", "ANTALYA","ARTVIN","AYDIN"];
    const [loading,setLoading] = useState(true);
    const [flights,setFlights] = useState([]);
    const [returnFlights,setReturnFlights] = useState([]);
    const flightoptions = useSelector((state)=>state.flightoptionsReducer);
    const selectRef = useRef(null);
    const dispatch = useDispatch();
    const [isClicked,setIsClicked] = useState(false);
    const [departureDate,setDepartureDate] = useState(flightoptions.departureDate);
    const [returnDate,setReturnDate] = useState(flightoptions.returnDate);
    const [from,setFrom] = useState(flightoptions.from);
    const [to,setTo] = useState(flightoptions.to);

/*  companyName={flight.companyName}
        price={flight.price}
        departureTime={flight.departureTime}
        from={flight.from}
        to={flight.to}*/


    const [gidisBileti,setGidisBileti]=useState({
        departureDate:'',
        companyName:'',
        departureTime:'',
        from:'',
        to:'',
        duration:'',
        price:''   
    });
    const [donusBileti,setDonusBileti]=useState({
      departureDate:'',
      companyName:'',
      departureTime:'',
      from:'',
      to:'',
      duration:'',
      price:''   
  });
  
  const [donusSelected, setDonusSelected] = useState(false);



    const readValues = () => {
      setDepartureDate(flightoptions.departureDate);
      setReturnDate(flightoptions.returnDate);
      setFrom(flightoptions.from);
      setTo(flightoptions.to);
    };
    useEffect(()=>{
      reWrite();
  
    },[])

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
            console.log("loading şu anda true olması gerekiyor"+loading);
            //handle success
            //setFlights(response.data);
            console.log(response.data);
            // Gidiş biletleri
            const appropriateFlights = response.data.filter ((flight) => flight.departureDate == flightoptions.departureDate 
            && flight.to == flightoptions.to && flight.from == flightoptions.from)
            console.log(appropriateFlights);
            console.log(response.data);
            setFlights(appropriateFlights);
            //Dönüş biletleri
            const appropriateFlights2 = response.data.filter ((flight) => flight.departureDate == flightoptions.returnDate 
            && flight.to == flightoptions.from && flight.from == flightoptions.to);
            setReturnFlights(appropriateFlights2);
            console.log("return Flights");
            console.log(appropriateFlights2);

            setTimeout(() =>{setLoading(false);},2000);
            //setLoading(false);
            console.log("loading şu anda false olması gerekiyor"+loading);


        })
        .catch((error) => {
            setLoading(false);
            console.log(error);
        }) 
      };

    const sortByOption = () =>{
        const value=selectRef.current.value;
        console.log(value);
        var sortedFlights = flights;
        var sortedReturnFlights=returnFlights;
        if(value === "Kalkış saati"){
          // direkt flights üzerinden sort yaparsam state değişikliklerini doğru algılayamıyor.
          // bu yüzden [...flights].sort() seklinde yapmak gerekiyor. 
            sortedFlights = [...flights].sort((a,b) => sortBydepartureTime(a,b));
            sortedReturnFlights = [...returnFlights].sort((a,b) => sortBydepartureTime(a,b));
            //console.log("çalışıyor1");
            //console.log("sortedFlights",sortedFlights[0]);
            setFlights(sortedFlights);
            setReturnFlights(sortedReturnFlights);
            

        }
        else if(value === "Uçuş süresi"){
            sortedFlights = [...flights].sort((a,b) => sortByDuration(a,b));
            sortedReturnFlights = [...returnFlights].sort((a,b) => sortByDuration(a,b));

            //console.log("çalışıyor2")
            //console.log("sortedFlights",sortedFlights[0]);
             setFlights(sortedFlights);
             setReturnFlights(sortedReturnFlights);

       }
       else if(value === "Fiyat"){
        sortedFlights = [...flights].sort((a,b) =>sortByPrice(a,b));
        sortedReturnFlights = [...returnFlights].sort((a,b) =>sortByPrice(a,b));
        //console.log("çalışıyor3")
        //console.log("sortedFlights",sortedFlights[0]);
        setFlights(sortedFlights);
        setReturnFlights(sortedReturnFlights);

       }

       setFlights(sortedFlights);
       setReturnFlights(sortedReturnFlights);

    
    }
    // duration ve departureTime'a göre sıralamak için bu kullanılacak.
    const sortBydepartureTime = (object1,object2) => {
        const [hour1, minute1] = object1.departureTime.split(":").map(Number);
        const [hour2, minute2] = object2.departureTime.split(":").map(Number);
      
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

    const sortByDuration = (object1,object2) => {
        const [hour1, minute1] = object1.duration.split(":").map(Number);
        const [hour2, minute2] = object2.duration.split(":").map(Number);
      
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

    const sortByPrice = (object1, object2) =>{
        const [fiyat1,] = object1.price.split(" ");
        const [fiyat2,] = object2.price.split(" ");
        if(parseFloat(fiyat1)  < parseFloat(fiyat2)) {
            return -1;
        }
        else 
        {return 1}
    }
    
    return (
        <div className={styles.mainDiv}>
         {loading ? <div className={styles.loadingDiv}>
          <div className={styles.centerDiv}>
            <LoadingAnimation/>
          </div>
          </div>
         :
         <>
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
      renderInput={(params) => <TextField {...params} label="Varış Havaalanı" 
      />}
    />
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker 
                className={styles.departuredate}
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
                <DatePicker 
                className={styles.returndate}
                id='returnDate'
                label="Dönüş tarihi" 
                disablePast
                sx ={{width:"40%"}}  
                value={returnDate}
                format='DD/MM/YYYY'
                onChange={(date)=>{
                    setReturnDate(date);
                    console.log("return date onchange kısmı:"+ returnDate);    
                }}
                  />

            </LocalizationProvider>
            <button className={styles.searchButton} onClick={reWrite} >
              <p>YENİDEN ARA</p><img className={styles.searchIcon}  src={'/searchicon.png'}>
                </img></button>


        </div>
        </div>
        { 
        isClicked &&
         <ListingComponent
        departureDate={gidisBileti.departureDate}
        companyName={gidisBileti.companyName}
        price={gidisBileti.price}
        departureTime={gidisBileti.departureTime}
        from={gidisBileti.from}
        to={gidisBileti.to}
        duration={gidisBileti.duration}
        />
        }

        { 
        (isClicked && donusSelected) && 
        <ListingComponent
        departureDate={donusBileti.departureDate}
        companyName={donusBileti.companyName}
        price={donusBileti.price}
        departureTime={donusBileti.departureTime}
        from={donusBileti.from}
        to={donusBileti.to}
        duration={donusBileti.duration}
        />}

{!isClicked ? <div  className={styles.flightList} >
  <h1>GİDİŞ BİLETLERİ</h1>
    { 
        flights.map((flight,index)=>
        {   
        return (
        <ListingComponent key={index}
        departureDate={flight.departureDate}
        companyName={flight.companyName}
        price={flight.price}
        departureTime={flight.departureTime}
        from={flight.from}
        to={flight.to}
        duration={flight.duration}
        onClick = {()=>{
          setIsClicked(isClicked=>!isClicked);
          setGidisBileti({
            ...gidisBileti,
            departureDate:flight.departureDate,
            companyName:flight.companyName,
            departureTime:flight.departureTime,
            from:flight.from,
            to:flight.to,
            duration:flight.duration,
            price:flight.price   

          });
        }}
        />
        )})
    }

</div>
:
<div className={styles.flightList}>

<h1>DÖNÜŞ BİLETLERİ</h1>
<button className={styles.backButton}
onClick={()=>{
  setIsClicked(isClicked => !isClicked);
  setDonusSelected(false);
  }}
>
  <img src='/backArrow.png'></img>
  <p>GİDİŞ BİLETLERİNE DÖN</p>
</button>
    { 
        returnFlights.map((flight,index)=>
        {   
        return (
        <ListingComponent key={index}
        departureDate={flight.departureDate}
        companyName={flight.companyName}
        price={flight.price}
        departureTime={flight.departureTime}
        from={flight.from}
        to={flight.to}
        duration={flight.duration}
        onClick = {()=>{
          setDonusSelected(true);
          setDonusBileti({
            ...donusBileti,
            departureDate:flight.departureDate,
            companyName:flight.companyName,
            departureTime:flight.departureTime,
            from:flight.from,
            to:flight.to,
            duration:flight.duration,
            price:flight.price   

          })


        }}
        />
        )})
    }

</div>
}
         </>} 
        
</div>

    );
}

export default ListingArea;