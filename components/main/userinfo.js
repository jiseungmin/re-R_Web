import {Users} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function UserInfo({users, selectedUser}) {
  return (
    <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader className="bg-slate-700 text-white p-3">
                  <CardTitle className="text-sm flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>이용자정보</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 p-2 rounded border border-slate-200">
                      <div className="text-gray-600">이름</div>
                      <div className="font-medium">{users[selectedUser].name}</div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded border border-slate-200">
                      <div className="text-gray-600">휴대폰</div>
                      <div className="font-medium">{users[selectedUser].phone}</div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded border border-slate-200">
                      <div className="text-gray-600">성별</div>
                      <div className="font-medium">남성</div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded border border-slate-200">
                      <div className="text-gray-600">나이</div>
                      <div className="font-medium">{users[selectedUser].age}세</div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded border border-slate-200">
                      <div className="text-gray-600">ID</div>
                      <div className="font-medium text-xs">{users[selectedUser].phone}</div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded border border-slate-200">
                      <div className="text-gray-600">수술여부</div>
                      <div className="font-medium text-emerald-600">O</div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-slate-50 p-2 rounded border border-slate-200">
                        <div className="text-gray-600">기저질환</div>
                        <div className="font-medium">X</div>
                      </div>
                      <div className="bg-slate-50 p-2 rounded border border-slate-200">
                        <div className="text-gray-600">무릎수술</div>
                        <div className="font-medium text-emerald-600">O</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
  )
}
