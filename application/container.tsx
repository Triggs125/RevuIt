import { NavigationContainer } from "@react-navigation/native";
import { useTheme } from "./utils/theme";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Routes } from "./routes";

const Drawer = createDrawerNavigator();

const Container = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer
      theme={theme as any}
    >
      <Drawer.Navigator
        initialRouteName="Routes"
        screenOptions={{
          drawerPosition: 'left',
          drawerType: 'front',
          overlayColor: theme.colors.background,
          headerShown: false
        }}
      >
        <Drawer.Screen
          name="Routes"
          component={Routes}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export { Container };
