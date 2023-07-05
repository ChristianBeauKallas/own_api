const executeQuery = require("../db/utils.js");
//Check if username is taken
async function isUsernameTaken(username) {
    const query = "SELECT * FROM users WHERE username = ?";
    const result = await executeQuery(query, [username]);
    return result.length > 0;
}
// Strong Password
function isStrongPassword(password) {
    // Password strength criteria
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

//verifies that username exists in database
async function getUserByUsername(username) {
    try {
        const query = "SELECT * FROM users WHERE username = ?";
        const result = await executeQuery (query, [username]);
        return result.length > 0 ? result[0] : null; 
    } catch (error) {
        console.log('Error during getUserByUsername:', error.message);
        throw error;
    }
}


module.exports = {
    isStrongPassword,
    isUsernameTaken,
    getUserByUsername,
};
