const User = require('../models');

module.exports = {
  // GET all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // GET a single user by its _id and populate thought and friend data
  getSingleUser(req, res) {
    User.findById(req.params.userId)
    // Populate thoughts array with thought documents
      .populate('thoughts') 
    // Populate friends array with user documents, showing only the username
      .populate('friends', 'username') 
      .then((user) =>
        user
          ? res.json(user)
          : res.status(404).json({ message: 'No user with that ID' })
      )
      .catch((err) => res.status(500).json(err));
  },

  // POST a new user
  createUser(req, res) {
    const { username, email } = req.body;
    User.create({ username, email })
      .then((newUser) => res.status(201).json(newUser))
      .catch((err) => res.status(500).json(err));
  },

  // PUT to update a user by its _id
  updateUser(req, res) {
    User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
      .then((updatedUser) =>
        updatedUser
          ? res.json(updatedUser)
          : res.status(404).json({ message: 'No user with that ID' })
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE to remove a user by its _id
  deleteUser(req, res) {
    User.findByIdAndDelete(req.params.userId)
      .then((deletedUser) =>
        deletedUser
          ? res.json({ message: 'User deleted successfully' })
          : res.status(404).json({ message: 'No user with that ID' })
      )
      .catch((err) => res.status(500).json(err));
  },

  // POST to add a new friend to a user's firend list
  addFriend(req, res) {
    const { userId, friendId } = req.params;
    User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } }, // Use $addToSet to avoid duplicate friends
      { new: true }
    )
      .then((updatedUser) =>
        updatedUser
          ? res.json(updatedUser)
          : res.status(404).json({ message: 'No user with that ID' })
      )
      .catch((err) => res.status(500).json(err));
  },

  //DELETE to remove a friend from user's friend list
  removeFriend(req, res) {
    const { userId, friendId } = req.params;
    User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    )
      .then((updatedUser) =>
        updatedUser
          ? res.json(updatedUser)
          : res.status(404).json({ message: 'No user with that ID' })
      )
      .catch((err) => res.status(500).json(err));
  },
};
