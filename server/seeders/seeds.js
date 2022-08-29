const faker = require('faker');

const db = require('../config/connection');
const { User, Property } = require('../models');

db.once('open', async () => {
    await User.deleteMany({});
    await Property.deleteMany({});

    // Create user data
    const userData = [];

    for (let i = 0; i < 50; i += 1) {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const email = faker.internet.email();
        const password = faker.internet.password();
        const phone = faker.phone.phoneNumber('+358#########');

        userData.push({ email, password, phone, firstName, lastName });
    }

    const createdUsers = await User.collection.insertMany(userData);

    // Create properties
    let createdProperties = [];

    for (let i = 0; i < 100; i += 1) {
        const propertyTitle = faker.lorem.words(Math.round(Math.random() * 20) + 1);

        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { email, _id: userId } = createdUsers.ops[randomUserIndex];

        const createdProperty = await Property.create({ propertyTitle, email });

        const updatedUser = await User.updateOne(
            { _id: userId },
            { $push: { properties: createdProperty._id } }
        );

        createdProperties.push(createdProperty);
    }

    // Create addresses
    for (let i = 0; i < 100; i += 1) {
        const address1 = faker.address.streetAddress(true);
        const city = faker.address.city();
        const zipPostcode = faker.address.zipCode();
        const country = faker.address.country();

        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { _id: userId } = createdUsers.ops[randomUserIndex];

        const randomPropertyIndex = Math.floor(Math.random() * createdProperties.length);
        const { _id: propertyId } = createdProperties[randomPropertyIndex]

        await User.updateOne(
            { _id: userId },
            { $set: { address: { address1, city, zipPostcode, country } } },
            { runValidators: true }
        )

        await Property.updateOne(
            { _id: propertyId },
            { $set: { address: { address1, city, zipPostcode, country } } },
            { runValidators: true }
        )

    }

    console.log('All done!');
    process.exit(0);
})