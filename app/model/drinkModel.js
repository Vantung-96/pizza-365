const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const drinkSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    maNuocUong: {
        type: String,
        required: true,
        unique: true
    },
    tenNuocUong: {
        type: String,
        required: true
    },
    donGia: {
        type: Number,
        required: true
    },
    ngayTao: {
        type: Date,
        default: Date.now()
    },
    ngayCapNhat: {
        type: Date,
        default: Date.now()
    }
});

// export
module.exports = mongoose.model("drink", drinkSchema);