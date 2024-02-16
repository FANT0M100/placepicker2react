import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availapblePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsFetching(true);

      try {
        const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();

        if (!response.ok) {
          throw new Error("failed to fetch plasec!");
        }

        setAvailablePlaces(resData.places);
      } catch (error) {
        setError({ message: error.message || "Could not fetch places..." });
      }

      setIsFetching(false);
    };

    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An errror occured" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availapblePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
