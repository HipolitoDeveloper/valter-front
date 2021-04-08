import styled from 'styled-components/native'
import { Dimensions } from 'react-native';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

export const Container = styled.View`
    flex: 1;
    background-color: white;
`
export const Header = styled.View `
    width: ${Width}px;
    height: 90px; 
    flex-direction: row;
    justify-content: space-between;  
    align-items: center;
    
`

export const HeaderTitle = styled.Text`
    color: #68CACA;
    font-style: italic;
    font-weight: bold;
    font-size: 30px;       
    margin: 0 0 20px 20px;
`

export const HeaderButtons = styled.View`
   flex-direction: row;
   margin: 0 20px 20px 0;
`

export const HeaderButton = styled.TouchableOpacity`
  margin-left:25px;
`

export const FilterContainer = styled.View`
    padding-left:5px;
    width: ${Width}px;
    height: 55px;    
    background-color:white;    
    position: absolute;
    top: 150px;
    z-index: 5;
`

export const FilterButton = styled.View`
    height: 50px;
    width: 50px;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
    elevation: 3;  
`

export const Slider = styled.View`
    border-bottom-width: 1px;
    
`

export const PageTitle = styled.Text`
    color: #68CACA;
    font-style: italic;
    font-weight: bold;
    font-size: 18px;

`

export const Content = styled.View`
  flex: 1
`

export const RecipeListContainer = styled.View`
    margin-top: 120px;
`





