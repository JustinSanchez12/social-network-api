const User = require('../models');

module.exports = {
  // Use the find method to get all users
  async getUsers(req, res) {
    try {
      const users = await User.find(); 
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    // Use findById to get a single user by _id
    const { userId } = req.params;
    try {
      const user = await User.findById(userId) 
        .populate('thoughts')
        .populate('friends', 'username');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    // Use create method to create a new user
    const { username, email } = req.body;
    try {
      const newUser = await User.create({ username, email }); 
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    const { userId } = req.params;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        req.body,
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    const { userId } = req.params;
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    const { userId, friendId } = req.params;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeFriend(req, res) {
    const { userId, friendId } = req.params;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};