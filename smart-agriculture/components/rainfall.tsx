'use client';

import { RainfallDataModel } from "@/app/page";
import fetchRainfallData from "@/app/services/fetchRainfallData";
import { Card, CardBody, CardHeader, CircularProgress, Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";

/**
 * 土壤分析
 */
export default function RainfallComponent() {
    const [rainfall, setRainfall] = useState<RainfallDataModel>();

    useEffect(() => {
        fetchRainfallData()
            .then(data => {
                setRainfall(data);
            })
            .catch(error => {
                console.error('Error fetching rainfall data:', error);
            });
    }, []);

    function getTomorrowDate() {
        // 獲取當前日期
        const today = new Date();

        // 計算明天的日期
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // 格式化日期為 'yyyy-MM-dd'
        const year = tomorrow.getFullYear();
        const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
        const day = tomorrow.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    return (
        <Card className="m-4 p-4">
            <CardHeader>
                <h2 className="text-2xl font-semibold">降雨預測</h2>
            </CardHeader>
            <CardBody>
                <ul>
                    <li className="leading-loose">預測時間：{getTomorrowDate()}</li>
                    <li className="leading-loose">預測雨量：{rainfall
                        ? rainfall.rain.predicted_tomorrow_rainfall + ' mm' // 假設您的數據中有一個名為 predictedRainfall 的字段
                        : <CircularProgress aria-label="Loading..." />
                    }</li>
                </ul>
            </CardBody>
        </Card>
    )
}