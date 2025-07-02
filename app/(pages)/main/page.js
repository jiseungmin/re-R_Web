"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Header, Sidebar, Postexercise, UserInfo, Weekeval, Jointangle, Workout, Achievement, DataExport} from "@/components/main"

export default function Main() {
  const pathname = usePathname()
  const [selectedUser, setSelectedUser] = useState(0)

  const users = [
    {
      id: 1,
      name: "홍길동",
      age: 45,
      phone: "010-1234-5678",
      surgeryWeek: 3,
      surgeryDay: 5,
      status: "활성",
      progress: 87,
      lastVisit: "2025.01.15",
    },
    {
      id: 2,
      name: "김영희",
      age: 52,
      phone: "010-2345-6789",
      surgeryWeek: 2,
      surgeryDay: 3,
      status: "활성",
      progress: 72,
      lastVisit: "2025.01.14",
    },
    {
      id: 3,
      name: "박철수",
      age: 38,
      phone: "010-3456-7890",
      surgeryWeek: 5,
      surgeryDay: 2,
      status: "완료",
      progress: 95,
      lastVisit: "2025.01.13",
    },
    {
      id: 4,
      name: "이미영",
      age: 41,
      phone: "010-4567-8901",
      surgeryWeek: 1,
      surgeryDay: 7,
      status: "활성",
      progress: 45,
      lastVisit: "2025.01.16",
    },
    {
      id: 5,
      name: "정수민",
      age: 29,
      phone: "010-5678-9012",
      surgeryWeek: 4,
      surgeryDay: 1,
      status: "활성",
      progress: 78,
      lastVisit: "2025.01.12",
    },
    {
      id: 6,
      name: "최동훈",
      age: 55,
      phone: "010-6789-0123",
      surgeryWeek: 6,
      surgeryDay: 4,
      status: "완료",
      progress: 92,
      lastVisit: "2025.01.11",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* 상단 헤더 */}
      <Header userId="admin01" />

      {/* 메인 콘텐츠 */}
      <div className="flex h-[calc(100vh-48px)]">
        <Sidebar users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />

        <main className="flex-1 ">
          <div className="space-y-4">
            {/* 운동 후 상태평가 */}
            <Postexercise />

            {/* 3열 레이아웃 */}
            <div className="grid grid-cols-3 gap-4">
              <UserInfo users={users} selectedUser={selectedUser} />
              <Weekeval />
              <Jointangle users={users} selectedUser={selectedUser} />
            </div>

            {/* 2열 레이아웃 */}
            <div className="grid grid-cols-2 gap-4">
              <Workout />
              <div className="space-y-4">
                <Achievement users={users} selectedUser={selectedUser} />
                <DataExport />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
