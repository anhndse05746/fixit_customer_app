import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {listAllRequest} from '../../../store/request';
import {calcScale} from '../../../utils/dimension';
import commonStyles from '../Styles';
import ListEmptyComponent from './ListEmpty';

const OngoingTabview = ({navigation}) => {
  const request = useSelector((state) => state.request);
  const user = useSelector((state) => state.user);

  const ongoingData = request.onGoingRequests;
  let isLoading = request.isLoading;

  //Dispatch
  const dispatch = useDispatch();

  //Reload
  const reloadData = () => {
    dispatch(listAllRequest(user.token, user.userId));
  };

  const renderListTicket = ({item}) => {
    let schedule_time;
    if (item.schedule_time) {
      schedule_time = `${
        item.schedule_time.split('T')[1].split('.')[0].split(':')[0]
      }:${item.schedule_time.split('T')[1].split('.')[0].split(':')[1]}, ${
        item.schedule_time.split('T')[0]
      }`;
    }

    return (
      <TouchableOpacity
        style={styles.ticketContainer}
        onPress={() => {
          navigation.navigate('RequestDetailView', {
            flag: 'myrequest',
            requestId: item.id,
            currentTab: 'Ongoing',
          });
        }}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={[styles.textBold, styles.textTitle]}>
              {schedule_time} - {item.serviceName}
            </Text>
            <Text style={[styles.textBold, styles.textTitle]}>
              {`${item.address}, ${item.district}, ${item.city}`}
            </Text>
          </View>
        </View>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <View style={styles.column}>
            <Text style={styles.textRegular}>Thời gian ước tính:</Text>
            <Text style={styles.textBold}>{item.estimate_time} Phút</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.textRegular}>Giá ước tính:</Text>
            <Text style={styles.textBold}>{item.estimate_price} VND</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.textRegular}>Trạng thái:</Text>
            <Text style={styles.textBold}>{item.statusName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.sceneContainer}>
      <FlatList
        data={ongoingData}
        showsVerticalScrollIndicator={false}
        renderItem={renderListTicket}
        keyExtractor={(item) => item.id.toString()}
        bounces={false}
        ListEmptyComponent={() => <ListEmptyComponent />}
        onRefresh={() => reloadData()}
        refreshing={isLoading}
      />
    </View>
  );
};

export default OngoingTabview;

const styles = StyleSheet.create({
  sceneContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: calcScale(10),
  },
  ticketContainer: {
    width: calcScale(420),
    height: calcScale(140),
    backgroundColor: 'rgb(255, 224, 216)',
    padding: calcScale(20),
    margin: calcScale(10),
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: calcScale(15),
  },
  column: {
    flexDirection: 'column',
  },
  textTitle: {
    fontSize: calcScale(16),
    paddingBottom: calcScale(10),
  },
  textBold: {
    ...commonStyles.textBold,
  },
  textRegular: {
    ...commonStyles.textRegular,
    fontSize: calcScale(14),
  },
});
