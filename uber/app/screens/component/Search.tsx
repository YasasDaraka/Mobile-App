import React from 'react'
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAP_KEY } from "@env";
import { View } from 'react-native';
interface Props {
    type: 'origin' | 'destination';
    placeholder: string;
  }
export default function Search({ type, placeholder }: Props) {

  return (
    <View className='w-full h-full flex justify-center items-center'>  
    <GooglePlacesAutocomplete
              placeholder={placeholder}
              styles={{
                container: {
                  position: "absolute",
                  top: 0, 
                  width: "90%", 
                  zIndex: 1,
                },
                textInput: {
                  fontSize: 18,
                },
              }}
              enablePoweredByContainer={false}
              fetchDetails={true}
              minLength={2}
              query={{
                key: GOOGLE_MAP_KEY,
                language: "en",
              }}
              nearbyPlacesAPI="GooglePlacesSearch"
              debounce={100}
            />
            </View>
  )
}
