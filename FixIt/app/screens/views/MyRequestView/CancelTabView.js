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
import {calcScale} from '../../../utils/dimension';
import commonStyles from '../Styles';
import ListEmptyComponent from './ListEmpty';

const CancelTabView = ({navigation}) => {
  const request = useSelector((state) => state.request);
  const canceledData = request.canceledRequest;
  // const canceledData = [
  //   {
  //     id: 1,
  //     service: 'Sửa lò vi sóng',
  //     estimate_fix_duration: 100,
  //     estimate_price: 100,
  //     status: 'Đã hủy',
  //   },
  //   {
  //     id: 2,
  //     service: 'Service test',
  //     estimate_fix_duration: 200,
  //     estimate_price: 150,
  //     status: 'Đã hủy',
  //   },
  // ];

  // // Seletor redux
  // const isFetching = useSelector((state) => state.approval.isFetching);
  // const currentPage = useSelector((state) => state.approval.currentPage);
  // const isLoadingMore = useSelector((state) => state.approval.isLoadingMore);
  // const totalPage = useSelector((state) => state.approval.totalPage);
  // const canceledData = useSelector((state) => state.approval.data);

  // State
  const [isEndReach, setEndReach] = React.useState(true);

  // //Effect
  // React.useEffect(() => {
  //   fetchcanceledData();
  // }, []);

  // //Dispatch
  // const dispatch = useDispatch();

  // const fetchcanceledData = React.useCallback(() => {
  //   const request = {
  //     pageNum: 1,
  //     pageSize: 5,
  //   };
  // }, []);

  // const loadMore = () => {
  //   if (isEndReach && !isLoadingMore && currentPage < totalPage) {
  //     loadMoreApprovalData();
  //     setEndReach(false);
  //   }
  // };

  // const loadMorecanceledData = React.useCallback(() => {
  //   const page = currentPage + 1;
  //   const request = {
  //     pageNum: page,
  //     pageSize: 5,
  //   };
  // }, [canceledData]);

  const renderListTicket = ({item}) => {
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
          <Text style={[styles.textBold, styles.textTitle]}>
            {item.serviceName}
          </Text>
        </View>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <View style={styles.column}>
            <Text style={styles.textRegular}>Thời gian:</Text>
            <Text style={styles.textBold}>{item.estimate_time}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.textRegular}>Giá:</Text>
            <Text style={styles.textBold}>{item.estimate_price}</Text>
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
        data={canceledData}
        showsVerticalScrollIndicator={false}
        renderItem={renderListTicket}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => <ListEmptyComponent />}
        bounces={false}
        // ListFooterComponent={renderFooter}
        // onEndReached={loadMore}
        onMomentumScrollBegin={() => setEndReach(true)}
        onEndReachedThreshold={0.1}
      />
      {/* )} */}
    </View>
  );
};

export default CancelTabView;

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
