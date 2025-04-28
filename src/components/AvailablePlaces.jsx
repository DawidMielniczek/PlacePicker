import Places from './Places.jsx';
import ErrorPage from './ErrorPage.jsx';
import { useCallback } from 'react';
import {sortPlacesByDistance} from '../loc.js';
import { fetchAvailablePlaces } from '../http.js'; 
import { useFetch } from '../hooks/useFetch.js';

export default function AvailablePlaces({ onSelectPlace }) {

  const fetchSortedPlaces = useCallback(async function fetchSortedPlaces(){
    const places = await fetchAvailablePlaces();

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((positon)=>{
      const sortedPlaces = sortPlacesByDistance(
       places,
        positon.coords.latitude,
         positon.coords.longitude
        );
        resolve(sortedPlaces);
    });
  });
}, []);
  
  const {isFetching, fetchedData: availablePlaces, error} = useFetch(fetchSortedPlaces, []);

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
