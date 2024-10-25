import {jwtDecode} from 'jwt-decode';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "@/firebaseConfig";

export const checkTokenExpired = async () => {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    console.log("No token found");
    return null;
  }

  try {

    const decodedToke:any = jwtDecode(token);
    const expirationTime = decodedToke.exp * 1000;

    const currentTime = Date.now();

    if (expirationTime < currentTime) {
      console.log("Token expired, renewing...");

      const currentUser = auth.currentUser;

      if (currentUser) {
        const newIdToken = await currentUser.getIdToken(true);
        await AsyncStorage.setItem("token", newIdToken);

        console.log("New ID Token:", newIdToken);
      }
    } else {
      console.log("Token is still valid");
    }
  } catch (error) {
    console.error("Error renewing token:", error);
  }
};
