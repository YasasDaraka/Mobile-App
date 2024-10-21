import React from "react";
import { SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Rides from "./Rides";
import Eats from "./Eats";

export default function Home() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="#222222" />
        <View className="w-full h-full ">
          <Tab.Navigator>
            <Tab.Screen name="Rides" component={Rides}/>
            <Tab.Screen name="Eats" component={Eats} />
          </Tab.Navigator>
        </View>
      </SafeAreaView>
    </>
  );
}
