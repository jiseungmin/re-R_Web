import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Save } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export default function IndependentManagement() {
    const [encouragements, setEncouragements] = useState({
      connected: {
        level1: "힘내세요!",
        level2: "거의 다왔어요!",
        level3: "목표각도 달성!",
      },
      disconnected: [
        "좋아요! 잘 하고 있어요!",
        "지금 정말 잘하고 계세요!",
        "힘내세요, 거의 다 왔어요!",
        "최고입니다, 계속 가세요!",
        "그렇죠! 바로 그렇습니다!",
      ],
    })
  
    const updateConnectedMessage = (level, value) => {
      setEncouragements((prev) => ({
        ...prev,
        connected: {
          ...prev.connected,
          [level]: value,
        },
      }))
    }
  
    const updateDisconnectedMessage = (index, value) => {
      setEncouragements((prev) => ({
        ...prev,
        disconnected: prev.disconnected.map((msg, i) => (i === index ? value : msg)),
      }))
    }
  
    const addDisconnectedMessage = () => {
      setEncouragements((prev) => ({
        ...prev,
        disconnected: [...prev.disconnected, "새로운 독려 메시지"],
      }))
    }
  
    const removeDisconnectedMessage = (index) => {
      setEncouragements((prev) => ({
        ...prev,
        disconnected: prev.disconnected.filter((_, i) => i !== index),
      }))
    }
  
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              독려 멘트 수정
            </h2>
            <p className="text-gray-500 mt-1">독려 메시지를 개별적으로 편집하세요</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl px-6 h-12 shadow-lg">
            <Save className="w-4 h-4 mr-2" />
            저장
          </Button>
        </div>
  
        <div className="grid grid-cols-2 gap-8">
          {/* 기기 연결 O */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
            <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>기기 연결 O</span>
                </div>
                <Button
                  onClick={addDisconnectedMessage}
                  size="sm"
                  variant="outline"
                  className="rounded-lg bg-transparent"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  추가
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      0°목표각도 1/3
                    </Badge>
                  </div>
                  <Input
                    value={encouragements.connected.level1}
                    onChange={(e) => updateConnectedMessage("level1", e.target.value)}
                    className="rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500/20"
                  />
                </div>
  
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                      목표각도 1/3~2/3
                    </Badge>
                  </div>
                  <Input
                    value={encouragements.connected.level2}
                    onChange={(e) => updateConnectedMessage("level2", e.target.value)}
                    className="rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500/20"
                  />
                </div>
  
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      목표각도 2/3~
                    </Badge>
                  </div>
                  <Input
                    value={encouragements.connected.level3}
                    onChange={(e) => updateConnectedMessage("level3", e.target.value)}
                    className="rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500/20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
  
          {/* 기기 연결 X */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>기기 연결 X</span>
                </div>
                <Button
                  onClick={addDisconnectedMessage}
                  size="sm"
                  variant="outline"
                  className="rounded-lg bg-transparent"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  추가
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-4">
                {encouragements.disconnected.map((message, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-700">독려 메시지 {index + 1}</Label>
                      {encouragements.disconnected.length > 1 && (
                        <Button
                          onClick={() => removeDisconnectedMessage(index)}
                          size="sm"
                          variant="ghost"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                    <Input
                      value={message}
                      onChange={(e) => updateDisconnectedMessage(index, e.target.value)}
                      className="rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500/20"
                      placeholder="독려 메시지를 입력하세요"
                    />
                  </div>
                ))}
  
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      힘들 올리기 (3-5초간격)
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    기기 연결이 되지 않은 상태에서 사용자에게 표시되는 독려 메시지입니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }