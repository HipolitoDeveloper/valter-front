import React, { useContext, useState } from "react";

import { Container, InputAutoComplete, InputContainer, InputContent } from "./style";

import { OptionListModal } from "../Modals/OptionListModal";

import PropTypes from "prop-types";
import { ShopListContext } from "../../contexts/ShopList/ShopListContext";

export const AutoCompleteInput = ({ isFromStock }) => {
  const { loadShopList } = useContext(ShopListContext);

  const [search, setSearch] = useState("");
  const [isShowingModal, setShowingModal] = useState(false);

  const openModal = () => {
    if (search) {
      setShowingModal(true);
    } else {
      setShowingModal(false);
    }
  };

  function handleModal() {
    setShowingModal(!isShowingModal);
    setSearch("");
    loadShopList();
  }

  return (
    <Container>
      <OptionListModal
        search={search}
        setSearch={setSearch}
        isFromStock={isFromStock}
        isShowingModal={isShowingModal}
        handleModal={handleModal}
      />

      <InputContainer
        style={
          isFromStock
            ? { borderBottomColor: "#FFF" }
            : { borderBottomColor: "#4ABFBF" }
        }>
        <InputContent>
          <InputAutoComplete
            style={isFromStock ? { color: "#FFF" } : { color: "#4ABFBF" }}
            placeholder="O que você vai comprar hoje?"
            placeholderTextColor={isFromStock ? "#FFF" : "#4ABFBF"}
            value={search}
            onChangeText={(text) =>
              setSearch(text)
            }
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
  refreshItemList: () => {
  },
  isFromStock: false,
};
