import { useRouter } from 'expo-router';
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Image, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'
const login = require('../../../assets/login.png');
export default function Entry() {

    const router = useRouter();
    useEffect(() => {
        const timer = setTimeout(() => {

          const checkAuthToken = async () => {

            try {
              const token = await AsyncStorage.getItem('@userToken');
              if (token) {
                router.push('./screens/pages/Login')
              } else {
                router.push('./screens/common/Start')
              }
            } catch (error) {
              console.log('Error checking', error);
            }
          };
      
          checkAuthToken();
           
        }, 2200); 
        return () => clearTimeout(timer);
      }, [router]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
         <StatusBar barStyle="light-content" backgroundColor="#000000" />
         <TouchableOpacity
              className='w-full h-full'
              activeOpacity={1}
              onPress={() => {
                // signUp(email, password)
                router.navigate("./screens/common/Start");
              }}
            >
    <View className='w-full h-full flex justify-center items-center bg-black'>
        <Image source={login} className='w-full h-2/6'></Image>
    </View>
    </TouchableOpacity>
    </SafeAreaView>
  )
}
