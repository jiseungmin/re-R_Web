import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Edit3, Trash2,} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function HospitalManagement() {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              개발자 ID만 입장 가능
            </h2>
            <p className="text-gray-500 mt-1">병원 정보를 관리하고 권한을 설정하세요</p>
          </div>
        </div>
  
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
                <Label htmlFor="hospital-name" className="text-sm font-medium text-gray-700">
                  병원 이름
                </Label>
                <Input
                  id="hospital-name"
                  placeholder="병원 이름을 입력하세요"
                  className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  전화번호
                </Label>
                <Input
                  id="phone"
                  placeholder="전화번호를 입력하세요"
                  className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl px-8 h-12 shadow-lg transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              등록
            </Button>
          </CardContent>
        </Card>
  
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
            <CardTitle>등록된 병원 목록</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-100">
                  <TableHead className="font-semibold text-gray-700">병원 이름</TableHead>
                  <TableHead className="font-semibold text-gray-700">전화번호</TableHead>
                  <TableHead className="font-semibold text-gray-700">상태</TableHead>
                  <TableHead className="font-semibold text-gray-700">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3].map((i) => (
                  <TableRow key={i} className="hover:bg-blue-50/50 transition-colors duration-200">
                    <TableCell className="font-medium">선문병원</TableCell>
                    <TableCell className="text-gray-600">000-0000-0000</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                        <Edit3 className="w-3 h-3 mr-1" />
                        수정
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="destructive" size="sm" className="rounded-lg">
                        <Trash2 className="w-3 h-3 mr-1" />
                        삭제
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
  
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
            <CardTitle>권한부여</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>기관</TableHead>
                  <TableHead>이름</TableHead>
                  <TableHead>아이디</TableHead>
                  <TableHead>비밀번호</TableHead>
                  <TableHead>최종 분류</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Input placeholder="기관명" className="rounded-lg" />
                  </TableCell>
                  <TableCell>
                    <Input placeholder="이름" className="rounded-lg" />
                  </TableCell>
                  <TableCell>
                    <Input placeholder="아이디" className="rounded-lg" />
                  </TableCell>
                  <TableCell>
                    <Input type="password" placeholder="비밀번호" className="rounded-lg" />
                  </TableCell>
                  <TableCell>
                    <Select>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="개발자" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="developer">개발자</SelectItem>
                        <SelectItem value="admin">관리자</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Input placeholder="기관명" className="rounded-lg" />
                  </TableCell>
                  <TableCell>
                    <Input placeholder="이름" className="rounded-lg" />
                  </TableCell>
                  <TableCell>
                    <Input placeholder="아이디" className="rounded-lg" />
                  </TableCell>
                  <TableCell>
                    <Input type="password" placeholder="비밀번호" className="rounded-lg" />
                  </TableCell>
                  <TableCell>
                    <Select>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="병원사용자" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hospital">병원사용자</SelectItem>
                        <SelectItem value="admin">관리자</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  }