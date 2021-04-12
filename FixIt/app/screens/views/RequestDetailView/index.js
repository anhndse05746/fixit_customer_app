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

const RequestDetailView = ({navigation, route}) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const request = useSelector((state) => state.request);
  const {message} = request;
  const [modalVisible, setModalVisible] = React.useState(false);
  const [cancelReason, setCancelReason] = React.useState('');

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

  const cancelRequestTrigger = (token, requestId, cancelReason) => {
    if (cancelReason !== '') {
      dispatch(cancelRequest(token, requestId, cancelReason));
      setModalVisible(false);
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
                Lí do:
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
            </View>
            <View style={styles.row}>
              <PTButton
                title="Không hủy"
                color="#fff"
                style={[styles.button, {backgroundColor: '#ccc', width: '45%'}]}
                onPress={() => setModalVisible(false)}
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
          <View
            style={{
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              paddingBottom: calcScale(10),
              marginTop: calcScale(20),
            }}>
            <View style={{marginLeft: calcScale(20)}}>
              <Text style={{fontSize: calcScale(24), fontWeight: 'bold'}}>
                Địa chỉ
              </Text>
              <Text style={{fontSize: calcScale(18), marginTop: calcScale(5)}}>
                {user.name} | {user.phoneNumber}
              </Text>
              <Text style={{fontSize: calcScale(18)}}>
                {data.address + ', ' + data.district + ', ' + data.city}
              </Text>
            </View>
          </View>
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
                Yêu cầu
              </Text>
              <Text
                style={{
                  fontSize: calcScale(16),
                  marginBottom: calcScale(10),
                }}>
                {data.request}
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
              {data.request_issues.map((item, index) => {
                return (
                  <Text
                    key={index.toString()}
                    style={{
                      fontSize: calcScale(16),
                      marginBottom: calcScale(10),
                    }}>
                    + {item.issue.name}
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
                {data.estimate_time}
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
                {data.estimate_price}
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
                Cash
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
