import React from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {View} from 'react-native';
import {StyleSheet, Text} from 'react-native';
import {calcScale} from '../../../utils/dimension';
import HeaderBar from './HeaderBar';
import CommonStyles from '../Styles';
import ServiceItem from './ServiceItem';

const primaryServices = [
  {
    image: require('../../../assets/images/freezing.png'),
    id: '1',
    name: 'Sửa điện lạnh',
    url: '',
    parentId: 0,
    description: 'Sửa tủ lạnh, điều hòa, máy giặt,...',
    backgroundColor: '#f2552c',
  },
  {
    image: require('../../../assets/images/laptop.png'),
    id: '2',
    name: 'Sửa điện tử',
    url: '',
    parentId: 0,
    description: 'Sửa laptop, điện thoại...',
    backgroundColor: '#ffd15c',
  },
  {
    image: require('../../../assets/images/house.png'),
    id: '3',
    name: 'Sửa đồ gia dụng',
    url: '',
    parentId: 0,
    description: 'Sửa tủ, giường...',
    backgroundColor: '#00a66f',
  },
  {
    image: require('../../../assets/images/lightbulb.png'),
    id: '4',
    name: 'Sửa điện dân dụng',
    url: '',
    parentId: 0,
    description: 'Sửa đèn, điện...',
    backgroundColor: '#098eb3',
  },
];

export default class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <HeaderBar navigation={this.props.navigation} />
        <View style={styles.innerContainer}>
          <Text style={[styles.textBold, {paddingTop: calcScale(80)}]}>
            Hi, user-full-name!
          </Text>
          <Text style={styles.textRegular}>
            Hôm nay bạn cần sửa chữa gì không?
          </Text>
          <FlatList
            data={primaryServices}
            style={styles.serviceContainer}
            renderItem={(item) => (
              <ServiceItem navigation={this.props.navigation} item={item} />
            )}
            numColumns={2}
            columnWrapperStyle={{flex: 1, justifyContent: 'space-around'}}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    justifyContent: 'center',
    paddingHorizontal: calcScale(20),
  },
  textBold: {
    ...CommonStyles.textBold,
    fontSize: calcScale(30),
    color: '#000',
    textAlign: 'left',
    paddingLeft: calcScale(10),
  },
  textRegular: {
    ...CommonStyles.textRegular,
    fontSize: calcScale(20),
    color: '#000',
    textAlign: 'left',
    paddingLeft: calcScale(10),
  },
  serviceContainer: {
    marginTop: calcScale(20),
  },
});
