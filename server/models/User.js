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
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 3
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
        bio: {
            type: String,
            required: false
        },
        memberSince: {
            type: String,
            default: new Date().getFullYear(),
            required: false
        },
        userType: {
            type: String,
            required: false,
        },
        address: addressSchema,
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

userSchema.virtual('userStatus').get(function() {
    if ( !this.firstName || !this.lastName || !this.phone ) {
        return "incomplete"
    } else {
        return "complete"
    }
})

const User = model('User', userSchema);

module.exports = User;