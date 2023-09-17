import styles from '../../../styles/listingpage/Return.module.scss'
import ListingComponent from '../listingComponent';


const Return = ({returnFlights, isClicked, setIsClicked, donusBileti, setDonusBileti, setDonusSelected,}) =>{
return (
<> 
  <div className={styles.baslikDiv}>
<h1 className={styles.ticketH}>DÖNÜŞ BİLETLERİ</h1>
<button className={styles.backButton}
onClick={()=>{
  setIsClicked(isClicked => !isClicked);
  setDonusSelected(false);
  }}
>
  <img src='/backArrow.png'></img>
  <p>GİDİŞ BİLETLERİNE DÖN</p>
</button></div>
<div className={styles.flightList}>

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
</>
);
}

export default Return;