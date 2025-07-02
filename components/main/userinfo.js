"use client"

import { Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function UserInfo({ users, selectedUser }) {
  const user = users[selectedUser]

  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader className="bg-slate-700 text-white px-4 py-3">
        <CardTitle className="text-sm flex items-center space-x-2">
          <Users className="w-4 h-4" />
          <span>이용자정보</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 grow">
        <table className="w-full table-fixed text-[13px] border border-gray-300 leading-relaxed">
          <tbody>
            <tr className="border-b border-gray-200">
              <th className="bg-slate-100 px-3 py-4 text-left w-[20%] break-words whitespace-normal">이름</th>
              <td className="px-3 py-2 w-[30%] break-words">{user.name}</td>
              <th className="bg-slate-100 px-3 py-3 text-left w-[20%] break-words whitespace-normal">성별</th>
              <td className="px-3 py-2 w-[30%] break-words">남</td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="bg-slate-100 px-3 py-3 text-left">생년월일</th>
              <td className="px-3 py-2">0000.00.00</td>
              <th className="bg-slate-100 px-3 py-3 text-left">나이(만)</th>
              <td className="px-3 py-2">{user.age}세</td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="bg-slate-100 px-3 py-3 text-left">ID(휴대폰번호)</th>
              <td className="px-3 py-2 break-words whitespace-normal" colSpan={3}>{user.phone}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="bg-slate-100 px-3 py-3 text-left">기저질환 여부</th>
              <td className="px-3 py-2">X</td>
              <th className="bg-slate-100 px-3 py-3 text-left">무릎수술 여부</th>
              <td className="px-3 py-2 text-emerald-600">O</td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="bg-slate-100 px-3 py-3 text-left">수술날짜</th>
              <td className="px-3 py-2">2025.00.00</td>
              <th className="bg-slate-100 px-3 py-3 text-left">수술 경과일</th>
              <td className="px-3 py-2">수술 후 N주 N일차</td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="bg-slate-100 px-3 py-3 text-left">병원이름</th>
              <td className="px-3 py-2">선문병원</td>
              <th className="bg-slate-100 px-3 py-3 text-left">수술 전 ROM</th>
              <td className="px-3 py-2">000°</td>
            </tr>
            <tr>
              <th className="bg-slate-100 px-3 py-3 text-left">목표 각도</th>
              <td className="px-3 py-2">000°</td>
              <th className="bg-slate-100 px-3 py-3 text-left">최대 도달 각도</th>
              <td className="px-3 py-2">000°</td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
