'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';

class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <TextInput
          placeholder="what needs to be done?"
          blurOnSubmit={false}
          returnKeyType="done"
          value={this.props.value}
          onChangeText={this.props.onChange}
          onSubmitEditing={this.props.onAddItem}
          style={styles.input}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  input: {
    flex: 1,
    height: 50
  }
});


export default Header;
