import React from 'react';
import {TouchableOpacity} from 'react-native'
import {TabArea, TabItem, TabItemCenter} from './style'
import Icon from 'react-native-vector-icons/FontAwesome'


export default ({ state, navigation }) => {

    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    return (
        <TabArea>
            <TabItem onPress={()=>goTo('Home')}>
              <Icon style={{color: state.index ===0? '#4ABFBF' : '#E0D9D9'}} name='cart-plus' size={32} color='white'  />
            </TabItem>
            <TabItem onPress={()=>goTo('Stock')}>
              <Icon style={{color: state.index===1? '#4ABFBF' : '#E0D9D9'}} name='bars' size={32} color='white'  />
            </TabItem>
            <TabItem onPress={()=>goTo('Recipes')}>
              <Icon style={{color: state.index===2? '#4ABFBF' : '#E0D9D9'}} name='book' size={32} color='white'  />
            </TabItem>
            <TabItem onPress={()=>goTo('Notification')}>
              <Icon style={{color: state.index===3? '#4ABFBF' : '#E0D9D9'}} name='comments' size={32} color='white'  />
            </TabItem>
        </TabArea>
    );
}
