import { setDriver } from "@/slices/navSlice";
import { router } from "expo-router";
import React from "react";
import { SafeAreaView, StatusBar, View, Image, TouchableOpacity, Text } from "react-native";
import { Headline } from "react-native-paper";
import { useDispatch } from "react-redux";
const login = require("../../../assets/entry.png");
export default function Start() {

  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View className="w-full h-full flex justify-start items-center">
        <View className="w-full h-5/6 flex justify-center items-center mt-4">
          <Image source={login} className="w-full h-[80vh]"></Image>
        </View>
        <View className="w-full h-1/6 flex justify-center items-center">
          <Headline className="font-extrabold text-xl absolute -top-2">
            Get started with Uber
          </Headline>

          <TouchableOpacity
            className={`flex-row justify-center items-center w-[93.5%] h-[6vh] bg-black rounded-lg`}
            onPress={() => { dispatch(setDriver(false)); router.navigate("../pages/Login")}}
          >
            <Text className="text-center font-bold text-white text-lg">
              Continue as user
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex justify-center items-center`}
            onPress={() => { router.navigate("../pages/Login"); dispatch(setDriver(true))}}
          >
          <Text className="text-center font-bold text-gray-800 text-lg">
              Sign up as driver
            </Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
