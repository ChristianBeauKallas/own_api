const express = require('express');
const {
    getAllUsers,
    getUserById,
    registerUser,
    updateUser,
    deleteUser,
} = require('../controllers/users.controller');
const { isUsernameTaken, isStrongPassword, getUserByUsername } = require('../helpers/users.helpers.js')
const bcrypt = require('bcrypt');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = await getAllUsers();
        res.json(data);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getUserById(id);
        if (!data) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json(data);
        }
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
});

router.post('/register', async (req, res) => {
    try {
        const user = req.body;

        // check if username is taken
        const usernameTaken = await isUsernameTaken(username);
        if (usernameTaken) {
            return res.status(409).json({ error: 'Username already taken' });
        }

        // check if password is strong enough
        if (!isStrongPassword(password)) {
            return res.status(400).json({ error: 'Password is not strong enough' });
        }

        await registerUser({ firstName, lastName, teamName, role, username, email, password, phone });
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.message === 'Username already exists') {
            res.status(409).json({ error: 'Username already exists' });
        } else if (error.message === 'Password is not strong enough') {
            res.status(400).json({ error: 'Password is not strong enough' });
        } else {
            res.status(500).json({ error: 'Failed to create user', details: error.message });
        }
    }
});


router.post ('/login', async (req, res) => {
    const { username, password } = req.body;
    // Retrieve the user from database based on the username
    try {
        const user = await getUserByUsername(username);
        // check if a user with the username exists
        if (!user){
            return res.status(401).json({error:'Username Does Not Exist'})
        }
        //validate provided password with hashed password stored in db
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            return res.status(401).json({error:'Invalid Password'})
        }
        //Successful login
        res.json({message: 'Login Successful'});
    } catch (error){
        console.error('Error during login:', error.message);
        res.status(500).json({error: 'Login Failed'});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.body;
        await updateUser(id, user);
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await deleteUser(id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

module.exports = router;
