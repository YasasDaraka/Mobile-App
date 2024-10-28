import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Image
} from "react-native";
import { IconButton } from "react-native-paper";
import { checkTokenExpired } from "../common/RefreshToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
const car = require("@/assets/car4.png");
const tuk =require("@/assets/threewheel.png");
const moto = require("@/assets/moto2.png")
export default function Activity() {
  let [data, setData] = useState<any>([]);

  const fetchData = async () => {
    try {
      checkTokenExpired();
      const storedToken = await AsyncStorage.getItem("token");
      const email = await AsyncStorage.getItem("userEmail");
      console.log(email);

      const response = await axios.get(
        `http://10.0.2.2:4000/api/v1/ride/get/${email}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Cache-Control": "no-cache",
          },
        }
      );
      if (response.status === 200) {
        setData(await response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View className="w-full h-full bg-white">

        <View className="w-full h-1/6 flex justify-around items-start">
            <View className="w-full h-auto flex-row justify-start items-center">
            <IconButton iconColor="black" icon={"history"} size={40} className="ml-4"/>
            <Text className="text-4xl font-bold">Activity</Text>
            </View>
            <Text className="text-xl font-semibold ml-8">
              Ride Details
            </Text>
          </View>
          <ScrollView className="w-full h-full">
            <View className="w-full h-full flex justify-center items-center">

              {data.map((item: any) => (
                <TouchableOpacity
                  key={item._id}
                  className="w-[95%] h-[14vh] flex justify-center items-center mt-2 mb-2"
                  onPress={() => {}}
                >
                  <View className="w-full h-full flex-row justify-center items-center rounded-xl bg-[#F3F3F3] ">
                    <View className="w-4/6 h-full justify-center items-start ">
                    <Text className="font-semibold mb-2 ml-4"><Text className="text-blue-600">From{"\n"}</Text>{item.origin}</Text>
                    <Text className="font-semibold mb-2 ml-4"><Text className="text-blue-600">To{"\n"}</Text>{item.destination}</Text>
                    </View>
                    <View className="w-2/6 h-full justify-center items-center ">
                    <Image
                      source={item.vehicle == "Car"? car :item.vehicle == "Three Wheel"? tuk:item.vehicle == "MotorBike"?moto:""}
                      style={{ width: "60%", height: "60%" }}
                      resizeMode="contain"
                    ></Image>
                    <Text className="font-semibold mb-2">LKR {item.fare}</Text>
                    </View>
                    
                  </View>
                </TouchableOpacity>
              ))}

            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
