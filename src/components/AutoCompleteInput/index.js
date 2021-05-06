import React, { useState, useEffect } from 'react'

import {
    Container,
    InputAutoComplete,
    InputContainer,
    InputContent,

} from './style'

import {OptionListModal} from '../Modals/OptionListModal'

import PropTypes from "prop-types";



export const AutoCompleteInput = ({refreshItemList, isToStock, isToRecipe, addItem }) => {

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
        addItem(objItem, objItemInformation);
        setSearchedItem('')
    }

    function closeModal() {
        setShowingModal(false);
        refreshItemList();
    }

    return(

        <Container>
            <OptionListModal
            isToStock={isToStock}
            isToRecipe={isToRecipe}
            isShowingModal={isShowingModal}
            strSearchedItem={strSearchedItem}
            onCloseModal = {closeModal}
            addChosenItem={addChosenItem}
            updateSearchedItem={setSearchedItem}
           />

                <InputContainer style={isToStock? {borderBottomColor:'#FFF'}: {borderBottomColor:'#4ABFBF'}}>
                    <InputContent >
                        <InputAutoComplete
                                style={isToStock? {color: '#FFF'}:{color: '#4ABFBF'}}
                                placeholder="O que você vai comprar hoje?"
                                placeholderTextColor={isToStock? '#FFF':'#4ABFBF'}
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

AutoCompleteInput.propTypes = {
    refreshItemList: PropTypes.func,
    isToStock: PropTypes.bool,
    isToRecipe: PropTypes.bool,
    addItem: PropTypes.func,
};

AutoCompleteInput.defaultProps = {
    refreshItemList: () => {},
    isToStock: false,
    isToRecipe: false,
    addItem: () => {}
};
