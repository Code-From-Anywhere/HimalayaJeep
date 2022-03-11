import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { StoreProvider } from "./Store";
import * as Screens from "./screens";
import { TailwindProvider } from "tailwind-rn";
import utilities from "../tailwind.json";

const Stack = createNativeStackNavigator();

import { QueryClient, QueryClientProvider } from "react-query";
import { ScreenOptions } from "./Types";

// Create a client
const queryClient = new QueryClient();
console.log("Screens", Screens);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TailwindProvider utilities={utilities}>
        <StoreProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="LoaderScreen">
              {Object.keys(Screens).map((screen) => {
                // @ts-ignore
                const component = Screens[screen];
 
                //@ts-ignore
                const options: ScreenOptions = Screens[screen].options;
                return (
                  <Stack.Screen
                    key={`Screen${screen}`}
                    name={screen}
                    component={component}
                    options={options}
                  />
                );
              })}
            </Stack.Navigator>
          </NavigationContainer>
        </StoreProvider>
      </TailwindProvider>
    </QueryClientProvider>
  );
}

export default App;
