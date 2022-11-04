import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from 'native-base';
import { PlusCircle, SoccerBall } from "phosphor-react-native";
import { Platform } from 'react-native';

import { NewPool, Pools } from '../screens';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const { colors, sizes } =  useTheme()

  const size = sizes[6]

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarLabelPosition: 'beside-icon',
      tabBarActiveTintColor: colors.yellow[500],
      tabBarInactiveTintColor: colors.gray[300],
      tabBarStyle: {
        position: 'absolute',
        height: 60,
        borderTopWidth: 0,
        backgroundColor: colors.gray[800]
      },
      tabBarItemStyle: {
        position: 'relative',
        top: Platform.OS === 'android' ? -10 : 0
      }
    }}>
      <Screen
        name='new'
        component={NewPool}
        options={{
          tabBarIcon: ({color}) => <PlusCircle color={color} size={size} />,
          tabBarLabel: 'Bolão'
        }}
      />

      <Screen
        name='pools'
        component={Pools}
        options={{
          tabBarIcon: ({color}) => <SoccerBall color={color} size={size} />,
          tabBarLabel: 'Meus bolões'
        }}
      />
    </Navigator>
  )
}