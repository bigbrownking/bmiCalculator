document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('bmiForm').addEventListener('submit', function (event) {
      event.preventDefault();

      const formData = new FormData(document.getElementById('bmiForm'));
      const weight = formData.get('weight');
      const height = formData.get('height');
      const age = formData.get('age');

      // Validation logic
      let errorMessage = '';
      if (isNaN(weight) || weight <= 0) {
          errorMessage += 'Invalid weight. ';
      }
      if (isNaN(height) || height <= 0) {
          errorMessage += 'Invalid height. ';
      }
      if (isNaN(age) || age <= 0) {
          errorMessage += 'Invalid age. ';
      }

      const resultElement = document.getElementById('bmiResultText');
      if (errorMessage) {
          resultElement.textContent = errorMessage;
          document.getElementById('bmiResultContainer').style.display = 'block';
          return;
      }

      fetch('/bmicalculator', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(formData).toString(),
      })
      .then(response => response.json())
      .then(data => {
          resultElement.textContent = `BMI Result: ${data.bmi}, Category: ${data.interpretation}`;
          document.getElementById('bmiResultContainer').style.display = 'block';
      })
      .catch(error => {
          console.error('Error:', error);
          resultElement.textContent = 'Error calculating BMI. Please check your input.';
          document.getElementById('bmiResultContainer').style.display = 'block';
      });
  });
});
