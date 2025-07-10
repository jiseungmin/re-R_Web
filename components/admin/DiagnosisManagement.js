'use client';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FileText, Save } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

export default function DiagnosisManagement() {
  const [form, setForm] = useState({
    defaultMessage: '',
    angleMessages: { notAchieved: '', achieving: '', achieved: '' },
    limitedExerciseMessage: '',
    weeklyMessages: {
      week1: '',
      week2to4: '',
      week4to6: {
        restingPainUnder5: '',
        movementPainOver3days: '',
        painCountUnder5: '',
        painCountOver5: '',
      },
      week6: { movementPainOver3days: '', movementPain0to2days: '' },
    },
    fearMessages: { high: '', medium: '', low: '' },
  });
  const [loading, setLoading] = useState(true);

  // 컴포넌트 마운트 시 기존 데이터 불러오기
  useEffect(() => {
    axios
      .get('/api/result-comment')
      .then(res => {
        if (res.data.success && res.data.data) {
          setForm(res.data.data);
        }
      })
      .catch(err => {
        console.error('데이터 조회 실패', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function updateField(path, value) {
    setForm(prev => {
      const next = { ...prev };
      const keys = path.split('.');
      let cur = next;
      for (let i = 0; i < keys.length - 1; i++) {
        cur[keys[i]] = { ...cur[keys[i]] };
        cur = cur[keys[i]];
      }
      cur[keys[keys.length - 1]] = value;
      return next;
    });
  }

  async function handleSave() {
    try {
      const { data } = await axios.post('/api/result-comment', form);
      if (!data.success) throw new Error(data.error || 'Unknown error');
      alert('저장되었습니다');
    } catch (err) {
      console.error(err);
      alert('저장 실패: ' + (err.response?.data?.error || err.message));
    }
  }

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            진단 결과 템플릿 관리
          </h2>
          <p className="text-gray-500 mt-1">진단 메시지를 자유롭게 수정하세요</p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl px-6 h-12 shadow-lg"
        >
          <Save className="w-4 h-4 mr-2" />
          저장
        </Button>
      </div>

      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8 space-y-10">
          <div className="grid grid-cols-2 gap-10">
            {/* LEFT COLUMN */}
            <div className="space-y-8">
              {/* 기본 문구 */}
              <div className="space-y-3">
                <Label className="text-base font-semibold text-gray-700 flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-blue-600" />
                  수술 전 기본 문구
                </Label>
                <Textarea
                  value={form.defaultMessage}
                  onChange={e => updateField('defaultMessage', e.target.value)}
                  placeholder="수술 전 기본 문구를 입력하세요"
                  className="min-h-[120px] rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>
              
              {/* 각도 문구 */}
              <div className="space-y-4">
                <Label className="text-base font-semibold text-gray-700">각도 관련 문구</Label>
                {['notAchieved', 'achieving', 'achieved'].map(key => {
                  const labels = {
                    notAchieved: '목표각도 미달',
                    achieving: '목표각도 도달',
                    achieved: '목표각도 초과달성',
                  };
                  const colors = {
                    notAchieved: 'bg-red-50 text-red-700',
                    achieving: 'bg-yellow-50 text-yellow-800',
                    achieved: 'bg-green-50 text-green-800',
                  };
                  return (
                    <div key={key} className="space-y-1">
                      <Badge variant="outline" className={`w-fit ${colors[key]}`}>
                        {labels[key]}
                      </Badge>
                      <Input
                        value={form.angleMessages[key]}
                        onChange={e => updateField(`angleMessages.${key}`, e.target.value)}
                        placeholder="문구를 입력하세요"
                        className="rounded-xl"
                      />
                    </div>
                  );
                })}
              </div>

              {/* 주차별 문구 */}
              <div className="space-y-4">
                <Label className="text-base font-semibold text-gray-700">주차별 문구</Label>
                <div className="grid grid-cols-2 gap-6">
                  {/* 1주차 */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">[1주차]</Label>
                    <Textarea
                      value={form.weeklyMessages.week1}
                      onChange={e => updateField('weeklyMessages.week1', e.target.value)}
                      placeholder="1주차 문구를 입력하세요"
                      className="rounded-xl"
                    />
                  </div>
                  {/* 2–4주차 */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">[2–4주차]</Label>
                    <Textarea
                      value={form.weeklyMessages.week2to4}
                      onChange={e => updateField('weeklyMessages.week2to4', e.target.value)}
                      placeholder="2–4주차 문구를 입력하세요"
                      className="rounded-xl"
                    />
                  </div>
                  {/* 4–6주차 */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-600">[4–6주차]</Label>
                    {[
                      ['restingPainUnder5', '휴식·움직임 통증 <5일'],
                      ['movementPainOver3days', '통증 5–7일 지속 시'],
                      ['painCountUnder5', '통증 횟수 <5일'],
                      ['painCountOver5', '통증 횟수 >5일'],
                    ].map(([key, label]) => (
                      <div key={key} className="space-y-1">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 w-fit">
                          {label}
                        </Badge>
                        <Textarea
                          value={form.weeklyMessages.week4to6[key]}
                          onChange={e => updateField(`weeklyMessages.week4to6.${key}`, e.target.value)}
                          placeholder="문구를 입력하세요"
                          className="rounded-xl"
                        />
                      </div>
                    ))}
                  </div>
                  {/* 6주차 이상 */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-600">[6주차~]</Label>
                    {[
                      ['movementPainOver3days', '통증 ≥3일', 'bg-pink-50 text-pink-700'],
                      ['movementPain0to2days', '통증 0–2일', 'bg-green-50 text-green-700'],
                    ].map(([key, label, color]) => (
                      <div key={key} className="space-y-1">
                        <Badge variant="outline" className={`w-fit px-2 ${color}`}>
                          {label}
                        </Badge>
                        <Textarea
                          value={form.weeklyMessages.week6[key]}
                          onChange={e => updateField(`weeklyMessages.week6.${key}`, e.target.value)}
                          placeholder="문구를 입력하세요"
                          className="rounded-xl"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-8">
              {/* 겁 관련 문구 */}
              <div className="space-y-6">
                <Label className="text-base font-semibold text-gray-700">겁 관련 문구</Label>
                {['high', 'medium', 'low'].map(key => {
                  const labels = { high: '겁 많음', medium: '겁 보통', low: '겁 없음' };
                  const colors = {
                    high: 'bg-yellow-50 text-yellow-700',
                    medium: 'bg-blue-50 text-blue-700',
                    low: 'bg-green-50 text-green-700',
                  };
                  return (
                    <div key={key} className="space-y-1">
                      <Badge variant="outline" className={`w-fit px-2 ${colors[key]}`}>
                        {labels[key]}
                      </Badge>
                      <Input
                        value={form.fearMessages[key]}
                        onChange={e => updateField(`fearMessages.${key}`, e.target.value)}
                        placeholder={`${labels[key]} 문구를 입력하세요`}
                        className="rounded-xl"
                      />
                    </div>
                  );
                })}
              </div>

              {/* 운동 제한 문구 */}
              <div className="space-y-3">
                <Label className="text-base font-semibold text-gray-700">운동 제한 문구</Label>
                <Textarea
                  value={form.limitedExerciseMessage}
                  onChange={e => updateField('limitedExerciseMessage', e.target.value)}
                  placeholder="운동 제한 관련 문구를 입력하세요"
                  className="min-h-[80px] rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
