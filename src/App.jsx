import { useState } from 'react';

export default function App() {
  const buttonLabels = [
    '표적 탐지', '교전 지시', '가역 절차', '비가역 절차',
    '초기 유도', '중기 유도', '종말 유도', '표적 격추'
  ];

  return (
    <div className="h-screen w-screen bg-gray-900 text-white flex flex-col font-sans">
      {/* 상단 제목 */}
      <header className="bg-gray-950 text-center py-4 text-2xl font-bold tracking-wide border-b border-gray-700">
        250407_KSAM2_007
      </header>

      {/* 하단 콘텐츠: 가로 3단 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 왼쪽: 정보 패널 */}
        <div className="w-1/4 bg-gray-800 p-6 border-r border-gray-700 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">시험 정보</h2>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>시험명: <span className="font-medium">ED_Action</span></li>
              <li>시작 시간: <span className="font-medium">14:00:29</span></li>
              <li>지속 시간: <span className="font-medium">00:36:30</span></li>
            </ul>
            <h3 className="text-md font-semibold mt-6">연동 / 통신 상태</h3>
            <p className="text-sm text-gray-400">정상</p>
          </div>
          <div className="text-xs text-gray-500 mt-8">© 2025 Your Company</div>
        </div>

        {/* 가운데: 메인 패널 */}
        <div className="flex-1 bg-gray-700 p-6 flex flex-col justify-between">
          {/* 상단 버튼 8개 */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {buttonLabels.map((label, idx) => (
              <button
                key={idx}
                className="bg-gray-600 text-white py-2 rounded-lg text-sm font-medium border border-gray-500"
              >
                {label}
              </button>
            ))}
          </div>

          {/* 로그 분석 영역 */}
          <div className="bg-gray-800 rounded-lg p-4 h-2/3 overflow-y-auto border border-gray-600">
            <h2 className="text-lg font-semibold mb-3">로그 분석</h2>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-3 border-b border-gray-700 pb-2">
                <input type="checkbox" className="form-checkbox" />
                <span>36:30:00</span>
                <span>WDL→ESAD</span>
                <span>DLD01</span>
                <span>FIRE_OUT</span>
                <span>착화</span>
                <span className="font-mono">0000</span>
              </div>
              {/* 더 많은 로그가 여기에 들어갈 수 있음 */}
            </div>
          </div>
        </div>

        {/* 오른쪽: 로그 패널 */}
        <div className="w-1/4 bg-gray-800 p-6 border-l border-gray-700 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">실시간 로그</h2>
          <div className="text-sm space-y-2 text-gray-300">
            <p>[12:00] 시스템 대기 중</p>
            <p>[12:01] 초기화 완료</p>
            <p>[12:02] 사용자 로그인</p>
            <p>[12:03] 메인 스위치 작동</p>
          </div>
        </div>
      </div>
    </div>
  );
}
