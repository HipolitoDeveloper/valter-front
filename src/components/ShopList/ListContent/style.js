import styled from 'styled-components/native'
import {StyleSheet} from 'react-native'

export const Container  = styled.View`
    flex-direction: column;  
`


export const ItemContainer  = styled.View`
    flex-direction: column;   
    justify-content: center;    
    height: 90px;    
    background-color: white;  
`

export const ItemContent  = styled.View`
  margin-left: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const ItemText = styled.View`    
    flex-direction: column;
    justify-content: space-between;  
    width: 58%;  
    
`

export const ItemTitle = styled.Text`
    /* font-family: 'Franklin Gothic Medium', 'Arial Narrow', 'Arial', 'sans-serif' ; */
    font-size: 15px;
    font-style: italic;
    font-weight: bold;
`
export const ItemDescription = styled.Text`
    color: rgba(0, 0, 0, 0.6);
    font-size:12px;
`

export const ItemInput = styled.View`   
    margin-right: 10px;
    flex-direction: row;
    align-items: center;  
    justify-content: space-between; 
`

export const InputPortion = styled.TextInput`
    margin-right: 20px;
    margin-bottom: 10px;
    border-bottom-width: ${StyleSheet.hairlineWidth}px;
    border-color: black;
    width: 50px;
    color: black;
    font-size:15px;
`

export const TitleContainer  = styled.View`
    flex-direction: column;   
    justify-content: center;    
    height: 50px;  
    background-color: #F7F7F7;   
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


