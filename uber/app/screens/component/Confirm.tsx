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
} from "react-native";
import { Headline, TextInput } from "react-native-paper";

export default function Confirm() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const router = useRouter();

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <ScrollView
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
                  secureTextEntry
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
                  // signUp(email, password)
                  // router.navigate("../common/MainView");
                  router.navigate("../common/MainView");
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
