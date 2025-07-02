import {Download} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export default function DataExport() {
  return (
    <Card className="bg-white border-gray-200 shadow-sm">
                  <CardHeader className="bg-slate-700 text-white p-3">
                    <CardTitle className="text-sm flex items-center space-x-1">
                      <Download className="w-4 h-4" />
                      <span>데이터 추출</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="space-y-3">
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                        <div className="text-xs font-medium mb-2">수집 항목</div>
                        <div className="grid grid-cols-2 gap-1 text-xs">
                          {["회전정보", "주차평가", "각도측정", "근력운동", "상태평가", "분석데이터"].map(
                            (item, index) => (
                              <label key={index} className="flex items-center space-x-1">
                                <input type="checkbox" className="w-3 h-3" defaultChecked={index < 3} />
                                <span>{item}</span>
                              </label>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs text-gray-600 mb-1 block">시작일</label>
                          <Input type="date" className="h-6 text-xs border-gray-300" />
                        </div>
                        <div>
                          <label className="text-xs text-gray-600 mb-1 block">종료일</label>
                          <Input type="date" className="h-6 text-xs border-gray-300" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-1">
                        <Button size="sm" className="h-6 text-xs bg-emerald-600 hover:bg-emerald-700">
                          Excel
                        </Button>
                        <Button size="sm" className="h-6 text-xs bg-red-600 hover:bg-red-700">
                          PDF
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
  )
}
