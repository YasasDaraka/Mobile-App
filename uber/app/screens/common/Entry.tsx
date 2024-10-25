import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from '../../../firebaseConfig';
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import {
  View,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
const login = require("../../../assets/login.png");


export default function Entry() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      const checkAuthToken = async () => {
        try {
          
            router.push("./screens/common/Start");
          
        } catch (error) {
          console.log("Error checking", error);
        }
      };

      checkAuthToken();
    }, 2200);
    return () => clearTimeout(timer);
  }, [router]);

  async function signin() {
    try {
      const token = await AsyncStorage.getItem("userEmail");
      if (token) {
        router.push("./screens/common/Start");
      } else {
        router.push("./screens/common/Start");
      }
    } catch (error) {
      console.log("Error checking", error);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <TouchableOpacity
        className="w-full h-full"
        activeOpacity={1}
        onPress={() => {
          signin();
          //router.navigate("./screens/common/Start");
        }}
      >
        <View className="w-full h-full flex justify-center items-center bg-black">
          <Image source={login} className="w-full h-2/6"></Image>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
