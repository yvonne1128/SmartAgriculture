'use client';

import { FertilizeAmountArray } from "@/app/page";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

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
export default function FertilizeComponent({ fertilizeData }: { fertilizeData: FertilizeAmountArray }) {
    const labels = fertilizeData.fertilizer_amount.map(item => item.organic_matter);
    const values = fertilizeData.fertilizer_amount.map(item => item.fertilizer_amount);

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

    const options = {
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
            <h2 className="text-xl font-semibold">施肥建議</h2>

            <br />
            
            <p className="leading-loose">建議用量請依照個元素實際用力</p>
            <p className="leading-loose">來做低、中、高的比例調整</p>

            <Bar data={chartData} options={options} />
        </div>
    )
}