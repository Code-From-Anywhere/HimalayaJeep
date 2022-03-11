import Layout from "../components/Layout";
import { ScreenOptions } from "../Types";
import { Form, makeField } from "../components/Form";
import { isEmail, isValidVarchar } from "../Util";
import { useLogin } from "../hooks/useLogin";
import { api } from "ui";
import { getRenderInputContainer } from "../components/Form/getRenderInputContainer";

export const VerifyScreen = ({
  route,
}: {
  route: { params: { email: string } };
}) => {
  const login = useLogin();
  const fields = [
    makeField("text", {
      field: "code",
      title: "Code",
      extra: {
        placeholder: "Code",
      },
      hasError: (value) =>
        !isValidVarchar(value as string, false) ? "Fill in your code" : false,
    }),
  ];

  return (
    <Layout container dark>
      <Form<{
        code: string;
      }>
        renderInputContainer={getRenderInputContainer({ dark: true })}
        fields={fields}
        onSubmit={async (values, resolve, reject) => {
          const { code } = values;
          const { response, success, loginToken } = await api(
            "activate",
            "POST",
            {
              code,
              email: route.params.email,
            }
          );
          if (success && loginToken) {
            resolve(response);
            login.setLogin(loginToken);
          } else {
            reject(response);
          }
        }}
      />
    </Layout>
  );
};

VerifyScreen.options = {
  headerTitle: "Verify",
} as ScreenOptions;
