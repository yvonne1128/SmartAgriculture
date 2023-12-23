'use client';

import CroprecommendationsComponent from "@/components/croprecommendations";
import FertilizeComponent from "@/components/fertilize";
import CustomNavbar from "@/components/navbar"
import RainfallComponent from "@/components/rainfall";
import SoilComponent from "@/components/soil";
import { useEffect, useRef, useState } from "react";

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

export default async function Home() {
  const [activeSection, setActiveSection] = useState('');

  const sectionRefs = {
    'croprecommendations': useRef(null),
    'soil': useRef(null),
    'fertilize': useRef(null),
    'temperature': useRef(null),
    'rainfall': useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 }); // 配置 observer 的選項，例如何時視為可見

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);
  
  return (
    <>
      <CustomNavbar activeSection={activeSection}/>
      
      <main className="flex min-h-screen flex-col items-center justify-between px-16 py-6">
        <div id="rainfall" className="w-full flex flex-row py-16">
          <RainfallComponent />
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
