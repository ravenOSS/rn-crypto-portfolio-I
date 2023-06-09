import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'

// This code creates a tab navigator with two screens, Home and Market. The Home screen is imported from the HomeScreen file and the Market screen is imported from the MarketListingScreen file. The TabNavigation function returns the tab navigator with the two screens.
import Home from '../screens/HomeScreen'
import CreateAsset from '../screens/AssetManager'
import MarketFlatListScreen from '../screens/MktListingFlatlist'
import MarketQuoteScreen from '../screens/MktQuoteFlatlist'

const Tab = createMaterialBottomTabNavigator()

function TabNavigation() {
	return (
		<Tab.Navigator>
			<Tab.Screen name='Home' component={Home} />
			{/* <Tab.Screen name='Market' component={MarketListing} /> */}
			<Tab.Screen name='FlatList' component={MarketFlatListScreen} />
			<Tab.Screen name='Portfolio' component={CreateAsset} />
			<Tab.Screen name='MarketQuote' component={MarketQuoteScreen} />
		</Tab.Navigator>
	)
}

export default TabNavigation
