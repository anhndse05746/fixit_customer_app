import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {calcScale} from '../../utils/dimension';
import commonStyles from './Styles';

export default class MyProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHasAvatar: false,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  logOut = () => {
    this.props.navigation.navigate('OutsideStack');
  };

  render() {
    const hasAvatar = this.state.isHasAvatar;
    let avatar;
    if (avatar) {
      avatar = <Avatar.Image size={calcScale(70)} />;
    } else {
      avatar = <Avatar.Text size={calcScale(70)} label="U" />;
    }

    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <SafeAreaView
            style={styles.container}
            forceInset={{top: 'always', horizontal: 'never'}}>
            <View style={styles.containHeader}>
              <View style={styles.row}>
                {avatar}
                <View style={styles.userContact}>
                  <Text style={styles.textBold}>User Name</Text>
                  <Text
                    style={[styles.textRegular, {paddingTop: calcScale(5)}]}>
                    @user.mail
                  </Text>
                  <Text style={styles.textRegular}>User Apartment</Text>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity>
                <View style={[styles.row, {paddingLeft: calcScale(20)}]}>
                  <Icon name="users" size={calcScale(20)} color="#000" />
                  <Text style={styles.textMedium}>User Group</Text>
                </View>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ScrollView>
        <View elevation={6} style={{backgroundColor: '#ffffff'}}>
          <TouchableOpacity onPress={this.logOut}>
            <View style={[styles.row, {paddingLeft: calcScale(20)}]}>
              <Icon name="sign-out-alt" size={calcScale(20)} color="#000" />
              <Text style={styles.textMedium}>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containHeader: {
    paddingVertical: calcScale(30),
    paddingLeft: calcScale(20),
    backgroundColor: '#cee6f2',
  },
  row: {
    ...commonStyles.row,
  },
  userContact: {
    paddingLeft: calcScale(15),
  },
  textBold: {
    ...commonStyles.textBold,
    fontSize: calcScale(20),
  },
  textRegular: {
    ...commonStyles.textRegular,
  },
  textMedium: {
    ...commonStyles.textMedium,
    margin: calcScale(16),
  },
});
