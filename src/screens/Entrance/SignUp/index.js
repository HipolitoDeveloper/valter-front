import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as S from './style';
import Parse from 'parse/react-native.js';

export default class SignUp extends Component {
  state = {
    email: 'gabriel@gmail.com',
    password: '123456',
    username: 'Gabriel',
  };

  handleEmailChange = (value) => {
    this.setState({email: value});
  };

  handlePasswordChange = (value) => {
    this.setState({password: value});
  };

  handleUserChange = (value) => {
    this.setState({username: value});
  };

  doSignUp = async () => {
    Parse.User.enableUnsafeCurrentUser();
    const user = new Parse.User();
    user.set('username', this.state.username);
    user.set('password', this.state.password);
    user.set('email', this.state.email);

    try {
      await user.signUp().then(async (registeredUser) => {
        this.props.navigation.navigate('MainTab');
        await AsyncStorage.setItem('user', JSON.stringify(registeredUser));
      });
    } catch (error) {
      alert('E-mail ou Usuário já existem em nosso sistema');
      console.warn(error);
    }
  };

  render() {
    return (
      <S.Container>
        <S.UsarnameInputContent>
          <S.UsernameText>USUÁRIO</S.UsernameText>
          <S.UsernameInput
            name="Usuário"
            placeholder="Digite seu nome.."
            value={this.state.username}
            onChangeText={(text) => this.handleUserChange(text)}
          />
        </S.UsarnameInputContent>

        <S.EmailInputContent>
          <S.EmailText>E-MAIL</S.EmailText>
          <S.EmailInput
            name="Email"
            placeholder="Digite seu e-mail.."
            value={this.state.email}
            onChangeText={(text) => this.handleEmailChange(text)}
          />
        </S.EmailInputContent>

        <S.PasswordInputContent>
          <S.PasswordText>SENHA</S.PasswordText>
          <S.PasswordInput
            name="Senha"
            placeholder="Digite sua senha..."
            value={this.state.password}
            onChangeText={(text) => this.handlePasswordChange(text)}
          />
        </S.PasswordInputContent>

        <S.SignUpButton onPress={this.doSignUp}>
          <S.SignUpText>CADASTRAR</S.SignUpText>
        </S.SignUpButton>
      </S.Container>
    );
  }
}

const styles = StyleSheet.create({});
