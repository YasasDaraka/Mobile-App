import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  Text
} from "react-native";
import Search from "../component/Search";
import MapViewCard from "../component/MapViewCard";
import { Headline } from "react-native-paper";
import { useRouter } from "expo-router";
import RideOptions from "../component/RideOptions";
import { selectDestination, selectIsRideOptions, selectOrigin, setDestination, setIsRideOptions, setOrigin } from "@/slices/navSlice";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from 'react-native-elements';

export default function Pickup() {
  const dispatch = useDispatch();  
  const isRideOptions = useSelector(selectIsRideOptions);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const [isEnable,setIsEnable] = useState(false)
  const router = useRouter();

  useEffect(()=>{
    if(origin && destination){
        setIsEnable(true);
    }else{
      setIsEnable(false);
    }
  },[origin,destination])
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="#222222" />

        <View className="w-full h-full ">
          <View className="h-[55%] w-full flex justify-center items-center z-[-1] ">
            <MapViewCard />
          </View>

          <View className="h-[45%] flex justify-start items-center mt-2 z-2">
            {isRideOptions ? (
              <RideOptions />
            ) : (
              <View className="h-full w-full flex justify-start items-center rounded-3xl">

            <View className="w-full flex-row justify-center items-start">
            <TouchableOpacity 
                className='absolute left-5 p-1 z-50 rounded-full bg-[#F3F3F3]'
                onPress={() => {dispatch(setOrigin("")); dispatch(setDestination("")); router.push('../common/MainView')} }
            >
            <Icon name="chevron-left" type='fontawesome' />
          </TouchableOpacity>
                <Headline className="font-extrabold text-xl mb-3">
                  Plan Your Ride
                </Headline>
                  </View>

                <View className="h-[12vw] w-full  z-[2]">
                  <Search type="origin" />
                </View>
                <View className="h-[12vw] w-full z-[1]">
                  <Search type="destination" />
                </View>

                <TouchableOpacity
                  className={`flex-row items-center justify-center w-[90%] h-[6vh] ${!isEnable && 'opacity-50'} absolute bottom-[4vh] bg-black rounded-lg`}
                  onPress={() => {
                    dispatch(setIsRideOptions(true))
                  }}
                  disabled={!isEnable}
                >
                  <Text className='text-center text-white text-xl'>
                    Select a ride
                </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
