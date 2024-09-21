import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { config } from '../../../../common/configurations';
import { URL } from '../../../../common/api';
import { Player } from '@lottiefiles/react-lottie-player';


// Function to generate random colors for each category
const generateColors = (length) => {
  const colors = [];
  for (let i = 0; i < length; i++) {
    colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  }
  return colors;
};

const PieCharts = () => {
  const [chartData, setChartData] = useState(null);
  const [colors, setColors] = useState([]);
  const [ loading, setLoading ] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${URL}/api/course/admin/categoryEnrollments`, config);
      console.log("🚀 ~ getData ~ response:", response);
      const data = response?.data?.data;
      setChartData(data);
      setLoading(false)
      setColors(generateColors(data.length));
    } catch (error) {
      console.error('Error fetching chart data:', error);
      setLoading(false)
    }
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      {chartData ? (
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} // Show category and percentage
              outerRadius="80%" // Adjust dynamically based on container size
              fill="#8884d8"
              dataKey="percentage"
              nameKey="category"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip /> {/* Tooltip to show details on hover */}
            <Legend /> {/* Display a legend for category names */}
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <Player
        autoplay
        loop
        src="https://lottie.host/9606a518-e28e-47af-b63b-26f1de6ecf13/lTWeXJsxSL.json"
        style={{ height: '125px', width: '120px' }}
    />
      )}
    </div>
  );
};

export default PieCharts;
