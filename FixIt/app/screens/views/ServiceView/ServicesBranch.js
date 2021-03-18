import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {List} from 'react-native-paper';
import {calcScale} from '../../../utils/dimension';

const ServicesBranch = ({item}) => {
  const [expanded, setExpanded] = React.useState(false);

  const toggleExpanded = (expanded) => {
    setExpanded(!expanded);
  };

  const data = item.item;

  return (
    <>
      <List.Accordion
        expanded={expanded}
        title={data.name}
        id={data.id}
        style={styles.itemList}
        titleStyle={styles.titleStyle}
        onPress={() => toggleExpanded(expanded)}
        key={data.id.toString()}>
        <FlatList
          data={data.issues}
          renderItem={({item}) => (
            <List.Item
              onPress={() => {}}
              style={styles.itemLink}
              title={item.name}
              titleStyle={styles.titleStyle}
              key={item.id.toString()}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </List.Accordion>
    </>
  );
};

const styles = StyleSheet.create({
  itemList: {
    backgroundColor: '#d8360e',
    borderRadius: 15,
    marginTop: calcScale(10),
  },
  itemLink: {
    backgroundColor: '#f68a6f',
    borderRadius: 15,
    marginTop: calcScale(10),
    marginHorizontal: calcScale(20),
  },
  titleStyle: {
    color: '#fff',
  },
});

export default ServicesBranch;
