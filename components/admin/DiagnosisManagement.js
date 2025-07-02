import { FileText, Save } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function DiagnosisManagement() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            진단 결과 수정
          </h2>
          <p className="text-gray-500 mt-1">진단 메시지 템플릿을 관리하세요</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl px-6 h-12 shadow-lg">
          <Save className="w-4 h-4 mr-2" />
          저장
        </Button>
      </div>

      {/* Card Content */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8 space-y-10">
          <div className="grid grid-cols-2 gap-10">
            {/* 왼쪽 열 */}
            <div className="space-y-8">
              {/* 수술 전 기본 문구 */}
              <div className="space-y-3">
                <Label className="text-base font-semibold text-gray-700 flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-blue-600" />
                  수술 전 기본 문구
                </Label>
                <Textarea
                  className="min-h-[120px] rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  placeholder="수술 전 기본 문구를 입력하세요"
                />
              </div>

              {/* 각도 관련 문구 */}
              <div className="space-y-4">
                <Label className="text-base font-semibold text-gray-700">각도 관련 문구</Label>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <Badge variant="outline" className="w-fit bg-red-50 text-red-700">목표각도 미달</Badge>
                    <Input
                      defaultValue="이번주 목표각도는 00도 입니다. 조금만 더하면 달성 할 수 있어요!"
                      placeholder="문구를 입력하세요"
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-1">
                    <Badge variant="outline" className="w-fit bg-yellow-50 text-yellow-800">목표각도 도달</Badge>
                    <Input
                      defaultValue="이번주 목표각도 00º을 도달하셨네요! 우리 조금 더 굽혀볼까요?"
                      placeholder="문구를 입력하세요"
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-1">
                    <Badge variant="outline" className="w-fit bg-green-50 text-green-800">목표각도 초과달성</Badge>
                    <Input
                      defaultValue="이번주 목표각도 00º를 이미 달성하셨어요! 잘하고 계십니다."
                      placeholder="문구를 입력하세요"
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* 주차별 문구 */}
              <div className="space-y-4">
                <Label className="text-base font-semibold text-gray-700">주차별 문구</Label>

                <div className="grid grid-cols-2 gap-6">
                  {/* 1주차 */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">[1주차]</Label>
                    <Textarea placeholder="1주차 문구를 입력하세요" className="rounded-xl" />
                  </div>

                  {/* 2–4주차 */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">[2–4주차]</Label>
                    <Textarea placeholder="2–4주차 문구를 입력하세요" className="rounded-xl" />
                  </div>

                  {/* 4–6주차 */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-600">[4–6주차]</Label>
                    <div className="space-y-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 w-fit">Movement/Resting Pain 모두 &lt; 5일</Badge>
                      <Textarea placeholder="문구 입력" className="rounded-xl" />

                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 w-fit">항목 중 1개 5–7일 (감소했을 때)</Badge>
                      <Textarea placeholder="문구 입력" className="rounded-xl" />

                      <Badge variant="outline" className="bg-red-50 text-red-700 w-fit">항목 중 1개 5–7일 (증가했을 때)</Badge>
                      <Textarea placeholder="문구 입력" className="rounded-xl" />
                    </div>
                  </div>

                  {/* 6주차 이후 */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-600">[6주차~]</Label>
                    <div className="space-y-2">
                      <Badge variant="outline" className="bg-pink-50 text-pink-700 w-fit">Movement Pain ≥ 3일</Badge>
                      <Textarea placeholder="문구 입력" className="rounded-xl" />

                      <Badge variant="outline" className="bg-green-50 text-green-700 w-fit">Movement Pain 0, 1, 2일</Badge>
                      <Textarea placeholder="문구 입력" className="rounded-xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽 열 */}
            <div className="space-y-8">
              {/* 겁 관련 문구 */}
              <div className="space-y-6">
                <Label className="text-base font-semibold text-gray-700">겁 관련 문구</Label>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Badge variant="outline" className="w-fit px-2 bg-yellow-50 text-yellow-700">겁 많다</Badge>
                    <Input placeholder="겁 많다 - 결과 문구를 입력하세요" className="rounded-xl" />
                  </div>
                  <div className="space-y-1">
                    <Badge variant="outline" className="w-fit px-2 bg-blue-50 text-blue-700">겁 중간</Badge>
                    <Input placeholder="겁 중간 - 결과 문구를 입력하세요" className="rounded-xl" />
                  </div>
                  <div className="space-y-1">
                    <Badge variant="outline" className="w-fit px-2 bg-green-50 text-green-700">겁 없다</Badge>
                    <Input placeholder="겁 없다 - 결과 문구를 입력하세요" className="rounded-xl" />
                  </div>
                </div>
              </div>

              {/* 운동 제한 문구 */}
              <div className="space-y-3">
                <Label className="text-base font-semibold text-gray-700">운동제한 문구</Label>
                <Textarea
                  className="min-h-[80px] rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  placeholder="운동제한 관련 문구를 입력하세요"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}