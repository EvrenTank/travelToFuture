import ListingComponent from "../../components/listingpage/listingComponent";




const Page = () => {
    return (
        <ListingComponent 
        companyName='company4'
        price='250 TL'
        departureTime='9:30'
        landingTime='12:50'
        from='İzmir'
        to='Niğde'
          ></ListingComponent>
    );
};

export default Page;