import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Home from '../screens/HomeScreen'
import MarketListing from '../screens/MarketListingScreen'
// import MarketListing from '../screens/MarketListingScreen'

const Tab = createMaterialBottomTabNavigator()

function TabNavigation() {
	return (
		<Tab.Navigator>
			<Tab.Screen name='Home' component={Home} />
			<Tab.Screen name='Market' component={MarketListing} />
		</Tab.Navigator>
	)
}

export default TabNavigation
