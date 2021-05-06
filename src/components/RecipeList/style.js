import styled from 'styled-components/native';

export const List = styled.ScrollView`
  width: 100%;
`;

export const ListContainer = styled.View`
  align-items: center;
  flex-direction: row;
  background-color: #fff;
`;

export const Container = styled.View`
  flex-direction: column;
`;

export const ContentAble = styled.View`
  background-color: white;
  height: 66px;
  padding-left: 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const ContentTitleAble = styled.Text`
  font-size: 20px;
  color: #4abfbf;
  padding-left: 25px;
`;

export const ContentDisable = styled.View`
  background-color: #cbc4c4;
  height: 66px;
  padding-left: 10px;
  flex-direction: row;
  align-items: center;
`;

export const ContentTextContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-left: 50px;
`;
export const ContentTitleDisable = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: black;
  margin-right: 50px;
`;

export const ContentObservationDisable = styled.Text`
  color: #7d7575;
`;
