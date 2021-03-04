import React, {useState, useEffect} from 'react'
import {Picker} from '@react-native-picker/picker'

import {   
    FlatList,
    StyleSheet,
    View, 
    Text,
    TouchableOpacity
    } from 'react-native'

import {Container, ItemContainer, ItemContent, ItemDescription, PickerContainer, TitleContainer, TitleContent, TitleDescription } from './style'
import Icon from 'react-native-vector-icons/FontAwesome'
import Swipeable from 'react-native-gesture-handler/Swipeable'


export default props => {

    const [selectedValue, setSelectedValue ] = useState(0);
    const [list, setList] = useState({});   
      
    const array = 
    [{id: 1, label: '1'}, 
    {id: 2, label: '2'}, 
    {id: 3, label: '3'}, 
    {id: 4, label: '4'},
    {id: 5, label: '5'}, 
    {id: 6, label: '6'}, 
    {id: 7, label: '7'}, 
    {id: 8, label: '8'}, 
    {id: 9, label: '9'}, 
]; 
   

    const getRightContent = (item) => {
        return ( 
            props.addItem &&
                <TouchableOpacity style={styles.left}
                onPress={() => props.addItem && props.addItem(item)}>           
                    <Icon name="plus" size={30} color='#FFF' />
                </TouchableOpacity> 
        )
    }

    const getLeftContent = () => {
        return ( 
            <View style={styles.right}>
                <Icon name="trash" size={20} color='#FFF' style={styles.excludeIcon} />
                <Text style={styles.excludeText}>Excluir</Text>
            </View>
        )
    } 
    return(                     
        <Container>
                
            <TitleContainer>
                <TitleContent>
                    <TitleDescription>{props.categoria.get("nome")}</TitleDescription>
                </TitleContent>
            </TitleContainer>                
            <FlatList                        
            data={props.categoria.get("itens")} 
            keyExtractor={i => `${i.id}`}
            renderItem={({item}) => 

        
            <Swipeable
            renderRightActions={() => getRightContent(item)}       
            renderLeftActions={getLeftContent}           
            onSwipeableLeftOpen={() => props.onDelete && props.onDelete(item.id)}
            >
                <ItemContainer>                    
                    <ItemContent> 
                        <ItemDescription >{item.get("item_id").get("descricao")}</ItemDescription>     

                        <PickerContainer>
                            <Picker 
                                mode={'dropdown'}
                                key={item.id}
                                style={styles.picker}
                                selectedValue = {item.get("quantidade")}
                                onValueChange={(itemValue, itemIndex) => props.setQuantityValue(item.id, itemValue)}>
                                    {array.map((picker, index) => {                        
                                        return (<Picker.Item label={`${picker.label}`} value={picker.id} key={item.id}/>)
                                    })}                  
                            </Picker>  
                        </PickerContainer>               
                    </ItemContent>
                </ItemContainer>
            </Swipeable>
        }/>
        </Container>        
    )  
  
}

const styles = StyleSheet.create({
    picker: {  
        height: 40, 
        width: 75,         
       
    }, 
    left: {
        backgroundColor: '#68CACA',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    },
    right: {
        flex: 1,
        backgroundColor: '#68CACA',
        flexDirection: 'row',
        alignItems: 'center'
    },
    excludeText: {   
        color: '#FFF',
        fontSize: 20,
        margin: 10
    },
    excludeIcon: {
        marginLeft: 10
    }
})

