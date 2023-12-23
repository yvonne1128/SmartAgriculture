import { FertilizeAmountArrayDataModel } from "../page";

export default async function fetchFertilizeData() {
    const response = await fetch('/api/fertilize');  // 調整為指向本地 API 路由
    const data: FertilizeAmountArrayDataModel = await response.json();
    return data;
}
