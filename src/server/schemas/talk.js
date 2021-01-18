const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    pw: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
}, {
    versionKey: false,
    strict: false,
    _id: false
});
const likeSchema = new Schema({
    ip: {
        type: String
    },
}, {
    versionKey: false,
    strict: false,
    _id: false
});
const commentSchema = new Schema({   
    detail: {
        type: String,
        required: true
    },
    user: {
        type: userSchema,
        required: true
    },
    like: {
        type: Number,
        default: 0
    },
    
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
}, {
    versionKey: false,
    strict: false
});
const talkSchema = new Schema({
    lang: {
        type: String,
        required: true
    },
    tag: {
        type: Number,
        required: true,
        default: 0
    },
    title: {
        type: String,
        required: true,
    },
    detail: {
        type: String,
        required: true
    },
    preview: {
        type: String
    },

    like: [likeSchema],

    user: {
        type: userSchema,
        required: true
    },

    comment: [commentSchema],
    
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
}, {
    versionKey: false,
    strict: false
})

module.exports = mongoose.model('talk', talkSchema);