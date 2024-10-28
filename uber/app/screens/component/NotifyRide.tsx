import {
  selectDestination,
  selectOrigin,
  selectPayment,
  selectVehicle,
  setIsRideOptions,
  setPaymentView,
  setVish,
} from "@/slices/navSlice";
import axios from "axios";
import React from "react";
import {
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
const picture = require("../../../assets/Citydriver.png");
export default function NotifyRide() {
  const dispatch = useDispatch();

  const toContinue = async () => {
    dispatch(setVish(false));
    dispatch(setPaymentView(false));
    dispatch(setIsRideOptions(false));
  };
  return (
    <View className="h-full w-full ">
      <View className="flex-row justify-center items-start h-[6vh]">
        <TouchableOpacity
          className="absolute p-1 left-5 z-50  rounded-full bg-[#F3F3F3]"
          onPress={() => {
            toContinue();
            //    dispatch(setVish(false));
            //    dispatch(setPaymentView(false));
            //    dispatch(setIsRideOptions(false));
          }}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text className="text-center text-xl">Happy Ride</Text>
      </View>
      <View className="w-full h-[95%] flex justify-center items-center">
        <View className="w-full h-[72%] flex justify-center items-center ">
          <Image
            source={picture}
            style={{ width: "90%", height: "90%" }}
            resizeMode="contain"
          ></Image>
        </View>

        <View className="w-full mt-auto border-gray-200 mb-10">
          <TouchableOpacity
            className={`bg-black py-2 m-3 rounded-lg`}
            onPress={() => {
              toContinue();
            }}
          >
            <Text className="text-center text-white text-xl">Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
