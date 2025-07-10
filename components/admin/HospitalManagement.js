"use client"

import axios from "axios"
import { useEffect, useState } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"

export default function HospitalManagement() {
  const [hospitalList, setHospitalList] = useState([])
  const [selectedDoctors, setSelectedDoctors] = useState([])
  const [form, setForm] = useState({ id: "", password: "", name: "", phone: "", address: "" })

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value })
  }

  const fetchHospitalList = async () => {
    try {
      const res = await axios.get("/api/auth/hospital-id")
      if (res.data.success) {
        setHospitalList(res.data.hospitals)
      }
    } catch (err) {
      console.error("병원 목록 불러오기 실패", err)
    }
  }

  const handleRegister = async () => {
    if (!form.id || !form.password) {
      alert("아이디와 비밀번호는 필수 항목입니다.")
      return
    }

  const hashPassword = async (password) => {
      const encoder = new TextEncoder()
      const data = encoder.encode(password)
      const hashBuffer = await crypto.subtle.digest("SHA-256", data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
      return hashHex
  }
  
  const confirmed = window.confirm(
      "아이디와 비밀번호를 정확히 입력하셨나요?\n\n" +
      "등록 후 입력값은 초기화되며, 다시 확인할 수 없습니다.\n\n" +
      "해당 정보(ID/비밀번호)는 병원에 반드시 전달해야 하며,\n" +
      "생성된 계정은 수정이 불가능합니다. 계속 진행할까요?"
    )
  
    if (!confirmed) return

    const hashedPassword = await hashPassword(form.password)
    const payload = { ...form, password: hashedPassword }
  
    try {
      const res = await axios.post("/api/auth/hospital-id", payload)
      if (res.data.success) {
        alert("등록 성공")
        setForm({ id: "", password: "", name: "", phone: "", address: "" }) // 입력 초기화
        fetchHospitalList()
      } else {
        alert(res.data.message)
      }
    } catch (err) {
      console.error(err)
      alert("등록 실패")
    }
  }

  const handleDelete = async (hospitalId) => {
    if (!confirm("정말 삭제하시겠습니까?")) return
    try {
      const res = await axios.delete(`/api/auth/hospital-id?hospital_id=${hospitalId}`)
      if (res.data.success) {
        alert("삭제 성공")
        fetchHospitalList()
      } else {
        alert("삭제 실패")
      }
    } catch (err) {
      console.error("삭제 오류", err)
      alert("삭제 실패")
    }
  }

  const handleViewDoctors = (doctors) => {
    setSelectedDoctors(doctors || [])
  }

  useEffect(() => {
    fetchHospitalList()
  }, [])

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            개발자 ID만 입장 가능
          </h2>
          <p className="text-gray-500 mt-1">병원 정보를 관리하고 권한을 설정하세요</p>
        </div>
      </div>

      {/* 병원 등록 카드 */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <Plus className="w-5 h-5 text-blue-600" />
            <span>기관 등록</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="id">병원 아이디</Label>
              <Input id="id" placeholder="아이디 입력" value={form.id} onChange={handleChange("id")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">병원 비밀번호</Label>
              <Input id="password" type="text" placeholder="비밀번호 입력" value={form.password} onChange={handleChange("password")}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">병원 이름</Label>
              <Input id="name" placeholder="병원 이름 입력" value={form.name} onChange={handleChange("name")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">전화번호</Label>
              <Input id="phone" placeholder="전화번호 입력" value={form.phone} onChange={handleChange("phone")} />
            </div>
          </div>
          <div className="space-y-2 w-full">
            <Label htmlFor="address">병원 주소</Label>
            <Input id="address" placeholder="주소 입력" value={form.address} onChange={handleChange("address")} />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleRegister} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl px-8 h-12 shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              등록
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 병원 목록 */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
          <CardTitle>등록된 병원 목록</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-100">
                <TableHead>병원 아아디</TableHead>
                <TableHead>병원 이름</TableHead>
                <TableHead>전화번호</TableHead>
                <TableHead>주소</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hospitalList.map((hospital) => (
                <TableRow key={hospital._id} className="hover:bg-blue-50/50 transition-colors duration-200">
                  <TableCell>{hospital.id}</TableCell>
                  <TableCell>{hospital.name}</TableCell>
                  <TableCell>{hospital.phone}</TableCell>
                  <TableCell>{hospital.address}</TableCell>
                  <TableCell className="flex justify-end gap-2 pr-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon" onClick={() => handleViewDoctors(hospital.doctors)}>
                          <Users className="w-4 h-4 text-green-600" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>소속 의사 목록</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                          {selectedDoctors.length > 0 ? (
                            selectedDoctors.map((doc, idx) => (
                              <div key={idx} className="border p-2 rounded bg-white">
                                <p className="font-semibold">{doc.name}</p>
                                <p className="text-sm text-gray-500">{doc.email}</p>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-gray-500">등록된 의사가 없습니다.</p>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(hospital._id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
