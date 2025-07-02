"use client"
import { TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"

export default function Achievement({ users, selectedUser }) {
  const percent = users[selectedUser]?.progress ?? 0

  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader className="bg-slate-700 text-white p-3 border-b border-gray-200">
        <CardTitle className="text-sm flex items-center space-x-1">
          <TrendingUp className="w-4 h-4" />
          <span>훈련 달성도</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-3 space-y-4">
        {/* 주차 / 일차 선택 */}
        <div className="flex items-center gap-2 text-sm">
          <Select>
            <SelectTrigger className="w-[70px] h-8 text-xs px-2 border">
              <SelectValue placeholder="n" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4].map((n) => (
                <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>주차</span>

          <Select>
            <SelectTrigger className="w-[70px] h-8 text-xs px-2 border">
              <SelectValue placeholder="n" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>일차</span>
        </div>

        {/* 달성도 바 */}
        <div className="text-sm border border-gray-300">
          <div className="flex h-10">
            <div className="w-[100px] flex items-center justify-center border-r border-gray-300 bg-white font-medium">
              달성도
            </div>
            <div className="flex-1 relative bg-gray-100">
              <div
                className="absolute top-0 left-0 h-full bg-blue-300 transition-all"
                style={{ width: `${percent}%` }}
              />
              <div className="relative z-10 flex items-center justify-center h-full text-black font-bold">
                {percent}%
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
