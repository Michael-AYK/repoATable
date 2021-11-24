import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import InsideStack from './InsideStack'
import LoginScreen from '../pages/LoginScreen'
import Inscription from '../pages/Inscription'
import ClientDrawer from './ClientDrawer'

const FirstStack = createStackNavigator({
    LoginScreen: {screen: LoginScreen, navigationOptions: { headerShown: false }},
    Inscription: {screen: Inscription, navigationOptions: { headerShown: false }},
    InsideStack: {screen: InsideStack, navigationOptions: { headerShown: false }},
    ClientDrawer: {screen: ClientDrawer, navigationOptions: { headerShown: false }},
},

{
    initialRouteName: 'LoginScreen'
})

export default createAppContainer(FirstStack)