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

const RateTabView = ({navigation}) => {
  const rateData = [
    {
      id: 1,
      service: 'Sửa lò vi sóng',
      estimate_fix_duration: 100,
      estimate_price: 100,
      status: 'Đợi đánh giá',
    },
    {
      id: 2,
      service: 'Service test',
      estimate_fix_duration: 200,
      estimate_price: 150,
      status: 'Đợi đánh giá',
    },
  ];

  // // Seletor redux
  // const isFetching = useSelector((state) => state.approval.isFetching);
  // const currentPage = useSelector((state) => state.approval.currentPage);
  // const isLoadingMore = useSelector((state) => state.approval.isLoadingMore);
  // const totalPage = useSelector((state) => state.approval.totalPage);
  // const rateData = useSelector((state) => state.approval.data);

  // State
  const [isEndReach, setEndReach] = React.useState(true);

  // //Effect
  // React.useEffect(() => {
  //   fetchRateData();
  // }, []);

  // //Dispatch
  // const dispatch = useDispatch();

  // const fetchRateData = React.useCallback(() => {
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

  // const loadMoreRateData = React.useCallback(() => {
  //   const page = currentPage + 1;
  //   const request = {
  //     pageNum: page,
  //     pageSize: 5,
  //   };
  // }, [rateData]);

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
            {item.service}
          </Text>
        </View>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <View style={styles.column}>
            <Text style={styles.textRegular}>Thời gian:</Text>
            <Text style={styles.textBold}>{item.estimate_fix_duration}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.textRegular}>Giá:</Text>
            <Text style={styles.textBold}>{item.estimate_price}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.textRegular}>Trạng thái:</Text>
            <Text style={styles.textBold}>{item.status}</Text>
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
        data={rateData}
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

export default RateTabView;

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
