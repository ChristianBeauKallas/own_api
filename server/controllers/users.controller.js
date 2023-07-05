const executeQuery = require('../db/utils.js')
const bcrypt = require('bcrypt');
const { isStrongPassword } = require('../helpers/users.helpers.js')

const getAllUsers = async () => {
  return executeQuery('SELECT * FROM users')
};

const getUserById = async (id) => {
    return executeQuery('SELECT * FROM users WHERE id = ?', [id])
};

const registerUser = async ({ firstName, lastName, teamName, role, username, email, password, phone }) => {
    // validate the password strength
    if (!isStrongPassword(password)) {
        throw new Error('Password is not strong enough');
    }
    // hash password before storing
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    return executeQuery('INSERT INTO users (firstName, lastName, teamName, role, username, email, phone, passwordHash) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [firstName, lastName, teamName, role, username, email, phone, passwordHash]);
};


const updateUser = async (id, user) => {
    return executeQuery('UPDATE users SET firstName = ?, lastName = ?, teamName = ?, role = ?, username = ?, email = ?, phone = ? WHERE id = ?', [user.firstName, user.lastName, user.teamName, user.role, user.username, user.email, user.phone, id])
};

const deleteUser = async (id) => {
    return executeQuery('DELETE FROM users WHERE id = ?', [id])
};

// const loginUser = (req, res) => {
//     // Logic for user login
// };

// const logoutUser = (req, res) => {
//     // Logic for user logout
// };


module.exports = { getAllUsers, 
                    getUserById, 
                    registerUser, 
                    updateUser, 
                    deleteUser,
                    registerUser,
                }
