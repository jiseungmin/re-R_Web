"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="text-center pb-8 pt-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-8">re-R</h1>
        </CardHeader>
        <CardContent className="space-y-6 px-8 pb-12">
          <div className="space-y-2">
            <Label htmlFor="period" className="text-sm font-medium text-gray-700">
              기관
            </Label>
            <Select>
              <SelectTrigger className="w-full h-12 border-2 border-blue-200 focus:border-blue-500 rounded-md">
                <SelectValue placeholder="기관을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="id" className="text-sm font-medium text-gray-700">
              ID
            </Label>
            <Input
              id="id"
              type="text"
              className="w-full h-12 border-2 border-blue-200 focus:border-blue-500 rounded-md px-4"
              placeholder="아이디를 입력하세요"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              PW
            </Label>
            <Input
              id="password"
              type="password"
              className="w-full h-12 border-2 border-blue-200 focus:border-blue-500 rounded-md px-4"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <Button
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md mt-8 transition-colors text-xl"
            size="lg"
          >
            Log in
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
