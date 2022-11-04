import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NewPool, Pools } from '../screens';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <Navigator>
      <Screen
        name='new'
        component={NewPool}
      />

      <Screen
        name='pools'
        component={Pools}
      />
    </Navigator>
  )
}