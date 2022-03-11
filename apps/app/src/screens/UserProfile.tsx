import React, { useEffect } from "react";
import { Button as RWNButton, Div } from "react-with-native";
import { useLogin } from "../hooks/useLogin";
import { MaterialIcons } from "@expo/vector-icons";
import Layout from "../components/Layout";
import Text from "../components/Text";
import { View } from "react-native";
import { useStore } from "../Store";
import { useMe } from "../hooks/useMe";

export function UserProfile() {
  const { setLogin } = useLogin();
  const logout = () => setLogin(null);
  const { data } = useMe();
  return (
    <Layout>
      <View
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialIcons name="account-circle" size={60} color="#7e7e7e" />
        <View style={{ marginTop: 5 }}>
          {data?.me?.email && (
            <Text style={{ marginTop: 10 }}>{data.me.email}</Text>
          )}
        </View>
        <View style={{ marginTop: 20 }}>
          <RWNButton onClick={logout} className="flex flex-row mt-[10px]">
            <Text>Logout</Text>
            <MaterialIcons name="logout" size={24} color="black" />
          </RWNButton>
        </View>
      </View>
    </Layout>
  );
}
