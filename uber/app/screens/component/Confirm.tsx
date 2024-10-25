import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Headline, TextInput } from "react-native-paper";
import axios from 'axios';
import  {checkTokenExpired}  from "../common/RefreshToken";

export default function Confirm() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const router = useRouter();

  const SaveUser = async ()=>{
    
    try {
      checkTokenExpired();
      const storedToken = await AsyncStorage.getItem('token');
      console.log(storedToken);
      const email = await AsyncStorage.getItem("userEmail");
      console.log(email);
      const response = await axios.put('http://10.0.2.2:4000/api/v1/user', {
        email:email,
        password:"",
        name:`${first}${last}`,
      },
       {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
      },
      }
    );

    if (response.status === 204) {
      Alert.alert(
        "Success",
        "Register Complete",
        [
          {
            text: "OK",
            onPress: () => {
              setFirst("");
              setLast("");
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      Alert.alert(
        "Error",
        "Error Update name",
        [
          {
            text: "OK",
            onPress: () => {
              setFirst("");
              setLast("");
            },
          },
        ],
        { cancelable: true }
      );
      return;
    }

      await AsyncStorage.setItem('userName', `${first}${last}`); 
      router.navigate("../common/MainView");
    } catch (error) {
      console.log('Error saving email:', error);
    }
  }
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <ScrollView
            className="bg-white"
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-1 justify-center items-center p-4 mt-26">
              <Text className="text-center font-bold text-black text-xl mb-10">
                Confirm your information
              </Text>

              <View className="w-full h-[9vh] flex-row justify-around items-center">
                <TextInput
                  className="rounded-lg"
                  mode="flat"
                  value={first}
                  onChangeText={(text) => setFirst(text)}
                  placeholder="First Name"
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  style={{
                    width: 170,
                    height: 45,
                    backgroundColor: "#DDDDDD",
                    marginBottom: 20,
                  }}
                />

                <TextInput
                  className="rounded-lg"
                  mode="flat"
                  value={last}
                  onChangeText={(text) => setLast(text)}
                  placeholder="Last Name"
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  style={{
                    width: 170,
                    height: 45,
                    backgroundColor: "#DDDDDD",
                    marginBottom: 20,
                  }}
                />
              </View>
            </View>
            <View className="w-full h-[6vh] absolute bottom-10 flex items-end pr-5">
              <TouchableOpacity
                className="w-[30vw] h-[6vh] bg-black rounded-xl flex justify-center items-center"
                onPress={() => {
                   SaveUser();
                  // router.navigate("../common/MainView");
                }}
              >
                <Text className="text-white font-bold text-base">Next</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
