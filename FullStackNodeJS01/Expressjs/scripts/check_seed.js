require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');

const Keyboard = require(path.join(__dirname, '../src/models/keyboard'));
const User = require(path.join(__dirname, '../src/models/user'));
const Category = require(path.join(__dirname, '../src/models/category'));

const MONGO = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/fullstack02';

async function run(){
  try{
    await mongoose.connect(MONGO);
    const k = await Keyboard.countDocuments();
    const u = await User.countDocuments();
    const c = await Category.countDocuments();
    console.log('DB:', MONGO);
    console.log('Users:', u);
    console.log('Keyboards:', k);
    console.log('Categories:', c);
    await mongoose.disconnect();
  }catch(e){
    console.error(e);
    process.exit(1);
  }
}

run();
