import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { View } from 'react-native';
import { StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Header, Input } from 'react-native-elements';

import { width, calcScale } from '../../utils/dimension';
import CommonStyles from './Styles';
import { updateUser } from '../../store/user'

const MyProfileView = () => {
  const data = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { updateUserMessage } = data


  const [notEdit, setNotEdit] = React.useState(true);
  const [headerText, setHeaderText] = React.useState('Sửa');
  const [isHasAvatar, setIsHasAvatar] = React.useState(false);
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');

  const edit = () => {
    setNotEdit(!notEdit);
    if (notEdit === true) {
      setHeaderText('Lưu');
    } else {
      setHeaderText('Sửa');
      if (name !== data.name || email !== data.email) {
        dispatch(updateUser(data.phoneNumber, data.token, name, email))
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        rightComponent={{
          text: headerText,
          color: '#000',
          onPress: () => edit(),
        }}
        backgroundColor="#fff"
      />
      <View style={styles.coverColor}></View>
      <View style={styles.innerContainer}>
        <View style={styles.avatarContainer}>
          {isHasAvatar ? (
            <Avatar rounded size={calcScale(150)} />
          ) : (
            <Avatar
              rounded
              size={calcScale(150)}
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
        <View style={styles.userInfoContainer}>
          <Text style={[styles.textBold, { textAlign: 'center' }]}>
            {data.name}
          </Text>
          <Text style={[styles.textRegular, { textAlign: 'center' }]}>
            Khách hàng
          </Text>
        </View>
        <Text>{updateUserMessage}</Text>
        <View style={styles.userInfoContainer}>
          <Input
            containerStyle={[styles.input, { width: calcScale(width) }]}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            placeholder="Name"
            onChangeText={(name) => setName(name)}
            value={data.name}
            disabled={notEdit}
          />
          <Input
            containerStyle={[
              styles.input,
              { width: calcScale(width), marginTop: calcScale(15) },
            ]}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            placeholder="Phone"
            onChangeText={(phone) => setPhone(phone)}
            value={data.phoneNumber}
            disabled={notEdit}
            keyboardType="number-pad"
          />
          <Input
            containerStyle={[
              styles.input,
              { width: calcScale(width), marginTop: calcScale(15) },
            ]}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
            value={data.email}
            disabled={notEdit}
            keyboardType="email-address"
          />
        </View>
      </View>
    </SafeAreaView>
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
  },
  coverColor: {
    height: calcScale(150),
    backgroundColor: 'rgb(242, 85, 44)',
    zIndex: 0,
  },
  avatarContainer: {
    marginTop: calcScale(-75),
    zIndex: 1,
  },
  userInfoContainer: {
    paddingTop: calcScale(20),
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
