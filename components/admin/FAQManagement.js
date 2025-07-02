import { Plus, Edit3} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function FAQManagement() {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              자주묻는 질문 관리
            </h2>
            <p className="text-gray-500 mt-1">FAQ를 추가하고 관리하세요</p>
          </div>
          <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl px-6 h-12 shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            질문 추가
          </Button>
        </div>
  
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-gray-50 to-slate-50">
                  <TableHead className="w-16 font-semibold">번호</TableHead>
                  <TableHead className="w-32 font-semibold">분류</TableHead>
                  <TableHead className="font-semibold">내용</TableHead>
                  <TableHead className="w-24 font-semibold">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    id: 1,
                    category: "건강정보",
                    question: "(수술 전) 무릎 인공관절은 어떤 수술인가요?",
                    answer:
                      "관절염에서 비롯한 통증이 너무 심해 주사나 약물 등으로도 조절이 되지 않을 때, 해당 관절의 손상된 연골과 뼈를 제거하고 금속과 특수소재 인공관절물로 교체하는 수술입니다.",
                  },
                  {
                    id: 2,
                    category: "건강정보",
                    question: "(수술 전) 인공관절은 어떤 재질로 되어있나요?",
                    answer: "코발트 크롬이나 티타늄과 같은 인체에 해가 될 가능 금속을 사용합니다.",
                  },
                  {
                    id: 3,
                    category: "사용방법",
                    question: "장비가 연결이 안돼요.",
                    answer:
                      "장비 연결이 안될 시 장비 없이 측정해도 괜찮습니다. '장비 없이 수동 입력하기' 누르고 각도 측정 가이드를 참고하여 각도 입력해주시면 장비 없이 사용 가능합니다.",
                  },
                ].map((item) => (
                  <TableRow key={item.id} className="hover:bg-blue-50/30 transition-colors duration-200">
                    <TableCell className="font-medium text-center">{item.id}</TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          Q
                        </Badge>
                        <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                          A
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-3">
                        <div className="font-semibold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                          {item.category}
                        </div>
                        <div className="text-sm font-medium text-gray-700 bg-yellow-50 p-2 rounded-lg border-l-4 border-yellow-400">
                          {item.question}
                        </div>
                        <div className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg border border-green-200">
                          {item.answer}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="rounded-lg hover:bg-blue-50 bg-transparent">
                        <Edit3 className="w-3 h-3 mr-1" />
                        수정
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
  