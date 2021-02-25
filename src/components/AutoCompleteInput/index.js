import React, { useState, useEffect } from 'react'

import {    
    Container,
    InputAutoComplete, 
    InputContainer,
    InputContent,
   
} from './style'

import OptionListModal from '../Modals/OptionListModal'



export default props => {
   
    //Variáveis da lógica de add Item
    const[searchedItem, setSearchedItem] = useState('');  
    
   
    //Variáveis Boolean's
    const [modalVisible, setModalVisible] = useState(false)

     

    function openOptionsModal() {     
        if(searchedItem) {
            setModalVisible(true)        
        } else {
            setModalVisible(false)
        }       
    }
    
   
    function addChosenItem(item) {    
        props.changeData(item, item.get("itemQuantidade"));
        setSearchedItem('')
          
      
    }
   
    function onCloseModal() {
        setModalVisible(false);    
        props.refreshListaCompras();    
    }

    return(
        
        <Container>    
            <OptionListModal
            isToStock={props.isToStock}
            modalVisible={modalVisible} 
            searchedItem={searchedItem} 
            closeModal = {onCloseModal}
            addItem={addChosenItem}
            setSearchedItem={setSearchedItem}
           />   
                                                                                                                                                                                                                                                                                                                                                                                       
                <InputContainer >  
                    <InputContent>
                        <InputAutoComplete 
                                placeholder="Do que você precisa?"
                                value={searchedItem}                                                          
                                onChangeText={(text) => setSearchedItem(text)}
                                onEndEditing={(text) => openOptionsModal(text)}
                              >                            
                            </InputAutoComplete>    
                    </InputContent>                
                  
                </InputContainer>   
        </Container>       

       
    )
}
