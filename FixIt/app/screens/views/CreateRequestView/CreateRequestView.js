import React, {useEffect} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {CheckBox, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {cityOfVN} from '../../../utils/cityOfVietNam';
import {calcScale} from '../../../utils/dimension';
import PTButton from '../../commonComponent/Button';
import commonStyles from '../Styles';

const CreateRequestView = ({navigation, route}) => {
  const user = useSelector((state) => state.user);

  const data = route.params.service;

  const address = route.params.address;

  const [constructorHasRun, setConstructorHasRun] = React.useState(false);
  const [cities, setCities] = React.useState([]);
  const [description, setDescription] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [issues, setIssues] = React.useState([
    {
      id: -1,
      checked: false,
      title: 'Khác',
      estimate_fix_duration: 0,
      estimate_price: 0,
    },
  ]);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [addressError, setAddressError] = React.useState('');
  const [errorCheckbox, setErrorCheckbox] = React.useState('');

  const constructor = () => {
    if (constructorHasRun) {
      return;
    } else {
      data.issues.map((issue, index) => {
        const checkBox = {
          id: issue.id,
          checked: false,
          title: issue.name,
          estimate_fix_duration: issue.estimate_fix_duration,
          estimate_price: issue.estimate_price,
        };
        issues.unshift(checkBox);
      });
      setCities(cityOfVN);
      setConstructorHasRun(true);
    }
  };

  constructor();

  let city = address ? cities.find((x) => x.Id == address[0].city).Name : '';
  let district = address
    ? cities
        .find((x) => x.Id == address[0].city)
        .Districts.find((x) => x.Id == address[0].district).Name
    : '';

  const toggleCheckbox = (index) => {
    const checkboxData = [...issues];
    checkboxData[index].checked = !checkboxData[index].checked;
    setIssues(checkboxData);
  };

  const getDataAndNavigateConfirm = () => {
    const issuesData = [];
    issues.map((issue, index) => {
      if (issue.checked) {
        issuesData.push(issue);
      }
    });
    if (address === undefined) {
      setAddressError('Bạn cần chọn địa chỉ');
    } else if (issuesData.length === 0) {
      setErrorCheckbox('Bạn cần bọn vấn đề gặp phải');
    } else if (date === '') {
      setErrorCheckbox(' không được để trống');
    } else {
      const requestData = {
        service: data,
        address: address,
        description: description,
        date: date,
        issues: issuesData,
      };
      setErrorMessage('');
      setErrorCheckbox('');
      navigation.navigate('ConfirmRequestView', {requestData: requestData});
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.form}>
            <View style={styles.formHeader}>
              <Text
                style={{
                  fontSize: calcScale(28),
                  fontWeight: 'bold',
                }}>
                Dịch vụ: {data.name}
              </Text>
            </View>
            <View style={styles.innerFormContainer}>
              <Text
                style={{
                  fontSize: calcScale(18),
                  fontWeight: 'bold',
                  marginBottom: calcScale(10),
                }}>
                Vấn đề đang gặp phải
              </Text>
              {issues.map((item, index) => {
                console.log('item: ' + JSON.stringify(item));
                return (
                  <CheckBox
                    title={
                      <Text
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text>{item.title}</Text>
                        <Text> - {item.estimate_price}0đ</Text>
                      </Text>
                    }
                    checked={item.checked}
                    onPress={() => toggleCheckbox(index)}
                    containerStyle={styles.checkBox}
                    key={index.toString()}
                  />
                );
              })}
              {errorCheckbox !== '' ? <Text>{errorCheckbox}</Text> : null}
            </View>
            <View style={styles.innerFormContainer}>
              <Text
                style={{
                  fontSize: calcScale(18),
                  fontWeight: 'bold',
                  marginBottom: calcScale(10),
                }}>
                Mô tả chi tiết vấn đề gặp phải
              </Text>
              <TextInput
                multiline={true}
                numberOfLines={4}
                onChangeText={(description) => setDescription(description)}
                value={description}
                style={{
                  borderColor: '#000',
                  borderRadius: calcScale(10),
                  borderWidth: 1,
                  backgroundColor: '#fff',
                }}
              />
            </View>
            <View style={styles.innerFormContainer}>
              <Text
                style={{
                  fontSize: calcScale(18),
                  fontWeight: 'bold',
                  marginBottom: calcScale(10),
                }}>
                Thời gian
              </Text>
              <DatePicker
                date={date}
                mode="datetime"
                minimumDate={new Date()}
                onDateChange={(date) => {
                  setDate(date);
                }}
              />
              {errorMessage !== '' && date === '' ? (
                <Text>Thời gian{errorMessage}</Text>
              ) : null}
            </View>
            <TouchableOpacity
              onPress={() => {
                if (address === null || address === undefined) {
                  navigation.navigate('AddressListView', {
                    selectedId: -1,
                  });
                } else {
                  navigation.navigate('AddressListView', {
                    selectedId: address[0].id,
                  });
                }
              }}
              style={{
                borderTopColor: '#ccc',
                borderTopWidth: 1,
                paddingBottom: calcScale(10),
              }}>
              <View style={[styles.row, {marginTop: calcScale(20)}]}>
                <View style={{marginLeft: calcScale(20)}}>
                  <Text style={{fontSize: calcScale(24), fontWeight: 'bold'}}>
                    Địa chỉ
                  </Text>
                  <Text
                    style={{fontSize: calcScale(18), marginTop: calcScale(5)}}>
                    {user.name} | {user.phoneNumber}
                  </Text>
                  <Text style={{fontSize: calcScale(18)}}>
                    {address === null || address === undefined
                      ? 'Chọn địa chỉ'
                      : address[0].address + ', ' + district + ', ' + city}
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    marginRight: calcScale(20),
                  }}>
                  <Icon
                    name="chevron-right"
                    size={calcScale(22)}
                    color="#000"
                  />
                </View>
              </View>
            </TouchableOpacity>
            {addressError !== '' && address === undefined ? (
              <Text style={{marginLeft: calcScale(20), color: 'red'}}>
                {addressError}
              </Text>
            ) : null}
            <View style={[styles.innerFormContainer, {alignItems: 'center'}]}>
              <PTButton
                title="Tiếp tục"
                onPress={() => getDataAndNavigateConfirm()}
                style={styles.button}
                color="#fff"
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  form: {
    marginTop: calcScale(5),
    marginHorizontal: calcScale(20),
  },
  formHeader: {
    marginVertical: calcScale(10),
  },
  innerFormContainer: {
    marginVertical: calcScale(10),
  },
  input: {
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 0.5,
    backgroundColor: '#fff',
    borderRadius: 10,
    height: calcScale(50),
  },
  checkBox: {
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
});

export default CreateRequestView;
