import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

let national_crimes = d3.csvParse("./data/national_crimes.csv", d3.autoType)

let plot = Plot.lineY(national_crimes, {x: "year", y: "violent_crime"})

console.log("it ran")

const div = document.getElementById("#myplot");
div.append(plot);