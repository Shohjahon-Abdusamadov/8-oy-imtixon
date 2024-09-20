function generateFluctuatingData(start, timeLabels, minChange, maxChange) {
  const data = [];
  let lastValue = start;

  for (let i = 0; i < timeLabels.length; i++) {
    for (let j = 0; j < 3; j++) {
      const change =
        Math.floor(Math.random() * (maxChange - minChange + 1)) + minChange;
      lastValue += Math.random() < 0.5 ? -change : change;
      data.push(lastValue);
    }
  }

  return data;
}

const startValue = 2920000;
const timeLabels = [
  "8:45AM", "9:15AM", "9:45AM", "10:15AM", "10:45AM", "11:15AM", "11:45AM", "12:15PM",
  "12:45PM", "1:15PM", "1:45PM", "2:15PM", "2:45PM", "3:15PM", "3:45PM", "4:15PM",
  "4:45PM", "5:15PM", "5:45PM", "6:15PM", "6:45PM", "7:15PM", "7:45PM", "8:15PM",
  "8:45PM", "9:15PM", "9:45PM", "10:15PM", "10:45PM", "11:15PM", "11:45PM", "12:15AM",
  "12:45AM", "1:15AM", "1:45AM", "2:15AM", "2:45AM", "3:15AM", "3:45AM", "4:15AM",
  "4:45AM", "5:15AM", "5:45AM", "6:15AM", "6:45AM", "7:15AM", "7:45AM", "8:15AM", 
  "8:45AM"
];
const minChange = 5000;
const maxChange = 25000;

const randomData = generateFluctuatingData(startValue, timeLabels, minChange, maxChange);

const expandedLabels = timeLabels.flatMap(label => [label, label, label]);

export const data = {
  labels: expandedLabels,
  datasets: [
    {
      label: "Price 2023",
      data: randomData,
      fill: true,
      borderColor: "#42A5F5",
      tension: 0.1,
      pointRadius: 0,
      pointHoverRadius: 0,
    }
  ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Price Over Time (Fluctuations Every Time Interval)",
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Time (Hours)",
      },
    },
    y: {
      title: {
        display: true,
        text: "Price (INR)",
      },
    },
  },
};
