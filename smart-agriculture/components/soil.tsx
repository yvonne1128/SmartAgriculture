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
export default function SoilComponent({ soilData }: { soilData: SoilDataModel }) {
    const chartData = {
        labels: Object.keys(soilData),
        datasets: [
            {
                label: 'mg/L',
                data: Object.values(soilData).map(item => item.value),
                fill: false,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                borderColor: 'rgba(53, 162, 235, 0.8)',
            },
        ],
    };

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
            <h2 className="text-xl font-semibold">土壤分析</h2>
            <br />
            <ul>
                <li className="leading-loose">1. 當監測數值大於需要的量及無須補充</li>
                <li className="leading-loose">2. EC（電導率）單位以 mS/cm 來表示</li>
            </ul>
            <Line data={chartData} options={options} />
        </div>
    )
}