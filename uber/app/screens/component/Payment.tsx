import {
  selectDestination,
  selectOrigin,
  selectPayment,
  selectVehicle,
  selectVish,
  setIsRideOptions,
  setPaymentView,
  setVish,
} from "@/slices/navSlice";
import axios from "axios";
import React, { useState } from "react";
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
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { checkTokenExpired } from "../common/RefreshToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotifyRide from "./NotifyRide";
const card = require("../../../assets/card.png");
const master = require("../../../assets/master.png");
const visa = require("../../../assets/visa.png");

export default function Payment() {
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const [holder, setholder] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const payment = useSelector(selectPayment);
  const vehicle = useSelector(selectVehicle);
  const isVish = useSelector(selectVish);

  const toContinue = async () => {
    if (
      card.length < 4 ||
      exp.length < 4 ||
      cvv.length < 3 ||
      holder.length < 4
    ) {
      Alert.alert(
        "Alert",
        "Fill Correct Details",
        [
          {
            text: "OK",
            onPress: () => {},
          },
        ],
        { cancelable: true }
      );
      return;
    }

    try {
      checkTokenExpired();
      const storedToken = await AsyncStorage.getItem("token");
      const email = await AsyncStorage.getItem("userEmail");

      const response = await axios.post(
        "http://10.0.2.2:4000/api/v1/ride/request",
        {
          email: email,
          origin: origin.description,
          destination: destination.description,
          fare: payment,
          vehicle: vehicle,
          card: card,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if ((await response.status) === 201) {
        Alert.alert(
          "Success",
          "Request Ride Complete",
          [
            {
              text: "OK",
              onPress: () => {
                dispatch(setVish(true));
                setCard("");
                setExp("");
                setCvv("");
                setholder("");
              },
            },
          ],
          { cancelable: true }
        );
      } else {
        Alert.alert(
          "Error",
          "Error Request Ride",
          [
            {
              text: "OK",
              onPress: () => {},
            },
          ],
          { cancelable: true }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  function checkValues() {
    if (
      card.length < 4 ||
      exp.length < 4 ||
      cvv.length < 3 ||
      holder.length < 4
    ) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }
  return (
    <>
      {isVish ? (
        <NotifyRide />
      ) : (
        <ScrollView className="h-full w-full ">
          <View className="h-full w-full ">
            <View className="flex-row justify-center items-start h-[6vh]">
              <TouchableOpacity
                className="absolute p-1 left-5 z-50  rounded-full bg-[#F3F3F3]"
                onPress={() => {
                  dispatch(setPaymentView(false));
                  dispatch(setIsRideOptions(true));
                  setCard("");
                  setExp("");
                  setCvv("");
                  setholder("");
                }}
              >
                <Icon name="chevron-left" type="fontawesome" />
              </TouchableOpacity>
              <Text className="text-center text-xl">Payment Methods</Text>
            </View>
            <View className="w-full h-4/6 flex justify-center items-center">
              <Text className="text-xl font-bold">Card Details</Text>
              <TextInput
                className="rounded-lg my-2"
                mode="flat"
                value={card}
                onChangeText={(text) => {
                  setCard(text);
                  checkValues();
                }}
                placeholder="Card Number"
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                style={{
                  width: 350,
                  height: 45,
                  backgroundColor: "#DDDDDD",
                }}
                onPress={() => {}}
              />
              <View className="w-full h-[5vh] flex-row justify-evenly items-center mx-12 my-2">
                <TextInput
                  className="rounded-lg ml-2"
                  mode="flat"
                  value={exp}
                  onChangeText={(text) => {
                    setExp(text);
                    checkValues();
                  }}
                  placeholder="Expiry Date"
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  style={{
                    width: 170,
                    height: 45,
                    backgroundColor: "#DDDDDD",
                  }}
                  onPress={() => {}}
                />

                <TextInput
                  className="rounded-lg mr-2"
                  mode="flat"
                  value={cvv}
                  onChangeText={(text) => {
                    setCvv(text);
                    checkValues();
                  }}
                  placeholder="CVV"
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  style={{
                    width: 170,
                    height: 45,
                    backgroundColor: "#DDDDDD",
                  }}
                  onPress={() => {}}
                />
              </View>
              <TextInput
                className="rounded-lg my-2"
                mode="flat"
                value={holder}
                onChangeText={(text) => {
                  setholder(text);
                  checkValues();
                }}
                placeholder="Cardd Holder"
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                style={{
                  width: 350,
                  height: 45,
                  backgroundColor: "#DDDDDD",
                }}
                onPress={() => {}}
              />

              <View className="w-full h-[6vh] flex-row justify-around items-center mx-12">
                <Image
                  className=""
                  source={visa}
                  style={{ width: "90%", height: "90%" }}
                  resizeMode="contain"
                ></Image>

                <Image
                  className=""
                  source={master}
                  style={{ width: "90%", height: "90%" }}
                  resizeMode="contain"
                ></Image>
              </View>
            </View>

            <View className="mt-auto border-gray-200 mb-4">
              <TouchableOpacity
                className={`bg-black py-2 m-3 rounded-lg ${
                  !isVisible && "opacity-50"
                }`}
                disabled={!isVisible}
                onPress={() => {
                  toContinue();
                }}
              >
                <Text className="text-center text-white text-xl">Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
}
