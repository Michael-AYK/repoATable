import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import ListeCateg from '../pages/ListeCateg'
import SaveCateg from '../pages/SaveCateg'

const Categstack = createStackNavigator({
    ListeCateg: {screen: ListeCateg, navigationOptions: { headerShown: false }},
    SaveCateg: {screen: SaveCateg, navigationOptions: { headerShown: false }}    
},

{
    initialRouteName: 'ListeCateg'
})

export default createAppContainer(Categstack)