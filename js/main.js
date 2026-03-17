const carListings = document.getElementById("carListings");
const makeFilter = document.getElementById("makeFilter");
const colorFilter = document.getElementById("colorFilter");
const filterForm = document.getElementById("filterForm");
const resetBtn = document.getElementById("resetBtn");
const resultsCount = document.getElementById("resultsCount");
const noResultsMessage = document.getElementById("noResultsMessage");

const minYearInput = document.getElementById("minYear");
const maxYearInput = document.getElementById("maxYear");
const maxMileageInput = document.getElementById("maxMileage");
const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");

function displayCars(cars) {
  carListings.innerHTML = "";

  if (cars.length === 0) {
    resultsCount.textContent = "0 cars found";
    noResultsMessage.textContent = "No cars found, try again.";
    return;
  }

  noResultsMessage.textContent = "";
  resultsCount.textContent = `${cars.length} car(s) found`;

  cars.forEach(function (car) {
    const carCard = document.createElement("div");
    carCard.classList.add("car-card");

    carCard.innerHTML = `
      <h3>${car.year} ${car.make} ${car.model}</h3>
      <p><strong>Price:</strong> $${car.price.toLocaleString()}</p>
      <p><strong>Mileage:</strong> ${car.mileage.toLocaleString()} miles</p>
      <p><strong>Color:</strong> ${car.color}</p>
      <p><strong>Gas Mileage:</strong> ${car.gasMileage}</p>
    `;

    carListings.appendChild(carCard);
  });
}

function populateFilters() {
  const makes = [...new Set(usedCars.map(function (car) {
    return car.make;
  }))];

  const colors = [...new Set(usedCars.map(function (car) {
    return car.color;
  }))];

  makes.forEach(function (make) {
    const option = document.createElement("option");
    option.value = make;
    option.textContent = make;
    makeFilter.appendChild(option);
  });

  colors.forEach(function (color) {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    colorFilter.appendChild(option);
  });
}

function getSelectedValues(selectElement) {
  return Array.from(selectElement.selectedOptions).map(function (option) {
    return option.value;
  });
}

function filterCars(event) {
  event.preventDefault();

  const minYear = Number(minYearInput.value) || 0;
  const maxYear = Number(maxYearInput.value) || Infinity;
  const maxMileage = Number(maxMileageInput.value) || Infinity;
  const minPrice = Number(minPriceInput.value) || 0;
  const maxPrice = Number(maxPriceInput.value) || Infinity;

  const selectedMakes = getSelectedValues(makeFilter);
  const selectedColors = getSelectedValues(colorFilter);

  const filteredCars = usedCars.filter(function (car) {
    const matchesYear = car.year >= minYear && car.year <= maxYear;
    const matchesMileage = car.mileage <= maxMileage;
    const matchesPrice = car.price >= minPrice && car.price <= maxPrice;
    const matchesMake =
      selectedMakes.length === 0 || selectedMakes.includes(car.make);
    const matchesColor =
      selectedColors.length === 0 || selectedColors.includes(car.color);

    return (
      matchesYear &&
      matchesMileage &&
      matchesPrice &&
      matchesMake &&
      matchesColor
    );
  });

  displayCars(filteredCars);
}

function resetFilters() {
  filterForm.reset();

  Array.from(makeFilter.options).forEach(function (option) {
    option.selected = false;
  });

  Array.from(colorFilter.options).forEach(function (option) {
    option.selected = false;
  });

  noResultsMessage.textContent = "";
  displayCars(usedCars);
}

filterForm.addEventListener("submit", filterCars);
resetBtn.addEventListener("click", resetFilters);

populateFilters();
displayCars(usedCars);