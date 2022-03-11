import { Form, makeField } from "../components/Form";
import Layout from "../components/Layout";
import { useLogin } from "../hooks/useLogin";
import { ScreenOptions } from "../Types";
import { isEmail, isValidVarchar } from "../Util";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";

import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Image,
} from "react-native";
import { api } from "ui";
import { getRenderInputContainer } from "../components/Form/getRenderInputContainer";
import React from "react";

export const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const login = useLogin();
  const fields = [
    makeField("text", {
      field: "email",
      title: "Email",
      extra: {
        placeholder: "Email",
      },
      hasError: (value) =>
        !isValidVarchar(value as string, false)
          ? "Fill in an email"
          : !isEmail(value)
          ? "Fill in a correct email"
          : false,
    }),

    makeField("password", {
      field: "password",
      title: "Password",
      extra: {
        placeholder: "password",
      },
      hasError: (value) => (!value ? "Fill in a password" : false),
    }),
  ];

  return (
    <Layout container dark>
      <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ width: 50, height: 50 }}
            {...{
              resizeMode: "contain",
              source: require("../../assets/icon_transparent.png"),
            }}
          />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback>
            <Form<{ email: string; password: string }>
              fields={fields}
              submitButtonText={"Sign In"}
              onSubmit={async (values, resolve, reject) => {
                const { response, success, loginToken } = await api(
                  "login",
                  "POST",
                  values
                );
                if (success && loginToken) {
                  resolve(response);
                  login.setLogin(loginToken);
                } else {
                  reject(response);
                }
              }}
              renderInputContainer={getRenderInputContainer({ dark: true })}
            />
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <Button
          title="Sign up"
          onClick={() => navigation.navigate("SignupScreen")}
        />
      </View>
    </Layout>
  );
};

LoginScreen.options = {
  headerShown: false,
} as ScreenOptions;
