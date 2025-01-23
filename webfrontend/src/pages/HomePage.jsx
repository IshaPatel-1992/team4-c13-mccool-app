import React from "react";
import "./HomePage.css"; 
import HeroSection from '@components/HeroSection';
import QuickSearchBar from '@components/QuickSearchBar';
import FeatureSection from "../components/FeatureSection";


export default function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <QuickSearchBar />
      <FeatureSection /> 
       
    </div>
  );
}
