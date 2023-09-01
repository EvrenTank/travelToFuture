'use client';
import ListingComponent from "../../components/listingpage/listingComponent";
import ListingArea from "@/components/listingpage/listingArea";
import {Provider} from 'react-redux';
import store from '../../flightoptions/store';


const Page = () => {
    //console.log(searchParams.search);
    return (
    <Provider store={store}>
        <ListingArea></ListingArea>
        </Provider>

    );
};

export default Page;