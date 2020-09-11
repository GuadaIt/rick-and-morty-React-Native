import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 30
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#02b1c8'
  },
  icon: {
    padding: 10,
    marginHorizontal: 10,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  input: {
    color: 'white'
  }
});

export default styles;