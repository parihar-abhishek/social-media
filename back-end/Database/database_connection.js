const mongoose = require('mongoose')


try {
     mongoose.connect(process.env.connection_string)
    console.log('Database connected');
} catch (error) {
    console.log(err);
}