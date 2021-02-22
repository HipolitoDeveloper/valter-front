import styled from 'styled-components/native'
import {StyleSheet} from 'react-native'

export const Container  = styled.View`
    flex-direction: column;  
`


export const ItemContainer  = styled.View`
    flex-direction: column;   
    justify-content: center;    
    height: 66px;    
    background-color: white;  
`

export const ItemContent  = styled.View`
  margin-left: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const ItemDescription = styled.Text`
    /* font-family: 'Franklin Gothic Medium', 'Arial Narrow', 'Arial', 'sans-serif' ; */
    font-size: 18px;
    font-style: italic;
    font-weight: bold;
`

export const TitleContainer  = styled.View`
    flex-direction: column;   
    justify-content: center;    
    height: 50px;  
    background-color: #F7F7F7;
    border-width: ${StyleSheet.hairlineWidth}px;    
`

export const TitleContent = styled.View`
  margin-left: 20px;
  flex-direction: row;
  justify-content: space-between; 
`

export const TitleDescription = styled.Text`
    /* font-family: 'Franklin Gothic Medium', 'Arial Narrow', 'Arial', 'sans-serif' ; */
    font-size: 24px;
    font-style: italic;
    font-weight: bold;
    color: #68CACA;
`

export const PickerContainer = styled.Text`
    margin-right: 10px;
    border-width: ${StyleSheet.hairlineWidth}px;
    border-radius: 30px;
    border-color: #68CACA;     
`


