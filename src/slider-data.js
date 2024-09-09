import { useEffect, useState } from 'react';

// Custom hook to fetch and return sliderData
export const useSliderData = () => {
  const [sliderData, setSliderData] = useState([]);

  const getAllActiveEvents = async () => {
    try {
      let allActiveEventsResponse = await fetch('http://localhost:5000/api/events/activeevents', {
        method: 'GET'
      });

      let json = await allActiveEventsResponse.json();
      setSliderData(json.data);  // Update the state with the fetched data

      console.log("All active elements are", json.data);

    } catch (error) {
      console.error("Failed to fetch active events:", error);
    }
  };

  useEffect(() => {
    getAllActiveEvents();
  }, []);  // The empty dependency array ensures this runs once on mount

  return sliderData;  // Return the fetched data
};
