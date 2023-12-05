function getRandomInt(min, max) {
    // Function to generate a random integer between min (inclusive) and max (exclusive)
    return Math.floor(Math.random() * (max - min) + min);
  }
  
  function generateRandomData() {
    // Function to generate random data for sensort and servo_vertical
    const randomSensort = getRandomInt(0, 5);
    const randomServoVertical = getRandomInt(0, 180);
  
    return {
      sensort: randomSensort,
      servo_vertical: randomServoVertical,
      secury_mode: true
    };
  }
  
  function postData() {
    const url = 'http://carlosgfkp.pythonanywhere.com/api/sensor-data/create/';
  
    const data = generateRandomData();
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error sending data:', error.message);
    });
  }
  
  // Call the postData function every second
  setInterval(postData, 1000);
  