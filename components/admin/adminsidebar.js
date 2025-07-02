import { Button } from "@/components/ui/button"
import { Users, FileText, Stethoscope, MessageSquare} from "lucide-react"

export default function AdminSideBar({activeTab, setActiveTab}){
  return (
    <aside className="w-72 bg-white/80 backdrop-blur-sm shadow-xl border-r border-gray-200/50 min-h-screen">
    <nav className="p-6">
      <div className="space-y-3">
        <Button
          variant={activeTab === "hospital" ? "default" : "ghost"}
          className={`w-full justify-start h-12 rounded-xl transition-all duration-300 ${
            activeTab === "hospital"
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
              : "hover:bg-blue-50 text-gray-700"
          }`}
          onClick={() => setActiveTab("hospital")}
        >
          <Users className="w-5 h-5 mr-3" />
          병원 관리
        </Button>
        <Button
          variant={activeTab === "faq" ? "default" : "ghost"}
          className={`w-full justify-start h-12 rounded-xl transition-all duration-300 ${
            activeTab === "faq"
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
              : "hover:bg-blue-50 text-gray-700"
          }`}
          onClick={() => setActiveTab("faq")}
        >
          <MessageSquare className="w-5 h-5 mr-3" />
          자주묻는 질문
        </Button>
        <Button
          variant={activeTab === "diagnosis" ? "default" : "ghost"}
          className={`w-full justify-start h-12 rounded-xl transition-all duration-300 ${
            activeTab === "diagnosis"
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
              : "hover:bg-blue-50 text-gray-700"
          }`}
          onClick={() => setActiveTab("diagnosis")}
        >
          <Stethoscope className="w-5 h-5 mr-3" />
          진단 결과
        </Button>
        <Button
          variant={activeTab === "independent" ? "default" : "ghost"}
          className={`w-full justify-start h-12 rounded-xl transition-all duration-300 ${
            activeTab === "independent"
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
              : "hover:bg-blue-50 text-gray-700"
          }`}
          onClick={() => setActiveTab("independent")}
        >
          <FileText className="w-5 h-5 mr-3" />
          독려 멘트
        </Button>
      </div>
    </nav>
  </aside>
  )
}
