import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import TabArticles from './TabArticles'
import SaveArticle from '../pages/SaveArticle'

const StackSaveArticle = createStackNavigator({
    TabArticles: {screen: TabArticles, navigationOptions: { headerShown: false }},
    SaveArticle: {screen: SaveArticle, navigationOptions: { headerShown: false }}
},

{
    initialRouteName: 'TabArticles'
})

export default createAppContainer(StackSaveArticle)