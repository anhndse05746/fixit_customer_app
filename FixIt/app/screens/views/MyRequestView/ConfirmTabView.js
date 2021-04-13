import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { calcScale } from '../../../utils/dimension';
import commonStyles from '../Styles';
import ListEmptyComponent from './ListEmpty';

const ConfirmTabView = ({ navigation }) => {
  const request = useSelector(state => state.request)
  const confirmData = request.completeRequest
  // [
  //   {
  //     id: 1,
  //     service: 'Sửa lò vi sóng',
  //     estimate_fix_duration: 100,
  //     estimate_price: 100,
  //     status: 'Hoàn thành',
  //   },
  //   {
  //     id: 2,
  //     service: 'Service test',
  //     estimate_fix_duration: 200,
  //     estimate_price: 150,
  //     status: 'Hoàn thành',
  //   },
  // ];

  // // Seletor redux
  // const isFetching = useSelector((state) => state.confirm.isFetching);
  // const currentPage = useSelector((state) => state.confirm.currentPage);
  // const totalPage = useSelector((state) => state.confirm.totalPage);
  // const isLoadingMore = useSelector((state) => state.confirm.isLoadingMore);
  // const confirmData = useSelector((state) => state.confirm.data);

  // State
  const [isEndReach, setEndReach] = React.useState(true);

  // // Effects
  // React.useEffect(() => {
  //   fetchConfirmData();
  // }, []);

  // //Dispatch
  // const dispatch = useDispatch();

  // const loadMore = () => {
  //   if (isEndReach && !isLoadingMore && currentPage < totalPage) {
  //     loadMoreConfirmData();
  //     setEndReach(false);
  //   }
  // };

  // const fetchConfirmData = React.useCallback(() => {
  //   const page = 1;
  // }, []);

  // const loadMoreConfirmData = React.useCallback(() => {
  //   const page = currentPage + 1;
  // }, [confirmData]);

  const renderListTicket = ({ item }) => {
    const schedule_time = `${item.schedule_time.split('T')[1].split('.')[0].split(':')[0]}:${item.schedule_time.split('T')[1].split('.')[0].split(':')[1]}, ${item.schedule_time.split('T')[0]}`

    return (
      <TouchableOpacity
        style={styles.ticketContainer}
        onPress={() =>
          navigation.navigate('RequestDetailView', {
            flag: 'myrequest',
            requestId: item.id,
          })
        }>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={[styles.textBold, styles.textTitle]}>
              {item.serviceName}
            </Text>
            <Text style={[styles.textBold, styles.textTitle]}>
              {schedule_time}
            </Text>
            <Text style={[styles.textBold, styles.textTitle]}>
              {`${item.address}, ${item.district}, ${item.city}`}
            </Text>
          </View>
        </View>
        <View style={[styles.row, { justifyContent: 'space-between' }]}>
          <View style={styles.column}>
            <Text style={styles.textRegular}>Thời gian ước tính: </Text>
            <Text style={styles.textBold}>{item.estimate_time} phút</Text>
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

  // const renderFooter = () => {
  //   if (isLoadingMore && isEndReach) {
  //     return (
  //       <ActivityIndicator
  //         size="small"
  //         color="#3368f3"
  //         style={{paddingBottom: calcScale(10)}}
  //       />
  //     );
  //   } else {
  //     return null;
  //   }
  // };

  return (
    <View style={styles.sceneContainer}>
      {/* {isFetching ? (
        <ActivityIndicator
          size="small"
          color="#3368f3"
          style={{marginTop: calcScale(10)}}
        />
      ) : ( */}
      <FlatList
        data={confirmData}
        showsVerticalScrollIndicator={false}
        renderItem={renderListTicket}
        keyExtractor={(item) => item.id.toString()}
        // onEndReached={loadMore}
        onEndReachedThreshold={0.2}
        onMomentumScrollBegin={() => setEndReach(true)}
        // ListFooterComponent={renderFooter}
        bounces={false}
        ListEmptyComponent={() => <ListEmptyComponent />}
      />
      {/* )} */}
    </View>
  );
};

export default ConfirmTabView;

const styles = StyleSheet.create({
  sceneContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: calcScale(10),
  },
  ticketContainer: {
    width: calcScale(420),
    height: calcScale(120),
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
  },
  textBold: {
    ...commonStyles.textBold,
  },
  textRegular: {
    ...commonStyles.textRegular,
    fontSize: calcScale(14),
  },
});
