var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
//TODO: Review https://mongoosejs.com/docs/validation.html

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB, { useNewUrlParser: true } );
mongoose.set('useCreateIndex', true);

var HighLevelSchema = new Schema({
    type: String,
    options: {
        offLabel: String,
        onLabel: String,
        call: String,
        value: String,
    },
});

var MonitorSchema = new Schema({
    label: String,
    call: String,
});

var ActionSchema = new Schema({
    type: String,
    call: String,
    value: String,
    label: String,
    pattern: String,
});

// Device schema
var DeviceSchema = new Schema({
    initialCall: String,
    header: {
        name: String,
        color: String,
        displayHighLevel: Boolean,
        highlevel: HighLevelSchema,
    },
    monitors: [MonitorSchema],
    actions: [ActionSchema],
});

// return the model
module.exports = mongoose.model('Device', DeviceSchema);