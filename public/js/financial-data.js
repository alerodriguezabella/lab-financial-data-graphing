const ctx = document.getElementById("myChart");
ctx.style.display = "none";

const dateFrom = document.getElementById("from");
const dateTo = document.getElementById("to");
const searchButton = document.getElementById("search");

let startDate, endDate;
let currency = "USD";

const getData = () => {
  const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`;
    axios
      .get(apiUrl)
      .then((responseFromApi) => {
        printTheChart(responseFromApi.data);
        // console.log(responseFromApi)
      })
      .catch((error) => console.log(error));
};

searchButton.addEventListener("click", function () {
  ctx.style.display = "flex";
  startDate = dateFrom.value;
  endDate = dateTo.value;
  getData();
});

function printTheChart(coinDeskData) {
  const dates = Object.keys(coinDeskData.bpi);
  const prices = dates.map((date) => coinDeskData.bpi[date]);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Bitcoin Price Index",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: prices,
      },
    ],
  };
  const config = {
    type: "line",
    data: data,
    options: {},
  };
  const myChart = new Chart(ctx, config);
}
