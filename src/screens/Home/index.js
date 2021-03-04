import React, {Component} from 'react'
import {
    Text,
    View, 
    ImageBackground, 
    
    StyleSheet, 
    TouchableOpacity, 
    Platform,
    Alert,
    FlatList,
    SafeAreaView,
    KeyboardAvoidingView,} from 'react-native'

import {Container, Header, HeaderTitle, HeaderSubTitle} from './style'
import Parse, { Query } from "parse/react-native.js";

import {Picker} from '@react-native-picker/picker'

import commonStyles from '../../commonStyles'

import moment from 'moment'
import 'moment/locale/pt-br'

import Icon from 'react-native-vector-icons/FontAwesome'
import AutoCompleteInput from '../../components/AutoCompleteInput'
import List from '../../components/List'

import { LinearGradient } from 'expo-linear-gradient';

import dataTeste from '../../dataTeste'



const initialState = {       
    purchaseItems: []   
}



export default class Home extends Component {

    
    state = {        
        ...initialState
     }   

    async componentDidMount() {
        await this.loadShopList();        
    }

    setList(purchaseItems) {
        this.setState({purchaseItems: purchaseItems})

    }    

    loadShopList = async ()  =>  {  
  
        try {                       
            const ListaCompraItem = Parse.Object.extend("listas_compras_itens")
            const queryListaCompraItem = new Parse.Query(ListaCompraItem)    
            queryListaCompraItem.include("item_id")
            queryListaCompraItem.include(["item_id.categoria_id"])  
            queryListaCompraItem.ascending("item_id")

            const listasComprasItens = await queryListaCompraItem.find();          

            const Categoria = Parse.Object.extend("categorias")
            const queryCategoria = new Parse.Query(Categoria)   

            let categorias = [];                
            for(let i = 0; i < listasComprasItens.length; i++) {   
           
                const categoriaId = listasComprasItens[i].get("item_id").get("categoria_id").id;              
                queryCategoria.equalTo("objectId",  listasComprasItens[i].get("item_id").get("categoria_id").id)
                const categoria = await queryCategoria.find();                      
              
                const categoriaDuplicada = categorias.find(cat => cat.id == categoriaId)
                
                if(categoriaDuplicada == undefined) {
                    categorias.push(categoria[0])              
                }
            }
      
            categorias.forEach(c => {      
                c.set("itens", [])
                c.save();        
                listasComprasItens.forEach(iu => {
                    if(c.id == iu.get("item_id").get("categoria_id").id) {
                        c.get("itens").push(iu)
                    }
                })    
               
            })                  
       
     
            this.setState({purchaseItems: categorias})
      
           
        } catch (error) {                
            alert(`Não foi possível caregar a Lista de Compras ${JSON.stringify(error.message)}`)
        }
     
}    

    updateShopList = async (item, itemQuantidade)  =>  {         
        try {           
        item.unset("itemQuantidade")
        item.unset("isChose")
        item.save()   
      

        const ListaCompraItem = Parse.Object.extend("listas_compras_itens")
        const listaCompraItem = new ListaCompraItem();

        const Item = Parse.Object.extend("itens")
        const itemCompleto = new Item();
        itemCompleto.id = `${item.id}`      

        listaCompraItem.set("quantidade", itemQuantidade)
        listaCompraItem.set("item_id", itemCompleto)            
        // itemUsuario.set("usuario_id", `${wXSqmG4vwM}`)
        listaCompraItem.save();   

        } catch (error) {
            alert(`Não foi possível atualizar a Lista de Compras ${JSON.stringify(error.message)}`)

        }
    }
     
    setQuantityValue = async (itemId, quantity) => {     
        try {
           const ListaCompraItem = Parse.Object.extend("listas_compras_itens")
           const queryListaCompraItem = new Parse.Query(ListaCompraItem)         

           queryListaCompraItem.get(itemId).then((listaCompraItem) => {
            listaCompraItem.set("quantidade", quantity)
            listaCompraItem.save().then(
                () => {
                   this.loadShopList();
               });
           })

       } catch (error) {
           alert(`Não foi possível mudar a quantidade do item ${JSON.stringify(error.message)}`)

       }       
   }

   deleteItem = async (itemId) => {
        try {
            const ListaCompraItem = Parse.Object.extend("listas_compras_itens")
            const queryListaCompraItem = new Parse.Query(ListaCompraItem)         
 
            queryListaCompraItem.get(itemId).then((listaCompraItem) => {           
             listaCompraItem.destroy().then(
                 () => {
                    this.loadShopList();
                });
            })
        } catch (error) {
            alert(`Não foi possível excluir o item ${JSON.stringify(error.message)}`)

        }
   }

   addItem = async (itemComprado) => {
       try {
        const ListaCompraItem = Parse.Object.extend("listas_compras_itens")
        const queryListaCompraItem = new Parse.Query(ListaCompraItem)         

        queryListaCompraItem.get(itemComprado.id).then((listaCompraItem) => {           
         listaCompraItem.destroy().then(
             () => {

                const ItemUsuario = Parse.Object.extend("itens_usuarios")
                const queryItemUsuario = new Parse.Query(ItemUsuario)   
                
                const Item = Parse.Object.extend("itens")
                const queryItem = new Parse.Query(Item)   
                queryItem.equalTo("objectId",  itemComprado.get("item_id").id)

                queryItemUsuario.matchesQuery("item_id", queryItem)
                
                queryItemUsuario.find().then((item) => {
                    if(item.length == 0) {
                        const itemUsuario = new ItemUsuario();

                        itemUsuario.set("quantidade", itemComprado.get("quantidade"))
                        itemUsuario.set("item_id", itemComprado.get("item_id"))            
                        // itemUsuario.set("usuario_id", `${wXSqmG4vwM}`)
                        itemUsuario.save();   
                    } else {
                        item[0].set("quantidade", item[0].get("quantidade") +  itemComprado.get("quantidade"))
                        item[0].save();   
                    }
                    this.loadShopList();
                });
            });
        })
       } catch (error) {
        alert(`Não foi possível confirmar a compra do item ${JSON.stringify(error.message)}`)
       }
   }

    render() {    
    return (
        <Container>     

            <Header style={styles.header}> 
                <LinearGradient 
                    colors={[ '#68CACA', '#fff', ]} 
                    end={{ x: 0.1, y: 0.2 }}
                    style={styles.background} >
                    <HeaderTitle>
                        Bom dia
                    </HeaderTitle>
                    <AutoCompleteInput 
                    isToStock={false}
                    changeData={this.updateShopList} 
                    refreshListaCompras={this.loadShopList}              
                    />
                </LinearGradient>
            </Header>
                
            <List 
            data={this.state.purchaseItems}
            setQuantityValue={this.setQuantityValue}
            onDelete={this.deleteItem}
            listStyle={{flex: 5}}
            addItem={this.addItem} />
                                              
        </Container>
        )
    }   

}

const styles = StyleSheet.create({
    header: {
        flex: 2,     
        // height: 180,       
        backgroundColor: '#FFF',
        // borderColor: 'blue',
        // borderWidth: 10
    },
    list: {
        flex: 5

        // borderColor: 'red',
        // borderWidth: 10
    },
    background: {      
        width: '100%',     
        // position: 'absolute',
        // left: 0,
        // right: 0,
        // top: 0        
      },

})
