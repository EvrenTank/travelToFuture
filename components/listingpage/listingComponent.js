"use client";
import styles from '../../styles/listingpage/ListingComponent.module.scss'
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import axios from "axios";

const ListingComponent = ({departureDate,companyName,price,departureTime,from,to,duration,onClick}) => {

    const companyNameUpperCase = companyName.toUpperCase();
    const [landing,setLanding] = useState('');
    const spanRef = useRef(null);

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
    var ertesiGun='';

    min= (depMin+durationMin) %  60;
    hour = (depHour+durationHour) + Math.floor((depMin+durationMin)/60) ;
    if (hour > 24){
        hour = hour%24;
        ertesiGun = "(E.G.) ";
        spanRef.current.setAttribute("title",`Ertesi Gün ${hour.toString().padStart(2,0) + ":" + min.toString().padStart(2,0)}`)
    }
    setLanding(ertesiGun+hour.toString().padStart(2,0) + ":" + min.toString().padStart(2,0));
    }
    useEffect(()=>{landingTime(departureTime,duration)},[companyName,departureDate,price])

    return (
        <div className={styles.mainDiv} onClick={onClick}>
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
                    <span className={styles.span1}>{duration}</span>
                    <Image 
                    className={styles.image2}
                    width={200}
                    height={200}
                    src ='/arrow-right3.png'/>
                    <span className={styles.span2}>{departureDate}</span>
                </div>
                <div className ={styles.subdiv3}>
                    <span ref={spanRef}>{landing}</span>
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