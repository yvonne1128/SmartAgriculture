'use client';

import { RainfallDataModel } from "@/app/page";
import { Card, CardBody, CardHeader, CircularProgress } from "@nextui-org/react";
import rainfallAnimation from "@/public/rainfall.json"
import Lottie from "lottie-react";

export const dynamic = 'force-dynamic';

/**
 * 土壤分析
 */
export default function RainfallComponent({ rainfallData }: { rainfallData: RainfallDataModel }) {
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
        <Card className="w-full p-4 lg:w-fit">
            <CardHeader>
                <h2 className="text-2xl lg:text-3xl font-semibold">降雨預測</h2>
            </CardHeader>
            <CardBody>
                <ul>
                    <li className="leading-loose">預測時間：{getTomorrowDate()}</li>
                    <li className="leading-loose">預測雨量：{rainfallData
                        ? rainfallData.rain.predicted_tomorrow_rainfall + ' mm' // 假設您的數據中有一個名為 predictedRainfall 的字段
                        : <CircularProgress aria-label="Loading..." />
                    }</li>
                </ul>
                <Lottie
                    animationData={rainfallAnimation}
                />
            </CardBody>
        </Card>
    )
}