import React, {useEffect, useState} from 'react'

import {Container,
        Header,
        OptionContent, 
        OptionText, 
        PickerContainer, 
        AddButtom,
        InputContainer,
        InputContent,
        InputAutoComplete,
        ContainerChips} from './style'

import {Modal, TouchableOpacity, StyleSheet, View, Text} from 'react-native'
import { Picker } from '@react-native-picker/picker'

import MaterialChip from 'react-native-material-chip'
import Icon from 'react-native-vector-icons/FontAwesome'

import data from '../../../data'
import Parse from "parse/react-native.js";


export default props => {  
    const array = [{id: 1, label: '0', value: 0},{id: 2, label: '1',  value: 1}, {id: 3, label: '2',  value: 2}, {id: 4, label: '3',  value: 3}];      



   //Variáveis da lógica de add Item
    const [searchedItem, setSearchedItem] = useState('')
    const [chosenItems, setChosenItems] = useState([])

    //Lista principais 
    const[itensFiltered, setItensFiltered] = useState([]) //Lista de Visualização
    const[itensData, setItensData] = useState([]) //Array de Itens
    // const[itens, setItens] = useState([]);  

    function onOpenModal() {  
        setSearchedItem(props.searchedItem)
        loadItens();     
        
        
      
    }

    async function loadItens() {
   
        try {            
            const Item = Parse.Object.extend("itens")
            const queryItem = new Parse.Query(Item)
            queryItem.find().then((itens) => {                 
                buildCompleteList(props.searchedItem, itens)         
                setItensData(itens)       
            });    

        } catch (error) {
            alert(`Failed to retrieve the object, with error code: ${JSON.stringify(error.message)}`)
        }
    }

    function updateList(itensFiltered) {
        const listUpdated = itensFiltered.filter(d => d.get("descricao") != '')
        setItensFiltered(listUpdated)
    }

    function buildCompleteList(searchedItem, itens) {   
        // console.warn(props.listaCompraData)
        // itens.forEach((i, index) => {
        //     props.listaCompra.forEach(lc => {
        //         if(i.id == lc.get("item_id").id) {
        //             itens.splice(index, 1)
        //         }
        //     })
        // })


        if(searchedItem) {             
           
            const regex = new RegExp(`${searchedItem.trim()}`, 'i')
            let listFiltered;
            if(itens == null) {
               
                listFiltered = itensData.filter(i =>  i.get('descricao').search(regex) >= 0)     
            } else {
                listFiltered = itens.filter(i =>  i.get('descricao').search(regex) >= 0)  
            }               
            
            listFiltered.forEach(d => {
                d.set("isChose", false)
            });
            
            setItensFiltered(listFiltered)  
            setSearchedItem(searchedItem)        
            
             props.setSearchedItem(searchedItem)             
           
        } else {
            setItensFiltered([])
            setSearchedItem(searchedItem)                        
        }    
        
    }

//    async function changeItemQuantity(quantidade, item) {
//         const ItemUsuario = Parse.Object.extend("itens_usuarios")
//         const queryItemUsuario = new Parse.Query(ItemUsuario)           
//         queryItemUsuario.equalTo("item_id",  item)
//         const verificarItem = await queryItemUsuario.find();
       
//         if(verificarItem.length == 0) {
//             itensFiltered.map(d => {
//                 if(d.id == item.id) {
//                     d.set("itemQuantidade", quantidade)                
                   
//                     if(quantidade == 0 ) {                
//                         d.set("isChose", false)
//                     } else {                    
//                         d.set("isChose", true)
//                     }                  
//                 }
//             })         
          
//             updateList(itensFiltered);      
//         } else {
//             alert(`Item já existente na lista de compras, gostaria de excluir o item?`)

//         }
             
//     }

    async function changeItemQuantity(quantidade, item) {
        
        let verificarItem = [];
        if(props.isToStock) {

            const ItemUsuario = Parse.Object.extend("itens_usuarios")
            const queryItemUsuario = new Parse.Query(ItemUsuario)           
            queryItemUsuario.equalTo("item_id",  item)
            verificarItem = await queryItemUsuario.find();

        } else {

            const ListaCompraItem = Parse.Object.extend("listas_compras_itens")
            const queryListaCompraItem = new Parse.Query(ListaCompraItem)           
            queryListaCompraItem.equalTo("item_id",  item)
            verificarItem = await queryListaCompraItem.find();
        }
       
        if(verificarItem.length == 0) {
            itensFiltered.map(d => {
                if(d.id == item.id) {
                    d.set("itemQuantidade", quantidade)                
                   
                    if(quantidade == 0 ) {                
                        d.set("isChose", false)
                    } else {                    
                        d.set("isChose", true)
                    }                  
                }
            })         
          
            updateList(itensFiltered);      
        } else {
            alert(`Item já existente na lista de compras, gostaria de excluir o item?`)

        }
             
    }

    function createChosenItemsList(item) {
        chosenItems.push(item)
        setChosenItems(chosenItems)
        props.addItem(item)
        // console.warn(chosenItems)        
    }

    function deleteChosenItem(item) {
        chosenItems.forEach((i, index) => {
            if(item.id == i.id) {
                chosenItems.splice(index, 1)
            }
        })      
        setChosenItems(chosenItems)
        updateList(itensFiltered);  
    }

      

    return (
        <View>
            <Modal                
            animationType='slide'
            transparent={true}           
            visible={props.modalVisible} 
            onShow={() => {onOpenModal()}}               
            onRequestClose={() => {
                props.closeModal()
                setChosenItems([])
                setItensFiltered([])                   
            }}>
                <Container>
                    <TouchableOpacity onPress={() => {
                            props.closeModal()
                            setChosenItems([])
                            setItensFiltered([]) }}>
                        <Header>                            
                            <Icon name='angle-double-down' size={20} color='black'  />                                                
                        </Header>
                    </TouchableOpacity>
                    <InputContainer >  
                        <InputContent>
                            <InputAutoComplete 
                                    placeholder="Procure o item desejado abaixo..."
                                    value={searchedItem}                                
                                    onChangeText={(text) => buildCompleteList(text, null)}
                                    autoFocus = {true}  
                                    >                            
                                </InputAutoComplete>    
                        </InputContent>                
                    
                    </InputContainer> 

                    {itensFiltered?.map((item, index) => {
                        return(
                            <OptionContent key={index}>

                                {item.get("isChose") && 
                                <TouchableOpacity onPress={() => createChosenItemsList(item)}>
                                    <Icon name='plus' size={20} color='white'  />
                                </TouchableOpacity>}

                                <OptionText style={item.get("isChose") ? {color:'#FFF'}:{color: '#C3EAEA'}}>
                                    {item.get('descricao')}
                                </OptionText>
                                <Picker    
                                    mode={'dropdown'}
                                    dropdownIconColor='#68CACA'                                            
                                    style={[item.get("isChose") ? {color:'#FFF'}:{color: 'black'}, styles.picker]}
                                
                                    selectedValue = {item.get("itemQuantidade")}
                                    onValueChange={(itemValue, itemIndex) => changeItemQuantity(itemValue, item)}
                                    >
                                        {array.map((picker, index) => {                        
                                            return (<Picker.Item label={`${picker.label}`} value={picker.value} key={index}/>)
                                        })}                  
                                </Picker>     
                        </OptionContent>        
                        )
                    })}     
                    {/* <ContainerChips>
                        {chosenItems.map((item, index) => {
                            return(                             
                            <MaterialChip
                            key={index}
                            text={item.itemDescription}
                            checked={true}                          
                            onDelete={() => deleteChosenItem(item)}                      
                            />   
                        )})
                    }
                    </ContainerChips>                                             */}
                </Container>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({    
    picker: {
        height: 20, 
        width: 90, 
        // position: 'absolute',
        // right: 90,
    }, 
 
  
})