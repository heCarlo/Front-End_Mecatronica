const fs = require('fs');
const faker = require('faker');

const generateRandomData = (length) => {
  const data = [];

  for (let i = 0; i < length; i++) {
    const randomDate = faker.date.between(
      new Date('2022-01-01'),
      new Date('2023-12-31')
    );

    const formattedDate = randomDate.toISOString().slice(0, 19).replace('T', ' ');

    data.push({
      created_at: formattedDate,
      value: Math.floor(Math.random() * 100) + 1,
      sensort: Number((Math.random() * 5.5).toFixed(1)),
      servo_vertical: Math.floor(Math.random() * 100),
      secury_mode: true,
    });
  }

  return data;
};

const jsonData = generateRandomData(30);
const jsonString = JSON.stringify(jsonData, null, 2);

fs.writeFileSync('mockData.json', jsonString, 'utf-8');

console.log('Mock data generated and saved to mockData.json');
