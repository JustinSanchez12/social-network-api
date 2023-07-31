const router = require('express').Router();
const userRoutes = require('./usersRoutes');
const thoughtsRoutes = require('./thoughtsRoutes');

router.use('/user', userRoutes);
router.use('/thoughts', thoughtsRoutes);

module.exports = router;