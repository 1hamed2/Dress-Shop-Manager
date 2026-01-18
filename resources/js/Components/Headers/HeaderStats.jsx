import React from "react";

// components

import CardStats from "@/Components/Cards/CardStats";
import { formatPKR } from '@/Constrants';



export default function HeaderStats({ dailySales, lowStockCount, todaysSalesCount, monthlyIncome }) {



  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-8 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Todays Sales"
                  statTitle={
                    <span>
                      {formatPKR(dailySales)}
                      <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded-full">PKR</span>
                    </span>
                  }
                  statPercentColor="text-emerald-500"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-green-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Monthly Income"
                  statTitle={
                    <span>
                      {formatPKR(monthlyIncome)}
                      <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded-full">PKR</span>
                    </span>
                  }
                  statPercentColor="text-red-500"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-yellow-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Low Stocks"
                  statTitle={lowStockCount}
                  statPercentColor="text-orange-500"
                  statIconName="fas fa-users"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Sales Count"
                  statTitle={todaysSalesCount}
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statIconName="fas fa-percent"
                  statIconColor="bg-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
