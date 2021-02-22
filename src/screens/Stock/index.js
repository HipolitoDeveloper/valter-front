import React, {Component} from 'react'
import {Text, View} from 'react-native'
import { 
    Container, 
    HeaderContainer,
    Header, 
    HeaderTitle,
    NotificationButton,
    InputContainer } from './style';

import List from '../../components/List'
import AutoCompleteInput from '../../components/AutoCompleteInput'

import dataTeste from '../../dataTeste'

import Icon from 'react-native-vector-icons/FontAwesome'


const initialState = {
    selectedValue: 0,
    quantity: 0,
    list : dataTeste
}

export default class Stock extends Component {    
    state = {        
        ...initialState          
     }   

     
    setList(list) {
        this.setState({list: list})
    }
     
     setQuantityValue = (categoryID, itemId, quantity) => {        
      this.state.list.forEach(l => {
          
             if(l.id == categoryID) {
                 l.itens.map(i => {                 
                     if(i.id == itemId)                    
                     i.itemQuantity = quantity;                     
                 })
             }
         })
         
         this.setList(this.state.list)              
        
    }

    updateShopList = (item) => {       
        this.state.list.forEach(l => {

            if(l.id == item.categoryId) {               
                l.itens.push(item)
            }
        })

        this.setList(this.state.list)
    }

    render() {
        return (
            <Container>
                <HeaderContainer>
                    <Header>
                        <HeaderTitle>
                            Minha Despensa
                        </HeaderTitle>

                        <NotificationButton>
                            <Icon name='bell' size={30} color={'white'} />
                        </NotificationButton>                 
                    </Header>

                    <InputContainer>
                            <AutoCompleteInput changeData={this.updateShopList} />
                    </InputContainer> 
                </HeaderContainer>
                 

                <List 
                data={this.state.list}
                setQuantityValue={this.setQuantityValue}
                listStyle={{flex: 3}} />
            </Container>
        );
    };
}