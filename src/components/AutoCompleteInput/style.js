import styled from 'styled-components/native'
import commonStyles from '../../commonStyles'
import {StyleSheet} from 'react-native'


export const Container = styled.View`    
    align-items: center;     
    height: 140px;    

`;

export const InputContainer = styled.View`   
    /* margin-top:50px; */
    width: 350px;  
    border-radius: 30px;        
    background-color:  #4ABFBF;           
    elevation: 10;
    position: absolute;
    top: 35px; //Modal está influenciando na distancia do TOP  
 
`

export const InputContent = styled.View`     
    padding-left: 10px;
`

export const InputAutoComplete = styled.TextInput`
    font-size: 18px;
    font-style: italic;
    border-radius: 30px;     
    font-size: 15px;
`
