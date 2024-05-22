"use client";
import { useState } from "react";

export const Tabs = ({ activeTab }: { activeTab: string }) => {
  const handleTabChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActiveTab(e.target.id);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative flex bg-secondary shadow-md p-2 rounded-xl">
        <input
          type="radio"
          id="radio-1"
          name="tabs"
          className="hidden"
          defaultChecked
        />
        <label
          htmlFor="radio-1"
          className="flex items-center justify-center z-20 h-12 w-36 text-base font-medium cursor-pointer transition-colors duration-150 ease-in"
        >
          Newest
        </label>
        <input type="radio" id="radio-2" name="tabs" className="hidden" />
        <label
          htmlFor="radio-2"
          className="flex items-center justify-center z-20 h-12 w-36 text-base font-medium cursor-pointer transition-colors duration-150 ease-in"
        >
          Popular
        </label>
        <input type="radio" id="radio-3" name="tabs" className="hidden" />
        <label
          htmlFor="radio-3"
          className="flex items-center justify-center z-20 h-12 w-36 text-base font-medium cursor-pointer transition-colors duration-150 ease-in"
        >
          Top Rated
        </label>
        <span className="glider"></span>
      </div>
    </div>
  );
};
