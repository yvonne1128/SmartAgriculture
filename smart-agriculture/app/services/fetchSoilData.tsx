"use client";

import { SoilDataModel } from "../page";

export default async function fetchSoilData() {
    const response = await fetch('/api/soil');  // 調整為指向本地 API 路由
    const data: SoilDataModel = await response.json();
    return data;
}
