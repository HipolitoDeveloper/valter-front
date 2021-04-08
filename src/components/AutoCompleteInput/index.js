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
    const[strSearchedItem, setSearchedItem] = useState('');


    //Variáveis Boolean's
    const [isShowingModal, setShowingModal] = useState(false)



    function openModal() {
        if(strSearchedItem) {
            setShowingModal(true)
        } else {
            setShowingModal(false)
        }
    }


    function addChosenItem(objItem, objItemInformation) {
        props.addItem(objItem, objItemInformation);
        setSearchedItem('')
    }

    function closeModal() {
        setShowingModal(false);
        props.refreshItemList();
    }

    return(

        <Container>
            <OptionListModal
            isToStock={props.isToStock}
            isToRecipe={props.isToRecipe}
            isShowingModal={isShowingModal}
            strSearchedItem={strSearchedItem}
            onCloseModal = {closeModal}
            addChosenItem={addChosenItem}
            setSearchedItem={setSearchedItem}
           />

                <InputContainer style={props.isToStock? {borderBottomColor:'#FFF'}: {borderBottomColor:'#4ABFBF'}}>
                    <InputContent >
                        <InputAutoComplete
                                style={props.isToStock? {color: '#FFF'}:{color: '#4ABFBF'}}
                                placeholder="O que você vai comprar hoje?"
                                placeholderTextColor={props.isToStock? '#FFF':'#4ABFBF'}
                                value={strSearchedItem}
                                onChangeText={(text) => setSearchedItem(text)}
                                onEndEditing={() => openModal()}
                              >
                            </InputAutoComplete>
                    </InputContent>

                </InputContainer>
        </Container>


    )
}
