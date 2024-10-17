import { GoogleMap, DirectionsRenderer, LoadScript } from '@react-google-maps/api';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


const MapComponent = ({ pickupLocation, dropoffLocation }:any) => {
   
    const [directions, setDirections] = useState(null);

    useEffect(() => {
        const calculateRoute = async () => {
            const directionsService = new window.google.maps.DirectionsService();
            const result:any = await directionsService.route({
                origin: pickupLocation,
                destination: dropoffLocation,
                travelMode: window.google.maps.TravelMode.DRIVING
            });
            setDirections(result);
        };

        calculateRoute();
    }, [pickupLocation, dropoffLocation]);

    return (
        <MapView
       className='w-full h-1/2'
        initialRegion={{
            latitude: (pickupLocation.latitude + dropoffLocation.latitude) / 2,
            longitude: (pickupLocation.longitude + dropoffLocation.longitude) / 2,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
    >
        <Marker coordinate={pickupLocation} title="Pickup Location" />
        <Marker coordinate={dropoffLocation} title="Dropoff Location" />
    </MapView>
    );
};

export default MapComponent;
