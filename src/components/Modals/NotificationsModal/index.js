import React, {useState} from 'react'
import {
    Container, 
    Title, 
    ModalContainer, 
    TitleContainer, 
    BackButton,
    Content,
    ItemContent,
    ItemContentTitle,
    ItemContentNumber} from './style'

import {TouchableWithoutFeedback, View} from 'react-native'


import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'


 export default props => {

const [lessThanFive, setLessThanFive] = useState(0);
const [lessThanTen, setLessThanTen] = useState(0);
const [tomorrowItens, setTomorrowItens] = useState(0);

   async function testeNotificacao(){ 
    let contTomorrowItens = 0;
    let contLessThanFive = 0;
    let contLessThanTen = 0;

        props.stockItens.forEach(stock => {
            stock.get("itens").forEach(i => {
           
                const dataValidade = new Date(moment(i.get("item_id").get("data_validade")).format('MM/DD/YYYY'))       
               
                const dataAtual = new Date(moment(new Date()).format('MM/DD/YYYY'))
     
                 const diffTime = Math.abs(dataValidade - dataAtual)
                 const diffData = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

            

                 if(diffData <= 1){
                    contTomorrowItens++;
                 } else if (diffData <= 5) {                   
                    contLessThanFive ++
                 } else if (diffData <= 10) {
                    contLessThanTen++
                 }
            })      
        })
        setLessThanTen(contLessThanTen)
        setLessThanFive(contLessThanFive)
        setTomorrowItens(contTomorrowItens)        
    }

    return(
       <Container>
             <Modal      
            isVisible={props.showNotificationModal}
            useNativeDriverForBackdrop={true}
            backdropColor="black"  
            hasBackdrop={true}      
            onBackdropPress={()=> props.closeModal()}
            
            onModalShow={() => {testeNotificacao()}}               
           >
              
                <ModalContainer>
                    <TitleContainer> 
                        
                        
                        <Title>Notificações</Title>
                    </TitleContainer>
                    <Content>
                       
                        <ItemContent>
                            <ItemContentTitle>10 dias</ItemContentTitle>
                            <ItemContentNumber>{lessThanTen}</ItemContentNumber>
                        </ItemContent>
                    
                        <ItemContent>
                            <ItemContentTitle>05 dias</ItemContentTitle>
                            <ItemContentNumber>{lessThanFive}</ItemContentNumber>
                        </ItemContent>
                    
                        <ItemContent>
                            <ItemContentTitle>Amanhã</ItemContentTitle>
                            <ItemContentNumber>{tomorrowItens}</ItemContentNumber>
                        </ItemContent>
                     
                    </Content>
                </ModalContainer>
                              
            </Modal>
       </Container>
    )
 }

 