import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Search,  Activity } from "lucide-react"

export default function Header({ userId }) {
  const isAdmin = userId === "admin01"

  return (
    <header className="bg-[#4F6EFF] text-white px-4 py-2 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
              <Activity className="w-3 h-3" />
            </div>
            <span className="font-medium text-sm">{userId}</span>
          </div>
          <span className="text-white/40">|</span>
          <Link href="/auth">
          <button className="hover:bg-white/10 px-2 py-1 rounded text-sm">로그아웃</button>
          </Link>
        </div>

        <div className="flex-1 max-w-md mx-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4" />
            <Input
              placeholder="환자검색(이름/생년월일/휴대폰번호)"
              className="pl-10 py-2 bg-white/10 border-white/20 text-white placeholder:text-white/70 text-sm"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link href="/main">
            <button className="text-sm hover:bg-white/10 px-2 py-1 rounded">이용정보</button>
          </Link>
          <Link href="/support">
            <button className="text-sm hover:bg-white/10 px-2 py-1 rounded">고객센터</button>
          </Link>
          {isAdmin && (
            <Link href="/admin">
              <button className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full">
                관리자 전용
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
