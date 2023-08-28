"use client"
import ListingComponent from "./listingComponent";
import axios from 'axios';
import styles from '../../styles/listingpage/ListingArea.module.scss'
import { useEffect, useState } from "react";

const ListingArea = ({departureDate,from,to}) => {

    const [flights,setFlights] = useState([]);
    useEffect(()=>{readData();},[])

    const readData = () => {
        axios.get("http://localhost:5000/flights/")
        .then((response)=>{
            //handle success
            setFlights(response.data);
            console.log(response.data);

            const appropriateFlights = response.data.filter ((flight) => flight.departureDate == departureDate 
            && flight.to == to && flight.from == from)
            console.log(appropriateFlights);
            setFlights(appropriateFlights);
        })
        .catch((error) => {
            console.log(error);
        })
 
      };


    return (
<div className={styles.div11}>
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