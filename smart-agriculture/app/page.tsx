'use client';

import CroprecommendationsComponent from "@/components/croprecommendations";
import FertilizeComponent from "@/components/fertilize";
import CustomNavbar from "@/components/navbar"
import RainfallComponent from "@/components/rainfall";
import SoilComponent from "@/components/soil";
import { useEffect, useState } from "react";
import fetchRainfallData from "./services/fetchRainfallData";
import fetchCroprecommendationsData from "./services/fetchCroprecommendationsData";
import fetchFertilizeData from "./services/fetchFertilizeData";
import fetchSoilData from "./services/fetchSoilData";
import fetchTemperatureData from "./services/fetchTemperature";
import TemperatureComponent from "@/components/temperature";

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

interface Temperatures {
  date: string,
  predictedtemperature: number
}

export interface TemperatureDataModel {
  temp: Temperatures[]
}

export const dynamic = 'force-dynamic';

export default function Home() {
  const [rainfall, setRainfall] = useState<RainfallDataModel | null>(null);
  const [soil, setSoil] = useState<SoilDataModel | null>(null);
  const [croprecommendations, setCroprecommendations] = useState<CroprecommendationsArrayDataModel | null>(null);
  const [fertilize, setFertilize] = useState<FertilizeAmountArrayDataModel | null>(null);
  const [temperature, setTemperature] = useState<TemperatureDataModel | null>(null);

  useEffect(() => {
    fetchRainfallData()
      .then(data => {
        setRainfall(data);
      })
      .catch(error => {
        console.error('Error fetching rainfall data:', error);
      });
    
    fetchCroprecommendationsData()
      .then(data => {
        setCroprecommendations(data);
      })
      .catch(error => {
        console.error('Error fetching croprecommendations data:', error);
      });
    
    fetchFertilizeData()
      .then(data => {
        setFertilize(data);
      })
      .catch(error => {
        console.error('Error fetching fertilize data:', error);
      });
    
    fetchSoilData()
      .then(data => {
        setSoil(data);
      })
      .catch(error => {
        console.error('Error fetching soil data:', error);
      });
    
    fetchTemperatureData()
      .then(data => {
        setTemperature(data);
      })
      .catch(error => {
        console.error('Error fetching temperature data:', error);
      });
  }, []);
  
  return (
    <>
      <CustomNavbar/>
      
      <main className="flex min-h-screen flex-col items-center justify-between px-4 lg:px-16 py-6">
        <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6 lg:py-16">
          {rainfall &&
            <div id="rainfall" className="col-span-1 py-4">
              <RainfallComponent rainfallData={rainfall} />
            </div>
          }
          {temperature &&
            <div id="temperature" className="col-span-1 py-4 lg:col-span-2">
              <TemperatureComponent temperatureData={temperature} />
            </div>
          }
        </div>

        <div id="croprecommendations" className="w-full grid grid-cols-1 gap-4">
          {croprecommendations &&
            <div className="col-span-1 py-4">
              <CroprecommendationsComponent croprecommendationsData={croprecommendations} />
            </div>
          }
        </div>

        <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 lg:py-16">
          <div id="soil" className="w-full col-span-1 py-4">
            {soil && <SoilComponent soilData={soil} />}
          </div>
          
          <div id="fertilize" className="w-full col-span-1 py-4">
            {fertilize && <FertilizeComponent fertilizeData={fertilize} />}
          </div>
        </div>
      </main>
    </>
  )
}
