import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {Input} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome5';
import CommonStyles from '../Styles';
import PTButton from '../../commonComponent/Button';
import {calcScale} from '../../../utils/dimension';

const ForgetPasswordView = ({navigation}) => {
  const [phone, setPhone] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const navigateOtpScreen = () => {
    if (phone === '') {
      setErrorMessage(' is required');
    } else {
      setErrorMessage('');
      navigation.navigate('ConfirmPhoneView');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Text
            style={[
              styles.textRegular,
              {marginTop: calcScale(15), fontSize: calcScale(22)},
            ]}>
            Vui lòng điền số điện thoại đã đăng kí
          </Text>
          <View style={styles.formContainer}>
            <View style={styles.column}>
              <Text style={styles.textRegular}>
                Phone number <Text style={{color: 'red'}}>*</Text>
              </Text>
              <Input
                containerStyle={styles.input}
                placeholder="0123456789"
                onChangeText={(phone) => setPhone(phone)}
                rightIcon={
                  phone != '' ? (
                    <Icon
                      name="times-circle"
                      size={calcScale(15)}
                      color="grey"
                      onPress={() => setPhone('')}
                    />
                  ) : null
                }
                value={phone}
                keyboardType="number-pad"
                errorMessage={
                  errorMessage !== '' && phone === ''
                    ? 'Phone number' + errorMessage
                    : ''
                }
              />
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <PTButton
              title="Tiếp tục"
              onPress={() => {
                navigateOtpScreen();
              }}
              style={styles.button}
              color="#fff"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ForgetPasswordView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  textRegular: {
    ...CommonStyles.textRegular,
    fontSize: calcScale(20),
    color: '#000',
  },
  button: {
    marginTop: calcScale(20),
    width: '100%',
    height: calcScale(45),
    borderRadius: 10,
    backgroundColor: 'rgb(242, 85, 44)',
  },
  column: {
    flexDirection: 'column',
    marginTop: calcScale(15),
  },
});
