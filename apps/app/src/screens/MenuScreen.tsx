import { Button as RWNButton } from "react-with-native";
import Layout from "../components/Layout";
import { ScreenOptions } from "../Types";
import { MaterialIcons } from "@expo/vector-icons";
import { useLogin } from "../hooks/useLogin";
import { useNavigation } from "@react-navigation/native";
import { Div } from "react-with-native";
import { ListItem } from "../components/ListItem";
import { useMessagePresets } from "../hooks/useMessagePresets";

type MenuType = {
  title: string;
  screen?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const menu: MenuType[] = [
  {
    title: "My network",
    screen: "PersonList",
  },

  {
    title: "Feed",
    screen: "FeedScreen",
    disabled: false,
  },

  {
    title: "Post Planning",
    screen: "PostScreen",
    disabled: false,
  },

  {
    title: "Datapoints Configuration",
    screen: "DataPointList",
  },

  {
    title: "Message Presets",
    screen: "MessagePresetList",
  },

  {
    title: "Statistics",
    screen: "StatsScreen",
    disabled: false,
  },

  {
    title: "Your Teams",
    screen: "TeamList",
  },
];

export const MenuScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <Layout>
      <Div className={"flex-col flex-1"}>
        {menu.map((menuItem) => {
          return (
            <ListItem
              key={`menu${menuItem.screen}`}
              label={menuItem.title}
              disabled={menuItem.disabled}
              onClick={() =>
                menuItem.screen
                  ? navigation.navigate(menuItem.screen)
                  : menuItem.onClick?.()
              }
            />
          );
        })}
      </Div>
    </Layout>
  );
};

MenuScreen.options = () => {
  const navigation = useNavigation<any>();
  return {
    headerRight: () => {
      return (
        <RWNButton onClick={() => navigation.navigate("UserProfile")}>
          <MaterialIcons name="person" size={24} color="black" />
        </RWNButton>
      );
    },
    title: "King",
  } as ScreenOptions;
};
