import GlobalApi from "@/services/GlobalApi";
import { useLogto } from "@logto/rn";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Index() {
  const { getIdTokenClaims, isAuthenticated } = useLogto();

   useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
    if (isAuthenticated) {
      getIdTokenClaims().then(async(userData) => {
        console.log("User Data:", userData);
        if(userData?.email){
          const result = await GlobalApi.GetUserByEmail(userData.email as string);
          console.log("API Result:", result.data.data);

          const data = {
            email: userData.email,
            name: userData.name || "",
            picture: userData.picture || "" 
          }

          const resp = await GlobalApi.CreateNewUser(data);
          console.log("User Creation Response:", resp.data);
        }
      });

    }
  }, [isAuthenticated]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Redirect href={'/Landing'} />
    </View>
  );
}
