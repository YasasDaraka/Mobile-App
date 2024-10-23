import { FlatList, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { selectTravelTimeInfo, setIsRideOptions, setPaymentView } from "@/slices/navSlice";
import { useRouter } from "expo-router";

const data = [
  {
    id: 1,
    title: "Car",
    multiplier: 2.5,
    image: require("@/assets/car.png"),
  },
  {
    id: 2,
    title: "Three Wheel",
    multiplier: 2,
    image: require("@/assets/tuk.png"),
  },
  {
    id: 3,
    title: "MotorBike",
    multiplier: 1,
    image: require("@/assets/moto.png"),
  },
];

const SURGE_CHANGE_RATE = 1.5;

const RideOptions = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<(typeof data)[0] | null>(null);
  const travelTimeInfo = useSelector(selectTravelTimeInfo);
  const router = useRouter();


  const [blinkText, setBlinkText] = useState("Choose a ride");

  useEffect(() => {
    let intervalId:any ;
    
    if (selected?.title) {
      
      intervalId = setInterval(() => {
        setBlinkText(prevText => (prevText === "Continue to Payment" ? `You Choose ${selected.title}` : "Continue to Payment"));
      }, 1000); 
    } 
    return () => clearInterval(intervalId);
  }, [selected?.title]); 

  return (
    <View className="h-full w-full ">
      <View className="flex-row justify-center items-start h-[6vh]">
        <TouchableOpacity
          className="absolute p-1 left-5 z-50  rounded-full bg-[#F3F3F3]"
          onPress={() => {dispatch(setPaymentView(false)); dispatch(setIsRideOptions(false))}}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text className="text-center ml-2 text-xl">
          Choose a ride{" "}
          {travelTimeInfo?.distance?.text &&
            `${(parseFloat(travelTimeInfo.distance.text.replace(" mi", "")) * 1.60934).toFixed(2)} km`}
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            className={`flex flex-row justify-between items-center px-6 rounded-lg ${
              selected?.id === id ? "bg-gray-300" : "bg-transparent"
            }`}
            onPress={() => setSelected(item)}
          >
            <Image
              source={image}
              style={{ width: 80, height: 80, resizeMode: "contain" }}
            />

            <View className="mr-2 flex justify-center items-center">
              <Text className="text-xl font-semibold">{title}</Text>
              <Text>{travelTimeInfo?.duration?.text || "N/A"}</Text>
            </View>
            <Text className="text-xl">
              {travelTimeInfo
                ? new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "LKR",
                  }).format(
                    (travelTimeInfo?.distance.value *
                      SURGE_CHANGE_RATE *
                      multiplier) /
                      50
                  )
                : "N/A"}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View className="mt-auto border-t border-gray-200 mb-4">
        <TouchableOpacity
          className={`bg-black py-2 m-3 ${
            !selected && "opacity-50"
          } rounded-lg`}
          disabled={!selected}
          onPress={() => {
            dispatch(setIsRideOptions(false));
            dispatch(setPaymentView(true));
          }}
        >
          <Text className="text-center text-white text-xl">
          {selected?.title ? `${blinkText}` : "Choose a ride"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RideOptions;
