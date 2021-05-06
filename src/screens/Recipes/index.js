import React, {Component, useMemo, useRef} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {
  Container,
  Header,
  HeaderTitle,
  FilterContainer,
  FilterButton,
  RecipeListContainer,
  HeaderButtons,
  HeaderButton,
} from './style';
import Carousel from 'react-native-snap-carousel';
import Parse from 'parse/react-native.js';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {RecipeList} from '../../components/RecipeList';

const WIDTH = Dimensions.get('window').width;

const initialState = {
  arrCategories: [],
  arrRecipes: [],
};

export default class Recipes extends Component {
  state = {
    ...initialState,
  };

  async componentDidMount() {
    await this.loadRecipes();
    await this.loadCategoriesFilter();
  }

  async loadRecipes() {
    try {
      const Recipes = Parse.Object.extend('receitas');
      const User = Parse.Object.extend('usuarios');

      const queryRecipes = new Parse.Query(Recipes);
      const queryUser = new Parse.Query(User);

      queryRecipes.include('categoria_id');
      queryRecipes.matchesQuery('usuario_id', queryUser);

      const arrRecipes = await queryRecipes.find();

      this.setState({arrRecipes: arrRecipes});
    } catch (error) {
      alert(
        `Não foi possível carregar as receitas ${JSON.stringify(
          error.message,
        )}`,
      );
    }
  }

  async loadCategoriesFilter() {
    try {
      const CategoryRecipe = Parse.Object.extend('receitas_categorias');
      const queryCategoryRecipe = new Parse.Query(CategoryRecipe);
      queryCategoryRecipe.ascending('sequencia');
      const arrCategories = await queryCategoryRecipe.find();
      this.setState({arrCategories: arrCategories});
    } catch (error) {
      alert(
        `Não foi possível carregar as categorias de receita ${JSON.stringify(
          error.message,
        )}`,
      );
    }
  }

  async getRecipesByCategory(index) {
    try {
      if (index !== 0) {
        let objChosenCategory = [];
        this.state.arrCategories.forEach((objCategory, categoryIndex) => {
          if (categoryIndex === index) {
            objChosenCategory = objCategory;
          }
        });

        const Recipe = Parse.Object.extend('receitas');
        const queryRecipe = new Parse.Query(Recipe);
        queryRecipe.ascending('nome');

        queryRecipe.equalTo('categoria_id', objChosenCategory.id);
        const arrRecipes = await queryRecipe.find();

        if (arrRecipes.length === 0) {
          alert(`Não foi encontrado nenhuma receita com essa categoria`);
        }

        this.setState({arrRecipes: arrRecipes});
      } else {
        await this.loadRecipes();
      }
    } catch (error) {
      alert(
        `Não foi possível encontrar receitas com nessa categoria ${JSON.stringify(
          error.message,
        )}`,
      );
    }
  }

  renderFilterContent() {
    return (
      <FilterContainer>
        <Carousel
          layout={'default'}
          data={this.state.arrCategories}
          renderItem={this.renderFiltersCategory}
          onSnapToItem={(index) => this.getRecipesByCategory(index)}
          sliderWidth={WIDTH}
          itemWidth={70}
          inactiveSlideOpacity={0.3}
          inactiveSlideScale={0.7}
          activeSlideAlignment={'center'}
        />
      </FilterContainer>
    );
  }

  renderFiltersCategory = ({item, index}) => (
    <FilterButton>
      <Icon color={'#68CACA'} name={`${item.get('icone')}`} size={25} />
    </FilterButton>
  );

  render() {
    return (
      <Container>
        <Header>
          <HeaderTitle>Receitas</HeaderTitle>
          <HeaderButtons
            onPress={() => this.props.navigation.navigate('Recipe', {id: 1})}>
            <HeaderButton>
              <Icon name={'search'} size={25} color={'#4ABFBF'} />
            </HeaderButton>
            <HeaderButton>
              <Icon name={'plus'} size={25} color={'#4ABFBF'} />
            </HeaderButton>
          </HeaderButtons>
        </Header>
        {this.renderFilterContent()}
        <Swiper loop={false}>
          <RecipeListContainer>
            <RecipeList arrRecipes={this.state.arrRecipes} />
          </RecipeListContainer>
          <RecipeListContainer>
            <RecipeList />
          </RecipeListContainer>
        </Swiper>
      </Container>
    );
  }
}
