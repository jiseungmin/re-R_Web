'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/main";
import { Eye } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const pathname = usePathname();

  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuery, setCurrentQuery] = useState(null);
  const [answer, setAnswer] = useState("");

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // loaded from API
  const [posts, setPosts] = useState([]);

  // fetch on mount
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/post");
      const json = await res.json();
      console.log('json', json)
      if (json.success) setPosts(json.data);

    }
    load();
  }, []);

  const totalPages = Math.ceil(posts.length / pageSize);
  const pagedData = posts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const getStatusClass = done =>
    done ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700";

  const openModal = row => {
    setCurrentQuery(row);
    setAnswer(row.answer);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentQuery(null);
    setAnswer("");
  };

  const handleSaveAnswer = async () => {
    // call POST API
    const res = await fetch("/api/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: currentQuery._id, answer })
    });
   
    const json = await res.json();
    console.log('json: ', json)
    if (json.success) {
      // update local list
      setPosts(posts.map(p =>
        p._id === json.data._id ? json.data : p
      ));
      closeModal();
    } else {
      alert("저장 실패: " + json.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative">
      {/* Modal */}
      {isModalOpen && currentQuery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeModal}
          />
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-xl p-6">
            <h2 className="text-xl font-semibold mb-4">문의 상세 및 답변</h2>
            <div className="mb-4">
              <h3 className="font-medium">질문:</h3>
              <p className="mt-1 text-gray-700">{currentQuery.question}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-medium">답변:</h3>
              <Textarea
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                placeholder="답변을 입력하세요"
                className="h-32"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="ghost" onClick={closeModal}>취소</Button>
              <Button onClick={handleSaveAnswer}>저장</Button>
            </div>
          </div>
        </div>
      )}

      <Header userId="admin01" />

      {/* Tabbar */}
      <div className="bg-white border-b border-gray-200 px-6 pt-3 pb-1">
        <div className="flex space-x-8">
          <Link href="/main" className={`text-sm font-medium ${pathname === "/main" ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-gray-500 hover:text-blue-600"}`}>
            이용정보
          </Link>
          <Link href="/support" className={`text-sm font-medium ${pathname === "/support" ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-gray-500 hover:text-blue-600"}`}>
            고객센터
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">문의 관리</h1>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            총 {posts.length}건
          </span>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-5 text-left text-sm font-semibold text-gray-700">등록일시</th>
                  <th className="px-6 py-5 text-left text-sm font-semibold text-gray-700">담당 의사</th>
                  <th className="px-6 py-5 text-left text-sm font-semibold text-gray-700">작성자</th>
                  <th className="px-6 py-5 text-left text-sm font-semibold text-gray-700">문의 내용</th>
                  <th className="px-6 py-5 text-left text-sm font-semibold text-gray-700">상태</th>
                  <th className="px-6 py-5 text-left text-sm font-semibold text-gray-700">내용확인</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pagedData.map(row => (
                  <tr key={row._id} className="hover:bg-blue-50 transition duration-200">
                    <td className="px-6 py-5 text-sm text-gray-600">
                      {new Date(row.createdAt).toLocaleString("ko-KR", {
                        year: "numeric", month: "2-digit", day: "2-digit",
                        hour: "2-digit", minute: "2-digit"
                      })}
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-800">{row.doctor}</td>
                    <td className="px-6 py-5 text-sm text-gray-800">{row.author.name || row.author}</td>
                    <td className="px-6 py-5 text-sm text-gray-900 max-w-xs truncate">{row.question}</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(row.status)}`}>
                        {row.status ? "답변 완료" : "답변 대기중"}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <button onClick={() => openModal(row)} className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition duration-200 shadow-md">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm font-medium">내용확인</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center space-x-2 p-4">
            <Button variant="outline" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>이전</Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button key={i+1} variant={currentPage === i+1 ? "solid" : "outline"} onClick={() => setCurrentPage(i+1)}>
                {i+1}
              </Button>
            ))}
            <Button variant="outline" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>다음</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
