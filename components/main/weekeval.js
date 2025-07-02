"use client"

import { BarChart3 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Weekeval() {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader className="bg-slate-700 text-white px-4 py-2">
        <div className="flex justify-between items-center w-full">
          {/* 좌측: 제목 */}
          <CardTitle className="text-sm flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>주차 별 평가</span>
          </CardTitle>
          {/* 우측: 날짜 선택 */}
          <div className="flex items-center space-x-2">
            <Input
              type="date"
              defaultValue="2025-01-15"
              className="text-xs h-8 w-[140px] text-black bg-white rounded-sm px-2"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
          <table className="w-full text-xs border border-gray-300 table-fixed">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="border px-2 py-3 w-[25%] text-sm text-center align-middle">평가항목</th>
              <th className="border px-4 py-3 w-[35%] text-sm text-center align-middle">수집항목</th>
              <th className="border px-4 py-3 text-sm text-center align-middle">기록</th>
            </tr>
          </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1 align-top">각도평가</td>
                <td className="border px-2 py-1 align-top">무릎각도</td>
                <td className="border px-2 py-1"></td>
              </tr>
              <tr>
                <td className="border px-2 py-1 align-top" rowSpan={7}>통증평가</td>
                <td className="border px-2 py-1 align-top" rowSpan={3}>움직일 때 통증</td>
                <td className="border px-2 py-1">시작</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">중간</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">마지막</td>
              </tr>
              <tr>
                <td className="border px-2 py-1 align-top" rowSpan={3}>하루중 통증</td>
                <td className="border px-2 py-1">아침</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">점심</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">저녁</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">압박 시 통증</td>
                <td className="border px-2 py-1"></td>
              </tr>
              <tr>
                <td className="border px-2 py-1">겁평가</td>
                <td className="border px-2 py-1">겁</td>
                <td className="border px-2 py-1"></td>
              </tr>
            </tbody>
          </table>
      </CardContent>
    </Card>
  )
}
