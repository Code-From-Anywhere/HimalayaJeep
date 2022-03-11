import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export type ScreenOptions =
  | NativeStackNavigationOptions
  | ((props: any) => NativeStackNavigationOptions)
  | undefined;
