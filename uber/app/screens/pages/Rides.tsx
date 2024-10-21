import { useNavigation, useRouter } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { Searchbar } from "react-native-paper";

export default function Rides() {
    const [searchQuery, setSearchQuery] = React.useState('');
    const router = useRouter();
  return (
    <>
      <ScrollView className="h-full w-full">
        <View className="flex justify-center items-center h-full w-full">
          <View className="flex justify-center items-center h-[20vw] w-full">
            <Searchbar
              className="w-11/12"
              placeholder="Enter Pickup Point"
              placeholderTextColor="black"
              onChangeText={setSearchQuery}
              value={searchQuery}
              onFocus={() => router.push('../pages/Pickup')}
            />
          </View>
          <View className="h-[40vw] w-full bg-slate-200"></View>
          <View className="h-[45vw] w-full bg-slate-600"></View>
          <View className="h-[40vw] w-full bg-slate-900"></View>
        </View>
      </ScrollView>
    </>
  );
}
