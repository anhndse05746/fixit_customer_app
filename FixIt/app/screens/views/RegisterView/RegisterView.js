import React, {useEffect} from 'react';
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
import {CheckBox, Input} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome5';
import CommonStyles from '../Styles';
import PTButton from '../../commonComponent/Button';
import {calcScale} from '../../../utils/dimension';
import {checkRegisteredUser} from '../../../store/register';
import {useReducer} from 'react';

const RegisterView = ({navigation}) => {
  const [fullName, setFullName] = React.useState('');
  const [nationId, setNationId] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repassword, setRepassword] = React.useState('');
  const [secure, setSecure] = React.useState(true);
  const [resecure, setResecure] = React.useState(true);
  const [checked, setChecked] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [errorPhone, setErrorPhone] = React.useState(false);
  const [matchedPassword, setMatchedPassword] = React.useState(false);

  const {isRegistered, message} = useSelector((state) => state.register);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = {
      phone: phone,
      name: fullName,
      email: email,
      password: password,
    };
    if (isRegistered == false) {
      navigation.navigate('OTPView', user);
    }
  }, [isRegistered]);

  const navigateOtpScreen = () => {
    if (fullName === '') {
      setErrorMessage(' không được để trống');
    } else if (nationId === '') {
      setErrorMessage(' không được để trống');
    } else if (phone === '') {
      setErrorMessage(' không được để trống');
    } else if (!/^(84|0[3|5|7|8|9])+([0-9]{8})\b$/.test(phone)) {
      setErrorPhone(true);
      setErrorMessage(' không đúng định dạng');
    } else if (password === '') {
      setErrorMessage(' không được để trống');
    } else if (repassword === '') {
      setErrorMessage(' không được để trống');
    } else if (
      password !== '' &&
      repassword !== '' &&
      password !== repassword
    ) {
      setMatchedPassword(true);
      setErrorMessage(' không khớp với mật khẩu');
    } else {
      setErrorMessage('');
      setErrorPhone(false);
      setMatchedPassword(false);
      dispatch(checkRegisteredUser(phone));
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
          {message ? (
            <Text
              style={[
                styles.textRegular,
                {marginTop: calcScale(15), fontSize: calcScale(22)},
              ]}>
              {message}
            </Text>
          ) : null}
          <View style={styles.formContainer}>
            <View style={styles.column}>
              <Text style={styles.textRegular}>
                Họ và tên <Text style={{color: 'red'}}>*</Text>
              </Text>
              <Input
                containerStyle={styles.input}
                placeholder="Nguyễn Văn A..."
                onChangeText={(fullName) => setFullName(fullName)}
                rightIcon={
                  fullName != '' ? (
                    <Icon
                      name="times-circle"
                      size={calcScale(15)}
                      color="grey"
                      onPress={() => setFullName('')}
                    />
                  ) : null
                }
                value={fullName}
                errorMessage={
                  errorMessage !== '' && fullName === ''
                    ? 'Họ và tên' + errorMessage
                    : ''
                }
              />
            </View>
            <View style={styles.column}>
              <Text style={styles.textRegular}>
                CMT/CCCD <Text style={{color: 'red'}}>*</Text>
              </Text>
              <Input
                containerStyle={styles.input}
                onChangeText={(nationId) => setNationId(nationId)}
                rightIcon={
                  nationId != '' ? (
                    <Icon
                      name="times-circle"
                      size={calcScale(15)}
                      color="grey"
                      onPress={() => setNationId('')}
                    />
                  ) : null
                }
                value={nationId}
                errorMessage={
                  errorMessage !== '' && nationId === ''
                    ? 'CMT/CCCD' + errorMessage
                    : ''
                }
              />
            </View>
            <View style={styles.column}>
              <Text style={styles.textRegular}>Email</Text>
              <Input
                containerStyle={styles.input}
                placeholder="nguyenvana@gmail.com"
                onChangeText={(email) => setEmail(email)}
                rightIcon={
                  email != '' ? (
                    <Icon
                      name="times-circle"
                      size={calcScale(15)}
                      color="grey"
                      onPress={() => setEmail('')}
                    />
                  ) : null
                }
                value={email}
                keyboardType="email-address"
              />
            </View>
            <View style={styles.column}>
              <Text style={styles.textRegular}>
                Số điện thoại <Text style={{color: 'red'}}>*</Text>
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
                  (errorMessage !== '' && phone === '') || errorPhone
                    ? 'Số điện thoại' + errorMessage
                    : ''
                }
              />
            </View>
            <View style={styles.column}>
              <Text style={styles.textRegular}>
                Mật khẩu <Text style={{color: 'red'}}>*</Text>
              </Text>
              <Input
                containerStyle={styles.input}
                placeholder="nguyenvana123"
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={secure}
                rightIcon={
                  password != '' ? (
                    <View style={styles.row}>
                      <Icon
                        name={secure ? 'eye-slash' : 'eye'}
                        size={calcScale(15)}
                        color="grey"
                        onPress={() => setSecure(!secure)}
                        style={{marginRight: calcScale(5)}}
                      />
                      <Icon
                        name="times-circle"
                        size={calcScale(15)}
                        color="grey"
                        onPress={() => setPassword('')}
                      />
                    </View>
                  ) : null
                }
                value={password}
                errorMessage={
                  errorMessage !== '' && password === ''
                    ? 'Mật khẩu' + errorMessage
                    : ''
                }
              />
            </View>
            <View style={styles.column}>
              <Text style={styles.textRegular}>
                Nhập lại mật khẩu <Text style={{color: 'red'}}>*</Text>
              </Text>
              <Input
                containerStyle={styles.input}
                placeholder="nguyenvana123"
                onChangeText={(repassword) => setRepassword(repassword)}
                secureTextEntry={resecure}
                rightIcon={
                  repassword != '' ? (
                    <View style={styles.row}>
                      <Icon
                        name={resecure ? 'eye-slash' : 'eye'}
                        size={calcScale(15)}
                        color="grey"
                        onPress={() => setResecure(!resecure)}
                        style={{marginRight: calcScale(5)}}
                      />
                      <Icon
                        name="times-circle"
                        size={calcScale(15)}
                        color="grey"
                        onPress={() => setRepassword('')}
                      />
                    </View>
                  ) : null
                }
                value={repassword}
                errorMessage={
                  (errorMessage !== '' && repassword === '') || matchedPassword
                    ? 'Nhập lại mật khẩu' + errorMessage
                    : ''
                }
              />
            </View>
          </View>
          <CheckBox
            title="Tôi đồng ý với điều khoản và dịch vụ của FixIt"
            checked={checked}
            onPress={() => setChecked(!checked)}
            containerStyle={styles.checkBox}
            textStyle={{fontSize: calcScale(17)}}
          />
          <View style={{alignItems: 'center'}}>
            <PTButton
              title="Tiếp tục"
              onPress={() => {
                navigateOtpScreen();
              }}
              style={styles.button}
              color="#fff"
              disabled={checked ? false : true}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterView;

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
