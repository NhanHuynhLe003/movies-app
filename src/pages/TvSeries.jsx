import React from "react";
import MainLayout from "../layouts/MainLayout";
import { useLocation } from "react-router-dom";
export default function TvSeries() {
  const location = useLocation();
  return (
    <MainLayout paramUrl={location.pathname}>
      <h1>TV Series Updating</h1>
    </MainLayout>
  );
}
