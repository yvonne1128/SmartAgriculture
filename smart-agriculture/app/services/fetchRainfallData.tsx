"use client";

import { RainfallDataModel } from "../page";

export default async function fetchRainfallData() {
    const response = await fetch('/api/rainfall');  // 調整為指向本地 API 路由
    const data: RainfallDataModel = await response.json();
    return data;
}
