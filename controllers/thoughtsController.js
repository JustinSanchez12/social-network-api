const Thought = require('../models');

module.exports = {
 // GET all thoughts
 getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // GET a single thought by its _id
  getSingleThought(req, res) {
    Thought.findById(req.params.thoughtId)
      .then((thought) =>
        thought
          ? res.json(thought)
          : res.status(404).json({ message: 'No thought with that ID' })
      )
      .catch((err) => res.status(500).json(err));
  },

  // POST to create a new thought
  createThought(req, res) {
    const { thoughtText, username, userId } = req.body;
    Thought.create({ thoughtText, username })
      .then((newThought) => {
        User.findByIdAndUpdate(userId, { $push: { thoughts: newThought._id } }, { new: true })
          .then(() => res.status(201).json(newThought))
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(500).json(err));
  },

  // PUT to update a thought by its _id
  updateThought(req, res) {
    Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true })
      .then((updatedThought) =>
        updatedThought
          ? res.json(updatedThought)
          : res.status(404).json({ message: 'No thought with that ID' })
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE to remove a thought by its _id
  deleteThought(req, res) {
    Thought.findByIdAndDelete(req.params.thoughtId)
      .then((deletedThought) =>
        deletedThought
          ? res.json({ message: 'Thought deleted successfully' })
          : res.status(404).json({ message: 'No thought with that ID' })
      )
      .catch((err) => res.status(500).json(err));
  },

  // POST to create a reaction stored in a single thought's reactions array field
  createReaction(req, res) {
    const { reactionBody, username } = req.body;
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: { reactionBody, username } } },
      { new: true }
    )
      .then((updatedThought) =>
        updatedThought
          ? res.json(updatedThought)
          : res.status(404).json({ message: 'No thought with that ID' })
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE to pull and remove a reaction by the reaction's reactionId value
  deleteReaction(req, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((updatedThought) =>
        updatedThought
          ? res.json(updatedThought)
          : res.status(404).json({ message: 'No thought with that ID' })
      )
      .catch((err) => res.status(500).json(err));
  },
}