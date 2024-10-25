import React, { useCallback, useState } from "react";
import { Image, View, StatusBar, TouchableOpacity, Modal, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Activity from "../pages/Activity";
import Account from "../pages/Account";
import { IconButton } from "react-native-paper";
import { useFocusEffect, useRouter } from "expo-router";
import App from "@/App";
export default function MainView() {
  const Tab = createBottomTabNavigator();
  const router = useRouter();
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.dismissAll();
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [router])
  );
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex w-full h-full">
          <StatusBar barStyle="light-content" backgroundColor="#FFFFFF" />
          <View className="flex flex-1 bg-white">
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                  let iconName = "home";

                  if (route.name === "Home") {
                    iconName = "home";
                  } else if (route.name === "Services") {
                    iconName = "dots-grid";
                  } else if (route.name === "Activity") {
                    iconName = "bookmark";
                  } else if (route.name === "Account") {
                    iconName = "account";
                  }

                  return (
                    <IconButton
                      icon={iconName}
                      iconColor={color}
                      size={size || 30}
                    />
                  );
                },
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: "gray",
              })}
            >
              <Tab.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
              <Tab.Screen
                name="Services"
                component={Services}
                options={{ headerShown: false }}
              />
              <Tab.Screen
                name="Activity"
                component={Activity}
                options={{ headerShown: false }}
              />
              <Tab.Screen
                name="Account"
                component={Account}
                options={{ headerShown: false }}
              />
            </Tab.Navigator>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
