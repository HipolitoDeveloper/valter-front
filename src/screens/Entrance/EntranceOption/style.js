import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #4abfbf;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled.View`
  position: absolute;
  top: 100px;
`;

export const Content = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SigninButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border: 1px solid #ffffff;
  border-radius: 100px;
  width: ${windowWidth * 0.7}px;
  height: ${windowHeight * 0.07}px;
`;

export const SigninText = styled.Text`
  color: #ffffff;
  font-weight: bold;
`;

export const SignupButton = styled.TouchableOpacity`
  margin-top: 30px;
  background-color: white;
  align-items: center;
  justify-content: center;
  border: 1px solid #ffffff;
  border-radius: 100px;
  width: ${windowWidth * 0.7}px;
  height: ${windowHeight * 0.07}px;
`;

export const SignupText = styled.Text`
  color: #68caca;
  font-weight: bold;
`;
