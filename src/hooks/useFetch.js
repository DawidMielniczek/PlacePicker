import { useEffect } from "react";

function useFetch(){
    useEffect(()=> {
    
              async function fetchPlace() {
              setIsFetching(true);
              
            try{
               const places = await fetchAvailablePlaces();
    
                navigator.geolocation.getCurrentPosition((positon)=>{
                
                const sortedPlaces = sortPlacesByDistance(
                  
                  places, positon.coords.latitude, positon.coords.longitude);
                setAvailablePlaces(sortedPlaces);
                setIsFetching(false);
    
              }); 
    
          } catch(error){
            setError({
              message:
                  error.message || 'Could not fetch places, please try again later..'
            });
            setIsFetching(false);
          }
        }
    
        fetchPlace();
      },[])
}