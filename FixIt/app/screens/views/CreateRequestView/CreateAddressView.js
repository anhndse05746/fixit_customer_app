import React, {useEffect} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {clearMessage, createAddress} from '../../../store/user';
import {cityOfVN} from '../../../utils/cityOfVietNam';
import constants from '../../../utils/constants';
import {calcScale} from '../../../utils/dimension';
import PTButton from '../../commonComponent/Button';
import CommonStyles from '../Styles';
import {Picker} from '@react-native-picker/picker';

const CreateAddressView = ({navigation}) => {
  const [constructorHasRun, setConstructorHasRun] = React.useState(false);
  const [cities, setCities] = React.useState(cityOfVN);
  const [selectedCity, setSelectedCity] = React.useState(0);
  const [selectedCityIndex, setSelectedCityIndex] = React.useState(0);
  const [selectedDistrict, setSelectedDistrict] = React.useState(0);
  const [address, setAddress] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const constructor = () => {
    if (constructorHasRun) {
      return;
    } else {
      setConstructorHasRun(true);
    }
  };

  constructor();

  const dispatch = useDispatch();
  const {userId, token, message} = useSelector((state) => state.user);

  useEffect(() => {
    if (message === constants.CREATE_ADDRESS_SUCCESSFULLY) {
      dispatch({type: clearMessage.type, payload: ''});
      alert('Tạo địa chỉ thành công');
      navigation.navigate('AddressListView', {
        selectedId: -1,
      });
    }
  }, [message]);

  const validateThenNavigate = () => {
    if (selectedCity === 0) {
      setErrorMessage(' không được để trống');
    } else if (selectedDistrict === 0) {
      setErrorMessage(' không được để trống');
    } else if (address.trim() === '') {
      setErrorMessage(' không được để trống');
    } else {
      setErrorMessage('');
      dispatch(
        createAddress(
          userId,
          token,
          parseInt(selectedCity),
          parseInt(selectedDistrict),
          address.trim(),
        ),
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.innerContainer}>
          <Text
            style={[
              styles.textRegular,
              {marginTop: calcScale(15), fontSize: calcScale(22)},
            ]}>
            Vui lòng điền những thông tin sau
          </Text>
          <Text>{message}</Text>
          <View style={styles.formContainer}>
            <View style={styles.column}>
              <Text style={styles.textRegular}>
                Tỉnh/Thành phố <Text style={{color: 'red'}}>*</Text>
              </Text>
              <Picker
                selectedValue={selectedCity}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedCity(itemValue);
                  setSelectedCityIndex(itemIndex);
                }}>
                {cities.map((city) => {
                  return (
                    <Picker.Item
                      label={city.Name}
                      value={city.Id}
                      key={city.Id}
                    />
                  );
                })}
              </Picker>
              {errorMessage !== '' && selectedCity === 0 ? (
                <Text style={{color: 'red'}}>Thành phố {errorMessage}</Text>
              ) : null}
            </View>
            <View style={styles.column}>
              <Text style={styles.textRegular}>
                Quận/Huyện <Text style={{color: 'red'}}>*</Text>
              </Text>
              <Picker
                selectedValue={selectedDistrict}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedDistrict(itemValue);
                }}>
                <Picker.Item label={''} value={0} />
                {cities.length > 0
                  ? cities[selectedCityIndex].Districts.map((district) => {
                      return (
                        <Picker.Item
                          label={district.Name}
                          value={district.Id}
                          key={district.Id}
                        />
                      );
                    })
                  : null}
              </Picker>
              {errorMessage !== '' && selectedDistrict === 0 ? (
                <Text style={{color: 'red'}}>Quận/Huyện {errorMessage}</Text>
              ) : null}
            </View>
            <View style={styles.column}>
              <Text style={styles.textRegular}>
                Địa chỉ <Text style={{color: 'red'}}>*</Text>
              </Text>
              <Input
                containerStyle={styles.input}
                onChangeText={(address) => setAddress(address)}
                rightIcon={
                  address != '' ? (
                    <Icon
                      name="times-circle"
                      size={calcScale(15)}
                      color="grey"
                      onPress={() => setAddress('')}
                    />
                  ) : null
                }
                value={address}
                errorMessage={
                  errorMessage !== '' && address === ''
                    ? 'Địa chỉ' + errorMessage
                    : ''
                }
              />
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <PTButton
              title="Xác nhận"
              onPress={() => validateThenNavigate()}
              style={styles.button}
              color="#fff"
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CreateAddressView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  innerContainer: {
    paddingHorizontal: calcScale(30),
  },
  formContainer: {
    justifyContent: 'center',
    marginVertical: calcScale(30),
  },
  input: {
    marginTop: calcScale(10),
  },
  textBold: {
    ...CommonStyles.textBold,
    fontSize: calcScale(30),
    color: '#000',
  },
  textRegular: {
    ...CommonStyles.textRegular,
    fontSize: calcScale(20),
    color: '#000',
  },
  checkBox: {
    backgroundColor: '#fff',
    borderWidth: 0,
    padding: 0,
  },
  button: {
    marginTop: calcScale(20),
    width: '100%',
    height: calcScale(45),
    borderRadius: 10,
    backgroundColor: 'rgb(242, 85, 44)',
  },
  footerContainer: {
    justifyContent: 'center',
    marginHorizontal: calcScale(40),
  },
  row: {
    ...CommonStyles.row,
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'column',
    marginTop: calcScale(15),
  },
});
