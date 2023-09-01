"use client"
import ListingComponent from "./listingComponent";
import axios from 'axios';
import styles from '../../styles/listingpage/ListingArea.module.scss'
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from 'react-redux';
import {read,rewrite } from '../../flightoptions/slice.js';


const ListingArea = ({departureDate,from,to}) => {

    const [flights,setFlights] = useState([]);
    const flightoptions = useSelector((state)=>state.flightoptionsReducer)
    useEffect(()=>{
    console.log("ListingArea useEffect başı");
    console.log("departure Date:"+flightoptions.departureDate);     
    console.log("return Date:"+flightoptions.returnDate);     
    console.log("from:"+flightoptions.from);     
    console.log("to:"+flightoptions.to);     
    console.log("ListingArea useEffect sonu");
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
        })
        .catch((error) => {
            console.log(error);
        })
 
      };


    return (
<div className={styles.div11} onClick={readData}

>
    {
        flights.map((flight,index)=>{
        <ListingComponent key={index}
        companyName={flight.companyName}
        price={flight.price}
        departureTime={flight.departureTime}
        landingTime={flight.landingTime}
        from={flight.from}
        to={flight.to}
        />
        })
    }

</div>

    );
}

export default ListingArea;