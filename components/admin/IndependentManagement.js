'use client';

import axios from "axios";
import { Save } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function IndependentManagement() {
  const [encouragements, setEncouragements] = useState({
    connected: { level1: "", level2: "", level3: "" },
    disconnected: []
  });
  const [loading, setLoading] = useState(true);

  // 1) 초기 데이터 불러오기
  useEffect(() => {
    axios.get("/api/encouragement")
      .then(res => {
        if (res.data.success && res.data.data) {
          const { deviceUsage, noDevice } = res.data.data;
          setEncouragements({
            connected: {
              level1: deviceUsage[0]?.comment || "",
              level2: deviceUsage[1]?.comment || "",
              level3: deviceUsage[2]?.comment || ""
            },
            disconnected: noDevice.map(item => item.comment)
          });
        }
      })
      .catch(err => console.error("불러오기 실패:", err))
      .finally(() => setLoading(false));
  }, []);

  const updateConnectedMessage = (level, value) => {
    setEncouragements(prev => ({
      ...prev,
      connected: { ...prev.connected, [level]: value }
    }));
  };

  const updateDisconnectedMessage = (index, value) => {
    setEncouragements(prev => ({
      ...prev,
      disconnected: prev.disconnected.map((msg, i) => i === index ? value : msg)
    }));
  };

  const addDisconnectedMessage = () => {
    setEncouragements(prev => ({
      ...prev,
      disconnected: [...prev.disconnected, ""]
    }));
  };

  const removeDisconnectedMessage = (index) => {
    setEncouragements(prev => ({
      ...prev,
      disconnected: prev.disconnected.filter((_, i) => i !== index)
    }));
  };

  // 2) 저장 처리
  const handleSave = async () => {
    const labels = [
      { stage: 1, angleRange: "0°목표각도 1/3" },
      { stage: 2, angleRange: "목표각도 1/3~2/3" },
      { stage: 3, angleRange: "목표각도 2/3~" }
    ];
    const payload = {
      deviceUsage: labels.map((lbl, i) => ({
        ...lbl,
        comment: encouragements.connected[`level${i + 1}`] || ""
      })),
      noDevice: encouragements.disconnected.map(c => ({ comment: c || "" }))
    };

    try {
      const res = await axios.post("/api/encouragement", payload);
      if (!res.data.success) throw new Error(res.data.error);
      alert("저장되었습니다!");
    } catch (err) {
      console.error("저장 실패:", err);
      alert("저장 실패: " + err.message);
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            독려 멘트 수정
          </h2>
          <p className="text-gray-500 mt-1">독려 메시지를 개별적으로 편집하세요</p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl px-6 h-12 shadow-lg"
        >
          <Save className="w-4 h-4 mr-2" />
          저장
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* 기기 연결 O */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span>기기 연결 O</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {["level1", "level2", "level3"].map((lvl, i) => {
              const labels = [
                "0°목표각도 1/3",
                "목표각도 1/3~2/3",
                "목표각도 2/3~"
              ];
              const colors = [
                "bg-blue-50 text-blue-700",
                "bg-yellow-50 text-yellow-800",
                "bg-green-50 text-green-700"
              ];
              return (
                <div key={lvl} className="space-y-2">
                  <Badge variant="outline" className={`w-fit ${colors[i]}`}>
                    {labels[i]}
                  </Badge>
                  <Input
                    value={encouragements.connected[lvl]}
                    onChange={e => updateConnectedMessage(lvl, e.target.value)}
                    className="rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500/20"
                  />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* 기기 연결 X */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                <span>기기 연결 X</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {encouragements.disconnected.map((msg, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-700">
                    독려 메시지 {idx + 1}
                  </Label>
                </div>
                <Input
                  value={msg}
                  onChange={e => updateDisconnectedMessage(idx, e.target.value)}
                  className="rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500/20"
                  placeholder="독려 메시지를 입력하세요"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
