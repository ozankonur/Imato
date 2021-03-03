import {StyleSheet, Platform} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
      android: {
        paddingTop: 10,
      },
    }),
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header:{
    textAlign: 'left',
    fontSize: 27,
    marginBottom: 10,
    alignSelf:'flex-start',
  },
  love:{
    textAlign: 'center',
    fontSize: 17,
    marginBottom: 50,
    color:'#333333'
  },
  text:{
    textAlign: 'center',
    fontSize: 18,
  },
  marginTop:{
    marginTop:20
  },
  image: {
    width: 300,
    height:200,
    borderRadius:5,
  },
  card:{
    width:300,
    height:200,
    margin:20,
    backgroundColor:"white",
    elevation:10,
    borderRadius:5,
  },
});

export default styles;
