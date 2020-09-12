import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  underlined: {
    borderBottomColor: '#02b1c8',
    borderBottomWidth: 3,
    marginRight: 10
  },
  txt: {
    fontSize: 20,
  },
  notUnderlined: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 3,
  },
  name: {
    textAlign: 'center',
    maxWidth: '60%',
    fontSize: 25,
    color: '#02b1c8'
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    marginVertical: 8,
    color: 'white'
  },
  btn: {
    color: 'white',
    width: 40,
    height: 40,
    backgroundColor: '#02b1c8',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 15,
    left: 15,
    borderRadius: 10
  },
  btnTxt: {
    fontSize: 20
  },
  imgContainer: {
    marginVertical: 30
  },
  img: {
    width: 300,
    height: 300
  }
});

export default styles;