const connection = require("./index")

const executeQuery = (query, values) => {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, results) => {
        if (err) {
            reject(err);
        } else {
            resolve(results);
        }
        });
    });
};

module.exports = executeQuery;
