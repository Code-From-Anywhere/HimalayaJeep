import { useCallback, useEffect, useState } from "react";
import { useLoader } from "../hooks/useLogin";
import { View, Text } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import LottieView from "lottie-react-native";
import { ScreenOptions } from "../Types";
import { resetStackTo } from "../Util";
import { useNavigation } from "@react-navigation/native";
import { useMe } from "../hooks/useMe";
import { useStore } from "../Store";

export const LoaderScreen = () => {
  const [time] = useState<number>(Date.now());
  const navigation = useNavigation<any>();
  const me = useMe();
  const [loginToken, _, { hydrated }] = useStore("loginToken");

  useEffect(() => {
    if (hydrated && ((me.isFetched && !me.isLoading) || !loginToken)) {
      const diff = Date.now() - time;
      const remaining = 1000 - diff;
      const to = me.data?.me ? "MenuScreen" : "LoginScreen";
      setTimeout(
        () => {
          resetStackTo(to, navigation);
        },
        remaining > 0 ? remaining : 0
      );
    }
  }, [me.isFetched, me.data?.me, loginToken, hydrated]);

  // skip default splash screen
  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
      }}
      onLayout={onLayoutRootView}
    >
      <Text
        style={{
          color: "white",
          fontWeight: "700",
          fontSize: 40,
        }}
      >
        Welcome to King
      </Text>
      <LottieAnimation />
    </View>
  );
};

const LottieAnimation = () => {
  return (
    <View style={{ height: 400, width: 400 }}>
      <LottieView source={require("../../assets/crown.json")} autoPlay loop />
    </View>
  );
};

LoaderScreen.options = {
  title: "",
  headerStyle: {
    backgroundColor: "#000",
  },
} as ScreenOptions;
