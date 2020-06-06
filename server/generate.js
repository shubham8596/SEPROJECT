var faker = require('faker');

var database = {users : []};

for (var i = 1; i<= 10; i++) {
  database.users.push({
    id: i,
    photo:faker.image.avatar(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email:faker.internet.email(),
    password:faker.internet.password(),
    contact_number:faker.phone.phoneNumberFormat().replace(/-/g,""),
  });
}

console.log(JSON.stringify(database));