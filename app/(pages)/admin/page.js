"use client"

import { useState } from "react"
import { Header } from "@/components/main"
import { AdminSideBar, FAQManagement, HospitalManagement, DiagnosisManagement, IndependentManagement} from "@/components/admin"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("hospital")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <Header userId="admin01" />

      <div className="flex">
        {/* Sidebar */}
        <AdminSideBar activeTab={activeTab} setActiveTab={setActiveTab}/>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === "hospital" && <HospitalManagement />}
          {activeTab === "faq" && <FAQManagement />}
          {activeTab === "diagnosis" && <DiagnosisManagement />}
          {activeTab === "independent" && <IndependentManagement />}
        </main>
      </div>
    </div>
  )
}