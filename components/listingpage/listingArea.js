"use client"
import ListingComponent from "./listingComponent";
import axios from 'axios';
import styles from '../../styles/listingpage/ListingArea.module.scss'
import { useEffect, useRef, useState } from "react";
import { useDispatch,useSelector } from 'react-redux';
import {read,rewrite } from '../../flightoptions/slice.js';


const ListingArea = ({departureDate,from,to}) => {

    const [flights,setFlights] = useState([]);
    const [key,setKey] = useState(0);
    const flightoptions = useSelector((state)=>state.flightoptionsReducer);
    const selectRef = useRef(null);
    useEffect(()=>{
    console.log("ListingArea useEffect başı");
    console.log("departure Date:"+flightoptions.departureDate);     
    console.log("return Date:"+flightoptions.returnDate);     
    console.log("from:"+flightoptions.from);     
    console.log("to:"+flightoptions.to);     
    console.log("ListingArea useEffect sonu");
    readData();
},[])
    const deneme = () =>{
        console.log("Evren TANIK my boys")
    };

    const readData = () => {
        console.log("deneme yapıyorum");
        axios.get("http://localhost:5000/flights/")
        .then((response)=>{
            //handle success
            setFlights(response.data);
            console.log(response.data);

            const appropriateFlights = response.data.filter ((flight) => flight.departureDate == flightoptions.departureDate 
            && flight.to == flightoptions.to && flight.from == flightoptions.from)
            console.log(appropriateFlights);
            setFlights(appropriateFlights);
            console.log(flights); 
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
            console.log("çalışıyor1");
            console.log("sortedFlights",sortedFlights[0]);
            setFlights(sortedFlights);
        }
        else if(value === "Uçuş süresi"){
            sortedFlights = [...flights].sort((a,b) => sortByDuration(a,b));
            console.log("çalışıyor2")
            console.log("sortedFlights",sortedFlights[0]);
             setFlights(sortedFlights);

       }
       else if(value === "Fiyat"){
        sortedFlights = [...flights].sort((a,b) =>sortByPrice(a,b));
        console.log("çalışıyor3")
        console.log("sortedFlights",sortedFlights[0]);
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
         <option value="Uçuş süresi">Uçuş uzunluğu</option>
         <option value="Fiyat"> Fiyat</option>
        </select>
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