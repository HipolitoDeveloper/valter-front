import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled.View``;

export const UsarnameInputContent = styled.View`
  width: 70%;
  margin-top: 40px;
`;

export const UsernameInput = styled.TextInput`
  width: 100%;
  border-bottom-width: ${StyleSheet.hairlineWidth};
`;

export const UsernameText = styled.Text`
  color: #68caca;
  font-weight: bold;
`;

export const PasswordInputContent = styled.View`
  width: 70%;
  margin-top: 30px;
`;

export const PasswordInput = styled.TextInput`
  width: 100%;
  border-bottom-width: ${StyleSheet.hairlineWidth};
`;

export const PasswordText = styled.Text`
  color: #68caca;
  font-weight: bold;
`;

export const EmailInputContent = styled.View`
  width: 70%;
  margin-top: 30px;
`;

export const EmailInput = styled.TextInput`
  width: 100%;
  border-bottom-width: ${StyleSheet.hairlineWidth};
`;

export const EmailText = styled.Text`
  color: #68caca;
  font-weight: bold;
`;

export const SignUpButton = styled.TouchableOpacity`
  margin-top: 30px
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  width: 70%;
  height: 50px;
  background-color: #68caca;
`;

export const SignUpText = styled.Text`
  color: white;
  font-weight: bold;
`;
