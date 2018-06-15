import SQLite from "react-native-sqlite-storage";

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

                resolve({result});
            }, (err) => { });


        });
    });

}

export { open, close, query };