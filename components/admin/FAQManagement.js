'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit3, X, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import axios from 'axios';

export default function FAQManagement() {
  // 1) FAQ 목록 & 정렬 순서
  const [faqs, setFaqs] = useState([]);
  // false: 최신순(desc), true: 오래된순(asc)
  const [sortAsc, setSortAsc] = useState(false);

  // 2) 페이지네이션
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // 3) 모달 / 편집 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ category: '', question: '', answer: '' });

  // 4) 마운트 시 데이터 로드
  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get('/api/faq');
        if (res.data.success) setFaqs(res.data.data);
      } catch (err) {
        console.error('Error loading FAQs:', err);
      }
    }
    load();
  }, []);

  // 5) 정렬 & 페이징 적용
  const sortedFaqs = sortAsc ? [...faqs].slice().reverse() : faqs;
  const totalPages = Math.ceil(sortedFaqs.length / pageSize);
  const pagedFaqs = sortedFaqs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function openAdd() {
    setEditing(null);
    setForm({ category: '', question: '', answer: '' });
    setIsModalOpen(true);
  }
  function openEdit(item) {
    setEditing(item);
    setForm({ category: item.category, question: item.question, answer: item.answer });
    setIsModalOpen(true);
  }
  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  // 6) 저장 로직
  async function handleSave() {
    if (editing) {
      // — 편집 모드: call PUT /api/faq
      try {
        const res = await axios.put('/api/faq', {
          id: editing._id,
          ...form
        });
        if (res.data.success) {
          // replace the updated item in state
          setFaqs(prev =>
            prev.map(f => f._id === editing._id ? res.data.data : f)
          );
        } else {
          alert('업데이트 실패: ' + res.data.error);
        }
      } catch (err) {
        console.error('Error updating FAQ:', err);
        alert('업데이트 중 오류가 발생했습니다');
      }
    } else {
      // — 신규 모드: call POST /api/faq
      try {
        const res = await axios.post('/api/faq', form);
        if (res.data.success) {
          setFaqs(prev => [res.data.data, ...prev]);
          setCurrentPage(1);
        } else {
          alert('저장 실패: ' + res.data.error);
        }
      } catch (err) {
        console.error('Error saving FAQ:', err);
        alert('저장 중 오류가 발생했습니다');
      }
    }
    setIsModalOpen(false);
  }

  return (
    <div className="space-y-8">
      {/* 헤더 + 정렬 토글 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            자주묻는 질문 관리
          </h2>
          <Button
            size="sm"
            variant="outline"
            onClick={() => { setSortAsc(sa => !sa); setCurrentPage(1); }}
            className="flex items-center space-x-1"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm">
              {sortAsc ? '오래된순' : '최신순'}
            </span>
          </Button>
        </div>
        <Button
          onClick={openAdd}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl px-6 h-12 shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          질문 추가
        </Button>
      </div>

      {/* FAQ 테이블 */}
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
              {pagedFaqs.map((item, idx) => (
                <TableRow
                  key={item._id}
                  className="hover:bg-blue-50/30 transition-colors duration-200"
                >
                  <TableCell className="font-medium text-center">
                    {(currentPage - 1) * pageSize + idx + 1}
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700 bg-yellow-50 p-2 rounded-lg border-l-4 border-yellow-400">
                        Q: {item.question}
                      </div>
                      <div className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg border border-green-200">
                        A: {item.answer}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg hover:bg-blue-50 bg-transparent"
                      onClick={() => openEdit(item)}
                    >
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

      {/* 페이지네이션 */}
      <div className="flex justify-center items-center space-x-2">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(p => p - 1)}
        >
          이전
        </Button>
        <span className="text-sm text-gray-600">
          {currentPage} / {totalPages} 페이지
        </span>
        <Button
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(p => p + 1)}
        >
          다음
        </Button>
      </div>

      {/* 추가·수정 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsModalOpen(false)}
          />
          <Card className="relative w-full max-w-lg p-6 shadow-2xl rounded-xl z-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {editing ? 'FAQ 수정' : 'FAQ 추가'}
              </h3>
              <X
                className="cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
            <div className="space-y-5">
              <div>
                <Label htmlFor="category">분류</Label>
                <Input
                  id="category"
                  value={form.category}
                  onChange={e => handleChange('category', e.target.value)}
                  placeholder="예: 건강정보"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="question">질문</Label>
                <Textarea
                  id="question"
                  value={form.question}
                  onChange={e => handleChange('question', e.target.value)}
                  placeholder="문의할 내용을 입력하세요"
                  className="mt-1 h-24"
                />
              </div>
              <div>
                <Label htmlFor="answer">답변</Label>
                <Textarea
                  id="answer"
                  value={form.answer}
                  onChange={e => handleChange('answer', e.target.value)}
                  placeholder="답변 내용을 입력하세요"
                  className="mt-1 h-32"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3 border-t pt-4">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                취소
              </Button>
              <Button onClick={handleSave}>저장</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
