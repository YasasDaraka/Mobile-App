import { Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrigin, selectDestination, setTravelTimeInfo } from '@/slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { Icon } from 'react-native-elements';





const MapViewCard = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
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
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=AIzaSyCP8V2_aSwo5DxWeogjhyv-w5rRc5L2UuE`)
        .then(response => response.json())
        .then(data => {
          dispatch(setTravelTimeInfo(data.rows[0].elements[0]));
        });
    };
    
    setTimeout(() => {
      getTravelTime();
    }, 500); 
    
  }, [origin, destination, "AIzaSyCP8V2_aSwo5DxWeogjhyv-w5rRc5L2UuE"]);

  return (
   
    <MapView
      ref={mapRef}
      key={origin?.location?.lat + destination?.location?.lat}
      style={{ width:"100%",height:"100%"}}
      initialRegion={{
        latitude: origin?.location?.lat || 37.78825, 
        longitude: origin?.location?.lng || -122.4324, 
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      showsUserLocation={true} 
      followsUserLocation={true} 
    >
      {origin?.location && (
         <Marker
         coordinate={{
           latitude: origin.location.lat,
           longitude: origin.location.lng,
         }}
         title='Current Location'
         description={origin.description}
         identifier='origin'
       >
        
           <Icon
             name='accessibility'
             type='ionicon'
             color='black'
             size={40}
           />
          
        
       </Marker>
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title='Destination'
          description={destination.description}
          identifier='destination'
        />
      )}

     {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={"AIzaSyCP8V2_aSwo5DxWeogjhyv-w5rRc5L2UuE"}
          strokeWidth={3}
          strokeColor='black'
        />
      )} 
    </MapView>
   
  );
};

export default MapViewCard;
