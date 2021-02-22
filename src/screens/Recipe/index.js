import React, {Component} from 'react'
import {Text, View} from 'react-native'
import {
    Container, 
    HeaderContainer,
    HeaderTitle, 
    InputContainer,
    RecipeListContainer,
    CreateRecipeContainer,  
    CreateRecipeText} from './style'

import AutoCompleteInput from '../../components/AutoCompleteInput'
import RecipeList from '../../components/RecipeList'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class Recipe extends Component {    
    render() {
        return (
            <Container>
                <HeaderContainer>
                    <HeaderTitle>
                        Minhas Receitas
                    </HeaderTitle>               

                    <InputContainer>
                        <AutoCompleteInput changeData={this.updateShopList}  />
                    </InputContainer>
                </HeaderContainer>


                <RecipeListContainer>
                    <CreateRecipeContainer>                 
                        <Icon name={'plus'} size={25} color={'#4ABFBF'} />                   

                        <CreateRecipeText>
                            Criar receita
                        </CreateRecipeText>
                    </CreateRecipeContainer>

                    <RecipeList />

                </RecipeListContainer>
                

            </Container>
        );
    };
}