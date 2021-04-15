import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { calcScale } from '../../../utils/dimension';
import PTButton from '../../commonComponent/Button';
import commonStyles from '../Styles';
import { createRequest, clearMessage, listAllRequest } from '../../../store/request';

const ConfirmRequestView = ({ navigation, route }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const requestStates = useSelector((state) => state.request);
  const { message } = requestStates;
  const data = route.params.requestData;
  const { address, service, issues } = data;
  const [constructorHasRun, setConstructorHasRun] = React.useState(false);
  const [estimate_fix_duration, setEstimate_fix_duration] = React.useState(0);
  const [estimate_price, setEstimate_price] = React.useState(0);

  let request_issues = [];
  for (let i = 0; i < issues.length; i++) {
    request_issues.push({ issues_id: issues[i].id });
  }

  const requestData = {
    customer_id: user.userId,
    service_id: service.id,
    schedule_time: data.date.toString(),
    estimate_time: estimate_fix_duration,
    estimate_price: estimate_price,
    description: data.description,
    address: address[0].address,
    city: address[0].city,
    district: address[0].district,
    request_issues: request_issues,
  };

  console.log({ requestData })
  console.log({ request_issues })

  const constructor = () => {
    if (constructorHasRun) {
      return;
    } else {
      console.log(data);
      let price = 0;
      let time = 0;
      data.issues.map((issue, index) => {
        price += parseFloat(issue.estimate_price);
        time += issue.estimate_fix_duration;
      });
      setEstimate_price(price);
      setEstimate_fix_duration(time);
      setConstructorHasRun(true);
    }
  };

  constructor();

  useEffect(() => {
    if (message != '') {
      dispatch({ type: clearMessage.type });
      alert(message);
      dispatch(listAllRequest(user.token, user.userId))
      navigation.navigate('HomeView');
    }
  }, [message]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.formHeader}>
          <Text
            style={{
              fontSize: calcScale(28),
              fontWeight: 'bold',
            }}>
            Dịch vụ: {data.service.name}
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
          {data.issues.map((item, index) => {
            return (
              <Text
                key={item.id.toString()}
                style={{
                  fontSize: calcScale(16),
                  marginBottom: calcScale(10),
                }}>
                + {item.title}
              </Text>
            );
          })}
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
          <Text
            style={{
              fontSize: calcScale(18),
              fontWeight: 'bold',
              marginBottom: calcScale(10),
            }}>
            {data.description}
          </Text>
        </View>
        <View style={styles.innerFormContainer}>
          <Text
            style={{
              fontSize: calcScale(18),
              fontWeight: 'bold',
              marginBottom: calcScale(10),
            }}>
            Thời gian sửa ước tính
          </Text>
          <Text
            style={{
              fontSize: calcScale(16),
              marginBottom: calcScale(10),
            }}>
            {estimate_fix_duration} Phút
          </Text>
        </View>
        <View style={styles.innerFormContainer}>
          <Text
            style={{
              fontSize: calcScale(18),
              fontWeight: 'bold',
              marginBottom: calcScale(10),
            }}>
            Tiền sửa ước tính
          </Text>
          <Text
            style={{
              fontSize: calcScale(16),
              marginBottom: calcScale(10),
            }}>
            {estimate_price} VND
          </Text>
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
          <Text
            style={{
              fontSize: calcScale(18),
              marginBottom: calcScale(10),
            }}>
            {data.date.toString()}
          </Text>
        </View>
        <View
          style={{
            borderTopColor: '#ccc',
            borderTopWidth: 1,
            paddingTop: calcScale(10),
            marginBottom: calcScale(20),
          }}>
          <View style={{ marginLeft: calcScale(20) }}>
            <Text style={{ fontSize: calcScale(24), fontWeight: 'bold' }}>
              Địa chỉ
            </Text>
            <Text style={{ fontSize: calcScale(18), marginTop: calcScale(5) }}>
              {user.name} | {user.phoneNumber}
            </Text>
            <Text
              style={{
                fontSize: calcScale(18),
              }}>{`${address[0].address}, ${address[0].district}, ${address[0].city}`}</Text>
          </View>
        </View>
        <View style={[styles.innerFormContainer, { alignItems: 'center' }]}>
          <PTButton
            title="Xác nhận"
            onPress={() => dispatch(createRequest(user.token, requestData))}
            style={styles.button}
            color="#fff"
          />
        </View>
      </View>
    </ScrollView>
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
    marginTop: calcScale(20),
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

export default ConfirmRequestView;
