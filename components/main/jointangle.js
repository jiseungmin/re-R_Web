"use client"

import { Target } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"

export default function Jointangle({ users, selectedUser }) {
  const dataRows = ["최고속도", "시간", "반복횟수", "최대각도", "유효 반복횟수"]

  return (
    <Card className="bg-white border border-gray-300 shadow-sm">
      {/* 상단 헤더 */}
      <CardHeader className="bg-slate-700 text-white px-4 py-3">
        <CardTitle className="text-base flex items-center space-x-2">
          <Target className="w-5 h-5" />
          <span>관절각도 증진 훈련</span>
        </CardTitle>
      </CardHeader>

      {/* 콘텐츠 영역 */}
      <CardContent className="p-5 space-y-5 text-sm">
        {/* 주차/일차/회차 선택 */}
        <div className="flex items-center gap-3">
          <Select>
            <SelectTrigger className="w-[80px] h-8 text-sm px-3">
              <SelectValue placeholder="n" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4].map((n) => (
                <SelectItem key={n} value={n.toString()}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>주차</span>

          <Select>
            <SelectTrigger className="w-[80px] h-8 text-sm px-3">
              <SelectValue placeholder="n" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <SelectItem key={n} value={n.toString()}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>일차</span>

          <Select>
            <SelectTrigger className="w-[80px] h-8 text-sm px-3">
              <SelectValue placeholder="n" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3].map((n) => (
                <SelectItem key={n} value={n.toString()}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>회차</span>

          <button className="ml-auto text-sm bg-gray-200 rounded px-4 py-1.5 hover:bg-gray-300">
            수정
          </button>
        </div>

        {/* 표 형태 */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-300 text-center">
            <thead className="bg-gray-100 font-semibold">
              <tr>
                <th className="border px-4 py-2 w-1/2">항목</th>
                <th className="border px-4 py-2 w-1/2">기록</th>
              </tr>
            </thead>
            <tbody>
              {dataRows.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 text-gray-800">{item}</td>
                  <td className="border px-4 py-2"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
