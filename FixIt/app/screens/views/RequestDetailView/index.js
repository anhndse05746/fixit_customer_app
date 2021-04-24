import React, {useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  Modal,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {calcScale} from '../../../utils/dimension';
import PTButton from '../../commonComponent/Button';
import commonStyles from '../Styles';
import {
  getRequestDetail,
  cancelRequest,
  listAllRequest,
} from '../../../store/request';
import constants from '../../../utils/constants';
import {cityOfVN} from '../../../utils/cityOfVietNam';

const RequestDetailView = ({navigation, route}) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const request = useSelector((state) => state.request);
  const {message} = request;

  const [constructorHasRun, setConstructorHasRun] = React.useState(false);
  const [cities, setCities] = React.useState([]);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [cancelReason, setCancelReason] = React.useState('');
  const [cancelReasonError, setCancelReasonError] = React.useState('');

  useEffect(() => {
    //console.log(request.onGoingRequests)
    dispatch(getRequestDetail(user.token, route.params.requestId));
  }, []);

  useEffect(() => {
    console.log(message);
    if (message === constants.CANCEL_REQUEST_SUCCESSFULLY) {
      alert(message);
      dispatch(listAllRequest(user.token, user.userId));
      //navigate to home view
      navigation.navigate(route.params.currentTab);
    }
  }, [message]);

  //const data = route.params.requestDetail

  const data = request.requestDetail;

  const constructor = () => {
    if (constructorHasRun) {
      return;
    } else {
      setCities(cityOfVN);
      setConstructorHasRun(true);
    }
  };

  constructor();

  const cancelRequestTrigger = (token, requestId, cancelReason) => {
    if (cancelReason !== '') {
      dispatch(cancelRequest(token, requestId, cancelReason));
      setModalVisible(false);
    } else {
      setCancelReasonError('Cần có lí do hủy');
    }
  };

  //Get status object of request
  let requestStatus;
  let myRequestButton;
  if (data.request_statuses) {
    requestStatus = data.request_statuses[0].status_id;
    if (requestStatus == 2 || requestStatus == 1) {
      myRequestButton = (
        <View style={[styles.innerFormContainer, {alignItems: 'center'}]}>
          <PTButton
            title="Hủy yêu cầu"
            onPress={() => setModalVisible(true)}
            style={styles.button}
            color="#fff"
          />
        </View>
      );
    } else if (requestStatus == 4) {
      myRequestButton = (
        <View style={[styles.innerFormContainer, {alignItems: 'center'}]}>
          <PTButton
            title="Xem hoá đơn"
            onPress={() => {}}
            style={styles.button}
            color="#fff"
          />
        </View>
      );
    } else if (requestStatus == 6) {
      myRequestButton = null;
    }
  }

  let city = data.city ? cities.find((x) => x.Id == data.city).Name : '';
  let district = data.city
    ? cities
        .find((x) => x.Id == data.city)
        .Districts.find((x) => x.Id == data.district).Name
    : '';

  return (
    <ScrollView
      style={[
        styles.container,
        modalVisible ? {backgroundColor: 'rgba(0,0,0,0.5)'} : '',
      ]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.innerFormContainer}>
              <Text
                style={{
                  fontSize: calcScale(18),
                  fontWeight: 'bold',
                  marginBottom: calcScale(10),
                }}>
                Lí do: <Text style={{color: 'red'}}>*</Text>
              </Text>
              <TextInput
                multiline={true}
                onChangeText={(cancelReason) => setCancelReason(cancelReason)}
                value={cancelReason}
                style={{
                  borderColor: '#000',
                  borderRadius: calcScale(10),
                  borderWidth: 1,
                  backgroundColor: '#fff',
                  width: calcScale(340),
                }}
              />
              {cancelReasonError !== '' && cancelReason === '' ? (
                <Text style={{color: 'red'}}>{cancelReasonError}</Text>
              ) : null}
            </View>
            <View style={styles.row}>
              <PTButton
                title="Không hủy"
                color="#fff"
                style={[styles.button, {backgroundColor: '#ccc', width: '45%'}]}
                onPress={() => {
                  setModalVisible(false);
                  setCancelReason('');
                }}
              />
              <PTButton
                title="Xác nhận hủy"
                color="#fff"
                style={[
                  styles.button,
                  {width: '45%', marginLeft: calcScale(20)},
                ]}
                onPress={() =>
                  cancelRequestTrigger(user.token, data.id, cancelReason)
                }
              />
            </View>
          </View>
        </View>
      </Modal>
      {data.id ? (
        <View>
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
              {requestStatus == 5 ? (
                <Text
                  style={{
                    fontSize: calcScale(18),
                    fontWeight: 'bold',
                    marginBottom: calcScale(10),
                  }}>
                  Công việc đã thực hiện
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: calcScale(18),
                    fontWeight: 'bold',
                    marginBottom: calcScale(10),
                  }}>
                  Vấn đề đang gặp phải
                </Text>
              )}
              {data.request_issues.map((item, index) => {
                return (
                  <Text
                    key={index.toString()}
                    style={{
                      fontSize: calcScale(16),
                      marginBottom: calcScale(10),
                    }}>
                    + {item.issue.name} - {item.estimate_price}0đ
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
                {data.estimate_time} Phút
              </Text>
            </View>
            <View style={styles.innerFormContainer}>
              <Text
                style={{
                  fontSize: calcScale(18),
                  fontWeight: 'bold',
                  marginBottom: calcScale(10),
                }}>
                Tiền công ước tính
              </Text>
              <Text
                style={{
                  fontSize: calcScale(16),
                  marginBottom: calcScale(10),
                }}>
                {data.estimate_price} VND
              </Text>
              <Text>(Tiền công chưa bao gồm chi phí vật tư thay thế)</Text>
            </View>
            <View style={styles.innerFormContainer}>
              <Text
                style={{
                  fontSize: calcScale(18),
                  fontWeight: 'bold',
                  marginBottom: calcScale(10),
                }}>
                Tiền công tối thiểu
              </Text>
              <Text
                style={{
                  fontSize: calcScale(16),
                  marginBottom: calcScale(10),
                }}>
                30.000 VND
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
                {data.schedule_time ? data.schedule_time.toString() : ''}
              </Text>
            </View>
            <View style={styles.innerFormContainer}>
              <Text
                style={{
                  fontSize: calcScale(18),
                  fontWeight: 'bold',
                  marginBottom: calcScale(10),
                }}>
                Hình thức thanh toán
              </Text>
              <Text
                style={{
                  fontSize: calcScale(18),
                  marginBottom: calcScale(10),
                }}>
                {/* {data.payment} */}
                Tiền mặt
              </Text>
            </View>
            <View style={styles.innerFormContainer}>
              <Text
                style={{
                  fontSize: calcScale(18),
                  fontWeight: 'bold',
                  marginBottom: calcScale(10),
                }}>
                Trạng thái
              </Text>
              <Text
                style={{
                  fontSize: calcScale(18),
                  marginBottom: calcScale(10),
                }}>
                {data.request_statuses[0].status.name}
              </Text>
            </View>
            <View
              style={{
                borderTopColor: '#ccc',
                borderTopWidth: 1,
                paddingTop: calcScale(10),
                //marginTop: calcScale(20),
              }}>
              <View style={{marginLeft: calcScale(20)}}>
                <Text style={{fontSize: calcScale(24), fontWeight: 'bold'}}>
                  Địa chỉ
                </Text>
                <Text
                  style={{fontSize: calcScale(18), marginTop: calcScale(5)}}>
                  {user.name} | {user.phoneNumber}
                </Text>
                <Text style={{fontSize: calcScale(18)}}>
                  {data.address + ', ' + district + ', ' + city}
                </Text>
              </View>
            </View>
            {myRequestButton}
          </View>
        </View>
      ) : (
        <ActivityIndicator
          size="small"
          color="#3368f3"
          style={{marginTop: calcScale(10)}}
        />
      )}
    </ScrollView>
  );
};

export default RequestDetailView;

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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
