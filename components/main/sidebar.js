"use client"

import axios from "axios"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Phone, User, MapPin, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"

export default function Sidebar({ users, selectedUser, setSelectedUser }) {
  const [phone, setPhone] = useState("")
  const [birth, setBirth] = useState("")
  const [open, setOpen] = useState(false)

  const [name, setName] = useState("")
  const [gender, setGender] = useState("")
  const [doctor, setDoctor] = useState("")

  const [createdId, setCreatedId] = useState("")
  const [createdPw, setCreatedPw] = useState("")
  const [showResultModal, setShowResultModal] = useState(false)

  const [baseDiseaseUsers, setBaseDiseaseUsers] = useState([])
  const [showBaseDiseaseModal, setShowBaseDiseaseModal] = useState(false)

  const hospitalId = "686d0480f3acacb39348df4f"

  async function hashPassword(password) {
    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
    return hashHex
  }

  const handleCreate = async () => {
    if (!name || !gender || !doctor || !phone || !birth || phone.length < 10 || birth.length !== 8) {
      alert("입력 형식을 확인해주세요.")
      return
    }
  
    const confirmed = window.confirm( "⚠️ 계정 생성후 해당 계정은 수정할 수 없습니다.\n\n이름, 전화번호, 생년월일을 정확히 입력하셨나요?\n\n한 번 생성된 계정은 수정이 불가능하니 반드시 다시 확인해주세요.")
    if (!confirmed) {
      alert("계정 생성을 취소했습니다. 입력 내용을 다시 확인해주세요.")
      return
    }
  
    const now = new Date()
    const phoneLast2 = phone.slice(-2)
    const seconds = now.getSeconds().toString().padStart(2, "0")
    const nameCode = name.charAt(0).charCodeAt(0)
    const randChars = Math.random().toString(36).slice(-3).toUpperCase()
  
    const birthMMDD = birth.slice(4)
    const patientId = `R${nameCode}${seconds}${phoneLast2}${randChars}`
    const pw_randChars = Math.random().toString(36).slice(-3).toUpperCase()
    const password = `${birthMMDD}${phoneLast2}${pw_randChars}`
  
    const hashedPassword = await hashPassword(password)
    
    try {
      const res = await axios.post("/api/auth/patient-id", {
        ID: patientId, hashedPassword, name, gender,
        phone, birth, hospitalId, doctor
      })
  
      const { success, message } = res.data
      if (success) {
        setCreatedId(patientId)
        setCreatedPw(password)
        setShowResultModal(true)
      } else {
        alert(`실패: ${message}`)
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const { status, data } = err.response
    
        if (status === 409) { alert(data.message)} else { alert(`오류: ${data.message || '알 수 없는 오류가 발생했습니다.'}`)}
      } else { alert("서버 오류가 발생했습니다.")}
    }
  }

  const resetForm = () => {
    setName("")
    setGender("")
    setDoctor("")
    setPhone("")
    setBirth("")
    setCreatedId("")
    setCreatedPw("")
    setShowResultModal(false)
    setOpen(false)
  }

  const fetchUsersWithoutBaseDisease = async () => {
    try {
      const res = await axios.get("/api/auth/patient-id")
      setBaseDiseaseUsers(res.data.users || [])
      setShowBaseDiseaseModal(true)
    } catch (err) {
      alert("데이터를 불러오는 중 오류가 발생했습니다.")
    }
  }

  const handleDeleteUser = async (userId) => {
    const confirmed = window.confirm("정말 이 환자를 삭제하시겠습니까?")
    if (!confirmed) return
  
    try {
      const res = await axios.delete(`/api/auth/patient-id?user_id=${userId}`)
      if (res.data.success) {
        alert("삭제 완료되었습니다.")
        // 삭제된 유저를 목록에서 제거
        setBaseDiseaseUsers((prev) => prev.filter((user) => user._id !== userId))
      } else {
        alert("삭제 실패: " + res.data.message)
      }
    } catch (err) {
      console.error("삭제 중 오류 발생", err)
      alert("서버 오류로 삭제에 실패했습니다.")
    }
  }

  return (
    <aside className="w-80 h-screen bg-white/90 backdrop-blur-xl border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">환자 목록</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6 p-0 text-[#4F6EFF] hover:bg-[#4F6EFF]/10"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[360px]">
              <DialogHeader>
                <DialogTitle>새 환자 생성</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">이름</Label>
                  <Input id="name" placeholder="홍길동" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>성별</Label>
                  <div className="flex gap-2">
                    {["남자", "여자"].map((v) => (
                      <Button
                        key={v}
                        type="button"
                        variant={gender === v ? "default" : "outline"}
                        className={`flex-1 ${gender === v ? "bg-[#4F6EFF] text-white hover:bg-[#3f58cc]" : ""}`}
                        onClick={() => setGender(v)}
                      >
                        {v}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor">담당 의사</Label>
                  <Input
                    id="doctor"
                    placeholder="의사 이름 입력"
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">전화번호</Label>
                  <Input id="phone" placeholder="예: 01012345678" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birth">생년월일</Label>
                  <Input id="birth" placeholder="예: 20010101" value={birth} onChange={(e) => setBirth(e.target.value)} />
                </div>
                <Button
                  className="w-full mt-2 bg-[#4F6EFF] text-white hover:bg-[#3f58cc]"
                  onClick={handleCreate}
                >
                  생성
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Button
          variant="outline"
          className="w-full text-xs text-[#4F6EFF] border-[#4F6EFF] mb-4"
          onClick={fetchUsersWithoutBaseDisease}
        >
         최초 로그인하지 않은 계정 목록
        </Button>

        <Dialog open={showBaseDiseaseModal} onOpenChange={setShowBaseDiseaseModal}>
          <DialogContent className="sm:max-w-[480px] rounded-xl shadow-lg">
            <DialogHeader className="mb-2">
              <DialogTitle className="text-lg font-semibold text-gray-800">
                 최초 로그인하지 않은 계정 목록
              </DialogTitle>
              <p className="text-sm text-gray-500 mt-1">
                아래 계정은 생성되었지만 아직 최초 로그인하지 않았습니다.<br />
                불필요한 계정은 삭제 후 다시 생성하세요.
              </p>
            </DialogHeader>

            <div className="space-y-3 max-h-[400px] overflow-y-auto px-1 pb-2">
              {baseDiseaseUsers.length === 0 ? (
                <div className="text-center text-sm text-gray-500 py-10">최초 로그인하지 않은 계정이 없습니다.</div>
              ) : (
                baseDiseaseUsers.map((user) => (
                  <div
                    key={user._id}
                    className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.gender} / {user.birth}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="px-3 py-1 text-xs font-semibold bg-red-500 hover:bg-red-600 text-white rounded-md"
                      >
                        삭제
                      </button>
                    </div>
                    <p className="text-sm text-gray-600"><strong>전화:</strong> {user.phone}</p>
                    <p className="text-xs text-gray-400">생성일: {new Date(user.registered_at).toLocaleDateString()}</p>
                  </div>
                ))
              )}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog
          open={showResultModal}
          onOpenChange={(val) => {
            if (!val) {
              const confirmed = window.confirm(
                "해당 계정 정보를 환자에게 전달하셨나요?\n\n⚠️ 보안을 위해 ID와 비밀번호는 다시 확인할 수 없습니다."
              )
              if (confirmed) {
                resetForm()
              } else {
                setShowResultModal(true) 
              }
            } else {
              setShowResultModal(true)
            }
          }}
        >
          <DialogContent className="sm:max-w-[360px]">
            <DialogHeader>
              <DialogTitle>환자 생성 완료</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 text-sm">
              <div className="bg-gray-100 border rounded p-3 text-gray-800 text-sm font-mono whitespace-pre-line">
                {`ID: ${createdId}\nPW: ${createdPw}`}
              </div>

              <Button
                className="w-full text-xs bg-[#4F6EFF] text-white hover:bg-[#3f58cc]"
                onClick={() => {
                  const content = `ID: ${createdId}\nPW: ${createdPw}`
                  navigator.clipboard.writeText(content)
                  alert("ID와 PW가 복사되었습니다.")
                }}
              >
                전체 복사하기
              </Button>
            </div>
          </DialogContent>
        </Dialog>

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
                  <AvatarFallback className="bg-[#4F6EFF] text-white text-sm">
                    {user.name.charAt(0)}
                  </AvatarFallback>
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
                    <div className="flex items-center space-x-1"><User className="w-3 h-3" /><span>{user.age}세</span></div>
                    <div className="flex items-center space-x-1"><Phone className="w-3 h-3" /><span>{user.phone}</span></div>
                    <div className="flex items-center space-x-1"><Calendar className="w-3 h-3" /><span>수술 후 {user.surgeryWeek}주 {user.surgeryDay}일</span></div>
                    <div className="flex items-center space-x-1"><MapPin className="w-3 h-3" /><span>최근 방문: {user.lastVisit}</span></div>
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
