import Places from './Places.jsx';
import { useState, useEffect } from 'react';
import ErrorPage from './ErrorPage.jsx';
import {sortPlacesByDistance} from '../loc.js';
import { fetchAvailablePlaces } from '../http.js'; 

export default function AvailablePlaces({ onSelectPlace }) {

  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

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

  if (error){
    return <ErrorPage title="An error occurred!" message={error.message} />
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading = {isFetching}
      loadingText = "Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
