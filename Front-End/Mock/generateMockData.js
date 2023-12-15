const fs = require('fs'); // Importing the file system module
const fetch = require('node-fetch'); // Importing node-fetch to make API requests

/**
 * Function to fetch data from an API endpoint and save it to a file.
 */
const fetchDataAndSaveToFile = async () => {
  try {
    // Fetch data from the API endpoint
    const response = await fetch('http://carlosgfkp.pythonanywhere.com/api/sensor-data/');

    if (!response.ok) {
      throw new Error('Error in request');
    }

    // Parse the JSON response
    const jsonData = await response.json();
    
    // Save the obtained data to the file named mockData.json
    const jsonString = JSON.stringify(jsonData, null, 2);
    fs.writeFileSync('mockData.json', jsonString, 'utf-8');

    console.log('Data obtained and saved in mockData.json');
  } catch (error) {
    console.error('Error fetching data from the API:', error.message);
  }
};

// Call the fetchDataAndSaveToFile function every second using setInterval
setInterval(() => {
  fetchDataAndSaveToFile();
}, 1000);
