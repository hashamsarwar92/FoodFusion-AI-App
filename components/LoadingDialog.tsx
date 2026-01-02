import Colors from "@/services/Colors";
import React from "react";
import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";

export default function LoadingDialog({
  visible = false,
  text = "Loading...",
}: any) {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.overlay}>
        <View
          style={{
            width: 120,
            height: 120,
            padding: 20,
            borderRadius: 15,
            backgroundColor: Colors.PRIMARY,
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color={Colors.WHITE} />
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000070",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: "outfit",
  },
});
