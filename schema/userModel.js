const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {type: String, required: true},
    surname: {type: String, required: true},
    student_id: {type: Number, required: true},
    age: {type: Number, required: true},
    nationality: {type: String, required: true},
    degree: {type: String, required: true}
});

module.exports = mongoose.model('User', UserSchema);