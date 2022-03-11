import { ScrollView, StyleProp, View, ViewStyle } from "react-native";
// import { Div } from "react-with-native";

const Layout = ({
  children,
  container,
  scroll,
  style,
  dark,
}: {
  dark?: boolean;
  children: any;
  container?: boolean;
  scroll?: boolean;
  style?: StyleProp<ViewStyle>;
}) => {
  const ViewOrScrollView = scroll ? ScrollView : View;
  return (
    <ViewOrScrollView
      style={[
        style,
        {
          flex: 1,
          padding: container ? 12 : 0,
          backgroundColor: dark ? "black" : undefined,
        },
      ]}
    >
      {children}
    </ViewOrScrollView>
  );
};

export default Layout;
