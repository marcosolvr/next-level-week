import styled from "styled-components/native";
import Constants from "expo-constants";
import MapView, { Marker } from "react-native-maps";

export const Container = styled.View`
  flex: 1;
  padding-horizontal: 32px;
  padding-top: ${Constants.statusBarHeight + 20}px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-family: Ubuntu_700Bold;
  margin-top: 24px;
`;

export const Description = styled.Text`
  color: #6c6c80;
  font-size: 16px;
  margin-top: 4px;
  font-family: Roboto_400Regular;
`;

export const MapContainer = styled.View`
  flex: 1;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 16px;
`;

export const MapMarkerContainer = styled.View`
  width: 90px;
  height: 70px;
  background-color: #34cb79;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  align-items: center;
`;

export const MapMarkerImage = styled.Image`
  width: 90px;
  height: 45px;
  resize-mode: cover;
`;

export const MapMarkerTitle = styled.Text`
  flex: 1;
  font-family: Roboto_500Medium;
  color: #fff;
  font-size: 13px;
  line-height: 23px;
`;

export const ItemsContainer = styled.View`
  flex-direction: row;
  margin-top: 16px;
  margin-bottom: 32px;
`;

export const ItemTitle = styled.Text`
  font-family: Roboto_400Regular;
  text-align: center;
  font-size: 13px;
`;

export const Map = styled(MapView)`
  width: 100%;
  height: 100%;
`;

export const MapMarker = styled(Marker)`
  width: 90px;
  height: 80px;
`;

export const ItemList = {
  backgroundColor: "#fff",
  borderWidth: 2,
  borderColor: "#eee",
  height: 120,
  width: 120,
  borderRadius: 8,
  paddingHorizontal: 16,
  paddingTop: 20,
  paddingBottom: 16,
  marginRight: 8,
  alignItems: "center",
  justifyContent: "space-between",

  textAlign: "center",
};

export const SelectedItems = {
  borderColor: "#34CB79",
  borderWidth: 2,
};

// export const Footer = styled.View`
//   border-top-width: ${StyleSheet.hairlineWidth}px;
//   border-color: #999;
//   padding-vertical: 20px;
//   padding-horizontal: 32px;
//   flex-direction: row;
//   justify-content: space-between;
// `;

// export const Button = styled(RectButton)`
//   width: 48%;
//   background-color: #34cb79;
//   border-radius: 10px;
//   height: 50px;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
// `;
