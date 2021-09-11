import React, {Component, useContext, useEffect} from 'react';
import * as S from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import Parse from 'parse/react-native.js';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../../contexts/User/UserContext';

export const EntranceOption = () => {
  const navigate = useNavigation();

  const {setCurrentUser} = useContext(UserContext);

  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await AsyncStorage.getItem('currentUser');
      if (user) {
        setCurrentUser(user);
        if (Object.keys(user).length !== 0) {
          navigate.navigate('MainTab');
        } else {
          navigate.navigate('LoginStack');
        }
      }
    };

    getCurrentUser();
  }, []);

  return (
    <S.Container>
      <S.Icon>
        <Icon style={{color: '#FFFFFF'}} name="home" size={50} color="white" />
      </S.Icon>
      <S.Content>
        <S.SigninButton onPress={() => navigate.navigate('SignIn')}>
          <S.SigninText>ENTRAR</S.SigninText>
        </S.SigninButton>
        <S.SignupButton onPress={() => navigate.navigate('SignUp')}>
          <S.SignupText>CADASTRAR</S.SignupText>
        </S.SignupButton>
      </S.Content>
    </S.Container>
  );
};
