import { useNavigation, useRouter } from "expo-router";
import React from "react";
import { ScrollView, TouchableOpacity, View, Image, Text } from "react-native";
import { Headline, IconButton, Searchbar } from "react-native-paper";
import { getRides } from "../details/RideDetails";
import { useSelector } from "react-redux";
import { selectDriver } from "@/slices/navSlice";
import MapViewCard from "../component/MapViewCard";
import { Icon } from "react-native-elements";
const view = require("../../../assets/view.png");
const view2 = require("../../../assets/view2.png");
const user = require("../../../assets/user.png");
const data:any = getRides();

export default function Rides() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const router = useRouter();
  const isDriver = useSelector(selectDriver);
  return (
    <>
      <ScrollView className="h-full w-full bg-white">
        {isDriver?(<View className="flex justify-center items-center h-[90vh] w-full ">
        
          <View className="w-full h-5/6 ">
          
            <View className="w-full h-1/6 flex-row justify-center items-center absolute top-2 z-20">

            <View className="w-1/6 h-full flex justify-center items-center ">
            <TouchableOpacity
                className=" w-[12vw] h-[6vh] ml-2 flex justify-center items-center shadow-lg shadow-black rounded-full bg-[#F3F3F3]"
                onPress={() => {
                }}
              >
                <IconButton iconColor="black" icon={"magnify"} size={30} className=""/>
              </TouchableOpacity>
            </View>

            <View className="w-4/6 h-full flex justify-center items-center">
                  
            </View>

            <TouchableOpacity className="w-1/6 h-full flex justify-center items-center rounded-full shadow-lg shadow-gray-300">
            <Image source={user} className="w-[12vw] h-[6vh] "></Image>
            </TouchableOpacity>
          </View>
            
            <MapViewCard />


            <View className="w-full h-1/6 flex-row justify-center items-center  absolute bottom-0 z-20">

            <TouchableOpacity
                className="w-[14vw] h-[7vh] flex justify-center items-center rounded-full shadow-lg shadow-black absolute left-4 bg-white z-20"
                onPress={() => {
                }}
              >
            <IconButton iconColor="black" icon={"shield-half-full"} size={30} className=""/>
            </TouchableOpacity>

            <TouchableOpacity
                className="w-[20vw] h-[10vh] flex justify-center items-center shadow-lg shadow-black rounded-full bg-blue-600 z-20"
                onPress={() => {
                }}
              >
            <Text className="text-3xl font-semibold text-white">GO</Text>
            </TouchableOpacity>

            </View>
          </View>
          <View className="w-full h-1/6 flex-row justify-center items-center">

            <View className="w-1/6 h-full flex justify-center items-center ">
            <TouchableOpacity
                className="p-1 mb-5 z-50  rounded-full bg-[#F3F3F3] rotate-90"
                onPress={() => {
                }}
              >
                <Icon name="chevron-left" type="fontawesome" />
              </TouchableOpacity>
            </View>

            <View className="w-4/6 h-full flex justify-center items-center ">
                  <Headline className="text-2xl font-black">Online</Headline>
                  <Text className="mb-7">Request accept</Text>
            </View>

            <TouchableOpacity className="w-1/6 h-full flex justify-center items-center">
            <IconButton iconColor="black" icon={"menu"} size={30} className="mb-6"/>
            </TouchableOpacity>
          </View>
        </View>):(<View className="flex justify-center items-center h-full w-full">
          <View className="flex justify-center items-center h-[20vw] w-full">
            <Searchbar
              className="w-11/12"
              placeholder="Enter Pickup Point"
              placeholderTextColor="black"
              onChangeText={setSearchQuery}
              value={searchQuery}
              onFocus={() => router.push("../pages/Pickup")}
            />
          </View>
          <View className="h-[38vw] w-full flex justify-center items-center">
            <TouchableOpacity
              className="w-[92%] h-[17vh] flex-row justify-center items-cente"
              onPress={() => {}}
            >
              <View className="w-full h-full flex-row justify-center items-center rounded-xl bg-[#0D572D] ">
                <View className="w-4/6 h-full flex justify-start items-start px-4">
                  <Headline className="text-xl text-white font-semibold mt-4 mb-0">
                    Want Better{"\n"}Pick Ups?
                  </Headline>
                  
                </View>

                <View className="w-2/6 h-full flex justify-center items-center bg-[#10462D] rounded-xl">
                  <Image source={view} className="w-full h-full"></Image>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View className="h-[40vw] w-full flex justify-center items-center">
            <View className="w-full h-[5vh] flex-row justify-between items-start px-4 mt-8">
              <Headline className="text-xl text-black font-black">
                Suggestions
              </Headline>
              <Text className="text-base font-medium text-black mt-2 pr-1">
                See All
              </Text>
            </View>

            <View className="w-full h-5/6 flex-row justify-evenly items-start mt-4 px-3">
              {data.map((item:any) => (
                <TouchableOpacity
                  key={item.id.toString()}
                  className="w-[22%] h-4/5 flex justify-center items-cente mx-2"
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
        
          <View className="h-[38vw] w-full flex justify-center items-center mt-4">
            <TouchableOpacity
              className="w-[92%] h-[17vh] flex-row justify-center items-cente"
              onPress={() => {}}
            >
              <View className="w-full h-full flex-row justify-center items-center rounded-xl bg-[#266EF1] ">
                <View className="w-4/6 h-full flex justify-start items-start px-4">
                  <Headline className="text-lg text-white font-semibold mt-4 mb-0">
                    Save time and{"\n"}money
                  </Headline>
                  <Text className="text-white pt-4">
                  Try Uber moto
                  </Text>
                </View>

                <View className="w-2/6 h-full flex justify-center items-center rounded-xl">
                  <Image source={view2} className="w-full h-full rounded-xl"></Image>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          </View>)}
       
      </ScrollView>
    </>
  );
}
