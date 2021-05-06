import {Directions} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

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

  background-color: #68caca;
`;

export const Header = styled.View`
  align-items: center;
  justify-content: center;
  height: 40px;
`;

export const OptionContainer = styled.View`
  margin-top: 5px;
`;

export const OptionContent = styled.View`
  height: 90px;
  width: 100%;
  background-color: #337984;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 20px;
  align-items: center;
`;

export const OptionText = styled.View`
  flex-direction: column;
  justify-content: space-between;
  width: 58%;
`;

export const OptionInput = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const InputPortion = styled.TextInput`
  border-bottom-width: 1px;
  border-color: #c3eaea;
  width: 70px;
  color: #c3eaea;
  font-size: 18px;
`;

export const Title = styled.Text`
  /*font-family: 'Arial', sans-serif; */
  margin-top: 5px;
  color: #c3eaea;
  font-size: 24px;
`;

export const TouchableTitle = styled.TouchableOpacity`
  padding-left: 10px;
  background-color: #337984;
  border-radius: 30px;
  elevation: 5;
`;

export const Description = styled.Text`
  color: rgba(195, 234, 234, 0.6);
  font-size: 15px;
`;

export const InputContainer = styled.View`
  width: 100%;
  background-color: #68caca;
  elevation: 10;
`;

export const InputContent = styled.View`
  padding-left: 10px;
`;

export const InputAutoComplete = styled.TextInput`
  font-size: 18px;
  font-style: italic;
  color: #fff;
  font-weight: bold;
`;

export const ContainerChips = styled.View`
  flex-direction: row;
`;

export const CloseIcon = styled.TouchableOpacity``;
