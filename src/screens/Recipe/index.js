import React, {Component} from 'react'
import {View, Text} from 'react-native'

import {
    Container,
    HeaderContent,
    Title,
    BackButton,
    TitleContainer,
    TitleText,
    Input,
    IngredientesContainer,
    IngredientesContent,
    IngredientesText,
    IngredientesButton,
    IngredientesItems,
    InputArea,
    PreparoContainer,
    PreparoContent,
    PreparoText,
    } from './style'

import Icon from 'react-native-vector-icons/FontAwesome5'

import Parse from "parse/react-native.js";

export default class Recipe extends Component {
    state = {
        recipeId: null,
        titleText: '',
        ingredientsList: '',
        prepareText: '',
        isModalVisible: false
    }

    async componentDidMount() {
    //   await this.createRecipe();
    }

    async  createRecipe() {
        const Receita = Parse.Object.extend("receitas")
        const receita = new Receita();

        receita.set("permitir_online", false)
        receita.set("nome", 'Receita sem nome')
        // itemUsuario.set("usuario_id", `${wXSqmG4vwM}`)
        let recipeResult = await receita.save();

        this.setState({recipeId: recipeResult.id});
    }

    addItemAtRecipe = (itens) => {
        const Receita= Parse.Object.extend("receitas")
        const receita = new Receita();
        receita.id = `${this.state.recipeId}`

        receita.set("nome", title)
        receita.set("item_id", itemCompleto)
        // itemUsuario.set("usuario_id", `${wXSqmG4vwM}`)
        itemUsuario.save();
    }

    addTitle = (title) => {
        const Receita= Parse.Object.extend("receitas")
        const receita = new Receita();
        console.warn(this.state.recipeId)
        receita.id = `${this.state.recipeId}`

        receita.set("nome", title)
        receita.save();
    }


    onCloseModal = () => {
        this.setState({isModalVisible: false})
    }

    onOpenModal = () => {
        this.setState({isModalVisible: true})
    }

   render() {
       return (
        //    <Text>{this.props.route.params.id}</Text>
            <Container>

                <HeaderContent>
                    <BackButton onPress={() => this.props.navigation.goBack('Recipes')}>
                        <Icon name={"arrow-left"} size={30} color={'#4ABFBF'} />
                    </BackButton>
                    <Title>Escreva sua receita</Title>
                </HeaderContent>

                <TitleContainer>
                    <TitleText>Título</TitleText>
                    <Input
                    value={this.state.title}
                    onChangeText={(text) => this.addTitle(text)}
                    >

                    </Input>
                </TitleContainer>

                <IngredientesContainer>
                    <IngredientesContent>
                        <IngredientesText>
                            Ingredientes
                        </IngredientesText>
                        <IngredientesButton>
                            <Icon name={"cloud-download-alt"} size={20} color={'#4ABFBF'} />
                        </IngredientesButton>
                    </IngredientesContent>
                    <IngredientesItems>
                        <IngredientesText>
                            Ingredientes
                        </IngredientesText>
                    </IngredientesItems>

                </IngredientesContainer>

                <PreparoContainer>
                    <PreparoContent>
                        <PreparoText>Modo de Preparo</PreparoText>
                        <Icon name={"pencil-alt"} size={20} color={'#4ABFBF'} />
                    </PreparoContent>
                    <InputArea
                    value={this.state.preparo}
                    onChangeText={(text) => this.setState({preparo: text})}>

                    </InputArea>
                </PreparoContainer>
            </Container>
       );
   }
}
