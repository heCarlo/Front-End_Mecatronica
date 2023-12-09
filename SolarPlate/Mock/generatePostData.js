function postData() {
  const url = 'http://carlosgfkp.pythonanywhere.com/api/sensor-data/create/';

  // Generate random values for sensort and servo_vertical
  const randomSensort = Math.floor(Math.random() * 5); // Example: Random value between 0 and 9
  const randomServoVertical = Math.floor(Math.random() * 180); // Example: Random value between 0 and 179

  const data = {
    sensort: randomSensort,
    servo_vertical: randomServoVertical,
  };

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
  .then(jsonData => {
    console.log('Data sent successfully:', jsonData);
  })
  .catch(error => {
    console.error('Error sending data:', error.message);
  });
}

// Call the postData function every second
setInterval(postData, 5000);
