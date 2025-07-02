
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart} from "lucide-react"

export default function Postexercise() {
  return (
    <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader className="bg-[#4F6EFF] text-white p-3">
                <CardTitle className="text-sm flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>운동 후 상태평가</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-4 gap-4">
                  {/* 최신 순 */}
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div className="text-sm font-medium text-gray-800 mb-3">최신 순</div>
                    <div className="space-y-2">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="flex justify-between items-center text-xs">
                          <span>2025.01.{15 + item}</span>
                          <Badge className="bg-red-100 text-red-700 border-red-200 text-xs px-1 py-0">상태이상</Badge>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 space-y-1">
                      <Button size="sm" className="w-full h-7 text-xs bg-[#4F6EFF] hover:bg-[#4F6EFF]/90">
                        1차평가
                      </Button>
                      <Button size="sm" className="w-full h-7 text-xs bg-slate-600 hover:bg-slate-700">
                        2차평가
                      </Button>
                      <Button size="sm" variant="outline" className="w-full h-7 text-xs border-gray-300">
                        편집
                      </Button>
                    </div>
                  </div>

                  {/* 상태 평가 테이블 */}
                  <div className="col-span-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="text-sm font-medium text-gray-800 mb-3">상태 평가 항목</div>
                    <div className="grid grid-cols-3 gap-1 text-xs font-medium text-gray-700 mb-2">
                      <span>항목</span>
                      <span>상태</span>
                      <span>조절</span>
                    </div>
                    <div className="space-y-1 text-xs">
                      {[
                        { item: "통증 평가", status: "3", adjust: "변동 없음", color: "emerald" },
                        { item: "통증 평가", status: "4", adjust: "각도 낮음", color: "amber" },
                        { item: "염좌 평가", status: "1", adjust: "운동 중지", color: "red" },
                        { item: "부기 평가", status: "1", adjust: "운동 재개", color: "emerald" },
                        { item: "종아리 통증", status: "X", adjust: "외부 진료 여부", color: "gray" },
                        { item: "무릎 아래 염증", status: "X", adjust: "운동 세기 등의 여부", color: "gray" },
                        { item: "상태이상", status: "O", adjust: "상태이상", color: "red" },
                        { item: "평가진단", status: "O", adjust: "해당 진료 여부", color: "gray" },
                      ].map((row, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-3 gap-1 py-1 bg-white rounded px-2 border border-gray-100"
                        >
                          <div className="truncate">{row.item}</div>
                          <div className="font-medium text-center">{row.status}</div>
                          <div className="flex items-center space-x-1">
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${
                                row.color === "emerald"
                                  ? "bg-emerald-500"
                                  : row.color === "amber"
                                    ? "bg-amber-500"
                                    : row.color === "red"
                                      ? "bg-red-500"
                                      : "bg-gray-400"
                              }`}
                            ></div>
                            <span className="truncate">{row.adjust}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
  )
}
