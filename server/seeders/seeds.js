const faker = require('faker');

const db = require('../config/connection');
const { User, Property, Address } = require('../models');

db.once('open', async () => {
    await User.deleteMany({});
    await Property.deleteMany({});


    // Create addresses
    function createAddress() {
        const address = {
            address1: faker.address.streetAddress(true),
            city: faker.address.city(),
            zipPostcode: faker.address.zipCode(),
            country: faker.address.country()
        }

        return address;
    }


    const userData = [];

    for (let i = 0; i < 50; i += 1) {
        const email = faker.internet.email();
        const password = faker.internet.password();

        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const phone = faker.phone.phoneNumber('+358#########');

        // this works for creating an address
        const address = createAddress();

        userData.push({ email, password, phone, firstName, lastName, address });

    }

    const createdUsers = await User.collection.insertMany(userData);



    // Create properties
    let createdProperties = [];

    for (let i = 0; i < 100; i += 1) {
        const propertyTitle = faker.lorem.words(Math.round(Math.random() * 20) + 1);

        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { _id: userId } = createdUsers.ops[randomUserIndex];
        const belongsTo = createdUsers.ops[randomUserIndex];
        const rent = faker.phone.phoneNumber('####');
        const address = createAddress();

        const createdProperty = await Property.create({ propertyTitle, belongsTo, rent, address });
        console.log(createdProperty)

        const updatedUser = await User.updateOne(
            { _id: userId },
            { $push: { properties: createdProperty._id } }
        );

        createdProperties.push(createdProperty);
    }

    console.log('All done!');

    process.exit(0);
})