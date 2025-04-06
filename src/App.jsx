import { useState, useEffect } from "react";

// 로그 행 생성
function createLogRow(stepLabel) {
  const now = new Date().toTimeString().slice(0, 8);
  return {
    time: now,
    direction: "WDL → ESAD",
    code: `DLD0${Math.floor(Math.random() * 9) + 1}`,
    name: stepLabel,
    info: "자동 추가",
    hex: Math.floor(Math.random() * 9999).toString(16).padStart(4, "0"),
  };
}

export default function App() {
  const steps = [
    "표적 탐지", "교전 지시", "가역 절차", "비가역 절차",
    "초기 유도", "중기 유도", "종말 유도", "표적 격추",
  ];

  // 페이지 흐름 상태
  const [page, setPage] = useState("login"); // login → setup → dashboard
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  // 설정값
  const [examName, setExamName] = useState("ED_Action");
  const [headerTitle, setHeaderTitle] = useState("250407_KSAM2_007");

  // 대시보드 상태
  const [currentStep, setCurrentStep] = useState(0);
  const [logMessages, setLogMessages] = useState([]);
  const [tableLogs, setTableLogs] = useState([]);

  // 자동 진행
  useEffect(() => {
    if (page !== "dashboard") return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          const next = prev + 1;
          const now = new Date().toTimeString().slice(0, 8);

          // 오른쪽 로그
          const newLog = `[${now}] '${steps[next]}' 단계 진행 중`;
          setLogMessages((prev) => [newLog, ...prev]);

          // 중앙 테이블
          const newRow = createLogRow(steps[next]);
          setTableLogs((prev) => [...prev, newRow]);

          return next;
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [page]);

  // 1️⃣ 로그인 화면
  if (page === "login") {
    return (
      <div className="h-screen w-screen bg-gray-900 flex items-center justify-center text-white font-sans">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-80 space-y-4">
          <h2 className="text-xl font-bold text-center mb-4">로그인</h2>
          <input
            type="text"
            placeholder="아이디"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
          />
          <button
            onClick={() => {
              if (userId === "75917" && password === "gkaeorhd2!@") {
                setPage("setup");
              } else {
                alert("아이디 또는 비밀번호가 틀렸습니다.");
              }
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-medium"
          >
            로그인
          </button>
        </div>
      </div>
    );
  }

  // 2️⃣ 설정 페이지
  if (page === "setup") {
    return (
      <div className="h-screen w-screen bg-gray-900 flex items-center justify-center text-white font-sans">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-[400px] space-y-6">
          <h2 className="text-xl font-bold text-center">시험 설정</h2>
          <div className="space-y-2">
            <label className="block text-sm">시험명</label>
            <input
              type="text"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm">상단 제목</label>
            <input
              type="text"
              value={headerTitle}
              onChange={(e) => setHeaderTitle(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
            />
          </div>
          <button
            onClick={() => setPage("dashboard")}
            className="w-full bg-green-600 hover:bg-green-700 py-2 rounded text-white font-medium"
          >
            대시보드로 이동
          </button>
        </div>
      </div>
    );
  }

  // 3️⃣ 대시보드
  return (
    <div className="h-screen w-screen bg-gray-900 text-white flex flex-col font-sans">
      <header className="bg-gray-950 text-center py-4 text-2xl font-bold tracking-wide border-b border-gray-700">
        {headerTitle}
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* 왼쪽 정보 */}
        <div className="w-1/4 bg-gray-800 p-6 border-r border-gray-700 space-y-4 text-sm text-gray-300">
          <div><span className="font-bold text-white">시험명:</span> {examName}</div>
          <div><span className="font-bold text-white">시작 시간:</span> 14:00:29</div>
          <div><span className="font-bold text-white">지속 시간:</span> 00:36:30</div>
          <div><span className="font-bold text-white">연동/통신 상태:</span> 정상</div>
        </div>

        {/* 가운데 */}
        <div className="flex-1 bg-gray-700 p-6 flex flex-col gap-6 overflow-hidden">
          {/* 진행 상태 버튼 */}
          <div className="flex justify-center flex-wrap gap-2">
            {steps.map((label, index) => {
              let bg = "bg-gray-700";
              if (index < currentStep) bg = "bg-green-600";
              else if (index === currentStep) bg = "bg-blue-600";

              return (
                <button
                  key={index}
                  className={`${bg} text-white px-4 py-2 rounded-md text-sm font-medium transition shadow`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* 로그 분석 테이블 */}
          <div className="flex-1 overflow-auto bg-gray-800 rounded-lg p-4 border border-gray-600">
            <table className="w-full text-sm table-auto">
              <thead className="text-left text-gray-400 border-b border-gray-600">
                <tr>
                  <th className="px-2 py-1">#</th>
                  <th className="px-2 py-1">시간</th>
                  <th className="px-2 py-1">송수신</th>
                  <th className="px-2 py-1">메시지명</th>
                  <th className="px-2 py-1">상세명칭</th>
                  <th className="px-2 py-1">정보</th>
                  <th className="px-2 py-1">Hex</th>
                </tr>
              </thead>
              <tbody className="text-gray-200">
                {tableLogs.map((row, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="px-2 py-1">
                      <input type="checkbox" />
                    </td>
                    <td className="px-2 py-1">{row.time}</td>
                    <td className="px-2 py-1">{row.direction}</td>
                    <td className="px-2 py-1">{row.code}</td>
                    <td className="px-2 py-1">{row.name}</td>
                    <td className="px-2 py-1">{row.info}</td>
                    <td className="px-2 py-1">{row.hex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 오른쪽 로그 */}
        <div className="w-1/4 bg-gray-800 p-6 border-l border-gray-700 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">로그</h2>
          <div className="text-sm space-y-2 text-gray-300">
            {logMessages.map((log, index) => (
              <p key={index}>{log}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
