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

const ExecuteTabView = ({navigation}) => {
  const executeData = [
    {
      id: 1,
      service: 'Sửa lò vi sóng',
      estimate_fix_duration: 100,
      estimate_price: 100,
      status: 'Đang xử lí',
    },
    {
      id: 2,
      service: 'Service test',
      estimate_fix_duration: 200,
      estimate_price: 150,
      status: 'Đang xử lí',
    },
  ];

  // // Seletor redux
  // const isFetching = useSelector((state) => state.execute.isFetching);
  // const currentPage = useSelector((state) => state.execute.currentPage);
  // const isLoadingMore = useSelector((state) => state.execute.isLoadingMore);
  // const totalPage = useSelector((state) => state.execute.totalPage);
  // const executeData = useSelector((state) => state.execute.data);

  // State
  const [isEndReach, setEndReach] = React.useState(true);

  // // Effects
  // React.useEffect(() => {
  //   fetchExecuteData();
  // }, []);

  // // Dispatch
  // const dispatch = useDispatch();

  // const fetchExecuteData = React.useCallback(() => {
  //   const request = {
  //     pageNum: 1,
  //     pageSize: 5,
  //   };
  // }, []);

  // const loadMore = () => {
  //   if (isEndReach && !isLoadingMore && currentPage < totalPage) {
  //     loadMoreExecuteData();
  //     setEndReach(false);
  //   }
  // };

  // const loadMoreExecuteData = React.useCallback(() => {
  //   const page = currentPage + 1;
  //   const request = {
  //     pageNum: page,
  //     pageSize: 5,
  //   };
  // }, [executeData]);

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
        data={executeData}
        showsVerticalScrollIndicator={false}
        renderItem={renderListTicket}
        keyExtractor={(item) => item.id.toString()}
        // onEndReached={loadMore}
        onMomentumScrollBegin={() => setEndReach(true)}
        bounces={false}
        // ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.2}
        ListEmptyComponent={() => <ListEmptyComponent />}
      />
      {/* )} */}
    </View>
  );
};

export default ExecuteTabView;

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
