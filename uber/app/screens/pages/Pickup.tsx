import React from "react";
import { SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import Search from "../component/Search";


export default function Pickup() {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="#222222" />
        <View className="w-full h-full bg-gray-500">
          <View className="h-5/6 flex justify-start items-center mt-16 bg-slate-500">
            <View className="h-[15vw] w-full bg-orange-400 z-[2]">
              <Search placeholder="From" type="origin"/>
            </View>
            <View className="h-[15vw] w-full bg-orange-600 z-[1]">
              <Search placeholder="To" type="destination"/>
            </View>
          </View>
          <View className="h-1/2 flex justify-center items-center"></View>
        </View>
      </SafeAreaView>
    </>
  );
}
