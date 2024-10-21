import React, { useState } from "react";
import { Image, View, StatusBar, TouchableOpacity, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Activity from "../pages/Activity";
import Account from "../pages/Account";

export default function MainView() {
  const Tab = createBottomTabNavigator();
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex w-full h-full">
          <StatusBar barStyle="light-content" backgroundColor="#222222" />
          <View className="flex flex-1 ">
            <Tab.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="Services" component={Services} />
              <Tab.Screen name="Activity" component={Activity} />
              <Tab.Screen name="Account" component={Account} />
            </Tab.Navigator>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
