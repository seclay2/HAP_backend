var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
//TODO: Review https://mongoosejs.com/docs/validation.html

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB, { useNewUrlParser: true } );
mongoose.set('useCreateIndex', true);

const actions = ["button", "input", "toggle"];

var HighLevelSchema = new Schema({
    type: String,
    options: {
        offLabel: String,
        onLabel: String,
        call: String,
        value: String,
    },
});

var HeaderSchema = new Schema({
    name: { type: String, required: true },
    color: String,
    displayHighLevel: { type: Boolean, required: true },
    highlevel: { type: HighLevelSchema, required: displayHighLevel }
});

function displayHighLevel() {
    return this.displayHighLevel;
}

var MonitorSchema = new Schema({
    label: String,
    call: String,
});

var ActionSchema = new Schema({
    type: { type: String, enum: actions, required: true },
    call: { type: String, required: true },
    value: String,
    label: { type: String, required: true },
    pattern: String,
});

// Device schema
var DeviceSchema = new Schema({
    initialCall: String,
    header: { type: HeaderSchema, required: true },
    monitors: [MonitorSchema],
    actions: [ActionSchema],
});

// return the model
module.exports = mongoose.model('Device', DeviceSchema);