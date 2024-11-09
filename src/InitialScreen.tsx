import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS} from 'react-native-permissions';
import Header from './Header';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {addCoordinate, deleteCoordinate, Coordinate} from './Redux/actions';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './Redux/store';
import {Provider} from 'react-redux';
import fetchAddress from './API/fetchAddress';

const InitialScreen = () => {
  const dispatch = useDispatch();
  const coordinates = useSelector(
    (state: {coordinates: Coordinate[]}) => state.coordinates,
  );
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');

  // Request location permission when the component mounts
  useEffect(() => {
    requestLocationPermission();
  }, []);

  // Function to request location permission
  const requestLocationPermission = async () => {
    try {
      const granted = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (granted !== 'granted') {
        console.log('Location permission not granted');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // Function to get the current location and dispatch it to the store
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        dispatch(addCoordinate({latitude, longitude}));
      },
      error => {
        console.log('Error getting location:', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  // Function to fetch the address based on latitude and longitude
  const getAddress = useCallback(
    async (latitude: number, longitude: number) => {
      try {
        const address = await fetchAddress(latitude, longitude);
        setSelectedAddress(address);
        setModalVisible(true);
      } catch (error) {
        console.log('Error fetching address:', error);
      }
    },
    [],
  );

  // Function to render each item in the FlatList
  const renderItem = ({
    item,
    index,
  }: {
    item: {latitude: number; longitude: number};
    index: any;
  }) => (
    <TouchableOpacity
      onPress={() => {
        getAddress(item.latitude, item.longitude);
      }}>
      <View style={styles.listItem}>
        <Image
          source={require('../images/icon.png')}
          style={styles.img}
          resizeMode="contain"
        />
        <Text style={styles.latlongTxt}>
          {item.latitude},-{item.longitude}
        </Text>

        <TouchableOpacity onPress={() => dispatch(deleteCoordinate(index))}>
          <Image
            source={require('../images/delete.png')}
            style={styles.deleteIcon}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          <Header title="Coordinates" />
          {coordinates.length > 0 ? (
            <View style={styles.flatlistView}>
              <FlatList
                data={coordinates}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />
            </View>
          ) : (
            <View
              style={styles.main}>
              <Image source={require('../images/cloud.png')} />
              <Text style={styles.welcomeText}>Welcome to GPS Store</Text>
              <Text style={styles.welcomeSubText}>Your GPS store is Empty</Text>
            </View>
          )}

          <TouchableOpacity style={styles.fab} onPress={getCurrentLocation}>
            <Text style={styles.fabText}>+</Text>
          </TouchableOpacity>
          <Modal isVisible={isModalVisible}>
            <View style={styles.modalContent}>
              <Text>{selectedAddress}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </PersistGate>
    </Provider>
  );
};

export default InitialScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main:{
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subHeader: {
    width: '100%',
    height: 40,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 190,
    backgroundColor: '#03A9F4',
    borderRadius: 30,
    elevation: 8,
  },
  fabText: {
    fontSize: 24,
    color: 'white',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    backgroundColor: 'light blue',
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  welcomeSubText: {
    fontSize: 14,
    marginBottom: 20,
    color: 'black',
    top: -10,
    paddingHorizontal: 20,
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.6,
    marginTop: 8,
  },
  flatlistView: {
    flex: 1,
    width: '100%',
  },
  img: {width: 25, height: 25, flex: 0.2},
  latlongTxt: {
    fontSize: 15,
    color: 'black',
    flex: 0.6,
  },
  deleteIcon: {width: 20, height: 22, flex: 0.2},
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    color: 'blue',
  },
});
