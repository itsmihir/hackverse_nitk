const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contest = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        ref: "contests"
    },
    title: {
        type: String
    },
    users: [{
        userid: {
            type: Schema.Types.String,
        },
    }]
});




module.exports = contestSchema = mongoose.model("contests", contest);