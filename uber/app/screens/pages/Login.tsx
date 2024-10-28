import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
  Image,
} from "react-native";
import { Headline, IconButton, TextInput } from "react-native-paper";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { selectDriver, setLogIn } from "@/slices/navSlice";


export default function Login() {
  const [text, setText] = React.useState("");
  const [isEnable, setIsEnable] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch(); 
  const isDriver  = useSelector(selectDriver);
  
  const handleGoogle = async ()=> {
    // const provider = await new GoogleAuthProvider();
    // return signInWithPopup(auth, provider);
  }
  useEffect(()=>{
    dispatch(setLogIn(false));
  },[])

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

        <KeyboardAvoidingView
          {...(Platform.OS === "ios" && { behavior: "padding" })}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            className="bg-[#FFFFFF]"
          >
            <View className="w-full h-2/3 flex justify-center items-center mt-16">
              <View className="w-full h-2/6 flex justify-center items-center">

                {isDriver && (<View className="w-full h-[4vh] flex-row justify-center items-center">
                  <Headline className="font-extrabold text-xl">
                    Driver Register
                  </Headline>
                </View>)}
                <View className={`w-full ${isDriver?"h-1/4":"h-1/3"} flex-row justify-start items-end`}>
                  <Headline className="font-extrabold text-xl mb-1 ml-4">
                    Enter your mobile number
                  </Headline>
                </View>

                <View className="w-full h-1/3 p-4 flex-row justify-center items-center">
                  <TextInput
                    className="rounded-lg"
                    mode="flat"
                    value={text}
                    onChangeText={(text) => setText(text)}
                    placeholder="Country"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    disabled={true}
                    style={{
                      width: 100,
                      height: 45,
                      backgroundColor: "#DDDDDD",
                    }}
                    onPress={() => {
                      Keyboard.dismiss;
                    }}
                  />

                  <TextInput
                    className="ml-4 rounded-lg"
                    mode="flat"
                    value={text}
                    onChangeText={(text) => setText(text)}
                    placeholder="Mobile "
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    disabled={true}
                    style={{
                      width: 250,
                      height: 45,
                      backgroundColor: "#DDDDDD",
                    }}
                    onPress={() => {
                      Keyboard.dismiss;
                    }}
                  />
                </View>
                <View className="w-full h-1/3 flex justify-center items-center">
                  <TouchableOpacity
                    className={`flex-row items-center justify-center w-[93.5%] h-[6vh] ${
                      !isEnable && "opacity-50"
                    } bg-black rounded-lg`}
                    onPress={() => {}}
                    disabled={!isEnable}
                  >
                    <Text className="text-center font-bold text-white text-lg">
                      Continue
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View className="w-full h-2/6 flex justify-center items-center">
                <TouchableOpacity
                  className={`flex-row items-center justify-center w-[93.5%] h-[6vh] bg-[#DDDDDD] rounded-lg mb-2`}
                  onPress={() => { handleGoogle()}}
                >
                  <Image
                    className="ml-1 mr-3"
                    source={require("../../../assets/google.png")}
                    style={{ width: 24, height: 24 }}
                  />
                  <Text className="text-center font-bold text-black text-lg">
                    Continue with Google
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`flex-row items-center justify-center w-[93.5%] h-[6vh] bg-[#DDDDDD] rounded-lg`}
                  onPress={() => {dispatch(setLogIn(false));router.navigate("../component/Authenticate")}}
                >
                  <IconButton icon="email" size={30} />
                  <Text className="text-center font-bold text-black text-lg mr-3">
                    Continue with Email
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="w-full h-2/6 flex justify-start items-center">
                <TouchableOpacity
                  className={`flex-row justify-center items-center w-[93.5%] h-[6vh] `}
                  onPress={() => {dispatch(setLogIn(true));router.navigate("../component/Authenticate"); }}
                >
                  <IconButton icon="magnify" size={30} className="pl-3 pt-1"/>
                  <Text className="text-center font-bold text-black text-lg mr-5">
                    Find my account
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
