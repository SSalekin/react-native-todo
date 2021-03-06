'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Keyboard
} from 'react-native';

import Header from './header';
import Footer from './footer';
import Row from './row';

const filterItems = (filter, items) => {
  return items.filter( item => {
    if(filter === "ALL") return true;
    if(filter === "ACTIVE") return !item.complete;
    if(filter === "COMPLETED") return item.complete;
  })
}

class App extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      filter: "ALL",
      allComplete: false,
      value: "",
      items: [],
      dataSource: ds.cloneWithRows([])
    };

    this.setSource = this.setSource.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleToggleComplete = this.handleToggleComplete.bind(this);
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
  }

  setSource(items, itemsDatasource, otherState = {}) {
    this.setState({
      items,
      dataSource : this.state.dataSource.cloneWithRows(itemsDatasource),
      ...otherState
    })
  }
  handleToggleComplete(key, complete) {
    const newItems = this.state.items.map( item => {
      if (item.key !== key) return item;
      return { ...item, complete };
    });
    this.setSource(newItems, newItems);
  }

  handleToggleAllComplete() {
    const complete = !this.state.allComplete;
    const newItems = this.state.items.map(item => ({...item, complete}));

    console.table(newItems);

    this.setSource(newItems, newItems, {allComplete: complete});
    // this.setState({
    //   items: newItems,
    //   complete
    // });
  }

  handleFilter(filter) {
    this.setSource(
      this.state.items,
      filterItems(filter, this.state.items),
      {filter}
    );
  }

  handleAddItem() {
    if(!this.state.value) return;
    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false
      }
    ];

    this.setSource(newItems, newItems, {value: ''});
    // this.setState({
    //   items: newItems,
    //   value: ""
    // })
  }

  handleRemoveItem(key) {
    const newItems = this.state.items
      .filter(item => item.key !== key);

    this.setSource(newItems, newItems);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          value={this.state.value}
          onAddItem={this.handleAddItem}
          onChange={value => this.setState({value})}
          onToggleAllComplete={this.handleToggleAllComplete}
        />
        <View style={styles.content}>
          <ListView
            style={styles.list}
            enableEmptySections
            dataSource={this.state.dataSource}
            onScroll={() => Keyboard.dismiss()}
            renderRow={
              ({key, ...value}) => (
                <Row
                  key={key}
                  onRemove={() => this.handleRemoveItem(key)}
                  onComplete={(complete) => this.handleToggleComplete(key, complete)}
                  {...value}
                />
              )
            }
            renderSeperator={(sectionId, rowId) =>
              (<View key={rowId} style={styles.seperator}/>)
            }
          />
        </View>
        <Footer
          onFilter={this.handleFilter}
          filter={this.state.filter}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  content: {
    flex: 1
  },
  list: {
    backgroundColor: "#FFF"
  },
  seperator: {
    borderWidth: 1,
    borderColor: "#f5f5f5"
  }
});

export default App;
