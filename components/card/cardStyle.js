import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    minHeight: 100,
    width: 300,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 5,
    backgroundColor: '#313131',
    borderRadius: 5
  },
  imgContainer: {
    flex: 1
  },
  img: {
    width: 80,
    height: 80
  },
  nameContainer: {
    width: 0,
    flexGrow: 1,
    flex: 1
  },
  name: {
    fontSize: 18,
    color: 'white'
  },
  episodeName: {
    flexShrink: 1,
    fontSize: 20,
    color: 'white'
  },
  epNumber: {
    fontSize: 20,
    marginLeft: 10,
    color: '#02b1c8',
    fontWeight: 'bold'
  },
  typeTitle: {
    color: '#02b1c8',
    fontSize: 15
  },
  type: {
    fontSize: 15
  },
  typeContainer: {
    alignItems: 'flex-end'
  }
});

export default styles;