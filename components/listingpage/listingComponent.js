"use client";
import styles from '../../styles/listingpage/ListingComponent.module.scss'
import Image from 'next/image';
import axios from "axios";

const ListingComponent = ({companyName,price,departureTime,landingTime,from,to}) => {




    const companyNameUpperCase = companyName.toUpperCase();
    const flightDuration = (departureTime, landingTime)=>{
// time'lar string olarak geliyor.
    const dep = departureTime.split(':');
    const lan = landingTime.split(':');
    const depHour = parseInt(dep[0]);
    const depMin = parseInt(dep[1]);
    const lanHour = parseInt(lan[0]);
    const lanMin = parseInt(lan[1]);
    var min=0; 
    var hour=0;
    if ( lanMin => depMin){
        min = lanMin-depMin;
        hour = lanHour - depHour;
    }
    else{
        min = (lanMin+60)-depMin;
        hour = (lanHour-1) - depHour;
    }
    return "("+hour + " hr " + min +" min)";
    }

    return (
        <div className={styles.mainDiv} >
            <div className ={styles.companynameDiv}>
                <Image
                className={styles.image1} 
                width={200}
                height={200}
                alt={`${companyNameUpperCase}`} 
                src = {`/companyImages/${companyName}.png`} // direkt public dklasoru icinden yol tanimi baslamali 
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
                    <span className={styles.span1}>{flightDuration(departureTime,landingTime)}</span>
                </div>
                <div className ={styles.subdiv3}>
                    <span>{landingTime}</span>
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