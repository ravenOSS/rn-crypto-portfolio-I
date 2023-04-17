import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'

// This code creates a tab navigator with two screens, Home and Market. The Home screen is imported from the HomeScreen file and the Market screen is imported from the MarketListingScreen file. The TabNavigation function returns the tab navigator with the two screens.
import Home from '../screens/HomeScreen'
import MarketListing from '../screens/MarketListingScreen'
import CreateAsset from '../screens/AssetManager'

const Tab = createMaterialBottomTabNavigator()

function TabNavigation() {
	return (
		<Tab.Navigator>
			<Tab.Screen name='Home' component={Home} />
			<Tab.Screen name='Market' component={MarketListing} />
			<Tab.Screen name='Portfolio' component={CreateAsset} />
		</Tab.Navigator>
	)
}

export default TabNavigation
