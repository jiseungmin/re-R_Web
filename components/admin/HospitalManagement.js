// components/HospitalManagement.js
"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function HospitalManagement() {
  const [qrImage, setQrImage] = useState("")
  const [selectedQrImage, setSelectedQrImage] = useState("")
  const [hospitalList, setHospitalList] = useState([])
  const [selectedDoctors, setSelectedDoctors] = useState([])
  const [form, setForm] = useState({ id: "", password: "", name: "", phone: "", address: "" })

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value })
  }

  const fetchHospitalList = async () => {
    try {
      const res = await axios.get("/api/auth/hospital-id")
      if (res.data.success) setHospitalList(res.data.hospitals)
    } catch (err) {
      console.error("병원 목록 불러오기 실패", err)
    }
  }

  const handleRegister = async () => {
    if (!form.id || !form.password) return alert("아이디와 비밀번호는 필수 항목입니다.")

    const hashPassword = async (password) => {
      const encoder = new TextEncoder()
      const data = encoder.encode(password)
      const hashBuffer = await crypto.subtle.digest("SHA-256", data)
      return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('')
    }

    const confirmed = window.confirm(
      "아이디와 비밀번호를 정확히 입력하셨나요?\n\n" +
      "등록 후 입력값은 초기화되며, 다시 확인할 수 없습니다.\n\n" +
      "해당 정보(ID/비밀번호)는 병원에 반드시 전달해야 하며,\n" +
      "생성된 계정은 수정이 불가능합니다. 계속 진행할까요?"
    )
    if (!confirmed) return

    const hashedPassword = await hashPassword(form.password)
    try {
      const res = await axios.post("/api/auth/hospital-id", { ...form, password: hashedPassword })
      if (res.data.success) {
        alert("등록 성공")
        setForm({ id: "", password: "", name: "", phone: "", address: "" })
        setQrImage(res.data.qr || "")
        fetchHospitalList()
      } else alert(res.data.message)
    } catch (err) {
      console.error(err)
      alert("등록 실패")
    }
  }

  const handleDelete = async (hospitalId) => {
    if (!confirm("정말 삭제하시겠습니까?")) return
    try {
      const res = await axios.delete(`/api/auth/hospital-id?hospital_id=${hospitalId}`)
      if (res.data.success) fetchHospitalList()
      else alert("삭제 실패")
    } catch (err) {
      console.error("삭제 오류", err)
    }
  }

  const handleViewDoctors = (doctors) => {
    setSelectedDoctors(doctors || [])
  }

  const handleViewQr = async (id) => {
    try {
      const res = await axios.get(`/api/auth/twofa-verify?id=${id}`)
      if (res.data.success) setSelectedQrImage(res.data.qr)
      else alert("QR 정보를 불러오지 못했습니다.")
    } catch (err) {
      console.error("QR 로딩 실패", err)
    }
  }

  useEffect(() => {
    fetchHospitalList()
  }, [])

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>병원 등록</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label>아이디</Label><Input value={form.id} onChange={handleChange("id")} /></div>
            <div><Label>비밀번호</Label><Input value={form.password} onChange={handleChange("password")} /></div>
            <div><Label>이름</Label><Input value={form.name} onChange={handleChange("name")} /></div>
            <div><Label>전화번호</Label><Input value={form.phone} onChange={handleChange("phone")} /></div>
          </div>
          <div><Label>주소</Label><Input value={form.address} onChange={handleChange("address")} /></div>
          <div className="flex justify-end">
            <Button onClick={handleRegister} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl px-8 h-12 shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              등록
            </Button>
          </div>
          {qrImage && (
            <div className="text-center mt-6">
              <p>Google Authenticator 앱으로 QR을 스캔하세요</p>
              <img src={qrImage} className="mx-auto border p-2" />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>등록된 병원</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>이름</TableHead>
                <TableHead>전화번호</TableHead>
                <TableHead>주소</TableHead>
                <TableHead>QR</TableHead>
                <TableHead>의사</TableHead>
                <TableHead>삭제</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hospitalList.map((h) => (
                <TableRow key={h._id}>
                  <TableCell>{h.id}</TableCell>
                  <TableCell>{h.name}</TableCell>
                  <TableCell>{h.phone}</TableCell>
                  <TableCell>{h.address}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => handleViewQr(h.id)}>
                          QR 보기
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader><DialogTitle>QR 코드</DialogTitle></DialogHeader>
                        {selectedQrImage ? <img src={selectedQrImage} className="mx-auto" /> : <p>로딩 중...</p>}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon" onClick={() => handleViewDoctors(h.doctors)}>
                          <Users className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader><DialogTitle>의사 목록</DialogTitle></DialogHeader>
                        <div className="space-y-2">
                          {selectedDoctors.length > 0 ? selectedDoctors.map((doc, i) => (
                            <div key={i}>{doc}</div>
                          )) : <p>등록된 의사가 없습니다.</p>}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(h._id)}>
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
