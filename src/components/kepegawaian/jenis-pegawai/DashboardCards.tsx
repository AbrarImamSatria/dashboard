import React from "react";
import { ReactElement } from "react";

interface CardItem {
  label: string;
  value: string;
  icon: ReactElement;
}

interface DashboardCardsProps {
  cardData: CardItem[];
  columns?: number;
}

const DashboardCards = ({ cardData, columns = 4 }: DashboardCardsProps) => {
  const gridCols = columns === 3 
    ? "grid-cols-1 sm:grid-cols-3" 
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className={`grid ${gridCols} gap-4`}>
      {cardData.map((item) => (
        <div
          key={item.label}
          className="border border-gray-200 rounded-lg p-4 bg-white shadow-md flex flex-col items-center justify-center h-24"
        >
          <div className="flex items-center justify-center">
            <div className="mr-3">{item.icon}</div>
            <div className="flex flex-col items-center">
              <div className="text-sm text-gray-600 text-center">
                {item.label}
              </div>
              <div className="text-xl font-bold text-center">
                {item.value}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
