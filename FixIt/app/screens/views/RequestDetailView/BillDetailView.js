import * as React from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Input} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {calcScale} from '../../../utils/dimension';
import PTButton from '../../commonComponent/Button';
import CommonStyles from '../Styles';

const BillDetailView = ({navigation, route}) => {
  const [constructorHasRun, setConstructorHasRun] = React.useState(false);
  const requestData = route.params.requestData;
  const invoiceData = route.params.invoiceData;

  const dispatch = useDispatch();
  const request = useSelector((state) => state.request);
  const user = useSelector((state) => state.user);
  const {message} = request;

  const constructor = () => {
    if (constructorHasRun) {
      return;
    } else {
      setConstructorHasRun(true);
    }
  };

  constructor();

  const renderColums = ({item, index}) => {
    return (
      <View style={styles.row}>
        <Text style={[styles.textRegular, {flexBasis: '70%'}]}>
          {item.issue.name}
        </Text>
        <Text style={styles.textRegular}>
          {item.issue.estimate_price.split('.')[0]} VND
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Text style={[styles.textBold, {marginTop: calcScale(15)}]}>
            Các chi phí cần thanh toán
          </Text>
          <FlatList
            data={requestData}
            ListHeaderComponent={
              <View style={styles.row}>
                <Text
                  style={[
                    styles.textBold,
                    {flexBasis: '70%', fontSize: calcScale(24)},
                  ]}>
                  Công việc thực hiện
                </Text>
                <Text style={[styles.textBold, {fontSize: calcScale(24)}]}>
                  Đơn giá
                </Text>
              </View>
            }
            renderItem={renderColums}
            keyExtractor={(item) => item.issue.id.toString()}
          />
          <View
            style={{
              borderTopColor: '#ccc',
              borderTopWidth: 1,
              marginTop: calcScale(15),
              marginBottom: calcScale(10),
            }}
          />
          <View style={styles.row}>
            <Text
              style={[
                styles.textBold,
                {flexBasis: '70%', fontSize: calcScale(24)},
              ]}>
              Tổng tiền
            </Text>
            <Text style={styles.textRegular}>
              {invoiceData.total_price} VND
            </Text>
          </View>
          <View style={styles.row}>
            <Text
              style={[
                styles.textBold,
                {flexBasis: '70%', fontSize: calcScale(24)},
              ]}>
              Tiền thu thực tế
            </Text>
            <Text style={styles.textRegular}>
              {invoiceData.actual_proceeds} VND
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default BillDetailView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: calcScale(20),
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
  button: {
    marginTop: calcScale(10),
    width: '45%',
    height: calcScale(45),
    borderRadius: 10,
    backgroundColor: 'rgb(0, 0, 60)',
  },
  row: {
    ...CommonStyles.row,
    marginTop: calcScale(10),
  },
  input: {
    marginTop: calcScale(10),
  },
});
