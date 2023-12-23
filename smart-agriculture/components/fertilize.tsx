'use client';

import { FertilizeAmountArrayDataModel } from "@/app/page";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions
} from 'chart.js';
import { useEffect, useState } from "react";
import fetchFertilizeData from "@/app/services/fetchFertilizeData";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

/**
 * 施肥建議
 */
export default function FertilizeComponent() {
    const [fertilize, setFertilize] = useState<FertilizeAmountArrayDataModel>();

    useEffect(() => {
        fetchFertilizeData()
            .then(data => {
                setFertilize(data);
            })
            .catch(error => {
                console.error('Error fetching fertilize data:', error);
            });
    }, []);

    const labels = fertilize
        ? fertilize.fertilizer_amounts.map(item => item.organic_matter)
        : [];
    const values = fertilize
        ? fertilize.fertilizer_amounts.map(item => item.fertilizer_amount)
        : [];
    

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: '用量',
                data: values,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                borderColor: 'rgba(53, 162, 235, 0.8)',
                borderWidth: 1
            },
        ],
    };

    const options: ChartOptions<"bar"> = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: '元素名稱', // X 軸的標籤
                },
            },
            y: {
                type: 'category',
                labels: ['Low', 'Medium', 'High'],
                title: {
                    display: true,
                    text: '建議用量', // Y 軸的標籤
                },
                reverse: true,
            },
        },
        responsive: true,
    };

    return (
        <div className="w-full flex flex-col px-4">
            <h2 className="text-3xl font-semibold">施肥建議</h2>

            <br />

            <p className="leading-loose">建議用量請依照個元素實際用力</p>
            <p className="leading-loose">來做低、中、高的比例調整</p>

            <Bar data={chartData} options={options} />
        </div>
    )
}