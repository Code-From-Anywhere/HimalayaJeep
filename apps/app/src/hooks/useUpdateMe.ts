import { useEffect } from "react";
import { AppState } from "react-native";
import useStore from "../Store";
import { useMe } from "./useMe";

export const useUpdateMe = () => {
  const me = useMe();
  const [loginToken] = useStore("loginToken");
  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState: string) => {
    if (nextAppState === "active") {
      me.refetch();
    }
  };

  useEffect(() => {
    me.refetch();
  }, [loginToken]);
};
