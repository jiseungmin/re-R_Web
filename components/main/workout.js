"use client"

import { Target } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"

export default function Jointangle({ users, selectedUser }) {
  const exerciseList = [
    "앉아서 무릎 굽히기",
    "의자에 앉아 무릎 굽히기",
    "세미 스쿼트",
    "무릎 스트레칭",
    "종아리 스트레칭",
    "수건 누르기",
    "누워서 다리들기",
    "세미 스쿼트",
    "스탭-업"
  ]

  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      {/* 헤더 */}
      <CardHeader className="bg-slate-700 text-white p-3">
        <CardTitle className="text-sm flex items-center space-x-1">
          <Target className="w-4 h-4" />
          <span>근력 및 전신운동</span>
        </CardTitle>
      </CardHeader>

      {/* 콘텐츠 */}
      <CardContent className="p-3 space-y-4 text-xs">
        {/* 상단 필터 영역 */}
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-[70px] h-7 text-xs px-2">
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
            <SelectTrigger className="w-[70px] h-7 text-xs px-2">
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
            <SelectTrigger className="w-[70px] h-7 text-xs px-2">
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

          <button className="ml-auto text-xs bg-gray-200 rounded px-3 py-1 hover:bg-gray-300">수정</button>
        </div>

        {/* 운동 테이블 */}
        <div className="overflow-x-auto">
        <table className="w-full text-xs border border-gray-300 text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-1.5 w-[10%]">n</th>
              <th className="border px-3 py-1.5">수행운동</th>
              <th className="border px-3 py-1.5 w-[20%]">수행시간</th>
              <th className="border px-3 py-1.5 w-[15%]">상태</th>
            </tr>
          </thead>
          <tbody>
            {exerciseList.map((item, index) => (
              <tr key={index}>
                <td className="border px-3 py-1.5">{index + 1}</td>
                <td className="border px-3 py-1.5 text-left">{item}</td>
                <td className="border px-3 py-1.5"></td>
                <td className="border px-3 py-1.5"></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </CardContent>
    </Card>
  )
}
