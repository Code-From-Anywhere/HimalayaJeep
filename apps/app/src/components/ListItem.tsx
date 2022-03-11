/**
 * List that can be used in all List screens
 */

import * as React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import Text from "./Text";
import { Entypo } from "@expo/vector-icons";
import { Div } from "react-with-native";
import { Image } from "react-native";
export interface MenuItemProps {
  onClick: () => void;
  label: string | JSX.Element;
  subtitle?: string;
  disabled?: boolean;
  image?: string;
}

export const ListItem = ({
  onClick,
  label,
  subtitle,
  disabled,
  image,
}: MenuItemProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onClick}
      style={{
        alignItems: "center",
        backgroundColor: "#fff",
        borderBottomWidth: 0.3,
        borderColor: "#ccc",
        flexDirection: "row",
        height: 64,
        justifyContent: "space-between",
        paddingLeft: 16,
        paddingRight: 24,
      }}
    >
      <Div className="flex flex-row items-center">
        {image ? (
          <Image
            //src={image}
            width={32}
            height={32}
            source={{ uri: image }}
            //className="rounded-full mr-3"
          />
        ) : null}
        {typeof label === "string" ? (
          <Div>
            <Text className={`${disabled ? "text-gray-500" : ""}`}>
              {label}
            </Text>
            {subtitle ? (
              <Text
                native={{ numberOfLines: 1, ellipsizeMode: "tail" }}
                className="text-gray-300"
              >
                {subtitle}
              </Text>
            ) : null}
          </Div>
        ) : (
          label
        )}
      </Div>
      <Entypo
        name="chevron-right"
        size={24}
        color={disabled ? "gray" : "black"}
      />
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  container: { flex: 1 },
});
