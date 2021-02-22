import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    background-color: #68CACA;
`

export const HeaderContainer = styled.View`    
    flex: 1;

`

export const Header = styled.View `    
    flex-direction: row;
    justify-content: space-between;  
    
`

export const HeaderTitle = styled.Text`
    color: white;
    font-style: italic;
    font-weight: bold;
    font-size: 25px;   
    padding-left: 15px; 
     margin-top: 15px;
`

export const InputContainer = styled.View `  
    /* margin-top: 40px; */
`

export const RecipeListContainer = styled.View`
    flex: 3;
`

export const CreateRecipeContainer = styled.TouchableOpacity`
    height: 84px;
    padding-left: 10px;
    background-color: white;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
`

export const CreateRecipeText = styled.Text`
    color: #4ABFBF;
    font-size: 20px;
    margin-left: 30px;
`



