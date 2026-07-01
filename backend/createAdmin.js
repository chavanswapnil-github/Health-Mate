require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dietplanner';

const run = async () => {
  try {
    await mongoose.connect(MONGO);
    const email = 'yash139@gmail.com';
    const name = 'Super Admin';
    const password = 'Yashraj@999'; // CHANGE THIS immediately

    let user = await User.findOne({ email });
    if (user) {
      console.log('Admin already exists:', email);
      process.exit(0);
    }
    const hash = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hash, isAdmin: true });
    console.log('Created admin:', user.email);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
