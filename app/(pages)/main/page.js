"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Bell, Minimize2, X, Activity, TrendingUp, Users, BarChart3, Zap, Heart, Target, Download, Calendar, Phone, User, MapPin,} from "lucide-react"

export default function Component() {
  const [selectedUser, setSelectedUser] = useState(0)
  const [exerciseProgress, setExerciseProgress] = useState([])
  const [jointMetrics, setJointMetrics] = useState([
    { progress: 0, percent: 0 },
    { progress: 0, percent: 0 },
    { progress: 0, percent: 0 },
  ])

  const users = [
    {
      id: 1,
      name: "홍길동",
      age: 45,
      phone: "010-1234-5678",
      surgeryWeek: 3,
      surgeryDay: 5,
      status: "활성",
      progress: 87,
      lastVisit: "2025.01.15",
    },
    {
      id: 2,
      name: "김영희",
      age: 52,
      phone: "010-2345-6789", 
      surgeryWeek: 2,
      surgeryDay: 3,
      status: "활성",
      progress: 72,
      lastVisit: "2025.01.14",
    },
    {
      id: 3,
      name: "박철수",
      age: 38,
      phone: "010-3456-7890",
      surgeryWeek: 5,
      surgeryDay: 2,
      status: "완료",
      progress: 95,
      lastVisit: "2025.01.13",
    },
    {
      id: 4,
      name: "이미영",
      age: 41,
      phone: "010-4567-8901",
      surgeryWeek: 1,
      surgeryDay: 7,
      status: "활성",
      progress: 45,
      lastVisit: "2025.01.16",
    },
    {
      id: 5,
      name: "정수민",
      age: 29,
      phone: "010-5678-9012",
      surgeryWeek: 4,
      surgeryDay: 1,
      status: "활성",
      progress: 78,
      lastVisit: "2025.01.12",
    },
    {
      id: 6,
      name: "최동훈",
      age: 55,
      phone: "010-6789-0123",
      surgeryWeek: 6,
      surgeryDay: 4,
      status: "완료",
      progress: 92,
      lastVisit: "2025.01.11",
    },
  ]

  useEffect(() => {
    setExerciseProgress(Array(5).fill(0).map(() => ({
      progress: Math.random() * 100,
      percent: Math.floor(Math.random() * 100)
    })))
    setJointMetrics([
      { progress: Math.random() * 100, percent: Math.floor(Math.random() * 100) },
      { progress: Math.random() * 100, percent: Math.floor(Math.random() * 100) },
      { progress: Math.random() * 100, percent: Math.floor(Math.random() * 100) },
    ])
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header with theme color */} 
      <header className="bg-[#4F6EFF] text-white px-4 py-2 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                <Activity className="w-3 h-3" />
              </div>
              <span className="font-medium text-sm">관리자 1</span>
            </div>
            <span className="text-white/40">|</span>
            <button className="hover:bg-white/10 px-2 py-1 rounded text-sm">로그아웃</button>
          </div>

          <div className="flex-1 max-w-md mx-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4" />
              <Input
                placeholder="환자검색(이름/생년월일/휴대폰번호)"
                className="pl-10 py-2 bg-white/10 border-white/20 text-white placeholder:text-white/70 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4 text-white/70" />
            <Minimize2 className="w-4 h-4 text-white/70" />
            <X className="w-4 h-4 text-white/70" />
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-48px)]">
        {/* Sidebar with neutral colors */}
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

        {/* Main content with cohesive color scheme */}
        <main className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {/* Row 1: 운동 후 상태평가 */}
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

            {/* Row 2: 3 Column Layout */}
            <div className="grid grid-cols-3 gap-4">
              {/* 이용자정보 */}
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

              {/* 주차 별 평가 */}
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

              {/* 관절각도 측정 훈련 */}
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
                          <Progress value={jointMetrics[index]?.progress || 0} className="w-16 h-1" />
                          <span className="text-xs font-medium w-8 text-right">{jointMetrics[index]?.percent || 0}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Row 3: 2 Column Layout */}
            <div className="grid grid-cols-2 gap-4">
              {/* 근력 및 전신운동 */}
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader className="bg-slate-800 text-white p-3">
                  <CardTitle className="text-sm flex items-center space-x-1">
                    <Zap className="w-4 h-4" />
                    <span>근력 및 전신운동</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <Button size="sm" className="mb-3 h-7 text-xs bg-[#4F6EFF] hover:bg-[#4F6EFF]/90">
                    수정
                  </Button>
                  <div className="bg-slate-50 rounded-lg p-2 border border-slate-200">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs p-1 h-6">n</TableHead>
                          <TableHead className="text-xs p-1 h-6">운동명</TableHead>
                          <TableHead className="text-xs p-1 h-6">진행도</TableHead>
                          <TableHead className="text-xs p-1 h-6">시간</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          "앉아서 무릎 굽히기",
                          "의자에 앉아 무릎 굽히기",
                          "세미 스쿼트",
                          "무릎 스트레칭",
                          "종아리 스트레칭",
                        ].map((exercise, index) => (
                          <TableRow key={index}>
                            <TableCell className="text-xs p-1">{index + 1}</TableCell>
                            <TableCell className="text-xs p-1">{exercise}</TableCell>
                            <TableCell className="p-1">
                              <Progress value={exerciseProgress[index]?.progress || 0} className="h-1" />
                            </TableCell>
                            <TableCell className="text-xs p-1">{exerciseProgress[index]?.percent || 0}분</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* 훈련 달성도 & 데이터 추출 */}
              <div className="space-y-4">
                {/* 훈련 달성도 */}
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

                {/* 데이터 추출 */}
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
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
