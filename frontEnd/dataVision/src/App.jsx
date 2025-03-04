import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Ensure Bootstrap is loaded
import './App.css';
import React from 'react';
import TrendChart from './components/TrendChart';
import DoughnutChart from './components/DoughnutChart';
import LineChart from './components/LineChart';
import CombinedBarLineChart from './components/CombinedBarLineChart';
import RadarChart from './components/RadarChart';
import DoughnutChart2 from './components/DoughnutChart1';
import RadarChart2 from './components/RadarChart1';
import BarChart from './components/FloatingChart';
import HorizontalBarChart from './components/HorizontalBarChart';
import LineChart2 from './components/LineChart1';
import LineChart3 from './components/LineStylingChart';
import PieChart from './components/MultiSeriasChar';
import TrendLineChart from './components/AnimatedChart1';
import { fetchData } from "./api";


import { useEffect, useState } from "react";  // ✅ Correct



function App() {

  const [data, setData] = useState(null);

    // State for each chart
    const [barKeys, setBarKeys] = useState([]);
    const [barValues, setBarValues] = useState([]);
  
    const [trendKeys, setTrendKeys] = useState([]);
    const [trendValues, setTrendValues] = useState([]);
  
    const [donateKeys, setDonateKeys] = useState([]);
    const [donateValues, setDonateValues] = useState([]);
  
    const [animationKeys, setAnimationKeys] = useState([]);
    const [animationValues, setAnimationValues] = useState([]);

    useEffect(() => {
      async function getData() {
        const result = await fetchData(); // Call the API function
        setData(result);
      }
  
      getData();
    }, []);
  
    useEffect(() => {
      if (data) {
        // Extract bar chart data
        if (data.barchartdata) {
          const barChartEntries = Object.entries(data.barchartdata);
          setBarKeys(barChartEntries.map(entry => entry[0]));
          setBarValues(barChartEntries.map(entry => entry[1]));
        }
  
        // Extract trend chart data
        if (data.trendchartdata) {
          const trendChartEntries = Object.entries(data.trendchartdata);
          setTrendKeys(trendChartEntries.map(entry => entry[0]));
          setTrendValues(trendChartEntries.map(entry => entry[1]));
        }
  
        // Extract donate chart data
        if (data.donatechartdata) {
          const donateChartEntries = Object.entries(data.donatechartdata);
          setDonateKeys(donateChartEntries.map(entry => entry[0]));
          setDonateValues(donateChartEntries.map(entry => entry[1]));
        }
  
        // Extract animation chart data
        if (data.animationchartdata) {
          const animationChartEntries = Object.entries(data.animationchartdata);
          setAnimationKeys(animationChartEntries.map(entry => entry[0]));
          setAnimationValues(animationChartEntries.map(entry => entry[1]));
        }
      }
    }, [data]);
  

  // data?.forEach(d => console.log(d));


  return (
    <>
      <div className="overview-container">
        <div className="title">
          <h2>Dashboard Overview</h2>
        </div>

        <div className="overview-charts">
          <div className="row ow-chart">
            <div className="col-6 chart p-3">
            <LineChart keysArray={trendKeys} valuesArray={trendValues} />
            </div>

            <div className="col-5 chart p-3">
            <DoughnutChart keysArray={donateKeys} valuesArray={donateValues} />
            </div>

          </div>

          <div className="row ow-chart">
            <div className="col-6 chart p-3">
            <TrendChart keysArray={trendKeys} valuesArray={trendValues} />
            </div>

            <div className="col-5 chart p-3">
              <TrendLineChart />
            </div>

          </div>
        </div>
      </div>
      <div className="title">
        <h2>Filters</h2>
      </div>
      <div className="container mt-4">

        <div className="row">
          {/* Topic Dropdown */}
          <div className="col-md-3">
            <label htmlFor="dropdown1" className="form-label fw-bold">Topic</label>
            <select id="dropdown1" className="form-select" defaultValue="">
              <option value="gas">Gas</option>
              <option value="oil">Oil</option>
              <option value="petrol">Petrol</option>
            </select>
          </div>

          {/* Region Dropdown */}
          <div className="col-md-3">
            <label htmlFor="dropdown2" className="form-label fw-bold">Region</label>
            <select id="dropdown2" className="form-select" defaultValue="">
              <option value="asia">Asia</option>
              <option value="europe">Europe</option>
              <option value="america">America</option>
            </select>
          </div>

          {/* Date Range Dropdown */}
          <div className="col-md-3">
            <label htmlFor="dropdown3" className="form-label fw-bold">Date Range</label>
            <select id="dropdown3" className="form-select" defaultValue="">
              <option value="7days" >2025</option>
              <option value="1month">2024</option>
              <option value="3months">2023</option>
            </select>
          </div>
        </div>

      </div>

      <div className="title">
        <h2>Data Visualization(Filter based)</h2>
      </div>

      <div className="visualization-container">
        <div className="row ow-chart2">
          <div className="col-11 chart  p-3">
            <CombinedBarLineChart />
          </div>

          <div className="col-11 chart p-3">
            <RadarChart />
          </div>
          {/* <div className="col-11 chart  text-white p-3">
            <DoughnutChart2 />
          </div> */}

          <div className="col-11 chart  p-3">
            <RadarChart2 />
          </div>

          <div className="col-11 chart  p-3">
            <BarChart />
          </div>
          <div className="col-11 chart  p-3">
            <HorizontalBarChart />
          </div>

          {/* <div className="col-11 chart  p-3">
            <LineChart2 />
          </div>

          <div className="col-11 chart  p-3">
            <PieChart />
          </div>

          <div className="col-11 chart  p-3">
            <TrendLineChart />
          </div> */}
          <div className="col-11 chart1  p-3">
            <PieChart />
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
