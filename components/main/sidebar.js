import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Phone, User, MapPin,} from "lucide-react"

export default function Sidebar({ users, selectedUser, setSelectedUser }){
  return (
    <aside className="w-80 bg-white/90 backdrop-blur-xl border-r border-gray-200 overflow-y-auto">
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">환자 목록</h2>
        <Badge className="bg-[#4F6EFF]/10 text-[#4F6EFF] border-[#4F6EFF]/20">{users.length}명</Badge>
      </div>

      <div className="space-y-2">
        {users.map((user, index) => (
          <div
            key={user.id}
            className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
              selectedUser === index
                ? "bg-[#4F6EFF]/5 border-[#4F6EFF]/30 shadow-md"
                : "bg-white border-gray-200 hover:bg-gray-50 hover:shadow-sm"
            }`}
            onClick={() => setSelectedUser(index)}
          >
            <div className="flex items-start space-x-3">
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarFallback className="bg-[#4F6EFF] text-white text-sm">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-gray-900 truncate">{user.name}</h3>
                  <Badge
                    variant={user.status === "활성" ? "default" : "secondary"}
                    className={`text-xs ${
                      user.status === "활성"
                        ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                        : "bg-gray-100 text-gray-700 border-gray-200"
                    }`}
                  >
                    {user.status}
                  </Badge>
                </div>

                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{user.age}세</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Phone className="w-3 h-3" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>
                      수술 후 {user.surgeryWeek}주 {user.surgeryDay}일
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>최근 방문: {user.lastVisit}</span>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-600">진행률</span>
                    <span className="font-medium text-gray-900">{user.progress}%</span>
                  </div>
                  <Progress value={user.progress} className="h-1.5" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </aside>
  )
}
