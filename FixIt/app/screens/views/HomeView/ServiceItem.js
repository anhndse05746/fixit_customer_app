import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {calcScale, width} from '../../../utils/dimension';
import CommonStyles from '../Styles';

const useComponentSize = () => {
  const [size, setSize] = React.useState({width: 0, height: 0});

  const onLayout = React.useCallback((event) => {
    const {width, height} = event.nativeEvent.layout;
    setSize({width, height});
  }, []);

  return [size, onLayout];
};

const ServiceItem = ({navigation, item}) => {
  const [size, onLayout] = useComponentSize();
  const data = item.item;
  const colors = ['#f2552c', '#ffd15c', '#00a66f', '#098eb3'];
  //console.log('item: ' + JSON.stringify(data));
  return (
    <TouchableOpacity
      key={data.id.toString()}
      style={{
        ...styles.serviceBox,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      }}
      onLayout={onLayout}
      onPress={() => navigation.navigate('ServiceListView', {data: item})}>
      <Image
        // source={data.image}
        source={{
          uri: data.image,
        }}
        style={{
          height: calcScale(size.width / 2),
          width: calcScale(size.width / 2),
          ...styles.serviceThumbnail,
        }}
      />
      <Text style={styles.serviceName}>{data.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  serviceBox: {
    marginBottom: calcScale(15),
    borderRadius: calcScale(15),
    width: calcScale(width / 2),
    height: calcScale(width / 2),
    alignItems: 'center',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  serviceThumbnail: {
    marginTop: calcScale(15),
    marginBottom: calcScale(10),
    borderRadius: calcScale(15),
  },
  serviceName: {
    ...CommonStyles.textBold,
    fontSize: calcScale(20),
    marginBottom: calcScale(10),
    color: '#000',
  },
});

export default ServiceItem;
