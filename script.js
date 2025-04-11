import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6.12/+esm";

const data = [
    { week: "1/1-1/5", segments: 1 },
    { week: "1/8-1/12", segments: 4 },
    { week: "1/15-1/19", segments: 4 },
    { week: "1/22-1/26", segments: 8 },
    { week: "1/29-2/2", segments: 63 },
    { week: "2/5-2/9", segments: 71 },
    { week: "2/12-2/16", segments: 37 },
    { week: "2/19-2/23", segments: 29 },
    { week: "2/26-3/1", segments: 119 },
    { week: "3/4-3/8", segments: 52 },
  ];

const chart = Plot.plot({
x: {
    label: null,
    tickRotate: -45,
    domain: data.map(d => d.week)
},
y: {
    label: "Number of segments",
    grid: true
},
marks: [
    Plot.barY(data, {
    x: "week",
    y: "segments",
    fill: "indigo"
    }),
    Plot.text(data, {
    x: "week",
    y: "segments",
    text: d => d.segments,
    dy: -5,
    fill: "black",
    style:{
        fontSize: "100px",   
        fontWeight: "bold"
    }
    })
],
height: 500,
marginLeft: 50,
marginBottom: 80
});

document.getElementById("chart").appendChild(chart);
