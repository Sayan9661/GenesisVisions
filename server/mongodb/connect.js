import mongoose from 'mongoose';

// connection to mongoDB
const connectDB = (url) => {
    mongoose.set('strictQuery', true);

    
    mongoose.connect(url)
        .then(() => console.log('mongoDb connected'))
        .catch((err) => console.log(err));
}

export default connectDB;