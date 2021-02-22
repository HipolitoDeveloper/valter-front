import { Directions } from 'react-native-gesture-handler'
import styled from 'styled-components/native'


// export const Container = styled.ScrollView.attrs({
//     contentContainerStyle: props => {
//         return  {
//             flex: 1
            
//         }
//     }
// })
// `   height: 100px;
//     background-color: #68CACA;
//  `


export const Container = styled.View`
    width: 100%;
    height: 100%;
   
    background-color: #68CACA;    
   
`

export const Header = styled.View`
    align-items: center;
    justify-content: center;
    height: 40px;
`

export const OptionContent = styled.View`
    height: 70px;
    width: 100%;
    background-color: #337984;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 80px;
    align-items: center;
    margin-bottom: 1px;
`

export const OptionText = styled.Text`
    /* color: #C3EAEA; */
    /* font-family: Arial; */
    font-size: 26px;
    font-weight: bold;
    font-style: italic;
`

// export const PickerContainer = styled.View``

export const InputContainer = styled.View`   
  
    width: 100%;      
    background-color:  #68CACA;           
    elevation: 10;
`

export const InputContent = styled.View`     
    padding-left: 10px;
`

export const InputAutoComplete = styled.TextInput`
    font-size: 18px;
    font-style: italic;   
    font-size: 15px;
`

export const ContainerChips = styled.View`
    flex-direction: row;
`
