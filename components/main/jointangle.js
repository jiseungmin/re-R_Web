import { Target} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Jointangle({users, selectedUser}) {
  return (
    <Card className="bg-white border-gray-200 shadow-sm">
    <CardHeader className="bg-slate-500 text-white p-3">
      <CardTitle className="text-sm flex items-center space-x-1">
        <Target className="w-4 h-4" />
        <span>관절각도 측정 훈련</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="p-3">
      <div className="grid grid-cols-4 gap-2 mb-3 text-xs">
        <div className="text-center bg-slate-50 p-2 rounded border border-slate-200">
          <div className="text-gray-600">주차</div>
          <div className="font-bold text-lg">{users[selectedUser].surgeryWeek}</div>
        </div>
        <div className="text-center bg-slate-50 p-2 rounded border border-slate-200">
          <div className="text-gray-600">일차</div>
          <div className="font-bold text-lg">{users[selectedUser].surgeryDay}</div>
        </div>
        <div className="text-center bg-slate-50 p-2 rounded border border-slate-200">
          <div className="text-gray-600">회차</div>
          <div className="font-bold text-lg">12</div>
        </div>
        <div className="text-center bg-slate-50 p-2 rounded border border-slate-200">
          <div className="text-gray-600">각도</div>
          <div className="font-bold text-lg text-[#4F6EFF]">85°</div>
        </div>
      </div>
      <div className="space-y-2 text-xs">
        {["최고속도", "반복횟수", "유효횟수"].map((metric, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-slate-50 p-2 rounded border border-slate-200"
          >
            <span className="text-gray-700">{metric}</span>
            <div className="flex items-center space-x-2">
              <Progress value={index === 0 ? 80 : index === 1 ? 60 : 40} className="w-16 h-1" />
              <span className="text-xs font-medium w-8 text-right">{index === 0 ? 80 : index === 1 ? 60 : 40}%</span>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
  )
}
