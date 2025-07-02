import { Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Workout() {
  return (
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
                   <Progress value={60 + index * 8} className="h-1" />
                 </TableCell>
                 <TableCell className="text-xs p-1">{20 + index * 2}분</TableCell>
               </TableRow>
             ))}
           </TableBody>
         </Table>
       </div>
     </CardContent>
   </Card>
  )
}
