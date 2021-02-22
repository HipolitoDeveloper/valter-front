import React from 'react'
import {FlatList} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

import {
    Container,
    ContentAble,
    ContentTitleAble,   
    ContentDisable,
    ContentTextContainer,
    ContentTitleDisable,
    ContentObservationDisable} from './style'


export default props => {
    return (
        <Container>
            <ContentAble>

                <Icon name={'book'} color={'#4ABFBF'} size={30} />
                <ContentTitleAble>
                  Pudim
                </ContentTitleAble>               
            </ContentAble>

            <ContentDisable>
                <Icon name={'book'} color={'#7D7575'} size={30} />

                <ContentTextContainer>
                    <ContentTitleDisable>
                    Bolo de Chocolate
                    </ContentTitleDisable>
                    <ContentObservationDisable>
                Está faltando achocolatado, creme de leite
                    </ContentObservationDisable>
                </ContentTextContainer>
                
            </ContentDisable>
        </Container>
    )
}