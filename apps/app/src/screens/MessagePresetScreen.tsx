import { MessagePresetType } from "core";
import Layout from "../components/Layout";
import { ScreenOptions } from "../Types";
import { Form, makeField } from "../components/Form";
import { api } from "ui";
import useStore from "../Store";
import { AntDesign } from "@expo/vector-icons";
import { Button as RWNButton } from "react-with-native";

import { useMessagePresets } from "../hooks/useMessagePresets";
import { useNavigation } from "@react-navigation/native";

export const MessagePresetScreen = ({ route }: { route: any }) => {
  const messagePreset: MessagePresetType | undefined =
    route.params?.messagePreset;
  const messagePresets = useMessagePresets();
  const navigation = useNavigation();

  const [loginToken] = useStore("loginToken");
  const fields = [
    makeField("text", {
      field: "title",
      title: "Title",
      extra: {
        placeholder: "Title",
      },
      hasError: (value) => (!value ? "Fill in a title" : false),
    }),
    makeField("text", {
      field: "message",
      title: "Message",
      extra: {
        placeholder: "Message Preset",
      },
      hasError: (value) => (!value ? "Please fill in a message" : false),
    }),
  ];

  return (
    <Layout container>
      <Form<{
        title: string;
        message: string;
      }>
        fields={fields}
        onSubmit={async (values, resolve, reject) => {
          if (!loginToken) return reject("Please login");

          const { message, title } = values;
          const { response, success } = await api(
            "upsertMessagePreset",
            "POST",
            {
              loginToken,
              id: messagePreset?.id,
              messagePreset: { message, title },
            }
          );
          if (success) {
            resolve(response);
            messagePresets.refetch();
            navigation.goBack();
          } else {
            reject(response);
          }
        }}
        initialValues={{
          message: messagePreset?.message,
          title: messagePreset?.title,
        }}
      />
    </Layout>
  );
};

MessagePresetScreen.options = ({ route }: { route: any }) =>
  ({
    title: route.params?.messagePreset?.title || "New Message Preset",
    headerRight: () => {
      const [loginToken] = useStore("loginToken");
      const messagePresets = useMessagePresets();
      const navigation = useNavigation();
      const id = route.params?.messagePreset?.id;
      const deleteItem = async () => {
        if (loginToken && id) {
          const deleteResult = await api("deleteMessagePreset", "POST", {
            id,
            loginToken,
          });
          if (deleteResult.success) {
            messagePresets.refetch();
            navigation.goBack();
          }
        }
      };
      return id ? (
        <RWNButton onClick={deleteItem}>
          <AntDesign name="delete" size={24} color="black" />
        </RWNButton>
      ) : null;
    },
  } as ScreenOptions);
