import Splide from "@splidejs/splide";
import Chart from "chart.js/auto";

const moreBtn = document.querySelector(".dashboard__btn-more");
const dashboardHead = document.querySelector(".dashboard__head");
const sidebar = document.querySelector(".dashboard__aside");
const analytics = document.getElementById("analyticsChart").getContext("2d");
const indicatorChart = document
  .getElementById("indicatorChart")
  .getContext("2d");
const myChart = new Chart(analytics, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [5120, 3245, 2472, 3120],
        backgroundColor: ["#A7E0DA", "#FBEBB8", "#E1F8FF", "#99CCC7"],
      },
    ],
  },
  options: {
    onHover: function (e) {
      const points = this.getElementsAtEventForMode(
        e,
        "index",
        { axis: "x", intersect: true },
        false
      );

      if (points.length) e.native.target.style.cursor = "pointer";
      else e.native.target.style.cursor = "default";
    },
  },
});
const myStatsChart = new Chart(indicatorChart, {
  type: "bar",
  data: {
    labels: ["June", "July", "August", "September", "October", "November"],
    datasets: [
      {
        label: "Income",
        data: [60000, 80000, 50000, 150000, 11000, 50000],
        backgroundColor: [
          "rgba(167, 224, 218, 0.4)",
          "rgba(167, 224, 218, 0.4)",
          "rgba(167, 224, 218, 0.4)",
          "#A7E0DA",
          "rgba(167, 224, 218, 0.4)",
          "rgba(167, 224, 218, 0.4)",
        ],
        borderWidth: 0,
        borderRadius: 8,
        barThickness: 36,
        borderSkipped: false,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "rgba(255, 255, 255, 0.8)",
          font: {
            size: 13,
            weight: 700,
            family: "Space Grotesk",
          },
          callback: function (value, index, values) {
            // return Number((value / 1000).toString()) + "K";
            let result = value;

            if (value >= 1000) {
              result = Number(value / 1000) + "K";
            }

            return result;
          },
        },
      },

      x: {
        categoryPercentage: 1.0,
        barPercentage: 1.0,
        ticks: {
          color: "rgba(255, 255, 255, 0.8)",
          font: {
            size: 12,
            family: "Space Grotesk",
            weight: 700,
          },
        },
        time: {
          unit: "month",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(167, 224, 218, 0.6)",
        displayColors: false,
        titleFont: {
          family: "Space Grotesk",
        },
        bodyFont: {
          family: "Space Grotesk",
        },
        callbacks: {},
      },
    },
    onHover: function (e) {
      const points = this.getElementsAtEventForMode(
        e,
        "index",
        { axis: "x", intersect: true },
        false
      );

      if (points.length) e.native.target.style.cursor = "pointer";
      else e.native.target.style.cursor = "default";
    },
  },
});

if (document.querySelector(".dashboard__map")) {
  const mapBlock = document.querySelector(".dashboard__map");
  mapBlock.addEventListener("mouseover", (e) => {
    if (e.target.matches("[data-target]")) {
      const self = e.target;
      self.addEventListener("mouseenter", (e) => {
        const index = self.dataset.target;
        if (index) {
          mapBlock
            .querySelector(`[data-location=${index}]`)
            .classList.add("active");
        }
      });
      self.addEventListener("mouseleave", (e) => {
        const index = self.dataset.target;
        if (index) {
          mapBlock
            .querySelector(`[data-location=${index}]`)
            .classList.remove("active");
        }
      });
    }
  });
}

dashboardHead.addEventListener("click", (e) => {
  if (e.target.classList.contains("dashboard__btn-more")) {
    console.log(1);
    sidebar.classList.toggle("active");
    moreBtn.classList.toggle("active");
  }
});

new Splide(".dashboard__indicators-wrapper", {
  arrows: false,
  pagination: false,
  perPage: 3,
  perMove: 3,
  type: "loop",
  breakpoints: {
    576: {
      perPage: 2,
      gap: "10px",
    },
  },
}).mount();
