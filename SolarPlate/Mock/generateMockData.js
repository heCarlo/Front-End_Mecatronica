const fs = require('fs');

const generateRandomData = (length) => {
  const currentDate = new Date();
  const data = [];

  for (let i = 0; i < length; i++) {
    const randomDate = new Date(currentDate - i * 24 * 60 * 60 * 1000); // Subtract days
    const formattedDate = `${randomDate.getFullYear()}-${(randomDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${randomDate.getDate().toString().padStart(2, '0')}T${randomDate
      .toTimeString()
      .slice(0, 8)}`;

    data.push({
      created_at: formattedDate,
      value: Math.floor(Math.random() * 100) + 1,
      sensort: Number((Math.random() * 5.5).toFixed(1)), // Limit sensort to a maximum of 5.5 and convert to number
      servo_vertical: Math.floor(Math.random() * 100),
      secury_mode: true, // Assuming it's a static value for all entries
    });
  }

  return data;
};

const jsonData = generateRandomData(30); // Change the length as needed
const jsonString = JSON.stringify(jsonData, null, 2);

fs.writeFileSync('mockData.json', jsonString, 'utf-8');

console.log('Mock data generated and saved to mockData.json');
