import React from "react";

// components

import AdminNavbar from "@/Components/Navbars/AdminNavbar";
import Sidebar from "@/Components/Sidebar/Sidebar";
import HeaderStats from "@/Components/Headers/HeaderStats";
import FooterAdmin from "@/Components/Footers/FooterAdmin";
import { usePage } from "@inertiajs/react";

// views



export default function Admin({ children }) {


    const { dailySales, lowStockCount, todaysSalesCount, monthlyIncome } = usePage().props;

    const user = usePage().props.auth?.user;



    console.log("Admin Layout User:", user);
    return (

        <>
            <Sidebar />

            <div className="relative md:ml-64 bg-blueGray-100">
                <AdminNavbar />
                {/* Header */}
                <HeaderStats dailySales={dailySales} lowStockCount={lowStockCount}
                    todaysSalesCount={todaysSalesCount} monthlyIncome={monthlyIncome}
                />

                {children}
                <div className="px-4 md:px-10 mx-auto w-full">

                    <FooterAdmin />
                </div>
            </div>

        </>
    );
}
