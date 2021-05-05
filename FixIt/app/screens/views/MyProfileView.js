import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Avatar, Header, Input} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from '../../store/user';
import {calcScale, width} from '../../utils/dimension';
import CommonStyles from './Styles';

const MyProfileView = () => {
  const data = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {updateUserMessage} = data;

  const [notEdit, setNotEdit] = React.useState(true);
  const [headerText, setHeaderText] = React.useState('Sửa');
  const [isHasAvatar, setIsHasAvatar] = React.useState(false);
  const [name, setName] = React.useState(data.name);
  const [phone, setPhone] = React.useState(data.phoneNumber);
  const [email, setEmail] = React.useState(data.email);
  const [errorMessage, setErrorMessage] = React.useState('');

  const edit = () => {
    setNotEdit(!notEdit);
    if (notEdit === true) {
      setHeaderText('Lưu');
    } else {
      setHeaderText('Sửa');
      if (name !== data.name || email !== data.email) {
        console.log(data.phoneNumber, data.token, name.trim(), email.trim());
        if (name.trim() !== '') {
          setErrorMessage(' không được để trống');
        } else {
          setErrorMessage('');
          dispatch(
            updateUser(
              data.id,
              data.phoneNumber,
              data.token,
              name.trim(),
              email.trim(),
            ),
          );
        }
      }
    }
  };

  useEffect(() => {
    console.log(updateUserMessage);
    if (updateUserMessage) {
      alert(updateUserMessage);
    }
  }, [updateUserMessage]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <Header
            rightComponent={{
              text: headerText,
              style: {color: '#fff'},
              onPress: () => edit(),
            }}
            backgroundColor="rgb(242, 85, 44)"
          />
          <View style={styles.innerContainer}>
            <View style={{paddingTop: calcScale(10)}}>
              {isHasAvatar ? (
                <Avatar rounded size={calcScale(130)} />
              ) : (
                <Avatar
                  rounded
                  size={calcScale(130)}
                  containerStyle={{
                    borderColor: 'rgb(242, 85, 44)',
                    borderWidth: calcScale(2),
                    backgroundColor: '#fff',
                  }}
                  icon={{
                    name: 'user',
                    color: 'rgb(242, 85, 44)',
                    type: 'font-awesome',
                  }}
                />
              )}
            </View>
            <View style={{paddingVertical: calcScale(20)}}>
              <Text style={[styles.textBold, {textAlign: 'center'}]}>
                {data.name}
              </Text>
              <Text style={[styles.textRegular, {textAlign: 'center'}]}>
                Khách hàng
              </Text>
            </View>
            <View>
              <Input
                containerStyle={[styles.input, {width: calcScale(width)}]}
                inputContainerStyle={{borderBottomWidth: 0}}
                placeholder="Name"
                onChangeText={(name) => setName(name)}
                value={name}
                disabled={notEdit}
                errorMessage={
                  errorMessage !== '' && name === ''
                    ? 'Họ và tên' + errorMessage
                    : ''
                }
              />
              <Input
                containerStyle={[
                  styles.input,
                  {width: calcScale(width), marginTop: calcScale(15)},
                ]}
                inputContainerStyle={{borderBottomWidth: 0}}
                placeholder="Phone"
                onChangeText={(phone) => setPhone(phone)}
                value={phone}
                disabled
                keyboardType="number-pad"
              />
              <Input
                containerStyle={[
                  styles.input,
                  {width: calcScale(width), marginTop: calcScale(15)},
                ]}
                inputContainerStyle={{borderBottomWidth: 0}}
                placeholder="Email"
                onChangeText={(email) => setEmail(email)}
                value={email}
                disabled={notEdit}
                keyboardType="email-address"
              />
            </View>
          </View>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default MyProfileView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: calcScale(20),
    flex: 1,
  },
  textBold: {
    ...CommonStyles.textBold,
    fontSize: calcScale(30),
    color: '#000',
    textAlign: 'left',
    paddingLeft: calcScale(10),
  },
  textRegular: {
    ...CommonStyles.textRegular,
    fontSize: calcScale(20),
    color: '#000',
    textAlign: 'left',
    paddingLeft: calcScale(10),
  },
  input: {
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 0.5,
    backgroundColor: '#fff',
    borderRadius: 10,
    height: calcScale(50),
  },
});
