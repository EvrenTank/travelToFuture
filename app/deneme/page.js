"use client"
import {useState} from 'react';



const Deneme =() => {
     const [input, setInput] = useState('');
     
     const setText = (event) =>{
        setInput(event.target.value);
        console.log(input);
     };

     return (
            <>   
         <input 
         type='text' placeholder="Metin giriniz..." 
        onChange = { (event) => setText(event)} >
            </input>
            <div>{input}</div>
            </>

                );
}

export default Deneme;