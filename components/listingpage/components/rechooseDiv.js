import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import styles from '../../../styles/listingpage/RechooseDiv.module.scss'

const RechooseDiv =({
    changeEvent,
    tekYon,
    sortByOption,
    selectRef,
    cities,
    to,
    setTo,
    from,
    setFrom,
    departureDate,
    returnDate,
    setDepartureDate,
    setReturnDate,
    reWrite
})=>{
return (
<div className={styles.rechooseDiv}>
        <div className={styles.leftDiv}>
        <select className={styles.selectList} ref={selectRef} onChange={sortByOption} >
         <option value="Kalkış saati">Kalkış saati</option>
         <option value="Uçuş süresi">Uçuş süresi</option>
         <option value="Fiyat"> Fiyat</option>
        </select>
        </div>
        <div className={styles.middleDiv}>
          <div className={styles.switchDiv}>
      <FormControlLabel control={<Checkbox   onChange={changeEvent} checked={tekYon} />} label="Tek yön" />

          </div>
          <div className={styles.destinationDiv}>
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
          </div>
   <div className={styles.dateDiv}>
    
   <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker 
                className={styles.departuredate}
                id='departureDate'
                label="Gidiş tarihi" 
                //disablePast
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
                //disablePast
                disabled = {tekYon}
                sx ={{width:"40%"}}  
                value={returnDate}
                format='DD/MM/YYYY'
                onChange={(date)=>{
                    setReturnDate(date);
                    console.log("return date onchange kısmı:"+ returnDate);    
                }}
                  />

            </LocalizationProvider>
   </div>

        </div>
        <div className={styles.rightDiv} >
           <button className={styles.searchButton} onClick={reWrite} >
              <p>YENİDEN ARA</p><img className={styles.searchIcon}  src={'/searchicon.png'}>
                </img></button>
        </div>
        </div>
);
}

export default RechooseDiv;