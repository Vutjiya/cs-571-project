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
    marginLeft: 20,
    marginBottom: 80,
    style: {
      fontSize: "14px",
      fontFamily: "sans-serif"
    }
  });

  const avg_data = [
    { period: "Avg 2017-2019", value: 4, color : "red" },
    { period: "Avg 2022-2025", value: 3.7, color : "blue" }
  ];

  const bar_chart = Plot.plot({
    width: 300,
    height: 500,
    marginBottom: 20,
    x: {
      label: null
    },
    y: {
      label: "Unemployment Rate (%)",
      domain: [0, 5] 
    },
    marks: [
      Plot.barY(avg_data, { x: "period", y: "value", fill: "color"}),
      Plot.text(avg_data, {
        x: "period",
        y: "value",
        dy: -10,
        text: d => d.value.toFixed(1),
        fill: "black"
      })
    ]
  });
  
  document.getElementById("chart_unemp").appendChild(chart_unemp);
  document.getElementById("chart_unemp").appendChild(bar_chart);

  /**
  Inflation rate data
  **/

  async function drawInflation() {
    const data_inf = await d3.csv("data/inflation.csv", d => ({
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

   /**
  GDP rate data
  **/

    async function draw_GDP() {
      const data_gdp = await d3.csv("data/GDP.csv", d => ({
      // const data_gdp = await d3.csv("data/cleaned_gdp.csv", d => ({
        date: new Date(d.Date),
        gdp: +d.GDP
      }));
    
      const plot_gdp = Plot.plot({
        width: 700,
        height: 500,
        marginLeft : 50,
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


    async function draw_GDP_rate() {
      // const data_gdp = await d3.csv("GDP.csv", d => ({
      const data_gdp_rate = await d3.csv("data/cleaned_gdp.csv", d => ({
        date: new Date(d.Date),
        gdp: +d.GDP
      }));
    
      const plot_gdp_rate = Plot.plot({
        width: 500,
        height: 500,
        x: {
          type: "time",
          label: "Date",
          tickFormat: d => d.getFullYear().toString()
        },
        y: {
          label: "GDP rate",
          grid: true
        },
        marks: [
          Plot.line(data_gdp_rate, {
            x: d => d.date,
            y: d => d.gdp,
            stroke: "blue"
          }),
          Plot.dot(data_gdp_rate, {
            x: d => d.date,
            y: d => d.gdp,
            r: 2,
            fill: "black"
          })
        ]
      });
      document.getElementById("plot_gdp").appendChild(plot_gdp_rate);
    }

    draw_GDP(); 
    draw_GDP_rate();
  
