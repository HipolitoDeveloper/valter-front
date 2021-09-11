import React, {Component, useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import * as S from './style';

import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {UserContext} from '../../../contexts/User/UserContext';
import {useNavigation} from '@react-navigation/native';

export const SignIn = () => {
  const [user, setUser] = useState({
    email: 'gabriel@gmail.com',
    password: '123456',
  });
  const {doLogin} = useContext(UserContext);
  const navigate = useNavigation();
  const handleChange = (value, inputName) => {
    setUser({
      ...user,
      [inputName]: value,
    });
  };

  return (
    <S.Container>
      <S.EmailInputContent>
        <S.EmailText>E-MAIL</S.EmailText>
        <S.EmailInput
          name="email"
          textContentType="emailAddress"
          placeholder="Digite seu e-mail..."
          value={user.email}
          onChangeText={(text) => handleChange(text, 'email')}
        />
      </S.EmailInputContent>

      <S.PasswordInputContent>
        <S.PasswordText>SENHA</S.PasswordText>
        <S.PasswordInput
          name="password"
          textContentType="password"
          placeholder="Digite sua senha..."
          value={user.password}
          onChangeText={(text) => handleChange(text, 'password')}
        />
      </S.PasswordInputContent>

      <S.SignInButton
        onPress={async () => {
          await doLogin(user);
          navigate.navigate('MainTab');
        }}>
        <S.SignInText>ENTRAR</S.SignInText>
      </S.SignInButton>
    </S.Container>
  );
};
