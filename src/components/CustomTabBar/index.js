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
                <Icon style={{opacity: state.index===0? 1 : 0.5}} name='home' size={32} color='white'  />                                                
            </TabItem>
            <TabItemCenter>
                <TouchableOpacity onPress={()=>goTo('Stock')}>
                    <Icon name='plus' style={{opacity: state.index===1? 1 : 0.5}} size={32} color='#337984'  />    
                </TouchableOpacity>
            </TabItemCenter>    
            <TabItem onPress={()=>goTo('Recipe')}>
                <Icon style={{opacity: state.index===2? 1 : 0.5}} name='book' size={32} color='white'  />      
            </TabItem>                 
        </TabArea>
    );
}