const content = document.querySelector(".content");
const btnSort = document.querySelectorAll(".btnSort");
let countries = [];
let sortMax = "minToMax";

async function fetchCountries() {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countries = data));
  countryDisplay();
  console.log(countries);
}
// console.log(countries);

function countryDisplay() {
  content.innerHTML = countries
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    )
    .slice(0, inputRange.value)
    // méthod slice pour afficher les éléments (index, nb element)
    .sort((a, b) => {
      if (sortMax === "minToMax") {
        return b.population - a.population;
      } else if (sortMax === "minToMin") {
        return a.population - b.population;
      } else if (sortMax === "alpha") {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      }
    })
    .map(
      (country) => ` 
 
 <div class ="card">
 <img src =${country.flags.svg} alt="drapeau ${country.name.common}"; 
  <h2 ><br>${country.translations.fra.common}</h2>
  <h4> ${country.capital} </h4>
  <p > Population : ${country.population.toLocaleString()} </p> 
 </div>
 
 
 `
    )
    .join(" ");
}
window.addEventListener("load", fetchCountries);

inputSearch.addEventListener("input", () => {
  countryDisplay();
});
inputRange.addEventListener("input", () => {
  countryDisplay();
  rangeValue.textContent = inputRange.value;
});

btnSort.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sortMax = e.target.id;
    countryDisplay();
  });
});
