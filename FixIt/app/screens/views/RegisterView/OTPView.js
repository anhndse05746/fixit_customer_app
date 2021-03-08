import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useDispatch, useSelector } from 'react-redux';

import { calcScale } from '../../../utils/dimension';
import CommonStyles from '../Styles';
import PTButton from '../../commonComponent/Button';
import { registerUser } from '../../../store/register'

const OTPView = ({ route, navigation }) => {
  const [code, setCode] = React.useState();
  const { OTPMessage } = useSelector(state => state.register)
  const dispatch = useDispatch();
  const user = {
    phone: route.params.phone,
    name: route.params.name,
    email: route.params.email,
    password: route.params.password,
  }

  const confirm = () => {
    dispatch(registerUser(user.phone, user.password, user.name, user.email))
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Text style={[styles.textRegular, { marginTop: calcScale(30) }]}>
        Mã OTP đã được gửi đến số điện thoại của bạn.
      </Text>
      <OTPInputView
        style={{ width: '80%', height: 100 }}
        pinCount={6}
        // code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        // onCodeChanged = {(code) => setCode(code)}
        autoFocusOnLoad
        codeInputFieldStyle={styles.styleBase}
        codeInputHighlightStyle={styles.styleHighLighted}
        onCodeFilled={(code) => {
          console.log(`Code is ${code}, you are good to go!`);
        }}
      />
      <TouchableOpacity onPress={() => { }}>
        <Text style={[styles.textRegular, { textDecorationLine: 'underline' }]}>
          Gửi lại mã OTP.
        </Text>
      </TouchableOpacity>
      <PTButton
        title="Xác nhận"
        onPress={() => confirm()}
        style={styles.button}
        color="#fff"
      />
    </KeyboardAvoidingView>
  );
};

export default OTPView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  styleBase: {
    width: calcScale(50),
    height: calcScale(50),
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgb(229,229,229)',
    color: '#000',
  },
  styleHighLighted: {
    borderColor: 'rgb(242, 85, 44)',
    backgroundColor: '#fff',
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
  button: {
    marginTop: calcScale(20),
    width: '90%',
    height: calcScale(45),
    borderRadius: 10,
    backgroundColor: 'rgb(242, 85, 44)',
    position: 'absolute',
    bottom: 0,
  },
});
