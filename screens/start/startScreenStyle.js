import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#343434',
    flex: 1,
    paddingVertical: 100,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleContainer: {
    alignItems: 'center'
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 18,
    color: 'white',
    marginVertical: 10,
    color: '#02b1c8'
  },
  name: {
    fontSize: 15,
    color: 'white'
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  button: {
    height: '100%',
    width: 150,
    height: 50,
    backgroundColor: '#02b1c8',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  txtBtn: {
    color: 'white',
    fontSize: 18
  },
  date: {
    marginTop: 20,
    color: 'white',
    fontSize: 12
  }
});

export default styles;