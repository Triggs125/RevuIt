import { createStackNavigator } from "@react-navigation/stack";
import { DashboardPage } from "./src/pages/dashboard/dashboard.page";
import { GroupPage } from "./src/pages/group/group.page";
import { AddGroupPage } from "./src/pages/add-group/add-group.page";
import { AddRevuPage } from "./src/pages/add-revu/add-revu.page";

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false
      }}
    >
      <>
        <Stack.Screen
          name="Dashboard"
          component={DashboardPage}
        />
        <Stack.Screen
          name="Group"
          component={GroupPage}
        />
        <Stack.Screen
          name="Create Group"
          component={AddGroupPage}
        />
        <Stack.Screen
          name="Create Revu"
          component={AddRevuPage}
        />
      </>
    </Stack.Navigator>
  )
}

export { Routes };
