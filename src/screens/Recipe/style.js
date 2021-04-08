import styled from 'styled-components/native'
import {StyleSheet} from 'react-native'

export const Container = styled.View`
    flex: 1;
    

`

export const HeaderContent = styled.View`
    flex-direction:row;   
    justify-content: center;
    padding-top: 10px;
`

export const Title = styled.Text`
    font-weight: bold;
    font-size: 30px;
    color:#4ABFBF;
`

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 20px;
    top: 15px;
`

export const TitleContainer = styled.View`
    margin-top: 30px;
    align-items: center;
`

export const TitleText = styled.Text`
    position: absolute;
    left: 40px;   
    font-weight: bold;
    font-size: 20px;
    color:#4ABFBF;
`

export const Input = styled.TextInput`
    width: 80%;
    margin-top: 20px;
    border-bottom-width: ${StyleSheet.hairlineWidth}px;
    border-color: #4ABFBF;
    font-size: 20px;
    color:#4ABFBF;

`

export const IngredientesContainer = styled.View`
    margin-top: 40px;
    align-items: center;
    /* justify-content: center; */
`

export const IngredientesContent = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`


export const IngredientesText = styled.Text`
    font-weight: bold;
    font-size: 20px;
    color:#4ABFBF;
    padding-right: 30px;
`

export const IngredientesButton = styled.TouchableOpacity`
`

export const IngredientesItems = styled.View`
    padding: 20px 0px 20px 20px;
    border-radius: 30px;
    width: 80%;
    margin-top: 20px;
    border-width: ${StyleSheet.hairlineWidth}px;
    border-color: #4ABFBF;
`

export const InputArea = styled.TextInput.attrs({
    multiline: true,
    numberOfLines: 4
})`
    border-radius: 30px;
    width: 80%;
    margin-top: 20px;
    border-width: ${StyleSheet.hairlineWidth}px;
    border-color: #4ABFBF;
`

export const PreparoContainer = styled.View`
    margin-top: 40px;
    align-items: center;
`

export const PreparoContent = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`


export const PreparoText = styled.Text`
    font-weight: bold;
    font-size: 20px;
    color:#4ABFBF;
    padding-right: 30px;
`



