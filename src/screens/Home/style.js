import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';

// export const Container = styled.ScrollView.attrs({
//     contentContainerStyle: props => {
//         return  {
//             flex: 1
//         }
//     }
// })
// ` `

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 10%;
  width: 100%;
  background-color: #fff;
`;

export const HeaderTitle = styled.Text`
  font-style: italic;
  font-weight: bold;
  font-size: 25px;
  width: 100%;
  color: #68caca;
  padding-left: 15px;
  margin-top: 15px;
  /* padding-bottom: 15px;
  padding-top: 15px; */
  /* background-image: linear-gradient(to right, red , yellow); */

  /* font-family: Arial */
`;

export const LogoutButton = styled.TouchableOpacity`
  margin-right: 20px;
  margin-top: 20px;
`;
