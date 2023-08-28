import Image from 'next/image';
import MyHeader from './components/myHeader';
import SelectionCard from './components/selection/selectionCard';
import ListingArea from '../components/listingpage/listingArea'

export default function Home() {
  return (
   <>
   <MyHeader/>
   <SelectionCard/>
   <ListingArea/>
   </>
  )
}
