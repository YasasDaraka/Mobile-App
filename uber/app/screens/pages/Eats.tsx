import React from 'react'
import { SafeAreaView, StatusBar, View, Image } from 'react-native'
const eats = require("../../../assets/eats.png");
export default function Eats() {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View className="w-full h-full bg-[#57BE70]">
        <Image
            className=""
            source={eats}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          ></Image>
        </View>
      </SafeAreaView>
    </>
  )
}
