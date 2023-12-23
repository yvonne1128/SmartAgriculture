import { CroprecommendationsArrayDataModel } from "../page";

export default async function fetchCroprecommendationsData() {
    const response = await fetch('/api/croprecommendations');  // 調整為指向本地 API 路由
    const data: CroprecommendationsArrayDataModel = await response.json();
    return data;
}
