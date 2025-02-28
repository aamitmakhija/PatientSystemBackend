require('dotenv').config(); 
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');  

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected...');

    User.find()
      .then(async (users) => {
        for (let user of users) {
        
          if (user.password && !user.password.startsWith('$2b$')) {  
            const hashedPassword = await bcrypt.hash(user.password, 10);
            
            
            await User.updateOne(
              { _id: user._id },  
              { $set: { password: hashedPassword } }  
            );

            console.log(`Password for ${user.username} has been hashed and updated.`);
          }
        }

        console.log('All user passwords have been hashed and updated.');
        process.exit(); 
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