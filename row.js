'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Switch,
  TouchableOpacity
} from 'react-native';

class Row extends Component {
  render() {
    const { complete } = this.props;
    return (
      <View style={styles.container}>
        <Switch
          onValueChange={this.props.onComplete}
          value={complete} />
        <View style={styles.textWrap}>
          <Text style={[styles.text, complete && styles.complete]}>
            {this.props.text}
          </Text>
        </View>
        <TouchableOpacity onPress={this.props.onRemove}>
          <Text style={styles.destroy}>X</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  text: {
    fontSize: 20,
    color: "#4d4d4d"
  },
  textWrap: {
    flex: 1,
    marginHorizontal: 10
  },
  complete: {
    textDecorationLine: "line-through"
  },
  destroy: {
    fontSize: 20,
    color: "#cc9a9a"
  }
});


export default Row;
