import React from 'react'
import { FlatList, Text } from "react-native";

import {
  ListContainer,
  List,
  Container,
  ContentAble,
  ContentTitleAble,
  ContentDisable,
  ContentTextContainer,
  ContentTitleDisable,
  ContentObservationDisable,
  CreateRecipeContainer, CreateRecipeText,
} from './style'

import Icon from "react-native-vector-icons/FontAwesome5";

export default props => {

  const renderContent = ({item}) => {
    if(item.get("permitir_online") === true) {
      return (
        <ContentAble>
          <Icon name={'book'} color={'#4ABFBF'} size={30} />
          <ContentTitleAble>
            {item.get("nome")}
          </ContentTitleAble>
        </ContentAble>
      )
    } else {
      return (
        <ContentDisable>
          <Icon name={'book'} color={'#7D7575'} size={30} />
          <ContentTextContainer>
            <ContentTitleDisable>
              {item.get("nome")}
            </ContentTitleDisable>
            <ContentObservationDisable>
              Está faltando achocolatado, creme de leite
            </ContentObservationDisable>
          </ContentTextContainer>
        </ContentDisable>
      )
    }
  }

    return (
        <ListContainer style={props.listStyle}>
            <List>
                <FlatList
                data={props.arrRecipes}
                keyExtractor={i => `${i.id}`}
                renderItem={renderContent}
                />
            </List>
        </ListContainer>

    )
}
