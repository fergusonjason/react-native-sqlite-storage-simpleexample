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

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = { count: 0 };


    }

    // componentWillMount does not have access to setState
    componentDidMount() {

        // the "name" amd "createFromLocation" should not be the same. The "real" 
        // file in /src/main/assets should be specified in createFromLocation
        db = SQLite.openDatabase({ name: "test.db", createFromLocation: "testdb.db" },
            () => { console.log("DB Opened") },
            (err) => { console.log("DB Error: " + err.message) }
        );

        console.log("Db: " + JSON.stringify(db));

        db.transaction((tx) => {
            tx.executeSql("select count(*) as count from TEST", [], (tx, results) => {

                var length = results.rows.length;
                console.log("Result: " + JSON.stringify(results.rows.item(0)));
                for (i = 0; i < length; i++) {
                    // by sticking this in the state, you don't have to screw around
                    // resolving promises
                    this.setState({ count: results.rows.item(i).count });
                }
            });
        },
            (err) => {
                console.warn("DB Error: " + err.message)
            });
    }

    componentWillUnmount() {

        db.close();

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
