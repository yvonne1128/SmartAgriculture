import { TemperatureDataModel } from "@/app/page";
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

export default function TemperatureComponent({
    temperatureData
}: {
    temperatureData: TemperatureDataModel
}) {
    const chartData = {
        labels: Object.values(temperatureData.temp).map(item => item.date),
        datasets: [
            {
                label: '溫度',
                data: Object.values(temperatureData.temp).map(item => item.predictedtemperature),
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
                    text: '日期', // X 軸的標籤
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: '°C', // Y 軸的標籤
                },
            },
        },
        responsive: true,
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl lg:text-3xl font-semibold">溫度預測</h2>
            <Line data={chartData} options={options} />
        </div>
    )
}