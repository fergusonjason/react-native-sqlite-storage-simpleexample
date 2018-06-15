import SQLite from "react-native-sqlite-storage";

import _ from "lodash";

open = (dbparams) => {

    let result = SQLite.openDatabase({ name: dbparams.name, createFromLocation: dbparams.createFromLocation });

    return result;
}

close = (db) => {
    db.close();
}

query = (db, sql, params) => {

    // figured this out from https://stackoverflow.com/questions/47345000/react-native-handling-async-calls-to-sqllite-db
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {

            tx.executeSql(sql, params, (tx, rs) => {
                let length = rs.rows.length;
                let result = [];

                for (i = 0; i < length; i++) {
                    result.push(rs.rows.item(i));
                }

                resolve({ result });
            }, (err) => { console.log("Error in transaction") });


        });
    });

}

query = (db, sql, params, resultTransformer) => {

    return new Promise((resolve, reject) => {
        db.transaction((tx) => {

            tx.executeSql(sql, params, (tx, rs) => {

                let result = resultTransformer(rs);
                resolve({ result });

            }, (err) => { console.log("Error in transaction") });


        });
    });
}

// not tested yet!
execute = (db, sql, params) => {

    return new Promise((resolve, reject) => {
        db.transaction((txt) => {
            tx.executeSql(sql, params, (tx, rs) => {
                let rowsAffected = rs.rowsAffected;

                resolve({ rowsAffected });
            })
        }, (err) => {
            console.log("Error in transaction");
        });
    });

}

close = (db) => {
    db.close();
}

export { open, close, query, execute };