import { UserContext } from "@/context/UserContext";
import GlobalApi from "@/services/GlobalApi";
import { useLogto } from "@logto/rn";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { View } from "react-native";

export default function Index() {
  const { getIdTokenClaims, isAuthenticated } = useLogto();
  const { user, setUser } = useContext(UserContext);

  const router = useRouter();
  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
    if (isAuthenticated) {
      getIdTokenClaims().then(async (userData) => {
        console.log("User Data:", userData);
        if (userData?.email) {
          const result = await GlobalApi.GetUserByEmail(
            userData.email as string
          );
          console.log("API Result:", result.data.data);

          if (!result.data.data || result.data.data.length === 0) {
            const data = {
              email: userData.email,
              name: userData.name || "",
              picture: userData.picture || "",
            };

            const resp = await GlobalApi.CreateNewUser(data);
            console.log("User Creation Response:", resp.data);
            setUser(resp.data.data);
            router.replace("/(tabs)/Home");
          } else {
            setUser(result?.data?.data[0]);
            router.replace("/(tabs)/Home");
          }
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
      {/* <Redirect href={'/Landing'} /> */}
    </View>
  );
}
