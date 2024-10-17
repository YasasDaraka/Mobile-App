import { Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrigin, selectDestination, setTravelTimeInfo } from '@/slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { Icon } from 'react-native-elements';
import { GOOGLE_MAP_KEY } from '@env';




const MapViewCard = () => {
  const origin:any = useSelector(selectOrigin);
  const destination:any = useSelector(selectDestination);
  const mapRef = useRef<MapView | null>(null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!origin?.location || !destination?.location) return;

    setTimeout(() => {
      mapRef.current?.fitToSuppliedMarkers(["origin", "destination"], {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
        animated: true,
      });
    }, 500); 
    
  }, [origin, destination]);

  useEffect(() => {
    if (!origin?.location || !destination?.location) return;

    const getTravelTime = async () => {
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAP_KEY}`)
        .then(response => response.json())
        .then(data => {
          dispatch(setTravelTimeInfo(data.rows[0].elements[0]));
        });
    };
    
    setTimeout(() => {
      getTravelTime();
    }, 500); 
    
  }, [origin, destination, GOOGLE_MAP_KEY]);

  return (
    <MapView
      ref={mapRef}
      style={{ flex: 1, height: 400 }}
      initialRegion={{
        latitude: origin?.location?.lat || 37.78825, 
        longitude: origin?.location?.lng || -122.4324, 
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      showsUserLocation={true} 
      followsUserLocation={true} 
    >
    
    </MapView>
  );
};

export default MapViewCard;
