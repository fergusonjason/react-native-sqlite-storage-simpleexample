/**
 * Simple example of using react-native-sql-storage
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import SQLite from "react-native-sqlite-storage";

import {open,close,query} from "./DBUtils";

SQLite.DEBUG(true);
SQLite.enablePromise(false);

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = { count: 0 };

    }

    // componentWillMount does not have access to setState, so use componentDidMount
    async componentDidMount() {

        let db = await open({name: "test.db", createFromLocation: "testdb.db"});
        let results = await query(db, "SELECT * from TEST",[]);

        this.setState({count: results.result.length});

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Total Records: {this.state.count}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});
