require('dotenv').config();  // Make sure dotenv is loaded before connecting to MongoDB
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');  // Adjust path if necessary

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected...');

    // Hash password for all users
    User.find()
      .then(async (users) => {
        for (let user of users) {
          // Only hash the password if it's in plain text
          if (user.password && !user.password.startsWith('$2b$')) {  // Checks if password is already hashed
            const hashedPassword = await bcrypt.hash(user.password, 10);
            
            // Update password in the database
            await User.updateOne(
              { _id: user._id },  // Find the user by ID
              { $set: { password: hashedPassword } }  // Set the new hashed password
            );

            console.log(`Password for ${user.username} has been hashed and updated.`);
          }
        }

        console.log('All user passwords have been hashed and updated.');
        process.exit();  // Exit once done
      })
      .catch((err) => {
        console.error('Error updating users:', err);
        process.exit(1);
      });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });