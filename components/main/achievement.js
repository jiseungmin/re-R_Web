import {TrendingUp} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Achievement({users, selectedUser}) {
  return (
    <Card className="bg-white border-gray-200 shadow-sm">
    <CardHeader className="bg-[#4F6EFF] text-white p-3">
      <CardTitle className="text-sm flex items-center space-x-1">
        <TrendingUp className="w-4 h-4" />
        <span>훈련 달성도</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="p-3">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-[#4F6EFF] flex items-center justify-center">
            <div className="text-sm font-bold text-white">{users[selectedUser].progress}%</div>
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-xs">
            🏆
          </div>
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-800 mb-2">전체 달성도</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-emerald-50 p-2 rounded text-center border border-emerald-200">
              <div className="text-gray-600">주간</div>
              <div className="font-bold text-emerald-600">95%</div>
            </div>
            <div className="bg-slate-50 p-2 rounded text-center border border-slate-200">
              <div className="text-gray-600">월간</div>
              <div className="font-bold text-slate-600">82%</div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
  )
}
