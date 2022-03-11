import Layout from "../components/Layout";
import { ScreenOptions } from "../Types";
import { Form, makeField } from "../components/Form";
import { isEmail, isValidVarchar, resetStackTo } from "../Util";
import { useNavigation } from "@react-navigation/native";
import { getRenderInputContainer } from "../components/Form/getRenderInputContainer";
import { api } from "ui";
export const SignupScreen = () => {
  const navigation = useNavigation<any>();

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

    makeField("password", { field: "password", title: "Password" }),
    makeField("password", {
      field: "repeatPassword",
      title: "Repeat password",
      hasError: (value, state) =>
        !isValidVarchar(value as string, false)
          ? "Fill in a password"
          : state.password !== value
          ? "Those passwords don't match"
          : false,
    }),
    makeField("toggle", {
      field: "subscribeToNewsletter",
      title: "Newsletter?",
    }),
  ];

  console.log("SINGUP FIELDS", fields);

  return (
    <Layout container dark>
      <Form<{
        email: string;
        subscribeToNewsletter: boolean;
        password: string;
        repeatPassword: string;
      }>
        renderInputContainer={getRenderInputContainer({ dark: true })}
        fields={fields}
        onSubmit={async (values, resolve, reject) => {
          const { repeatPassword, email, ...signupValues } = values;
          const { response, success } = await api("signup", "POST", {
            ...signupValues,
            email,
            source: "app",
          });
          if (success) {
            resolve(response);
            navigation.navigate("VerifyScreen", { email });
          } else {
            reject(response);
          }
        }}
      />
    </Layout>
  );
};

SignupScreen.options = {
  headerTitle: "Sign up",
  headerBackTitle: "Login",
  headerStyle: { backgroundColor: "black" },
  headerTintColor: "white",
} as ScreenOptions;
