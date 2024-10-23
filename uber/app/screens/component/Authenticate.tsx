import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, TouchableOpacity, View, Text, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { selectLogIn, setLogIn } from '@/slices/navSlice';

export default function Authenticate() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const isLogIn = useSelector(selectLogIn);
    const dispatch = useDispatch();

    const validateEmail = (email:any) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

    const signUp = async (email:any, password:any) => {
        try {

            if (!validateEmail(email)) {
                Alert.alert(
                    "Alert", 
                    "Invalid Email", 
                    [
                      {
                        text: "OK", 
                        onPress: () =>{setEmail(""); setPassword("");}, 
                      },
                    ],
                    { cancelable: true }
                  );
                return;
              }

              if (password.length <= 4) {
                Alert.alert(
                    "Alert", 
                    "Invalid Password", 
                    [
                      {
                        text: "OK", 
                        onPress: () =>{setEmail(""); setPassword("");}, 
                      },
                    ],
                    { cancelable: true }
                  );
                return;
              } 

          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          try {
            await AsyncStorage.setItem('userEmail', email); 
          } catch (error) {
            console.log('Error saving email:', error);
          }
          Alert.alert(
            "Success", 
            "Register Complete", 
            [
              {
                text: "OK", 
                onPress: () =>{setEmail(""); setPassword("");router.navigate("../component/Confirm");}, 
              },
            ],
            { cancelable: true }
          );
        } catch (error) {
            Alert.alert(
                "Error", 
                "Error Signing up", 
                [
                  {
                    text: "OK", 
                    onPress: () =>{setEmail(""); setPassword("");}, 
                  },
                ],
                { cancelable: true }
              );
        }
      };

      const signIn = async (email:any, password:any) => {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          Alert.alert(
            "Success", 
            "User logged in successfully", 
            [
              {
                text: "OK", 
                onPress: () =>{setEmail(""); setPassword("");router.navigate("../common/MainView");}, 
              },
            ],
            { cancelable: true }
          );
        
        } catch (error) {
          Alert.alert(
            "Error", 
            "Error Signing In", 
            [
              {
                text: "OK", 
                onPress: () =>{setEmail(""); setPassword("");}, 
              },
            ],
            { cancelable: true }
          );
        }
      }

      useEffect(() => {
        return () => {
          dispatch(setLogIn(false)); 
        };
      }, [dispatch]);
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
      className='bg-white'
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        keyboardVerticalOffset={100} 
      >
        <ScrollView className="bg-white" contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View className="flex-1 justify-center items-center p-4 mt-32 bg-white">
          <Text className="text-center font-bold text-black text-xl mb-4">
                    {isLogIn?"Sign In with Email": "Sign up with Email"}
                  </Text>
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
                backgroundColor: 'black',
                borderRadius: 8,
              }}
              onPress={() => {
                {isLogIn?signIn(email, password): signUp(email, password)}
                 
                // router.navigate("../common/MainView");
                //router.navigate("../component/Confirm");
              }}
            >
              <Text style={{ color: 'white', fontSize: 16 }}>{isLogIn?"SignIn": "SignUp"}</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </>
  )
}
