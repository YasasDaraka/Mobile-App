import { setIsRideOptions, setPaymentView } from "@/slices/navSlice";
import React from "react";
import {
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  Image
} from "react-native";
import { Icon } from "react-native-elements";
import { TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
const card = require("../../../assets/card.png");
const master = require("../../../assets/master.png");
const visa = require("../../../assets/visa.png");

export default function Payment() {
  const [card, setCard] = React.useState("");
  const [exp, setExp] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [holder, setholder] = React.useState("");
  const dispatch = useDispatch();
  return (
    <View className="h-full w-full ">
      <View className="flex-row justify-center items-start h-[6vh]">
        <TouchableOpacity
          className="absolute p-1 left-5 z-50  rounded-full bg-[#F3F3F3]"
          onPress={() => {
            dispatch(setPaymentView(false));
            dispatch(setIsRideOptions(true));
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
          onChangeText={(text) => setCard(text)}
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
            onChangeText={(text) => setExp(text)}
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
            onChangeText={(text) => setCvv(text)}
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
          onChangeText={(text) => setholder(text)}
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
          className={`bg-black py-2 m-3 rounded-lg`}
          onPress={() => {}}
        >
          <Text className="text-center text-white text-xl">Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
