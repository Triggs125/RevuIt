import { createStackNavigator } from "@react-navigation/stack";
import { RevusPage } from "./src/pages/all-revus/revus.page";
import { RevuPage } from "./src/pages/single-revu/revu.page";

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Revus"
      screenOptions={{
        headerShown: false
      }}
    >
      <>
        <Stack.Screen
          name="Revus"
          component={RevusPage}
        />
        <Stack.Screen
          name="Revu"
          component={RevuPage}
        />
      </>
    </Stack.Navigator>
  )
}

export { Routes };
