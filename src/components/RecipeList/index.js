import React from 'react'
import {FlatList} from 'react-native'

import {ListContainer, List} from './style'
import RecipeListContent from '../RecipeListContent'


export default props => {
    return (
        <ListContainer style={props.listStyle}>               
            <List>             
        
        
            {/* {this.state.list.map((item, index) => {
                return (<ListContent key={index} {...item} list={item} setQuantityValue={this.setQuantityValue} />)
            })} */}
                {/* <FlatList                      
                data={props.data} 
                keyExtractor={i => `${i.id}`}
                renderItem={({item}) => <RecipeListContent {...item} 
                />} /> */}

                <RecipeListContent />
                            
            </List>                       
        </ListContainer>   

    )
}