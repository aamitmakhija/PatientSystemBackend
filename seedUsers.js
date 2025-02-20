const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

// Load the User model
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    console.log('Connected to MongoDB');

    // Define the users to be added
    const users = [
        { username: "steambeka@gmail.com", name: "Bekzat Kuanyashkaliyev", password: "alpha123", role: "admin" },
        { username: "rejoizjs@gmail.com", name: "Rejoiz Joy", password: "alpha123", role: "nurse" },
        { username: "ahmedfayazyousuf@gmail.com", name: "Yousuf Ahmed", password: "alpha123", role: "doctor" },
        { username: "zstepmoon@mail.ru", name: "Zhanna", password: "alpha123", role: "admin" },
        { username: "amit_makhija@outlook.com", name: "Amit Makhija", password: "alpha123", role: "clerk" },  // Changed role to clerk
    ];

    // Hash passwords before inserting
    for (let user of users) {
        user.password = await bcrypt.hash(user.password, 10);
    }

    // Insert users into the database, ignoring duplicates
    for (let user of users) {
        await User.findOneAndUpdate({ username: user.username }, user, { upsert: true }); // Upsert ensures no duplicates
    }

    console.log('Users added successfully!');

    // Close the database connection
    mongoose.connection.close();
}).catch(err => console.error('MongoDB connection error:', err));