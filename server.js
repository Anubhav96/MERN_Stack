const express = require('express');
const usersRoutes = require('./routes/api/users');
const authRoutes = require('./routes/api/auth');
const profileRoutes = require('./routes/api/profile');
const postsRoutes = require('./routes/api/posts');
const connectDB = require('./config/db');
const app = express();

//Connect to database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
    res.send('API Running!');
});

//Define routes
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}..`);
});
