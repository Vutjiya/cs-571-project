import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6.12/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

/*
Unemployment Data
*/
const data_unemp = [{ date: "2025-03-31", rate: 4.2 },
  { date: "2025-02-28", rate: 4.1 },
  { date: "2025-01-31", rate: 4.0 },
  { date: "2024-12-31", rate: 4.1 },
  { date: "2024-11-30", rate: 4.2 },
  { date: "2024-10-31", rate: 4.1 },
  { date: "2024-09-30", rate: 4.1 },
  { date: "2024-08-31", rate: 4.2 },
  { date: "2024-07-31", rate: 4.2 },
  { date: "2024-06-30", rate: 4.1 },
  { date: "2024-05-31", rate: 4.0 },
  { date: "2024-04-30", rate: 3.9 },
  { date: "2024-03-31", rate: 3.9 },
  { date: "2024-02-29", rate: 3.9 },
  { date: "2024-01-31", rate: 3.7 },
  { date: "2023-12-31", rate: 3.8 },
  { date: "2023-11-30", rate: 3.7 },
  { date: "2023-10-31", rate: 3.9 },
  { date: "2023-09-30", rate: 3.8 },
  { date: "2023-08-31", rate: 3.7 },
  { date: "2023-07-31", rate: 3.5 },
  { date: "2023-06-30", rate: 3.6 },
  { date: "2023-05-31", rate: 3.6 },
  { date: "2023-04-30", rate: 3.4 },
  { date: "2023-03-31", rate: 3.5 },
  { date: "2023-02-28", rate: 3.6 },
  { date: "2023-01-31", rate: 3.5 },
  { date: "2022-12-31", rate: 3.5 },
  { date: "2022-11-30", rate: 3.6 },
  { date: "2022-10-31", rate: 3.6 },
  { date: "2022-09-30", rate: 3.5 },
  { date: "2022-08-31", rate: 3.6 },
  { date: "2022-07-31", rate: 3.5 },
  { date: "2022-06-30", rate: 3.6 },
  { date: "2022-05-31", rate: 3.6 },
  { date: "2022-04-30", rate: 3.7 },
  { date: "2022-03-31", rate: 3.6 },
  { date: "2022-02-28", rate: 3.8 },
  { date: "2022-01-31", rate: 4.0 },
  { date: "2021-12-31", rate: 3.9 },
  { date: "2021-11-30", rate: 4.2 },
  { date: "2021-10-31", rate: 4.5 },
  { date: "2021-09-30", rate: 4.8 },
  { date: "2021-08-31", rate: 5.2 },
  { date: "2021-07-31", rate: 5.4 },
  { date: "2021-06-30", rate: 5.9 },
  { date: "2021-05-31", rate: 5.8 },
  { date: "2021-04-30", rate: 6.1 },
  { date: "2021-03-31", rate: 6.1 },
  { date: "2021-02-28", rate: 6.2 }]

  data_unemp.sort((a, b) => new Date(a.date) - new Date(b.date));

  const chart_unemp = Plot.plot({
    x: {
      label: "Date",
      type: "utc",
      tickFormat: "%b %Y",
      tickRotate: -45
    },
    y: {
      label: "Unemployment Rate (%)",
      grid: true
    },
    marks: [
      Plot.line(data_unemp, {
        x: d => new Date(d.date),
        y: "rate",
        stroke: "indigo"
      }),
      Plot.dot(data_unemp, {
        x: d => new Date(d.date),
        y: "rate",
        fill: "indigo"
      })
    ],
    height: 500,
    marginLeft: 60,
    marginBottom: 80,
    style: {
      fontSize: "14px",
      fontFamily: "sans-serif"
    }
  });
  
  document.getElementById("chart_unemp").appendChild(chart_unemp);

  /**
  Inflation rate data
  **/

  // const data_inf = [
  //   { date: "2019-01", inflation: 1.6 }, { date: "2019-02", inflation: 1.5 }, { date: "2019-03", inflation: 1.9 },
  //   { date: "2019-04", inflation: 2.0 }, { date: "2019-05", inflation: 1.8 }, { date: "2019-06", inflation: 1.6 },
  //   { date: "2019-07", inflation: 1.8 }, { date: "2019-08", inflation: 1.7 }, { date: "2019-09", inflation: 1.7 },
  //   { date: "2019-10", inflation: 1.8 }, { date: "2019-11", inflation: 2.1 }, { date: "2019-12", inflation: 2.3 },
  
  //   { date: "2020-01", inflation: 2.5 }, { date: "2020-02", inflation: 2.3 }, { date: "2020-03", inflation: 1.5 },
  //   { date: "2020-04", inflation: 0.3 }, { date: "2020-05", inflation: 0.1 }, { date: "2020-06", inflation: 0.6 },
  //   { date: "2020-07", inflation: 1.0 }, { date: "2020-08", inflation: 1.3 }, { date: "2020-09", inflation: 1.4 },
  //   { date: "2020-10", inflation: 1.2 }, { date: "2020-11", inflation: 1.2 }, { date: "2020-12", inflation: 1.4 },
  
  //   { date: "2021-01", inflation: 1.4 }, { date: "2021-02", inflation: 1.7 }, { date: "2021-03", inflation: 2.6 },
  //   { date: "2021-04", inflation: 4.2 }, { date: "2021-05", inflation: 5.0 }, { date: "2021-06", inflation: 5.4 },
  //   { date: "2021-07", inflation: 5.4 }, { date: "2021-08", inflation: 5.3 }, { date: "2021-09", inflation: 5.4 },
  //   { date: "2021-10", inflation: 6.2 }, { date: "2021-11", inflation: 6.8 }, { date: "2021-12", inflation: 7.0 },
  
  //   { date: "2022-01", inflation: 7.5 }, { date: "2022-02", inflation: 7.9 }, { date: "2022-03", inflation: 8.5 },
  //   { date: "2022-04", inflation: 8.3 }, { date: "2022-05", inflation: 8.6 }, { date: "2022-06", inflation: 9.1 },
  //   { date: "2022-07", inflation: 8.5 }, { date: "2022-08", inflation: 8.3 }, { date: "2022-09", inflation: 8.2 },
  //   { date: "2022-10", inflation: 7.7 }, { date: "2022-11", inflation: 7.1 }, { date: "2022-12", inflation: 6.5 },
  
  //   { date: "2023-01", inflation: 6.4 }, { date: "2023-02", inflation: 6.0 }, { date: "2023-03", inflation: 5.0 },
  //   { date: "2023-04", inflation: 4.9 }, { date: "2023-05", inflation: 4.0 }, { date: "2023-06", inflation: 3.0 },
  //   { date: "2023-07", inflation: 3.2 }, { date: "2023-08", inflation: 3.7 }, { date: "2023-09", inflation: 3.7 },
  //   { date: "2023-10", inflation: 3.2 }, { date: "2023-11", inflation: 3.1 }, { date: "2023-12", inflation: 3.4 },
  
  //   { date: "2024-01", inflation: 3.1 }, { date: "2024-02", inflation: 3.2 }, { date: "2024-03", inflation: 3.5 },
  //   { date: "2024-04", inflation: 3.4 }, { date: "2024-05", inflation: 3.3 }, { date: "2024-06", inflation: 3.0 },
  //   { date: "2024-07", inflation: 2.9 }, { date: "2024-08", inflation: 2.5 }, { date: "2024-09", inflation: 2.4 },
  //   { date: "2024-10", inflation: 2.6 }, { date: "2024-11", inflation: 2.7 }, { date: "2024-12", inflation: 2.9 },
  
  //   { date: "2025-01", inflation: 3.0 }, { date: "2025-02", inflation: 2.8 }, { date: "2025-03", inflation: 2.4 }
  // ];

  async function drawInflation() {
    const data_inf = await d3.csv("inflation.csv", d => ({
      date: new Date(d.Date),
      inflation: +d.inflation
    }));
  
    const chart_inf = Plot.plot({
      width: 900,
      height: 500,
      x: {
        type: "time",
        label: "Date",
        tickFormat: d => d.getFullYear().toString()
      },
      y: {
        label: "inflation (%)",
        grid: true
      },
      marks: [
        Plot.line(data_inf, {
          x: d => new Date(d.date),
          y: "inflation",
          stroke: "orange"
        }),
        Plot.dot(data_inf, {
          x: d => new Date(d.date),
          y: "inflation",
          r: 2,
          fill: "black"
        })
      ]
    });
  
    document.getElementById("chart_inf").appendChild(chart_inf);
  }

  drawInflation();  

  // const chart_inf = Plot.plot({
  //   width: 900,
  //   height: 500,
  //   x: {
  //     type: "time",
  //     label: "Date",
  //     tickFormat: d => d.getFullYear().toString()
  //   },
  //   y: {
  //     label: "Inflation (%)",
  //     grid: true
  //   },
  //   marks: [
  //     Plot.line(data_inf, {
  //       x: d => new Date(d.date),
  //       y: "inflation",
  //       stroke: "orange"
  //     }),
  //     Plot.dot(data_inf, {
  //       x: d => new Date(d.date),
  //       y: "inflation",
  //       r: 2,
  //       fill: "black"
  //     })
  //   ]
  // });

  // document.getElementById("chart_inf").appendChild(chart_inf);

   /**
  GDP rate data
  **/

    // const plot_gdp = Plot.plot({
    //   width: 800,
    //   height: 500,
    //   x: {
    //     label: "Date",
    //     tickFormat: d => d.getFullYear(),
    //   },
    //   y: {
    //     label: "GDP (Trillions USD)",
    //   },
    //   marks: [
    //     Plot.line(data, { x: "date", y: "gdp", stroke: "blue" }),
    //     Plot.dot(data, { x: "date", y: "gdp", fill: "blue" })
    //   ]
    // });

    async function drawGDP() {
      const data_gdp = await d3.csv("GDP.csv", d => ({
        date: new Date(d.Date),
        gdp: +d.GDP
      }));
    
      const plot_gdp = Plot.plot({
        width: 900,
        height: 500,
        x: {
          type: "time",
          label: "Date",
          tickFormat: d => d.getFullYear().toString()
        },
        y: {
          label: "GDP (trillions)",
          grid: true
        },
        marks: [
          Plot.line(data_gdp, {
            x: d => d.date,
            y: d => d.gdp,
            stroke: "green"
          }),
          Plot.dot(data_gdp, {
            x: d => d.date,
            y: d => d.gdp,
            r: 2,
            fill: "black"
          })
        ]
      });
    
      document.getElementById("plot_gdp").appendChild(plot_gdp);
    }

    drawGDP(); 
  
