import Colors from "@/services/Colors";
import { Marquee } from "@animatereactnative/marquee";
import { useLogto } from '@logto/rn';
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Landing() {
  const imageList = [
    require("./../assets/images/1.jpg"),
    require("./../assets/images/c1.jpg"),
    require("./../assets/images/2.jpg"),
    require("./../assets/images/c2.jpg"),
    require("./../assets/images/3.jpg"),
    require("./../assets/images/c3.jpg"),
    require("./../assets/images/4.jpg"),
    require("./../assets/images/5.jpg"),
    require("./../assets/images/6.jpg"),
  ];
  const { signIn, signOut, isAuthenticated, getIdTokenClaims } = useLogto();
  // useEffect(() => {
  //     console.log("isAuthenticated:", isAuthenticated);
  //     if (isAuthenticated) {
  //       getIdTokenClaims().then(async(userData) => {
  //         console.log("User Data:", userData);
  //         if(userData?.email){
  //           const result = await GlobalApi.GetUserByEmail(userData.email as string);
  //           console.log("API Result:", result.data.data);
  
  //           const data = {
  //             email: userData.email,
  //             name: userData.name || "",
  //             picture: userData.picture || "" 
  //           }
  
  //           const resp = await GlobalApi.CreateNewUser(data);
  //           console.log("User Creation Response:", resp.data);
  //         }
  //       });
  
  //     }
  //   }, [isAuthenticated]);
  return (
    <GestureHandlerRootView>
      <View>
        <Marquee
          spacing={10}
          speed={0.7}
          style={{
            transform: [{ rotate: "-4deg" }],
          }}
        >
          <View style={styles.imageContainer}>
            {imageList.map((image, index) => (
              <Image key={index} source={image} style={styles.image} />
            ))}
          </View>
        </Marquee>
        <Marquee
          spacing={10}
          speed={0.3}
          style={{
            transform: [{ rotate: "-4deg" }],
            marginTop: 15,
          }}
        >
          <View style={styles.imageContainer}>
            {imageList.map((image, index) => (
              <Image key={index} source={image} style={styles.image} />
            ))}
          </View>
        </Marquee>
        <Marquee
          spacing={10}
          speed={0.5}
          style={{
            transform: [{ rotate: "-4deg" }],
            marginTop: 15,
          }}
        >
          <View style={styles.imageContainer}>
            {imageList.map((image, index) => (
              <Image key={index} source={image} style={styles.image} />
            ))}
          </View>
        </Marquee>
      </View>

      <View
        style={{
          backgroundColor: Colors.WHITE,
          height: "100%",
          padding: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 30,
            textAlign: "center",
          }}
        >
          Cookmate AI 🥗🔍 | Find, Create & Enjoy Delicious Recipes!
        </Text>

        <Text
          style={{
            textAlign: "center",
            fontSize: 17,
            fontFamily: "outfit",
            color: Colors.GRAY,
            marginTop: 7,
          }}
        >
          Generate delicious recipes in seconds with the power of AI! 🍔✨
        </Text>
        <TouchableOpacity onPress={async () => {console.log("Get Started pressed"); signIn('exp://192.168.43.123:8081');}} style={styles.button}>
          <Text
            style={{
              textAlign: "center",
              color: Colors.WHITE,
              fontFamily: "outfit",
              fontSize: 17,
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
         {/* <Button title="Sign out" onPress={async () => {console.log("Sign out pressed"); signOut();}} /> */}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 160,
    height: 160,
    borderRadius: 25,
  },
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
  },
});
