'use client';

import { SoilDataModel } from "@/app/page";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
} from "chart.js";
import { useEffect, useState } from "react";
import fetchSoilData from "@/app/services/fetchSoilData";
import { Skeleton } from "@nextui-org/react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

/**
 * 土壤分析
 */
export default function SoilComponent() {
    const [soil, setSoil] = useState<SoilDataModel>();

    useEffect(() => {
        fetchSoilData()
            .then(data => {
                setSoil(data);
            })
            .catch(error => {
                console.error('Error fetching soil data:', error);
            });
    }, []);

    const chartData = soil ? {
        labels: Object.keys(soil),
        datasets: [
            {
                label: 'mg/L',
                data: Object.values(soil).map(item => item.value),
                fill: false,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                borderColor: 'rgba(53, 162, 235, 0.8)',
            },
        ],
    } : null;

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: '元素名稱', // X 軸的標籤
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'mg / L', // Y 軸的標籤
                },
            },
        },
        responsive: true,
    };
    
    return (
        <div className="w-full flex flex-col px-4">
            <h2 className="text-3xl font-semibold">土壤分析</h2>
            <br />
            <ul>
                <li className="leading-loose">1. 當監測數值大於需要的量及無須補充</li>
                <li className="leading-loose">2. EC（電導率）單位以 mS/cm 來表示</li>
            </ul>
            <Skeleton isLoaded={chartData != null}>
                {chartData && <Line data={chartData} options={options} />}
            </Skeleton>
        </div>
    )
}