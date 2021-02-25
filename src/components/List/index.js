import React, { useEffect } from 'react'
import {FlatList} from 'react-native'

import {ListContainer, List} from './style'
import ListContent from '../ListContent'


export default props => {
   
  
    return (
        <ListContainer style={props.listStyle}>               
            <List>               
        
        
            {/* {this.state.list.map((item, index) => {
                return (<ListContent key={index} {...item} list={item} setQuantityValue={this.setQuantityValue} />)
            })} */}
                <FlatList                      
                data={props.data} 
                keyExtractor={i => `${i.id}`}
                renderItem={({item}) => <ListContent {...item} categoria={item} 
                setQuantityValue={props.setQuantityValue}
                onDelete={props.onDelete}
                enableAddItem={props.enableAddItem} />} />
                            
            </List>                       
        </ListContainer>   

    )
}

