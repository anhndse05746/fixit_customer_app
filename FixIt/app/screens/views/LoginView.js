import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CommonStyles from './Styles';
import { Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux'

import PTButton from '../commonComponent/Button';
import { calcScale } from '../../utils/dimension';
import { loadUsers } from '../../store/user'

const LoginView = ({ navigation }) => {
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [secure, setSecure] = React.useState();

  const dispatch = useDispatch();
  const data = useSelector(state => state.user)

  const login = async (username, password) => {
    dispatch(loadUsers(username, password))
    const user = {
      username: username,
      password: password,
    };
    Keyboard.dismiss();
    navigation.navigate('DrawerInside');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.backgroundContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/fixit-appCustomer.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.innerContainer}>
            <Text style={styles.textBold}>Chào mừng bạn!</Text>
            <Text style={styles.textRegular}>Đăng nhập để tiếp tục</Text>

            <Input
              containerStyle={styles.input}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              placeholder="Username"
              onChangeText={username => setUsername(username)}
              keyboardType="phone-pad"
            />
            <Input
              containerStyle={styles.input}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              placeholder="Password"
              onChangeText={password => setPassword(password)}
              secureTextEntry={secure}
              rightIcon={
                password != '' ? (
                  <Icon
                    name={secure ? 'eye-slash' : 'eye'}
                    size={calcScale(15)}
                    color="grey"
                    onPress={() => setSecure(!secure)}
                  />
                ) : null
              }
            />
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
              <PTButton
                title="Đăng nhập"
                onPress={() => login(username, password)}
                style={styles.loginButton}
                color="#000"
              />
            </View>
          </View>
          <View style={styles.footerContainer}>
            <View style={styles.row}>
              <Text style={styles.textRegular}>Bạn chưa có tài khoản? </Text>
              <TouchableOpacity>
                <Text
                  style={[
                    styles.textRegular,
                    { textDecorationLine: 'underline' },
                  ]}>
                  Đăng kí ngay
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <TouchableOpacity
              style={[
                styles.row,
                {
                  backgroundColor: '#fff',
                  justifyContent: 'space-between',
                  height: calcScale(40),
                  borderRadius: 10,
                  marginTop: calcScale(5),
                },
              ]}>
              <Image
                source={require('../../assets/images/google-logo.png')}
                resizeMode="contain"
                style={{ height: calcScale(40), flex: 0.15 }}
              />
              <Text style={[styles.textRegular, { color: '#000', flex: 0.75 }]}>
                Đăng nhập với Google
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default LoginView;

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },
  backgroundContainer: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: 'rgb(242, 85, 44)',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    height: calcScale(60),
  },
  innerContainer: {
    justifyContent: 'center',
    marginHorizontal: calcScale(40),
  },
  input: {
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 0.5,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: calcScale(15),
    height: calcScale(50),
  },
  textBold: {
    ...CommonStyles.textBold,
    fontSize: calcScale(30),
    color: '#fff',
  },
  textRegular: {
    ...CommonStyles.textRegular,
    fontSize: calcScale(20),
    color: '#fff',
  },
  forgotPassword: {
    ...CommonStyles.textRegular,
    fontSize: calcScale(18),
    color: '#fff',
    textAlign: 'right',
    paddingTop: calcScale(10),
  },
  loginButton: {
    marginTop: calcScale(20),
    width: '100%',
    height: calcScale(45),
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  footerContainer: {
    justifyContent: 'center',
    marginHorizontal: calcScale(40),
  },
  line: {
    borderWidth: 0.5,
    borderColor: '#fff',
    marginVertical: calcScale(10),
  },
  row: {
    ...CommonStyles.row,
    justifyContent: 'center',
  },
});
