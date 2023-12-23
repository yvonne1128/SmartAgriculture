'use client';

import CroprecommendationsComponent from "@/components/croprecommendations";
import FertilizeComponent from "@/components/fertilize";
import CustomNavbar from "@/components/navbar"
import RainfallComponent from "@/components/rainfall";
import SoilComponent from "@/components/soil";
import { useEffect, useRef, useState } from "react";
import fetchRainfallData from "./services/fetchRainfallData";

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

export interface FertilizeAmountArrayDataModel {
  fertilizer_amounts: FertilizeAmount[];
}

interface Croprecommendations {
  no: string,
  TotalAmount: number
}

export interface CroprecommendationsArrayDataModel {
  best_selling: Croprecommendations[];
}

interface TomorrowRainfall {
  predicted_tomorrow_rainfall: number
}

export interface RainfallDataModel {
  rain: TomorrowRainfall
}

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [rainfall, setRainfall] = useState<RainfallDataModel | null>(null);

  useEffect(() => {
    fetchRainfallData()
      .then(data => {
        setRainfall(data);
      })
      .catch(error => {
        console.error('Error fetching rainfall data:', error);
      });
  }, []);
  
  return (
    <>
      <CustomNavbar/>
      
      <main className="flex min-h-screen flex-col items-center justify-between px-16 py-6">
        <div id="rainfall" className="w-full flex flex-row py-16">
          {rainfall && <RainfallComponent rainfallData={rainfall} />}
        </div>

        <div id="croprecommendations" className="w-full">
          <CroprecommendationsComponent />
        </div>

        <div className="w-full flex flex-row py-16">
          <div id="soil" className="w-full flex flex-col px-4">
            <SoilComponent />
          </div>
          
          <div id="fertilize" className="w-full flex flex-col px-4">
            <FertilizeComponent />
          </div>
        </div>
      </main>
    </>
  )
}
