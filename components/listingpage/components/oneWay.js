import styles from '../../../styles/listingpage/OneWay.module.scss'
import ListingComponent from '../listingComponent';

const OneWay = ({flights,isClicked,setIsClicked,gidisBileti,setGidisBileti}) => {

    return (
<>
<div className={styles.baslikDiv}>
  <h1 className={styles.ticketH}>GİDİŞ BİLETLERİ</h1>
  </div>
<div  className={styles.flightList} > 
{
  flights.length == 0 ? 
  <h1> 
    Seçimlere uygun uçuş bulunamamıştır. Lütfen 15 Eylül - 30 Eylül arasında bir gün seçin.
    </h1>:
  (
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
  )

}
  
</div></>
    );

}
export default OneWay;