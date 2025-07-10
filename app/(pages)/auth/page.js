"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import axios from "axios"

export default function LoginPage() {
  const router = useRouter()
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    if (!id || !password) {
      alert("ID와 비밀번호를 모두 입력해주세요.")
      return
    }
  
    try {
      const hashedPassword = await hashPassword(password)
  
      const res = await axios.post("/api/auth/signin", {
        id,
        password: hashedPassword, // 해시된 비밀번호 전송
      })
  
      if (res.data.success) {
        alert("로그인 성공")
        router.push("/main")
      } else {
        alert(res.data.message || "로그인 실패")
      }
    } catch (err) {
      console.error("로그인 에러:", err)
      alert("서버 오류로 로그인에 실패했습니다.")
    }
  }

  const hashPassword = async (password) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    return hashHex
}

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="text-center pb-8 pt-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-8">re-R</h1>
        </CardHeader>
        <CardContent className="space-y-6 px-8 pb-12">
          <div className="space-y-2">
            <Label htmlFor="id" className="text-sm font-medium text-gray-700">ID</Label>
            <Input id="id" value={id} onChange={(e) => setId(e.target.value)} placeholder="아이디를 입력하세요" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">PW</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호를 입력하세요" />
          </div>

          <Button
            onClick={handleLogin}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md mt-8 text-xl"
          >
            Log in
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
