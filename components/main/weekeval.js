import {BarChart3} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Weekeval() {
  return (
    <Card className="bg-white border-gray-200 shadow-sm">
    <CardHeader className="bg-slate-600 text-white p-3">
      <CardTitle className="text-sm flex items-center space-x-1">
        <BarChart3 className="w-4 h-4" />
        <span>주차 별 평가</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="p-3">
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Input type="date" defaultValue="2025-01-15" className="text-xs h-8 flex-1 border-gray-300" />
          <Button size="sm" className="h-8 px-2 text-xs bg-[#4F6EFF] hover:bg-[#4F6EFF]/90">
            수정
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-slate-50 p-2 rounded border border-slate-200">
            <div className="font-medium mb-2">평가항목</div>
            <div className="space-y-1">
              <div>각도평가</div>
              <div>무릎각도</div>
              <div>통증평가</div>
            </div>
          </div>
          <div className="bg-slate-50 p-2 rounded border border-slate-200">
            <div className="font-medium mb-2">수행항목</div>
            <div className="space-y-1">
              <div>기록</div>
              <div>시작</div>
              <div>중간</div>
              <div>마지막</div>
            </div>
          </div>
          <div className="bg-slate-50 p-2 rounded border border-slate-200">
            <div className="font-medium mb-2">기록</div>
            <div className="space-y-1">
              <div>음식일 통증</div>
              <div>하루종 통증</div>
              <div>업무시 통증</div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
  )
}
