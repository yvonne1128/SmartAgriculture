export default async function fetchTemperatureData() {
    const response = await fetch('/api/temperature');  // 調整為指向本地 API 路由
    const data = await response.json();
    return data;
}
