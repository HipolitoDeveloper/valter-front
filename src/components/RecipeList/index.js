import React from "react";

import {
  ContentAble,
  ContentDisable,
  ContentObservationDisable,
  ContentTextContainer,
  ContentTitleAble,
  ContentTitleDisable,
  List,
  ListContainer,
} from "./style";

import Icon from "react-native-vector-icons/FontAwesome5";

export const RecipeList = ({arrRecipes})  => {

  const renderContent = arrRecipes?.map((item) => (
    item.get("permitir_online") ?
      <ContentAble key={`${item.id}`}>
        <Icon name={"book"} color={"#4ABFBF"} size={30} />
        <ContentTitleAble>
          {item.get("nome")}
        </ContentTitleAble>
      </ContentAble>
      :
      <ContentDisable key={`${item.id}`}>
        <Icon name={"book"} color={"#7D7575"} size={30} />
        <ContentTextContainer>
          <ContentTitleDisable>
            {item.get("nome")}
          </ContentTitleDisable>
          <ContentObservationDisable>
            Está faltando achocolatado, creme de leite
          </ContentObservationDisable>
        </ContentTextContainer>
      </ContentDisable>
  ));


    return (
        <ListContainer>
            <List>
              {renderContent}
            </List>
        </ListContainer>

    )
}
