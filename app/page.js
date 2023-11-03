'use client';
import MyHeader from '../components/header/myHeader';
import SelectionCard from '../components/selectionpage/selectionCard';
import {Provider} from 'react-redux';
import store from '../flightoptions/store';
import { useState } from 'react';

export default function Home() {

  const [isClicked,setIsClicked] = useState(false);

  return (
   <Provider store={store}>
    <MyHeader isClicked={isClicked} setIsClicked={setIsClicked}/>
    <SelectionCard isClicked={isClicked} setIsClicked={setIsClicked}/>
   </Provider>
  )
}
