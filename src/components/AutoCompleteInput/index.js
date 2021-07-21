import React, {useState} from 'react';

import {
  Container,
  InputAutoComplete,
  InputContainer,
  InputContent,
} from './style';

import {OptionListModal} from '../Modals/OptionListModal';

import PropTypes from 'prop-types';

export const AutoCompleteInput = ({refreshItemList, isFromStock}) => {
  const [strSearchedItem, setSearchedItem] = useState('');

  const [isShowingModal, setShowingModal] = useState(false);

  const openModal = () => {
    if (strSearchedItem) {
      setShowingModal(true);
    } else {
      setShowingModal(false);
    }
  };

  function handleModal() {
    setShowingModal(!isShowingModal);
    setSearchedItem('');
    refreshItemList();
  }

  return (
    <Container>
      <OptionListModal
        isFromStock={isFromStock}
        isShowingModal={isShowingModal}
        strSearchedItem={strSearchedItem}
        handleModal={handleModal}
        handleSearchedItem={setSearchedItem}
      />

      <InputContainer
        style={
          isFromStock
            ? {borderBottomColor: '#FFF'}
            : {borderBottomColor: '#4ABFBF'}
        }>
        <InputContent>
          <InputAutoComplete
            style={isFromStock ? {color: '#FFF'} : {color: '#4ABFBF'}}
            placeholder="O que você vai comprar hoje?"
            placeholderTextColor={isFromStock ? '#FFF' : '#4ABFBF'}
            value={strSearchedItem}
            onChangeText={(text) => setSearchedItem(text)}
            onEndEditing={() => openModal()}
          />
        </InputContent>
      </InputContainer>
    </Container>
  );
};

AutoCompleteInput.propTypes = {
  refreshItemList: PropTypes.func,
  isFromStock: PropTypes.bool,
};

AutoCompleteInput.defaultProps = {
  refreshItemList: () => {},
  isFromStock: false,
};
