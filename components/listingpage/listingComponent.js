"use client";
import styles from '../../styles/listingpage/ListingComponent.module.scss'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from "axios";

const ListingComponent = ({companyName,price,departureTime,from,to,duration}) => {

    const companyNameUpperCase = companyName.toUpperCase();
    const [landing,setLanding] = useState('');

    const landingTime = (departureTime, duration)=>{
// time'lar string olarak geliyor.
    const dep = departureTime.split(':');
    const lan = duration.split(':');
    const depHour = parseInt(dep[0]);
    const depMin = parseInt(dep[1]);
    const durationHour = parseInt(lan[0]);
    const durationMin = parseInt(lan[1]);
    var min=0; 
    var hour=0;

    min= (depMin+durationMin) %  60;
    hour = (depHour+durationHour) + Math.floor((depMin+durationMin)/60) ;
    setLanding(hour + ":" + min);
    }
    useEffect(()=>{landingTime(departureTime,duration)},[])

    return (
        <div className={styles.mainDiv} >
            <div className ={styles.companynameDiv}>
                <Image
                className={styles.image1} 
                width={200}
                height={200}
                alt={`${companyNameUpperCase}`} 
                src = {`/companyImages/${companyName}.png`} // direkt public klasoru icinden yol tanimi baslamali 
                title={`${companyNameUpperCase}`} 
                />
            </div>
            <div className={styles.durationDiv}>
                <div className ={styles.subdiv1}>
                    <span  >{departureTime}</span>
                    <span >{from}</span>
                </div>
                <div className ={styles.subdiv2}>
                    <Image 
                    className={styles.image2}
                    width={200}
                    height={200}
                    src ='/arrow-right3.png'/>
                    <span className={styles.span1}>{duration}</span>
                </div>
                <div className ={styles.subdiv3}>
                    <span>{landing}</span>
                    <span>{to}</span>
                </div>
               
            </div>
            <div className={styles.priceDiv}>
                <span >{price}</span>
            </div>

        </div>

    );
}

export default ListingComponent;