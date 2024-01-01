document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('bmiForm').addEventListener('submit', function (event) {
      event.preventDefault();
    
      const formData = new FormData(document.getElementById('bmiForm'));
    
      fetch('/bmicalculator', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', 
      },
      body: new URLSearchParams(formData).toString(),
      })
      .then(response => response.json())
      .then(data => {
        const resultElement = document.getElementById('bmiResultText');
        resultElement.textContent = `BMI Result: ${data.bmi}, Category: ${data.interpretation}`;
        document.getElementById('bmiResultContainer').style.display = 'block';
      })
      .catch(error => {
        console.error('Error:', error);
        const resultElement = document.getElementById('bmiResultText');
        resultElement.textContent = 'Error calculating BMI. Please check your input.';
        document.getElementById('bmiResultContainer').style.display = 'block';
      });
    });
    
});