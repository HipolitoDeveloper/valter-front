import styled from 'styled-components/native';
import commonStyles from '../../common/commonStyles';
import {StyleSheet} from 'react-native';

export const Container = styled.View`
  background-color: white;
  align-items: center;
  height: 60px;
`;

export const InputContainer = styled.View`
  width: 300px;
  border-bottom-width: 1px;
`;

export const InputContent = styled.View`
  padding-left: 10px;
`;

export const InputAutoComplete = styled.TextInput`
  font-size: 18px;
  font-style: italic;
  border-radius: 30px;
  font-weight: bold;
`;
