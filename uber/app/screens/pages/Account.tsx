import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Headline, IconButton } from "react-native-paper";
import { getAccountOne } from "../details/AccountDetails";
import { getAccountTwo } from "../details/AccountTwo";
const user = require("../../../assets/user.png");

const data:any = getAccountOne();

const data2:any = getAccountTwo();

export default function Account() {
  const [userDetails, setUserDeatils] = useState("");
  const [mail, setMail] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await AsyncStorage.getItem("userName");
        if (user) {
          setUserDeatils(user);
          const email = await AsyncStorage.getItem("userEmail");
          email ? setMail(email) : setMail("Sample@gmail.com");
        } else {
           setUserDeatils("User");
           setMail("Sample@gmail.com");
        }
      } catch (error) {
        console.log("Error checking", error);
      }
    };

    checkAuth();
  }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View className="h-full w-full bg-white">
          <View className="w-full h-1/5 flex-row justify-center items-center">
            <View className="w-4/6 h-full flex justify-center items-start">
              <Text className="text-4xl font-bold ml-8">{userDetails}</Text>
              <Text className="text-sm font-semibold ml-10">{mail}</Text>
            </View>

            <View className="w-2/5 h-full flex justify-center items-center ">
              <Image source={user} className="w-2/5 h-[8vh] "></Image>
            </View>
          </View>

          <View className="w-full h-1/6 flex-row justify-evenly items-start ">
            {data.map((item:any) => (
              <TouchableOpacity
                key={item.id.toString()} 
                className="w-[25%] h-4/6 flex justify-center items-cente mx-2"
                onPress={() => {
                }}
              >
                <View className="w-full h-full flex justify-center items-center rounded-xl bg-[#F3F3F3] ">
                  <IconButton iconColor="black" icon={item.image} size={30} className="m-0"/>
                  <Text className="font-semibold mb-2">{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {data2.map((items:any) => (
            <View className="w-full h-1/6 flex justify-center items-center">
              <TouchableOpacity
                key={items.id.toString()} 
                className="w-[90%] h-[13vh] flex-row justify-center items-cente mx-2"
                onPress={() => {
                }}
              >
                <View className="w-full h-full flex-row justify-center items-center rounded-xl bg-[#F3F3F3] ">
                <View className="w-4/6 h-full flex justify-center items-start px-4">
                  <Headline className="text-xl font-black">{items.title}</Headline>
                  <Text className="text-[#] mb-2">{items.sub}</Text>
                </View>

                <View className="w-2/6 h-full flex justify-center items-center">
                <Image source={items.image} className='w-2/4 h-3/5'></Image>
                </View>

                </View>
              </TouchableOpacity>
              </View>
            ))}
          
        </View>
      </SafeAreaView>
    </>
  );
}
