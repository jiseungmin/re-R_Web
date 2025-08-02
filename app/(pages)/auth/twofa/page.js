"use client"
import axios from "axios"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"

export default function TwoFAPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get("Id")
  const [code, setCode] = useState("")

  const handleVerify = async () => {
    const res = await axios.post("/api/auth/twofa-verify", { id, token: code})

    if (res.data.success) {
      alert("2FA 인증 성공")
      router.push("/main")
    } else {
      alert(res.data.message || "인증 실패")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">2단계 인증</h1>
        <Input
          placeholder="Google Authenticator 코드"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button className="w-full" onClick={handleVerify}>
          인증하기
        </Button>
      </div>
    </div>
  )
}
