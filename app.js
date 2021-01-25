const fs = require("fs");
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const bodyParser = require("body-parser");

const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

let process = async (url) => {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless"],
  });
  const options = {
    logLevel: "info",
    output: "html",
    onlyCategories: ["performance"],
    port: chrome.port,
  };
  const runnerResult = await lighthouse(url, options);

  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report;
  // fs.writeFileSync("lhreport.html", reportHtml);

  // `.lhr` is the Lighthouse Result as a JS object
  //   console.log("Report is done for", runnerResult.lhr);
  // console.log('Report is done for', runnerResult.lhr.finalUrl);
  // console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

  return await runnerResult.lhr;
};

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});

app.get("", async (req, res, next) => {
  let variable = await process(req.body.link);

  const time = variable.audits.interactive.numericValue / 1000;
  const size = variable.audits["total-byte-weight"].numericValue / 1000;
  const coeffcient = 0.25;
  const usage = 500000;

  const carbonFootPrint = coeffcient * size * time * usage;

  const data = {
    time: time,
    size: size,
    coefficient: coeffcient,
    usage: usage,
    carbonFootPrint: carbonFootPrint,
  };

  res.send(data);
});
