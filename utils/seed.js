const { User, Thought } = require('../models');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const db = require('../config/connection');
const { getRandomUsernames, getRandomThought } = require('./data');

db.on('error', (error) => console.error('MongoDB connection error:', error));

db.once('open', async () => {
  console.log('Connected to MongoDB');

  // Clear existing data
  await User.deleteMany({});
  await Thought.deleteMany({});


// Generate and insert users
// Generate 10 random usernames
const usernames = getRandomUsernames(10); 
const users = usernames.map((username, i) => ({
  username: username,
  email: `user${i}@example.com`,
}));
const insertedUsers = await User.insertMany(users);


  // Generate and insert thoughts
  const thoughts = [];
  for (let i = 0; i < 20; i++) {
    const randomUser = insertedUsers[Math.floor(Math.random() * insertedUsers.length)];
    thoughts.push({
      thoughtText: getRandomThought(),
      username: randomUser.username,
      userId: randomUser._id,
    });
  }
  const insertedThoughts = await Thought.insertMany(thoughts);

// Update user documents with thoughts
for (const user of insertedUsers) {
  const userThoughts = insertedThoughts.filter((thought) => {
    if (thought && thought.userId && user._id) {
      return thought.userId.toString() === user._id.toString();
    }
    return false;
  });

  if (userThoughts.length > 0) { // Add this check
    user.thoughts = userThoughts.map((thought) => thought._id);
    await user.save();
  }
}

console.log('Seed data inserted');
process.exit(0);

});

