import { Form, makeField } from "./index";
import { isEmail } from "core";
import { isValidVarchar } from "../../Util";
import { api } from "ui";

import { useLogin } from "../../hooks/useLogin";
const LoginForm = () => {
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
    <Form<{ email: string; password: string }>
      fields={fields}
      onSubmit={async (values, resolve, reject) => {
        const { response, success, loginToken } = await api("login", "POST", {
          email: values.email,
          password: values.password,
        });

        if (success && loginToken) {
          resolve(response);
          login.setLogin(loginToken);
        } else {
          reject(response);
        }
      }}
    />
  );
};

export default LoginForm;
