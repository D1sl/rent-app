const { Schema, model } = require('mongoose');
const addressSchema = require('./Address');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: false,
            trim: true
        },
        lastName: {
            type: String,
            required: false,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!'],
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        phone: {
            type: String,
            required: false,
            trim: true
        },
        userType: {
            type: String,
            required: false,
        },
        address: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Address'
            }
        ],
        properties: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Property'
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

// Middleware to hash the passwords
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// Compare incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;