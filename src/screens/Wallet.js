import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Button } from "react-native";
import WalletConnectProvider, { useWalletConnect } from "react-native-walletconnect";

const WalletConnect = () => {
  const {
    createSession,
    killSession,
    session,
    signTransaction,
  } = useWalletConnect();
  const hasWallet = !!session.length;
  return (
    <>
      {!hasWallet && (
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={createSession}>
            <Text>Connect</Text>
          </TouchableOpacity>
        </View>
      )}
      {!!hasWallet && (
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={() => signTransaction({
              from: "0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3",
              to: "0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359",
              data: "0x",
              gasPrice: "0x02540be400",
              gas: "0x9c40",
              value: "0x00", 
              nonce: "0x0114",
            })}>
            <Text>Recive token</Text>
          </TouchableOpacity>
        </View>
      )}
      {!!hasWallet && (
        <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={killSession}>
          <Text>Disconnect</Text>
        </TouchableOpacity>
      </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  connectedButton: {
    alignContent: "center",
    backgroundColor: "#DDDDDD",
    padding: 3
  }
});

export default function Wallet () {
  return (
    <WalletConnectProvider>
      <WalletConnect />
    </WalletConnectProvider>
  );
}