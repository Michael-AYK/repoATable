import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import TabNavigation from './TabNavigation'
import Profil from '../pages/Profil'
import CategStack from './CategStack'
import SaveArticle from '../pages/SaveArticle'
import SaveComplements from '../pages/SaveComplements'

const InsideStack = createStackNavigator({
    Profil: {screen: Profil, navigationOptions: { headerShown: false }},
    TabNavigation: {screen: TabNavigation, navigationOptions: { headerShown: false }},
    CategStack: {screen: CategStack, navigationOptions: {headerShown: false}},
    SaveArticle: {screen: SaveArticle, navigationOptions: {headerShown: false}},
    SaveComplements: {screen: SaveComplements, navigationOptions: {headerShown: false}}
},

{
    initialRouteName: 'TabNavigation'
})

export default createAppContainer(InsideStack)