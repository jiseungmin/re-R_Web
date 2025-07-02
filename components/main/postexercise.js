"use client"
import { useState } from "react"
import { Heart, Check, ChevronDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Postexercise() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [sortOpen, setSortOpen] = useState(false)
  const [selectedSort, setSelectedSort] = useState("최신 순")

  const sortOptions = ["최신 순", "오래된 순", "이상 여부 순"]

  const stateList = Array.from({ length: 9 }).map((_, i) => ({
    date: "2025.00.00",
    rom: "ROM",
    status: "근력 상태이상",
  }))

  return (
    <Card className="bg-white border border-gray-200 shadow-sm p-2">
      <CardHeader className="bg-[#4F6EFF] text-white px-5 py-3 rounded-t-md">
        <CardTitle className="text-sm flex items-center space-x-2">
          <Heart className="w-4 h-4" />
          <span>운동 후 상태평가</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-5">
        <div className="grid grid-cols-5 gap-4">
          {/* 좌측 상태 리스트 */}
          <div className="bg-gray-50 rounded-lg border border-gray-200 col-span-1 p-3 flex flex-col relative">
            {/* 드롭다운 */}
            <div
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center justify-between border px-2 py-1 rounded-md text-xs font-medium mb-3 bg-white shadow-sm cursor-pointer"
            >
              <span>{selectedSort}</span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </div>

            {sortOpen && (
              <div className="absolute top-12 left-3 z-10 w-[85%] bg-white border rounded-md shadow-md text-xs">
                {sortOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      setSelectedSort(option)
                      setSortOpen(false)
                    }}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}

            {/* 리스트 */}
            <div className="space-y-2 overflow-y-auto max-h-[400px] pr-1 custom-scrollbar">
              {stateList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`cursor-pointer border rounded-lg px-3 py-2 text-xs transition-all ${
                    selectedIndex === index
                      ? "border-[#4F6EFF] bg-blue-50"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="font-medium text-gray-900">{item.date}</div>
                  <div className="mt-0.5">
                    <span className="font-semibold text-[#3B82F6]">{item.rom}</span>{" "}
                    <span className="font-medium text-red-600">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 가운데 상태 평가 */}
          <div className="col-span-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm font-semibold text-gray-800 mb-3">상태 평가 항목</div>

            <div className="grid grid-cols-2 text-xs font-semibold text-gray-600 px-2 mb-1">
              <div>항목</div>
              <div className="text-center">상태</div>
            </div>

            <div className="space-y-1 text-xs">
              {[
                { item: "1차 통증 평가", status: "3" },
                { item: "2차 통증 평가", status: "4" },
                { item: "염좌 평가", status: "1" },
                { item: "부기 평가", status: "1" },
                { item: "종아리 통증", status: "X" },
                { item: "무릎 아래 염증", status: "X" },
                { item: "무릎 주변 발적", status: "X" },
                { item: "흉통 및 빠른 호흡", status: "X" },
                { item: "무릎 느슨함", status: "X" },
                { item: "평가진단", status: "O" },
              ].map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-2 bg-white px-3 py-2 border border-gray-100 rounded-md items-center"
                >
                  <div>{row.item}</div>
                  <div className="text-center font-medium">{row.status}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 우측 조절 항목 */}
          <div className="col-span-1 bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-5">
            <div>
              <div className="text-xs font-semibold text-gray-800 mb-2">강도 조절</div>
              {["변동 없음", "강도 낮춤", "운동 중지"].map((label) => (
                <div
                  key={label}
                  className="flex justify-between items-center text-xs border border-gray-200 rounded px-3 py-2 bg-white"
                >
                  <span>{label}</span>
                  {label === "강도 낮춤" && <Check className="w-4 h-4 text-green-600" />}
                </div>
              ))}
            </div>

            <div>
              <div className="text-xs font-semibold text-gray-800 mb-2">운동 재개</div>
              {["외래 진료 여부", "운동 재개 동의 여부", "운동 재개 여부"].map((label) => (
                <div
                  key={label}
                  className="flex justify-between items-center text-xs border border-gray-200 rounded px-3 py-2 bg-white"
                >
                  <span>{label}</span>
                  <span className="text-gray-600">X</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
