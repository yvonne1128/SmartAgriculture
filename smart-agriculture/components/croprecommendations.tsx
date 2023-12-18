'use client';

import { CroprecommendationsArray, FertilizeAmountArray } from "@/app/page";
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
export default function CroprecommendationsComponent({ croprecommendationsData }: { croprecommendationsData: CroprecommendationsArray }) {
    const labels = croprecommendationsData.best_selling.map(item => item.no);
    const values = croprecommendationsData.best_selling.map(item => item.TotalAmount);

    const labelNames = [
        { no: 1, name: "草莓" },
        { no: 2, name: "草莓-進口" },
        { no: 3, name: "藍莓-進口" },
        { no: 4, name: "百香果-改良種" },
        { no: 5, name: "小番茄-其他" },
        { no: 6, name: "小番茄-聖女" },
        { no: 7, name: "火龍果-白肉" },
        { no: 8, name: "火龍果-紅肉" },
        { no: 9, name: "香蕉" },
        { no: 10, name: "鳳梨-金鑽鳳梨" },
        { no: 11, name: "椪柑" },
        { no: 12, name: "茂谷柑" },
        { no: 13, name: "佛利檬" },
        { no: 14, name: "椪柑-進口" },
        { no: 15, name: "甜橙-柳橙" },
        { no: 16, name: "甜橙-紅肉柳橙" },
        { no: 17, name: "雜柑-無子檸檬" },
        { no: 18, name: "花椰菜-青梗" },
        { no: 19, name: "冬瓜-白皮" },
        { no: 20, name: "絲瓜-其他" },
        { no: 21, name: "絲瓜-長絲瓜" },
        { no: 22, name: "扁蒲-花蒲" }
    ]

    const chartData = {
        labels: labels.map(labelNo => {
            // 查找与 labelNo 对应的 labelName
            const foundLabel = labelNames.find(labelName => String(labelName.no) === labelNo);
            // 如果找到了，返回其 name，否则返回空字符串或默认值
            return foundLabel ? foundLabel.name : '';
        }),
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
                    text: '作物名稱', // X 軸的標籤
                },
            },
            y: {
                title: {
                    display: true,
                    text: '總銷售額（元）', // Y 軸的標籤
                },
            },
        },
        responsive: true,
    };

    return (
        <div className="w-full flex flex-col px-4">
            <h2 className="text-xl font-semibold">作物推薦</h2>

            <br />

            <ul>
                <li className="leading-loose">1. 資料時間：112/12/14~112/12/17</li>
                <li className="leading-loose">2. 資料地點：台北地區</li>
            </ul>

            <Bar data={chartData} options={options} />
        </div>
    )
}