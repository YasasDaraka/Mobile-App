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
  ActivityIndicator,
  Alert,
} from "react-native";
import { Headline, IconButton } from "react-native-paper";
import { getAccountOne } from "../details/AccountDetails";
import { getAccountTwo } from "../details/AccountTwo";
import { signOut } from 'firebase/auth';
import { auth } from "@/firebaseConfig";
import { useRouter } from "expo-router";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectDriver } from "@/slices/navSlice";
import { checkTokenExpired } from "../common/RefreshToken";
const user = require("../../../assets/user.png");

const data:any = getAccountOne();

const data2:any = getAccountTwo();

export default function Account() {
  const [userDetails, setUserDeatils] = useState("");
  const [mail, setMail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isDriver = useSelector(selectDriver);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        
        checkTokenExpired();
      const storedToken = await AsyncStorage.getItem("token");
      const email = await AsyncStorage.getItem("userEmail");
      console.log(email);

      const response = await axios.get(
        `http://10.0.2.2:4000/api/v1/${isDriver? "driver":"user"}/get/${email}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Cache-Control": "no-cache",
          },
        }
      );
      if (response.status === 200) {
        await AsyncStorage.setItem("userName", await response.data.name); 
        console.log(response.data);
      }



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

  async function signOutAndClear() {
    setIsDeleting(false);
    setLoading(true);
    try {
      await signOut(auth);
      await AsyncStorage.clear();
      console.log("User signed out successfully");
      Alert.alert(
        "Success",
        `Sign Out successfully`,
        [
          {
            text: "OK",
            onPress: async () => {
              setLoading(false);
              await AsyncStorage.clear();
              router.dismissAll();
            },
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.error("Error signing out", error);
      Alert.alert(
        "Error",
        `Error signing out`,
        [
          {
            text: "OK",
            onPress: async () => {
              setLoading(false);
              await AsyncStorage.clear();
              router.dismissAll();
            },
          },
        ],
        { cancelable: true }
      );
    }
  }

  async function deleteAccount() {
    setIsDeleting(true);
    setLoading(true);
    const storedToken = await AsyncStorage.getItem('token');
    console.log(storedToken);
    const email = await AsyncStorage.getItem("userEmail");
    try{
    const response = await axios.delete(
        `http://10.0.2.2:4000/api/v1/${isDriver? "driver":"user"}?email=${email}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      setLoading(false);
      setIsDeleting(false);
      if (response.status === 204) {
        Alert.alert(
          "Success",
          "Delete Success",
          [
            {
              text: "OK",
              onPress: async () => {
                await AsyncStorage.clear();
                router.dismissAll();
              },
            },
          ],
          { cancelable: true }
        );
      } else {
        Alert.alert(
          "Error",
          "Error Delete",
          [
            {
              text: "OK",
              onPress: () => {
                
              },
            },
          ],
          { cancelable: true }
        );
        return;
      }
    }catch(error){
      setLoading(false);
      setIsDeleting(false);
      console.log('Error delete:', error);
      Alert.alert(
        "Error",
        "Error Delete",
        [
          {
            text: "OK",
            onPress: () => {
              
            },
          },
        ],
        { cancelable: true }
      );
      return;
    }
    }
  

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {loading ? (
              <View className="w-full h-full flex justify-center items-center bg-white">
                <Text className={`text-center font-bold ${isDeleting?"text-[#ef4444]":"text-black"} text-xl ml-3 mb-4`}>
                {isDeleting
                    ? "Deleting, please wait..."
                    : "Signing Out, please wait..."}
                </Text>
                <ActivityIndicator size="small" color="#0000ff" />
              </View>
            ):(
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
          <View className="w-full h-[5vh] border-gray-200 mb-4 flex justify-center items-center">
              <TouchableOpacity
                className={`bg-slate-600 w-[90%] h-full rounded-lg flex justify-center items-center`}
                onPress={() => {
                  signOutAndClear();
                }}
              >
                <Text className="text-center text-white text-xl pb-1">Sign Out</Text>
              </TouchableOpacity>
        </View>
          <View className="w-full h-[5vh] border-gray-200 mb-4 flex justify-center items-center">
              <TouchableOpacity
                className={`bg-red-500 w-[90%] h-full rounded-lg flex justify-center items-center`}
                onPress={() => {
                  deleteAccount();
                }}
              >
                <Text className="text-center text-white text-xl pb-1">Delete account</Text>
              </TouchableOpacity>
        </View>
        </View>)}
      </SafeAreaView>
    </>
  );
}
