import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { URL } from '../../../../common/api';
import { config } from '../../../../common/configurations';
import { Player } from '@lottiefiles/react-lottie-player';

function GraphChart() {
    const [graphData, setGraphData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${URL}/api/payment/admin/totalrevenue`, config);
            const formattedData = response.data.data.map(item => ({
                ...item,
                date: `${item.year}-${item.month.toString().padStart(2, '0')}`,
            }));
            setGraphData(formattedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Player
                autoplay
                loop
                src="https://lottie.host/9606a518-e28e-47af-b63b-26f1de6ecf13/lTWeXJsxSL.json"
                style={{ height: '125px', width: '120px' }}
            />
        );
    }

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart
                    data={graphData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="TotalRevenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default GraphChart;