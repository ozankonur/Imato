import {Platform, StyleSheet} from "react-native";

export const colors = {
  mainBlue: '#167AE6',
  mainGreen: '#00D49F',
  textDark: '#283A4D',
  gray: '#969BA3',
  darkGray: '#858895',
  lightGray: '#C0C6CC',
  lightBackground: '#F5F7F8',
  lightGreen: '#1CDF8E',
  disabled: '#F1F4F5',
  disabledText: '#CFD8DC',
  earningsGray: '#DFE0E3',
  error: '#FF5C7E',
};

export const styles = StyleSheet.create({
  image: {
    width: 300,
    height:200,
    borderRadius:5,
  },
  card:{
    width: 300,
    height:200,
    backgroundColor:"white",
    elevation:10,
    borderRadius:5,
  },
  user: {
    color:"gray",
    marginTop:5,
    paddingLeft:7,
    flex:1
  },
  cardOperations:{
    width:20,
    height:20,
    marginRight:20,
  },
  operationsContainer:{
    flexDirection: 'row',
    marginTop:7
  },
  download:{
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    marginBottom: 50,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    alignItems:"center"
  },
  profileImg:{
    width:30,
    height:30,
    borderRadius:50,
    marginRight:10,
  },
  header: {
    flexDirection:"row",
  }
});
