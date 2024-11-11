import React, { useEffect, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { View } from "react-native";
import {
  setOrigin,
  setDestination,
  selectOrigin,
  selectDestination,
  selectInitialValue,
} from "@/slices/navSlice";
import { useDispatch, useSelector } from "react-redux";
interface Props {
  type: "origin" | "destination";
}
export default function Search({ type }: Props) {
  const dispatch = useDispatch();

  const origin = useSelector(selectOrigin);
  const initialValue = useSelector(selectInitialValue);
  const destination = useSelector(selectDestination);
  const [placeholderText, setPlaceholderText] = useState('');
  const [inputValue, setInputValue] = useState(initialValue); 

  useEffect(() => {
    setPlaceholderText(
      initialValue !== "" && type === "origin"
        ? initialValue
        : type === "origin"
        ? "Where from?"
        : "Enter Your Destination?"
    );
  }, [initialValue]);
  return (
    <View className="w-full h-full flex justify-center items-center">
      <GooglePlacesAutocomplete
        placeholder={placeholderText}
        styles={{
          container: {
            position: "absolute",
            top: 0,
            width: "90%",
            zIndex: 1,
          },
          textInput: {
            height: 40,
            fontSize: 18,
            backgroundColor: '#F3F3F3',
            borderRadius: 10,
          },
        }}
        enablePoweredByContainer={false}
        fetchDetails={true}
        minLength={2}
        query={{
          key: "AIzaSyCP8V2_aSwo5DxWeogjhyv-w5rRc5L2UuE",
          language: "en",
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={100}
        onPress={(data, details = null) => {
          if (type === "origin" && details) {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );

            dispatch(setDestination(null));
          } else if (type === "destination" && details) {
            dispatch(
              setDestination({
                location: details.geometry.location,
                description: data.description,
              })
            );
          }
          setInputValue(data.description);
        }}
        textInputProps={{
          value: inputValue,
          onChangeText: setInputValue,
        }}
      />
    </View>
  );
}
