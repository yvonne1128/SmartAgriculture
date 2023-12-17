import FertilizeComponent from "@/components/fertilize";
import CustomNavbar from "@/components/navbar"
import SoilComponent from "@/components/soil";

export interface SoilDataModel {
  organic_matter: { value: number; threshold: number; status: string };
  P2O5: { value: number; threshold: number; status: string };
  K2O: { value: number; threshold: number; status: string };
  CaO: { value: number; threshold: number; status: string };
  MgO: { value: number; threshold: number; status: string };
}

interface FertilizeAmount {
  organic_matter: string;
  fertilizer_amount: string;
}

export interface FertilizeAmountArray {
  fertilizer_amount: FertilizeAmount[];
}

// 如果响应是一个数组
async function getSoilData() {
  const res = await fetch('http://120.110.115.130:5000/soil');
  const data: SoilDataModel = await res.json();
  console.log("SOILLLL", data)
  return data
}

async function getFertilizeData() {
  const res = await fetch('http://120.110.115.130:5000/fertilize');
  const data: FertilizeAmountArray = await res.json();
  
  return data
}

// async function getCroprecommendationsData() {
//   const res = await fetch('http://120.110.115.130:5000/fertilize');
//   const data: CroprecommendationsArray = await res.json()
//   console.log("Croprecommendations", data)

//   return data
// }

export default async function Home() {
  const soilData = await getSoilData();
  const fertilizeData = await getFertilizeData();

  return (
    <>
      <CustomNavbar />
      
      <main className="flex min-h-screen flex-col items-center justify-between px-16 py-24">
        <div className="w-full flex flex-row">
          <SoilComponent soilData={soilData} />
          <FertilizeComponent fertilizeData={fertilizeData} />
        </div>
      </main>
    </>
  )
}
