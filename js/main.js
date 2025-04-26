function results() {
  let weight = document.getElementById("weight").value;
  let height = document.getElementById("height").value;

  // Reset any previous results
  document.getElementById("message").innerHTML = "";
  document.querySelector(".cards-2").style.display = "none";
  document.querySelector("#showResult").innerHTML = "";
  document.getElementById("dietRecommendation").style.display = "none";

  if (weight.length <= 0 || height.length <= 0) {
    document.getElementById("message").innerHTML =
      "Note: Please enter your exact height (in meters) & weight (in kg).";
    return;
  }

  weight = parseFloat(weight);
  height = parseFloat(height);

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    document.getElementById("message").innerHTML =
      "Note: Please enter valid positive values for height (in meters) & weight (in kg).";
    return;
  }

  if (height > 3) {
    document.getElementById("message").innerHTML =
      "Note: Please enter height in meters, not centimeters (e.g., 1.75 not 175).";
    return;
  }

  let bmi = (weight / Math.pow(height, 2)).toFixed(2);

  // Fix: Remove reference to ".message" element that doesn't exist
  document.getElementById("message").innerHTML = ""; // Clear any error messages
  document.querySelector(".cards-2").style.display = "block";

  let showResults = "Your BMI is " + bmi;
  document.getElementById("showResult").innerHTML = showResults;
  document.getElementById("showResult").style.display = "block";

  // Add animation class to make the result pop
  document.getElementById("showResult").classList.add("pulse");

  document.getElementById("showUnderweight").innerHTML = "";
  document.getElementById("showNormal").innerHTML = "";
  document.getElementById("showOverweight").innerHTML = "";
  document.getElementById("showObese").innerHTML = "";

  if (bmi <= 18.4) {
    document.getElementById("showUnderweight").innerHTML =
      "Result: Underweight &#128533;";
    document.getElementById("dietRecommendation").innerHTML =
      "<h5>Diet Recommendation:</h5><p>Focus on high-calorie, nutrient-rich foods such as nuts, avocados, whole milk, lean proteins, and healthy fats. Try eating more frequent meals throughout the day.</p>";
    document.getElementById("dietRecommendation").style.display = "block";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    document.getElementById("showNormal").innerHTML =
      "Result: Healthy Weight &#128512;";
    document.getElementById("dietRecommendation").innerHTML =
      "<h5>Diet Recommendation:</h5><p>Maintain a balanced diet with plenty of fruits, vegetables, whole grains, and lean proteins. Continue your healthy eating habits and regular physical activity.</p>";
    document.getElementById("dietRecommendation").style.display = "block";
  } else if (bmi >= 25 && bmi <= 29.9) {
    document.getElementById("showOverweight").innerHTML =
      "Result: Overweight &#128544;";
    document.getElementById("dietRecommendation").innerHTML =
      "<h5>Diet Recommendation:</h5><p>Focus on low-calorie, high-fiber foods such as vegetables, fruits, lean proteins, and whole grains. Reduce intake of processed foods, sugars, and saturated fats.</p>";
    document.getElementById("dietRecommendation").style.display = "block";
  } else if (bmi >= 30) {
    document.getElementById("showObese").innerHTML =
      "Result: Obesity &#128545;";
    document.getElementById("dietRecommendation").innerHTML =
      "<h5>Diet Recommendation:</h5><p>Consult with a healthcare provider. Focus on portion control, increased vegetable intake, lean proteins, and reduced consumption of refined carbohydrates, sugars, and processed foods.</p>";
    document.getElementById("dietRecommendation").style.display = "block";
  }

  // Add animation to the diet recommendation
  document.getElementById("dietRecommendation").classList.add("fadeIn");

  document.querySelector(".reset").style.display = "block";
  document.querySelector(".results").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  const weightInput = document.getElementById("weight");
  const heightInput = document.getElementById("height");

  // Create a message element if it doesn't exist in the HTML
  if (!document.getElementById("message")) {
    const messageDiv = document.createElement("div");
    messageDiv.id = "message";
    document.querySelector(".cards").after(messageDiv);
  }

  function handleEnterKey(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      results();
    }
  }

  weightInput.addEventListener("keypress", handleEnterKey);
  heightInput.addEventListener("keypress", handleEnterKey);

  weightInput.placeholder = "Enter weight in kg";
  heightInput.placeholder = "Enter height in meters (e.g., 1.75)";

  // Add input animation
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.classList.add("active");
    });
    input.addEventListener("blur", function () {
      if (this.value.length === 0) {
        this.classList.remove("active");
      }
    });
  });
});
