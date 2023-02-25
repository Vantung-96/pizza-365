const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    orders: [{
        type: mongoose.Types.ObjectId,
        ref: "order"
    }],
    ngayTao: {
        type: Date,
        default: Date.now()
    },
    ngayCapNhat: {
        type: Date,
        default: Date.now()
    }

});
module.exports = mongoose.model("user", userSchema);