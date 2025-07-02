"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Header } from "@/components/main"
import { Eye, Filter, Download } from "lucide-react"

export default function AdminPage() {
  const pathname = usePathname()
  const [selectedRows, setSelectedRows] = useState([])

  const tableData = [
    {
      id: 1,
      date: "2025.01.15",
      author: "홍길동",
      title: "다리가 잘 굽혀지지 않습니다",
      status: "답변 대기중",
      statusColor: "bg-red-100 text-red-700",
    },
    {
      id: 2,
      date: "2025.01.14",
      author: "김철수",
      title: "무릎 통증이 심합니다",
      status: "답변 대기중",
      statusColor: "bg-red-100 text-red-700",
    },
    {
      id: 3,
      date: "2025.01.13",
      author: "이영희",
      title: "어깨 결림 증상 문의",
      status: "답변 대기중",
      statusColor: "bg-red-100 text-red-700",
    },
    {
      id: 4,
      date: "2025.01.12",
      author: "박민수",
      title: "허리 디스크 관련 질문",
      status: "답변 대기중",
      statusColor: "bg-red-100 text-red-700",
    },
    {
      id: 5,
      date: "2025.01.11",
      author: "최지은",
      title: "목 디스크 치료 방법",
      status: "답변 완료",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      id: 6,
      date: "2025.01.10",
      author: "정우진",
      title: "발목 염좌 후 관리법",
      status: "답변 완료",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      id: 7,
      date: "2025.01.09",
      author: "한소영",
      title: "손목 터널 증후군 증상",
      status: "답변 완료",
      statusColor: "bg-green-100 text-green-700",
    },
  ]

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header userId="admin01" />

      {/* 탭바 */}
      <div className="bg-white border-b border-gray-200 px-6 pt-3 pb-1">
        <div className="flex space-x-8">
          <Link
            href="/main"
            className={`text-sm font-medium ${
              pathname === "/main"
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            이용정보
          </Link>
          <Link
            href="/support"
            className={`text-sm font-medium ${
              pathname === "/support"
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            고객센터
          </Link>
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="p-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-800">문의 관리</h1>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              총 {tableData.length}건
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>필터</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="w-4 h-4" />
              <span>내보내기</span>
            </button>
          </div>
        </div>

        {/* 테이블 */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="w-12 text-center px-4 py-5">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows(tableData.map((row) => row.id))
                        } else {
                          setSelectedRows([])
                        }
                      }}
                    />
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-semibold text-gray-700">날짜</th>
                  <th className="px-6 py-5 text-left text-sm font-semibold text-gray-700">작성자</th>
                  <th className="px-6 py-5 text-left text-sm font-semibold text-gray-700">제목</th>
                  <th className="px-6 py-5 text-left text-sm font-semibold text-gray-700">상태</th>
                  <th className="px-6 py-5 text-left text-sm font-semibold text-gray-700">내용확인</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tableData.map((row) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-blue-50 transition duration-200 ${
                      selectedRows.includes(row.id) ? "bg-blue-50/50" : ""
                    }`}
                  >
                    <td className="w-12 text-center px-4 py-5">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => handleRowSelect(row.id)}
                      />
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-600">{row.date}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {row.author.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{row.author}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-900 max-w-xs truncate">{row.title}</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${row.statusColor}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition duration-200 shadow-md">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm font-medium">내용확인</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 페이지네이션 */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            1–{tableData.length} of {tableData.length} 항목 표시
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              disabled
            >
              이전
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
