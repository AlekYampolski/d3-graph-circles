var height = 400;
var width = 1000;
var padding = {
  left: 20,
  right: 20
};

var data2 = [
  { value: -0.124, name: "Twitter" },
  { value: 0.524, name: "Twitter" },
  { value: 0.894, name: "Twitter" },
  { value: -0.624, name: "Twitter" }
];

// var data = ["0", "0.25", "0.5", "0.75", "1", "-0.75", "-0.5", "-0.25", " 0"];

var svg = d3
  .select("body")
  .append("svg")
  .attr("height", height)
  .attr("width", width)
  .style("backgroud", "#eee");

var xCenter = width / 2;
var xLeftStart = padding.left;
var xLeftEnd = xCenter;
var xRightStart = xCenter;
var xRightEnd = width - padding.right;

var xScaleLeft = d3
  .scaleLinear()
  .domain([0, -1])
  .range([xLeftStart, xLeftEnd]); //                .nice();

var xScaleRight = d3
  .scaleLinear()
  .domain([1, 0])
  .range([xRightStart, xRightEnd]); //                 .nice();

var xAxisLeft = d3
  .axisBottom()
  .scale(xScaleLeft)
  // .ticks(4)
  .tickValues([0, -0.25, -0.5, -0.75])
  .tickSizeInner(-height);

var xAxisRight = d3
  .axisBottom()
  .scale(xScaleRight)

  .tickValues([1, 0.75, 0.5, 0.25, 0])
  .tickSizeInner(-height);

svg
  .append("g")
  .attr("class", "xScaleRight")
  .call(xAxisRight)
  .attr("transform", "translate(" + 0 + "," + (height - 20) + ")")
  .selectAll("line")
  .style("stroke-dasharray", "3, 3");

svg
  .append("g")
  .attr("class", "xAxisLeft")
  .call(xAxisLeft)
  .attr("transform", "translate(" + 0 + "," + (height - 20) + ")")
  .selectAll("line")
  .style("stroke-dasharray", "3, 3");

var radScale = d3.scaleLinear()
                    .domain([0,1])
                    .range([0, height/3/2]);

svg
  .selectAll("circle.it")
  .data(data2)
  .enter()
  .append("circle")
  .attr("cx", d => d.value > 0  ? xScaleRight(d.value) : xScaleLeft(d.value))
  .attr("cy", d => (Math.random() > 0.5) ? 200 + radScale(Math.abs(d.value)) : 200 - radScale(Math.abs(d.value)) )
  .attr("r", d => radScale(Math.abs(d.value)))
  .attr("transform", "translate(" + 0 + "," + 0 + ")")
  .style('fill', 'white')
  .style('stroke', d => d.value > 0 ? 'green' : 'red' )
  .style('stroke-width', 2);
