import React from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { getServices } from "../details/ServiceDetails";
const car = require("../../../assets/car2.png");
const food = require("../../../assets/food.png");
const data: any = getServices();

export default function Services() {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View className="w-full h-full bg-white">
          <View className="w-full h-1/6 flex justify-around items-start">
            <Text className="text-4xl font-bold ml-8">Services</Text>
            <Text className="text-xl font-semibold ml-8">
              Go anywhere, Get anything
            </Text>
          </View>

          <View className="w-full h-1/5 flex-row justify-center items-center">
          
          <TouchableOpacity
                className="w-[44%] h-4/6 flex justify-center items-center mx-2"
                onPress={() => {}}
              > 
              <View className="w-full h-full flex justify-center items-center rounded-xl bg-[#F3F3F3] ">
                  <Image
                    className="ml-10"
                    source={car}
                    style={{ width: "80%", height: "80%" }}
                    resizeMode="contain"
                  ></Image>
                  <Text className="font-semibold mb-2 absolute bottom-0 left-5">Ride</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                className="w-[44%] h-4/6 flex justify-center items-center mx-2"
                onPress={() => {}}
              > 
              <View className="w-full h-full flex justify-center items-center rounded-xl bg-[#F3F3F3] ">
                  <Image
                    className="ml-10"
                    source={food}
                    style={{ width: "45%", height: "45%" }}
                    resizeMode="contain"
                  ></Image>
                  <Text className="font-semibold mb-2 absolute bottom-0 left-5">Food</Text>
                </View>
              </TouchableOpacity>
          </View>

          <View className="w-full h-1/5 flex-row justify-around items-start">
            {data.map((item: any) => (
              <TouchableOpacity
                key={item.id.toString()}
                className="w-[25%] h-4/6 flex justify-center items-cente mx-2"
                onPress={() => {}}
              >
                <View className="w-full h-full flex justify-center items-center rounded-xl bg-[#F3F3F3] ">
                  <Image
                    source={item.image}
                    style={{ width: "60%", height: "60%" }}
                    resizeMode="contain"
                  ></Image>
                  <Text className="font-semibold mb-2">{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
