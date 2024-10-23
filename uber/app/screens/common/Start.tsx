import { router } from "expo-router";
import React from "react";
import { SafeAreaView, StatusBar, View, Image, TouchableOpacity, Text } from "react-native";
import { Headline } from "react-native-paper";
const login = require("../../../assets/entry.png");
export default function Start() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View className="w-full h-full flex justify-start items-center">
        <View className="w-full h-5/6 flex justify-center items-center mt-4">
          <Image source={login} className="w-full h-[80vh]"></Image>
        </View>
        <View className="w-full h-1/6 flex justify-center items-center">
          <Headline className="font-extrabold text-xl absolute top-0">
            Get started with Uber
          </Headline>

          <TouchableOpacity
            className={`flex-row justify-center items-center w-[93.5%] h-[6vh] bg-black rounded-lg`}
            onPress={() => { router.navigate("../pages/Login")}}
          >
            <Text className="text-center font-bold text-white text-lg">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
