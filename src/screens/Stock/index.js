import React, {Component} from 'react'
import {Text, View} from 'react-native'
import { 
    Container, 
    HeaderContainer,
    Header, 
    HeaderTitle,
    NotificationButton,
    InputContainer } from './style';

import Parse from "parse/react-native.js";


import List from '../../components/List'
import AutoCompleteInput from '../../components/AutoCompleteInput'
import NotificationsModal from '../../components/Modals/NotificationsModal'

import dataTeste from '../../dataTeste'

import Icon from 'react-native-vector-icons/FontAwesome'


const initialState = {
    showNotificationModal: false,
    stockItens : []
}

let showNotificationModal = false;

export default class Stock extends Component {    
    state = {        
        ...initialState          
     }   

     async componentDidMount() {
        await this.loadStockList();        
    }

     
    setList(stockItens) {
        this.setState({stockItens: stockItens})
    }

    loadStockList = async ()  =>  {    
            try {                       
                const ItemUsuario = Parse.Object.extend("itens_usuarios")
                const queryItemUsuario = new Parse.Query(ItemUsuario)    
                queryItemUsuario.include("item_id")
                queryItemUsuario.include(["item_id.categoria_id"])  
                queryItemUsuario.ascending("item_id")
    
                const itensUsuario = await queryItemUsuario.find();          
    
                const Categoria = Parse.Object.extend("categorias")
                const queryCategoria = new Parse.Query(Categoria)   
    
                let categorias = [];                
                for(let i = 0; i < itensUsuario.length; i++) {   
               
                    const categoriaId = itensUsuario[i].get("item_id").get("categoria_id").id;              
                    queryCategoria.equalTo("objectId",  itensUsuario[i].get("item_id").get("categoria_id").id)
                    const categoria = await queryCategoria.find();                      
                  
                    const categoriaDuplicada = categorias.find(cat => cat.id == categoriaId)
                    
                    if(categoriaDuplicada == undefined) {
                        categorias.push(categoria[0])              
                    }
                }
          
                categorias.forEach(c => {      
                    c.set("itens", [])
                    c.save();        
                    itensUsuario.forEach(iu => {
                        if(c.id == iu.get("item_id").get("categoria_id").id) {
                            c.get("itens").push(iu)
                        }
                    })    
                   
                })                  
           
         
                this.setState({stockItens: categorias})
          
               
            } catch (error) {                
                alert(`Não foi possível caregar os itens do estoque ${JSON.stringify(error.message)}`)
            }
         
    }    
     
    setQuantityValue = async (itemId, quantity) => {     
        try {
           const ItemUsuario = Parse.Object.extend("itens_usuarios")
           const queryItemUsuario= new Parse.Query(ItemUsuario)         

           queryItemUsuario.get(itemId).then((usuarioItem) => {
            usuarioItem.set("quantidade", quantity)
            usuarioItem.save().then((response) => {
                   this.loadStockList();
               });
           })

       } catch (error) {
           alert(`Não foi possível mudar a quantidade do item ${JSON.stringify(error.message)}`)

       }       
   }


    updateStockList = async (item, itemQuantidade)  =>  {  
        //é uma arrow function para ser usado como parametro no click
        try {           
        item.unset("itemQuantidade")
        item.unset("isChose")
        item.save()   
      

        const ItemUsuario = Parse.Object.extend("itens_usuarios")
        const itemUsuario = new ItemUsuario();

        const Item = Parse.Object.extend("itens")
        const itemCompleto = new Item();
        itemCompleto.id = `${item.id}`      

        itemUsuario.set("quantidade", itemQuantidade)
        itemUsuario.set("item_id", itemCompleto)            
        // itemUsuario.set("usuario_id", `${wXSqmG4vwM}`)
        itemUsuario.save();   

        } catch (error) {
            alert(`Não foi possível atualizar o estoque ${JSON.stringify(error.message)}`)

        }
    }

    deleteItem = async (itemId) => {
        try {
            const ItemUsuario = Parse.Object.extend("itens_usuarios")
            const queryItemUsuario = new Parse.Query(ItemUsuario)         
 
            queryItemUsuario.get(itemId).then((usuarioItemk) => {           
                usuarioItemk.destroy().then((response) => {
                    this.loadStockList();
                });
            })
        } catch (error) {
            alert(`Não foi possível excluir o item do seu estoque ${JSON.stringify(error.message)}`)

        }
   }
   showModal = () => {
    this.setState({showNotificationModal: true})
   }

   
   closeModal() {
    this.setState({showNotificationModal: false})
   }

    render() {
        return (
            
            <Container>

                <HeaderContainer>
                    <Header>
                        <HeaderTitle>
                            Minha Despensa
                        </HeaderTitle>
                        <NotificationsModal closeModal={() => this.closeModal()}
                        stockItens={this.state.stockItens} showNotificationModal={this.state.showNotificationModal} />

                        <NotificationButton
                            onPress={() => this.showModal()}>
                            <Icon name='bell' size={30} color={'white'} />
                        </NotificationButton>    
       
                    </Header>

                    <InputContainer>
                            <AutoCompleteInput 
                            isToStock={true}
                            changeData={this.updateStockList}
                            refreshListaCompras={this.loadStockList}  />
                    </InputContainer> 
                </HeaderContainer>
                 

                <List 
                data={this.state.stockItens}
                setQuantityValue={this.setQuantityValue}
                onDelete={this.deleteItem}
                listStyle={{flex: 3}}
                />

                
            </Container>
        );
    };
}