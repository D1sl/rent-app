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

        // Helper functions
        function randomBuildingType() {
            const types = ["Apartment building", "House", "Row house", "Townhouse"];
            const randomIndex = Math.floor(Math.random() * types.length);
            return types[randomIndex];
        }

        function randomApartmentType() {
            const types = ["Studio", "Alcove studio", "Apartment", "Micro apartment", "Loft", "Duplex", "Triplex", "Co-op", "Condo"];
            const randomIndex = Math.floor(Math.random() * types.length);
            return types[randomIndex];
        }

        function randomCondition() {
            const types = ["New", "Great", "Good", "Just okay", "Wear and tear", "Bad", "Unlivable"];
            const randomIndex = Math.floor(Math.random() * types.length);
            return types[randomIndex];
        }

        function generateRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        const propertyTitle = faker.lorem.words(Math.round(Math.random() * 20) + 1);
        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { _id: userId } = createdUsers.ops[randomUserIndex];
        const belongsTo = createdUsers.ops[randomUserIndex];
        const rent = generateRandomNumber(500, 1500);
        const safetyDeposit = generateRandomNumber(1000, 3000);
        const buildingType = randomBuildingType();
        const apartmentType = randomApartmentType();
        const floor = Math.floor(Math.random() * 10);
        const yearBuilt = generateRandomNumber(1900, 2022);
        const livingArea = `${generateRandomNumber(10, 400)} m²`
        const elevator = Math.random() > 0.5 ? true : false;
        const bedrooms = generateRandomNumber(1, 5);
        const bathrooms = generateRandomNumber(1, 5);
        const condition = randomCondition();
        const kitchenType = "Full kitchen";
        const kitchenEquipment = "Stove, Microwave Oven, Dishwasher";
        const balcony = Math.random() > 0.5 ? true : false;
        let balconyDetails = "";
        if (balcony) {
            balconyDetails = "Glass paneled balcony.";
        }
        const bathroomDetails = "Heated floors, stand-up shower, recessed lighting. Toilet room has a mirror cabinet.";
        const storageDetails = "Walk in closet";
        const sauna = Math.random() > 0.5 ? true : false;
        const contractType = "Lease";
        const miscDetails = "Blinds, well lit, stays cool";
        const otherConditions = "Requires renters insurance";
        const televisionDetails = "Cable TV";
        const availableFrom = "05/22/2022";
        const address = createAddress();

        const createdProperty = await Property.create(
            {
                propertyTitle,
                belongsTo,
                rent,
                safetyDeposit,
                address,
                buildingType,
                apartmentType,
                floor,
                yearBuilt,
                livingArea,
                elevator,
                bedrooms,
                bathrooms,
                condition,
                kitchenType,
                kitchenEquipment,
                balcony,
                balconyDetails,
                bathroomDetails,
                storageDetails,
                sauna,
                contractType,
                miscDetails,
                otherConditions,
                availableFrom,
                televisionDetails
            });

        const updatedUser = await User.updateOne(
            { _id: userId },
            { $push: { properties: createdProperty._id } }
        );

        createdProperties.push(createdProperty);
    }

    console.log('All done!');

    process.exit(0);
})