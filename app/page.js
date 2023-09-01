'use client';
import MyHeader from '../components/header/myHeader';
import SelectionCard from '../components/selectionpage/selectionCard';
import {Provider} from 'react-redux';
import store from '../flightoptions/store';

export default function Home() {
  return (
   <Provider store={store}>
   <MyHeader/>
   <SelectionCard/>
   </Provider>
  )
}
