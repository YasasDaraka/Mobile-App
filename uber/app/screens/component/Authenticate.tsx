import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { selectLogIn, setLogIn } from "@/slices/navSlice";
import axios from "axios";

import { signInWithEmailAndPassword , signInWithCustomToken} from "firebase/auth";
import { auth } from "@/firebaseConfig";

export default function Authenticate() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const isLogIn = useSelector(selectLogIn);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const signUp = async (email: any, password: any) => {
    try {
      if (!validateEmail(email)) {
        Alert.alert(
          "Alert",
          "Invalid Email",
          [
            {
              text: "OK",
              onPress: () => {
                setEmail("");
                setPassword("");
              },
            },
          ],
          { cancelable: true }
        );
        return;
      }

      if (password.length <= 6) {
        Alert.alert(
          "Alert",
          "Invalid Password",
          [
            {
              text: "OK",
              onPress: () => {
                setEmail("");
                setPassword("");
              },
            },
          ],
          { cancelable: true }
        );
        return;
      }

      // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // const user = userCredential.user;
      setLoading(true);
      const response = await axios.post(
        "http://10.0.2.2:4000/api/v1/user/signup",
        {
          email: email,
          password: password,
          name: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        console.error(password);
        const { customToken } = response.data;
        console.log("custonm token ", customToken);
        await AsyncStorage.setItem("customToken", customToken);
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredential.user.getIdToken();
        await AsyncStorage.setItem("token", idToken);
        await AsyncStorage.setItem("userEmail",email);
        setLoading(false);

        Alert.alert(
          "Success",
          "Register Complete",
          [
            {
              text: "OK",
              onPress: () => {
                setEmail("");
                setPassword("");
                router.navigate("../component/Confirm");
              },
            },
          ],
          { cancelable: true }
        );
      } else {
        setLoading(false);
        Alert.alert(
          "Error",
          "Error Signing up",
          [
            {
              text: "OK",
              onPress: () => {
                setEmail("");
                setPassword("");
              },
            },
          ],
          { cancelable: true }
        );
      }

      try {
        await AsyncStorage.setItem("userEmail", email);
      } catch (error) {
        console.log("Error saving email:", error);
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 400) {
          console.error("Error 400: Bad Request:", error.response.data);
        } else if (error.response.status === 500) {
          console.error(
            "Error 500: Internal Server Error:",
            error.response.data
          );
        } else {
          console.error("Unexpected error response:", error.response.status);
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
      setLoading(false);
      Alert.alert(
        "Error",
        "Error Signing up",
        [
          {
            text: "OK",
            onPress: () => {
              setEmail("");
              setPassword("");
            },
          },
        ],
        { cancelable: true }
      );
    }
  };

  const signIn = async (email: any, password: any) => {
    try {
      if (!validateEmail(email)) {
        Alert.alert(
          "Alert",
          "Invalid Email",
          [
            {
              text: "OK",
              onPress: () => {
                setEmail("");
                setPassword("");
              },
            },
          ],
          { cancelable: true }
        );
        return;
      }

      if (password.length <= 6) {
        Alert.alert(
          "Alert",
          "Invalid Password",
          [
            {
              text: "OK",
              onPress: () => {
                setEmail("");
                setPassword("");
              },
            },
          ],
          { cancelable: true }
        );
        return;
      }
      setLoading(true);

      const response = await axios.post(
        "http://10.0.2.2:4000/api/v1/user/signin",
        {
          email: email,
          password: password,
          name: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        
        const { customToken } = response.data;
        await AsyncStorage.setItem("customToken", customToken);
        try {
          const userCredential = await signInWithCustomToken(auth,customToken);
          const idToken = await userCredential.user.getIdToken();
          await AsyncStorage.setItem("token", idToken);
        } catch (error) {
          console.error("Error signing in:", error);
        }

        setLoading(false);
      }
      else if(response.status === 400){
        Alert.alert(
          "Error",
          "Incorrect Password",
          [
            {
              text: "OK",
              onPress: () => {
                setEmail("");
                setPassword("");
              },
            },
          ],
          { cancelable: true }
        );
      }
      else if(response.status === 404){
        Alert.alert(
          "Error",
          "User Not found",
          [
            {
              text: "OK",
              onPress: () => {
                setEmail("");
                setPassword("");
              },
            },
          ],
          { cancelable: true }
        );
      }

      setLoading(false);
      Alert.alert(
        "Success",
        "User logged in successfully",
        [
          {
            text: "OK",
            onPress: () => {
              setEmail("");
              setPassword("");
              router.navigate("../common/MainView");
            },
          },
        ],
        { cancelable: true }
      );
    } catch (error:any) {
      setLoading(false);
      if (error.response && error.response.status === 400) {
        Alert.alert(
            "Error",
            "Invalid Email or Password. Please try again.",
            [
                {
                    text: "OK",
                    onPress: () => {
                        setEmail("");
                        setPassword("");
                    },
                },
            ],
            { cancelable: true }
        );
    } 
    else if(error.response.status === 404){
      Alert.alert(
        "Error",
        "User Not found",
        [
          {
            text: "OK",
            onPress: () => {
              setEmail("");
              setPassword("");
            },
          },
        ],
        { cancelable: true }
      );
    }
    else {
        Alert.alert(
            "Error",
            "Error Signing In",
            [
                {
                    text: "OK",
                    onPress: () => {
                        setEmail("");
                        setPassword("");
                    },
                },
            ],
            { cancelable: true }
        );
    }
  };
}

  useEffect(() => {
    return () => {
      dispatch(setLogIn(false));
    };
  }, [dispatch]);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <KeyboardAvoidingView
          className="bg-white"
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={100}
        > */}
        <ScrollView
          className="bg-white"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 justify-center items-center p-4 mt-32 bg-white">
            {loading ? (
              <View className="w-full h-[12vh] flex justify-center items-center">
                <Text className="text-center font-bold text-black text-xl ml-3 mb-4">
                  {isLogIn
                    ? "Signing In, please wait..."
                    : "Signing up, please wait..."}
                </Text>
                <ActivityIndicator size="small" color="#0000ff" />
              </View>
            ) : (
              <Text className="text-center font-bold text-black text-xl mb-4">
                {isLogIn ? "Sign In with Email" : "Sign up with Email"}
              </Text>
            )}
            <TextInput
              className="rounded-lg"
              mode="flat"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              style={{
                width: 350,
                height: 45,
                backgroundColor: "#DDDDDD",
                marginBottom: 20,
              }}
            />

            <TextInput
              className="rounded-lg"
              mode="flat"
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              secureTextEntry
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              style={{
                width: 350,
                height: 45,
                backgroundColor: "#DDDDDD",
              }}
            />

            <TouchableOpacity
              style={{
                marginTop: 20,
                paddingVertical: 10,
                paddingHorizontal: 80,
                backgroundColor: "black",
                borderRadius: 8,
              }}
              onPress={() => {
                {
                  isLogIn ? signIn(email, password) : signUp(email, password);
                }

                // router.navigate("../common/MainView");
                //router.navigate("../component/Confirm");
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>
                {isLogIn ? "SignIn" : "SignUp"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* </KeyboardAvoidingView> */}
      </SafeAreaView>
    </>
  );
}
