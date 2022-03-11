import { MessagePresetType, OrderDirection } from "core";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { FlatList } from "react-native";
import { useInfiniteQuery } from "react-query";
import { ActivityIndicator, Div } from "react-with-native";
import Layout from "../components/Layout";
import { ListItem } from "../components/ListItem";
import { useLogin } from "../hooks/useLogin";
import { ScreenOptions } from "../Types";
import { api } from "ui";
import { useMessagePresets } from "../hooks/useMessagePresets";

export const MessagePresetItem = ({ item }: { item: MessagePresetType }) => {
  const navigation = useNavigation<any>();
  return (
    <ListItem
      label={item.title}
      subtitle={item.message}
      onClick={() =>
        navigation.navigate("MessagePresetScreen", { messagePreset: item })
      }
    />
  );
};
export const MessagePresetList = () => {
  const messagepresets = useMessagePresets();

  const allMessagePresets = messagepresets.data?.pages.reduce(
    (all, page) => all.concat(page?.messagePresets || []),
    [] as MessagePresetType[]
  );

  const navigation = useNavigation<any>();
  return (
    <Layout>
      <FlatList
        data={allMessagePresets || []}
        onRefresh={() => messagepresets.refetch()}
        refreshing={messagepresets.isRefetching}
        renderItem={({ item }) => (
          <MessagePresetItem key={`item${item.id}`} item={item} />
        )}
        ListFooterComponent={() => {
          return (
            <Div>
              <ListItem
                label={"New Message Preset"}
                onClick={() => navigation.navigate("MessagePresetScreen")}
              />
              {messagepresets.isLoading ? <ActivityIndicator /> : null}
            </Div>
          );
        }}
      />
    </Layout>
  );
};

MessagePresetList.options = {
  title: "Message Presets",
} as ScreenOptions;
