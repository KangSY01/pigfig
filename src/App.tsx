import React, { useState, useEffect } from 'react';

// Color Palette
const COLORS = {
  pinkLight: '#FFF0F3',
  pinkMedium: '#FFB6C1',
  pinkPrimary: '#FF8FAB',
  greenDark: '#2C5F2D',
  greenPrimary: '#97BC62',
  greenLight: '#E8F5E9',
  greenPale: '#F1F8E9',
  gray: '#888888',
  white: '#FFFFFF',
  black: '#000000',
  redLight: '#FFE5E5',
};

export default function App() {
  const [currentMode, setCurrentMode] = useState(null); // 'adopter' | 'grower' | null
  const [activeTab, setActiveTab] = useState(0);
  const [activeSubScreen, setActiveSubScreen] = useState('main'); // 'main' | 'timeline' | 'donation' | 'report'
  const [activeSubTab, setActiveSubTab] = useState('input'); // 'input' | 'sensor'
  
  // Adopter State
  const [careFlash, setCareFlash] = useState({ water: false, nutrient: false, sun: false });
  const [pigDefeated, setPigDefeated] = useState(false);
  const [pigScore, setPigScore] = useState(0);
  const [pigShaking, setPigShaking] = useState(false);

  // Grower State
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [diagnosisShown, setDiagnosisShown] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  // Helper: Flash Sidebar Button
  const handleCareAction = (type) => {
    setCareFlash(prev => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setCareFlash(prev => ({ ...prev, [type]: false }));
    }, 1000);
  };

  // Helper: Pig Game Attack
  const handlePigClick = () => {
    if (!pigDefeated) {
      setPigShaking(true);
      setTimeout(() => {
        setPigShaking(false);
        setPigDefeated(true);
        setPigScore(s => s + 10);
      }, 500);
    }
  };

  // Helper: Grower Submit Journal
  const handleSubmitJournal = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  // --- SCREENS ---

  const ModeSelectionScreen = () => (
    <div style={{
      height: '100%',
      width: '100%',
      background: 'linear-gradient(180deg, #FFF0F3 0%, #FFFFFF 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{ fontSize: '80px', marginBottom: '8px' }}>🫐</div>
      <div style={{ fontSize: '32px', fontWeight: 'bold', color: COLORS.greenDark, marginBottom: '4px' }}>Pig.Fig.</div>
      <div style={{ fontSize: '14px', color: COLORS.gray, marginBottom: '40px' }}>무화과를 함께 키워요</div>
      
      <div 
        onClick={() => { setCurrentMode('adopter'); setActiveTab(0); }}
        style={{
          width: '85%',
          backgroundColor: COLORS.pinkMedium,
          borderRadius: '20px',
          padding: '24px',
          marginBottom: '16px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 4px 12px rgba(255, 182, 193, 0.3)'
        }}
      >
        <div style={{ fontSize: '40px' }}>🌿</div>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: COLORS.greenDark }}>입양자 모드</div>
          <div style={{ fontSize: '13px', color: '#555' }}>무화과를 입양하고 성장을 지켜보세요</div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: '20px', color: COLORS.greenDark }}>→</div>
      </div>

      <div 
        onClick={() => { setCurrentMode('grower'); setActiveTab(0); }}
        style={{
          width: '85%',
          backgroundColor: COLORS.greenLight,
          borderRadius: '20px',
          padding: '24px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 4px 12px rgba(151, 188, 98, 0.2)'
        }}
      >
        <div style={{ fontSize: '40px' }}>👴</div>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: COLORS.greenDark }}>재배자 모드</div>
          <div style={{ fontSize: '13px', color: '#555' }}>묘목을 돌보고 일지를 기록하세요</div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: '20px', color: COLORS.greenDark }}>→</div>
      </div>
    </div>
  );

  const TopBar = () => (
    <div style={{
      height: '65px',
      width: '100%',
      backgroundColor: COLORS.pinkPrimary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      boxSizing: 'border-box',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '20px' }}>🫐</span>
        <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>Pig.Fig.</span>
      </div>
      <div style={{ color: 'white', cursor: 'pointer' }}>🔔</div>
    </div>
  );

  const BottomNav = () => {
    const tabs = currentMode === 'adopter' 
      ? [{ label: '홈', icon: '🏠' }, { label: '게임', icon: '🎮' }, { label: '마이페이지', icon: '👤' }]
      : [{ label: '대시보드', icon: '📋' }, { label: '일지·감지', icon: '📝' }, { label: '마이페이지', icon: '👤' }];

    return (
      <div style={{
        height: '60px',
        width: '100%',
        backgroundColor: 'white',
        borderTop: '1px solid #eee',
        display: 'flex',
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 10
      }}>
        {tabs.map((tab, idx) => (
          <div 
            key={idx}
            onClick={() => { setActiveTab(idx); setActiveSubScreen('main'); }}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: activeTab === idx ? COLORS.greenDark : '#999',
              fontSize: '12px',
              fontWeight: activeTab === idx ? 'bold' : 'normal',
              position: 'relative'
            }}
          >
            <span style={{ fontSize: '20px', marginBottom: '2px' }}>{tab.icon}</span>
            <span>{tab.label}</span>
            {activeTab === idx && (
              <div style={{
                position: 'absolute',
                bottom: '6px',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: COLORS.greenDark
              }} />
            )}
          </div>
        ))}
      </div>
    );
  };

  // --- ADOPTER TABS ---

  const AdopterHome = () => (
    <div style={{ height: '100%', position: 'relative', backgroundColor: COLORS.greenPale }}>
      {/* Floating Care Buttons */}
      <div style={{
        position: 'absolute',
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        zIndex: 5
      }}>
        {[
          { id: 'water', label: '물주기', icon: '💧' },
          { id: 'nutrient', label: '영양제', icon: '🧪' },
          { id: 'sun', label: '햇빛', icon: '☀️' }
        ].map(btn => (
          <div key={btn.id} style={{ textAlign: 'center' }}>
            <div 
              onClick={() => handleCareAction(btn.id)}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: careFlash[btn.id] ? COLORS.greenLight : 'white',
                border: careFlash[btn.id] ? `2px solid ${COLORS.greenPrimary}` : `2px solid ${COLORS.pinkMedium}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '20px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}
            >
              {btn.icon}
            </div>
            <div style={{ fontSize: '10px', marginTop: '6px', color: COLORS.gray, fontWeight: 'bold' }}>{btn.label}</div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div style={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '20px',
        overflow: 'hidden'
      }} className="no-scrollbar">
        {/* CSS Large Fig Tree */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          marginTop: '20px',
          width: '100%'
        }}>
          {/* Leaves */}
          <div style={{ width: '100px', height: '100px', backgroundColor: '#43A047', borderRadius: '50%', zIndex: 3 }} />
          <div style={{ width: '130px', height: '130px', backgroundColor: '#388E3C', borderRadius: '50%', marginTop: '-50px', zIndex: 2 }} />
          <div style={{ width: '160px', height: '160px', backgroundColor: COLORS.greenDark, borderRadius: '50%', marginTop: '-60px', zIndex: 1 }} />
          
          {/* Trunk */}
          <div style={{ width: '24px', height: '150px', backgroundColor: '#8B4513', borderRadius: '4px', marginTop: '-8px' }} />
          
          {/* Pig Character */}
          <div 
            onClick={() => setActiveTab(1)}
            style={{
              fontSize: '48px',
              marginTop: '-70px',
              animation: 'walk 3s ease-in-out infinite',
              cursor: 'pointer',
              zIndex: 4
            }}
          >
            🐷
          </div>
        </div>

        {/* Info Area */}
        <div style={{ marginTop: '20px', textAlign: 'center', width: '100%', padding: '0 20px', boxSizing: 'border-box' }}>
          <div style={{
            display: 'inline-block',
            backgroundColor: COLORS.greenLight,
            color: COLORS.greenDark,
            padding: '4px 16px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: 'bold',
            marginBottom: '10px'
          }}>
            나의 무화과 🌱
          </div>
          
          <div style={{ width: '100%', maxWidth: '200px', margin: '0 auto' }}>
            <div style={{ fontSize: '12px', color: COLORS.gray, display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>성장 단계</span>
              <span>3/5단계</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '60%', height: '100%', backgroundColor: COLORS.greenPrimary }} />
            </div>
            <div style={{ fontSize: '11px', color: COLORS.gray, marginTop: '8px' }}>
              마지막 케어: 오늘
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AdopterGame = () => (
    <div style={{ padding: '20px', paddingTop: '85px', paddingBottom: '80px', height: '100%', overflowY: 'auto', boxSizing: 'border-box' }} className="no-scrollbar">
      {/* Attendance */}
      <section style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '16px', fontWeight: 'bold', color: COLORS.greenDark, marginBottom: '16px' }}>이번 달 출석 🗓️</div>
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '20px', 
          padding: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '8px' }}>
            {['일','월','화','수','목','금','토'].map(d => <span key={d} style={{ fontSize: '12px', color: COLORS.gray }}>{d}</span>)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
            {Array.from({ length: 31 }).map((_, i) => {
              const day = i + 1;
              const attended = [1,2,3,5,6,7,8,10,12].includes(day);
              const today = day === 13;
              const missed = [4,9,11].includes(day);
              
              return (
                <div key={i} style={{
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  backgroundColor: attended ? COLORS.greenPrimary : (today ? COLORS.pinkPrimary : 'transparent'),
                  color: (attended || today) ? 'white' : COLORS.gray,
                  border: missed ? `1px solid #eee` : 'none'
                }}>
                  {attended ? '✓' : day}
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <span style={{ backgroundColor: COLORS.greenLight, color: COLORS.greenDark, padding: '4px 12px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold' }}>
              연속 출석 8일 🔥
            </span>
          </div>
        </div>
      </section>

      {/* Pig Slaying Game */}
      <section>
        <div style={{ fontSize: '16px', fontWeight: 'bold', color: COLORS.greenDark, marginBottom: '16px' }}>돼지 퇴치 게임 🐷</div>
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '20px', 
          padding: '32px 16px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          minHeight: '200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {!pigDefeated ? (
            <div 
              onClick={handlePigClick}
              style={{ 
                fontSize: '80px', 
                cursor: 'pointer',
                animation: pigShaking ? 'shake 0.5s ease' : 'bounce 2s infinite',
              }}
            >
              🐷
            </div>
          ) : (
            <div style={{ animation: 'bounce 0.5s ease-out' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: COLORS.greenDark, marginBottom: '8px' }}>🎉 퇴치 완료!</div>
              <div style={{ fontSize: '16px', color: COLORS.greenPrimary }}>+10점 추가 획득</div>
            </div>
          )}
          
          <div style={{ marginTop: '24px', fontSize: '18px', fontWeight: 'bold', color: COLORS.gray }}>
            현재 점수: {pigScore}점
          </div>

          <div 
            onClick={() => setPigDefeated(false)}
            style={{ 
              marginTop: '16px', 
              color: COLORS.pinkPrimary, 
              cursor: 'pointer', 
              fontSize: '14px', 
              fontWeight: 'bold',
              padding: '6px 12px',
              border: `1px solid ${COLORS.pinkPrimary}`,
              borderRadius: '20px'
            }}
          >
            다시 시작
          </div>
        </div>
      </section>
    </div>
  );

  const AdopterMyPage = () => {
    if (activeSubScreen === 'timeline') {
      return (
        <div style={{ padding: '20px', paddingTop: '85px', height: '100%', overflowY: 'auto', boxSizing: 'border-box' }} className="no-scrollbar">
          <div 
            onClick={() => setActiveSubScreen('main')}
            style={{ marginBottom: '16px', color: COLORS.pinkPrimary, cursor: 'pointer', fontWeight: 'bold' }}
          >
            ← 뒤로가기
          </div>
          <h2 style={{ fontSize: '20px', color: COLORS.greenDark, marginBottom: '24px' }}>성장 타임라인 📸</h2>
          
          <div style={{ borderLeft: `2px solid ${COLORS.greenLight}`, marginLeft: '12px', paddingLeft: '24px', position: 'relative' }}>
            {[
              { step: '1단계 — 가지 치기', date: '2026.05.01', active: true },
              { step: '2단계 — 뿌리 출현', date: '2026.05.15', active: true },
              { step: '3단계 — 잎 성장 중', date: '2026.06.01', active: false, current: true },
            ].map((entry, i) => (
              <div key={i} style={{ marginBottom: '32px', position: 'relative' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: entry.active ? COLORS.greenPrimary : COLORS.pinkPrimary,
                  position: 'absolute',
                  left: '-31px',
                  top: '5px',
                  border: '3px solid white'
                }} />
                <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: '15px', fontWeight: 'bold', color: COLORS.greenDark }}>{entry.step}</div>
                  <div style={{ fontSize: '12px', color: COLORS.gray, marginBottom: '8px' }}>{entry.date}</div>
                  {entry.active ? (
                    <div style={{ width: '100%', height: '80px', backgroundColor: COLORS.pinkLight, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.pinkPrimary }}>
                      사진 보관함
                    </div>
                  ) : (
                    <div style={{ fontSize: '13px', color: COLORS.gray, fontStyle: 'italic' }}>재배자가 기록 중...</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeSubScreen === 'donation') {
      return (
        <div style={{ padding: '20px', paddingTop: '85px', height: '100%', overflowY: 'auto', boxSizing: 'border-box' }} className="no-scrollbar">
          <div 
            onClick={() => setActiveSubScreen('main')}
            style={{ marginBottom: '16px', color: COLORS.pinkPrimary, cursor: 'pointer', fontWeight: 'bold' }}
          >
            ← 뒤로가기
          </div>
          <div style={{ backgroundColor: COLORS.greenLight, color: COLORS.greenDark, padding: '16px', borderRadius: '20px', textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>🎉 묘목이 완성되었습니다!</div>
          </div>
          <div style={{ fontSize: '64px', textAlign: 'center', marginBottom: '24px' }}>🌳</div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
            <div style={{ backgroundColor: COLORS.pinkLight, padding: '20px', borderRadius: '20px' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: COLORS.pinkPrimary, marginBottom: '4px' }}>📦 직접 수령</div>
              <div style={{ fontSize: '13px', color: COLORS.gray, marginBottom: '12px' }}>픽업 날짜: 2026년 6월 15일</div>
              <button style={{ width: '100%', backgroundColor: COLORS.greenPrimary, color: 'white', border: 'none', padding: '10px', borderRadius: '12px', fontWeight: 'bold' }}>확인</button>
            </div>
            
            <div style={{ backgroundColor: COLORS.greenLight, padding: '20px', borderRadius: '20px' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: COLORS.greenDark, marginBottom: '12px' }}>💚 기부하기</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['초등학교', '생명의숲', '나눔분양'].map(item => (
                  <span key={item} style={{ backgroundColor: 'white', color: COLORS.pinkPrimary, padding: '4px 10px', borderRadius: '15px', fontSize: '12px' }}>{item}</span>
                ))}
              </div>
            </div>
          </div>

          <button style={{ width: '100%', height: '56px', backgroundColor: COLORS.pinkPrimary, color: 'white', border: 'none', borderRadius: '28px', fontSize: '16px', fontWeight: 'bold' }}>선택 완료 →</button>
        </div>
      );
    }

    return (
      <div style={{ paddingTop: '85px', paddingBottom: '80px', height: '100%', overflowY: 'auto' }} className="no-scrollbar">
        {/* Profile */}
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: `linear-gradient(135deg, ${COLORS.pinkMedium}, ${COLORS.pinkPrimary})`, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>
            🫐
          </div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: COLORS.greenDark, marginBottom: '16px' }}>김무화과 님</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            {['입양 1회', '기부 0회', '연속 8일'].map(tag => (
              <div key={tag} style={{ backgroundColor: COLORS.greenLight, color: COLORS.greenDark, fontSize: '11px', padding: '4px 12px', borderRadius: '12px', fontWeight: 'bold' }}>
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div style={{ marginTop: '24px', backgroundColor: 'white' }}>
          {[
            { label: '📸 성장 타임라인', action: () => setActiveSubScreen('timeline') },
            { label: '🎁 수령 / 기부', action: () => setActiveSubScreen('donation') },
            { label: '🔔 알림 설정', action: null },
            { label: '📦 픽업 주소', action: null },
            { label: '🚪 로그아웃', action: () => setCurrentMode(null) }
          ].map((item, idx) => (
            <div 
              key={idx} 
              onClick={item.action}
              style={{ 
                padding: '18px 20px', 
                borderBottom: '1px solid #f5f5f5', 
                display: 'flex', 
                justifyContent: 'space-between',
                cursor: item.action ? 'pointer' : 'default'
              }}
            >
              <span style={{ fontSize: '15px' }}>{item.label}</span>
              <span style={{ color: '#ccc' }}>→</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- GROWER TABS ---

  const GrowerDashboard = () => (
    <div style={{ padding: '20px', paddingTop: '85px', paddingBottom: '80px', height: '100%', overflowY: 'auto' }} className="no-scrollbar">
      <div style={{ fontSize: '16px', fontWeight: 'bold', color: COLORS.greenDark, marginBottom: '20px' }}>담당 묘목 현황 🌿</div>
      {[
        { id: '#001', owner: '김**', status: '정상', dday: 'D-14', color: COLORS.greenPrimary },
        { id: '#002', owner: '이**', status: '수분부족', dday: 'D-8', color: '#FFA726' },
        { id: '#003', owner: '박**', status: '정상', dday: 'D-3', color: COLORS.greenPrimary },
      ].map((plant, idx) => (
        <div 
          key={idx}
          onClick={() => setSelectedPlant(idx)}
          style={{
            backgroundColor: selectedPlant === idx ? '#FFF0F5' : 'white',
            borderRadius: '16px',
            borderLeft: `4px solid ${plant.color}`,
            padding: '32px 16px',
            marginBottom: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '15px', color: COLORS.greenDark }}>🌱 무화과 {plant.id}</div>
            <div style={{ fontSize: '12px', color: COLORS.gray, marginTop: '4px' }}>입양자: {plant.owner} | {plant.status}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
            <div style={{ backgroundColor: plant.color === COLORS.greenPrimary ? COLORS.greenLight : '#FFF3E0', color: plant.color, fontSize: '11px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '12px' }}>
              {plant.dday}
            </div>
            {selectedPlant === idx && <div style={{ fontSize: '11px', color: COLORS.pinkPrimary, fontWeight: 'bold' }}>일지 작성하기 →</div>}
          </div>
        </div>
      ))}
    </div>
  );

  const GrowerJournal = () => (
    <div style={{ paddingTop: '65px', paddingBottom: '80px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Sub Tabs */}
      <div style={{ height: '44px', display: 'flex', backgroundColor: 'white', borderBottom: '1px solid #eee' }}>
        {['일지 입력', '진단 결과'].map(tab => (
          <div 
            key={tab}
            onClick={() => setActiveSubTab(tab === '일지 입력' ? 'input' : 'sensor')}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: (activeSubTab === 'input' && tab === '일지 입력') || (activeSubTab === 'sensor' && tab === '환경 감지') ? 'bold' : 'normal',
              color: (activeSubTab === 'input' && tab === '일지 입력') || (activeSubTab === 'sensor' && tab === '환경 감지') ? COLORS.greenDark : COLORS.gray,
              borderBottom: (activeSubTab === 'input' && tab === '일지 입력') || (activeSubTab === 'sensor' && tab === '환경 감지') ? `2px solid ${COLORS.greenDark}` : 'none'
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {activeSubTab === 'input' ? (
        <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }} className="no-scrollbar">
          <div style={{ 
            height: '120px', 
            border: `2px dashed ${COLORS.pinkMedium}`, 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: COLORS.pinkPrimary,
            marginBottom: '20px'
          }}>
            📷 사진 업로드
          </div>
          <textarea 
            placeholder="오늘의 성장 기록을 입력하세요..." 
            style={{ 
              width: '100%', 
              height: '80px', 
              borderRadius: '12px', 
              border: '1px solid #eee', 
              padding: '12px', 
              boxSizing: 'border-box', 
              marginBottom: '20px',
              fontSize: '14px',
              outline: 'none'
            }} 
          />
          
          <div style={{ marginBottom: '24px' }}>
            {[
              { icon: '🌡️', label: '온도', unit: '℃', val: '24' },
              { icon: '💧', label: '습도', unit: '%', val: '55' },
              { icon: '☀️', label: '조도', unit: 'lux', val: '450' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f5f5f5' }}>
                <span style={{ fontSize: '18px', marginRight: '8px' }}>{row.icon}</span>
                <span style={{ flex: 1, fontSize: '14px' }}>{row.label} ({row.unit})</span>
                <input type="number" defaultValue={row.val} style={{ width: '60px', textAlign: 'right', border: 'none', fontWeight: 'bold' }} />
              </div>
            ))}
          </div>

          <button 
            onClick={handleSubmitJournal}
            style={{ width: '100%', height: '52px', backgroundColor: COLORS.greenPrimary, color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '15px' }}
          >
            일지 등록 ✓
          </button>
        </div>
      ) : (
        <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }} className="no-scrollbar">
          <div style={{ marginBottom: '20px', border: '1px solid #eee', borderRadius: '16px', padding: '16px' }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '12px' }}>현재 환경 상태</div>
            {[
              { icon: '🌡️', label: '온도', val: '11' },
              { icon: '💧', label: '습도', val: '65' },
              { icon: '☀️', label: '조도', val: '300' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', padding: '8px 0' }}>
                <span>{row.icon} {row.label}</span>
                <span style={{ fontWeight: 'bold' }}>{row.val}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setDiagnosisShown(true)}
            style={{ width: '100%', height: '44px', border: `1px solid ${COLORS.pinkPrimary}`, color: COLORS.pinkPrimary, backgroundColor: 'white', borderRadius: '12px', fontWeight: 'bold', marginBottom: '24px' }}
          >
            진단하기 🔍
          </button>

          {diagnosisShown && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', animation: 'bounce 0.5s ease-out' }}>
              <div style={{ backgroundColor: '#FFE5E5', padding: '12px', borderRadius: '12px', fontSize: '13px', color: '#D32F2F', display: 'flex', justifyContent: 'space-between' }}>
                <span>🌡️ 온도 11℃ ⚠️ 이상</span>
                <span>기준: 13℃ 이상</span>
              </div>
              <div style={{ backgroundColor: COLORS.greenLight, padding: '12px', borderRadius: '12px', fontSize: '13px', color: COLORS.greenDark, display: 'flex', justifyContent: 'space-between' }}>
                <span>💧 습도 65% ✅ 정상</span>
              </div>
              <div style={{ backgroundColor: COLORS.greenLight, padding: '12px', borderRadius: '12px', fontSize: '13px', color: COLORS.greenDark, display: 'flex', justifyContent: 'space-between' }}>
                <span>☀️ 조도 300lux ✅ 정상</span>
              </div>

              {/* Speech Bubble */}
              <div style={{ 
                marginTop: '12px', 
                backgroundColor: COLORS.pinkLight, 
                padding: '16px', 
                borderRadius: '16px', 
                position: 'relative',
                border: `1px solid ${COLORS.pinkMedium}`
              }}>
                <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#555' }}>
                  <span style={{ fontWeight: 'bold', color: COLORS.greenDark }}>✨ Gemini:</span> 온도가 기준치(13℃)보다 낮습니다. 난방 상태를 확인하고 묘목을 따뜻한 곳으로 옮겨주세요.
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Toast */}
      {toastVisible && (
        <div style={{
          position: 'absolute',
          bottom: '100px',
          left: '20px',
          right: '20px',
          backgroundColor: COLORS.greenDark,
          color: 'white',
          padding: '12px 20px',
          borderRadius: '24px',
          textAlign: 'center',
          fontSize: '13px',
          zIndex: 100,
          animation: 'bounce 0.3s ease'
        }}>
          등록 완료! 타임라인에 반영됩니다 🌿
        </div>
      )}
    </div>
  );

  const GrowerMyPage = () => (
    <div style={{ paddingTop: '85px', paddingBottom: '80px', height: '100%', overflowY: 'auto' }} className="no-scrollbar">
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: `linear-gradient(135deg, ${COLORS.greenPrimary}, ${COLORS.greenDark})`, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>
          👴
        </div>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: COLORS.greenDark, marginBottom: '16px' }}>박재배 마스터</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {['담당묘목 3개', '완성신고 1회', '이번달 일지 8개'].map(tag => (
            <div key={tag} style={{ backgroundColor: COLORS.pinkLight, color: COLORS.pinkPrimary, fontSize: '11px', padding: '4px 12px', borderRadius: '12px', fontWeight: 'bold' }}>
              {tag}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '24px', backgroundColor: 'white' }}>
        {[
          { label: '🏆 완성 신고', action: null },
          { label: '🔔 알림 설정', action: null },
          { label: '🚪 로그아웃', action: () => setCurrentMode(null) }
        ].map((item, idx) => (
          <div key={idx} onClick={item.action} style={{ padding: '18px 20px', borderBottom: '1px solid #f5f5f5', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
            <span style={{ fontSize: '15px' }}>{item.label}</span>
            <span style={{ color: '#ccc' }}>→</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      {/* Phone Frame */}
      <div style={{
        width: '390px',
        height: '844px',
        backgroundColor: 'white',
        border: `3px solid ${COLORS.black}`,
        borderRadius: '40px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      }}>
        {currentMode === null ? (
          <ModeSelectionScreen />
        ) : (
          <>
            <TopBar />
            <div style={{ height: '100%', width: '100%', backgroundColor: '#FFF9FA', paddingTop: '0' }}>
              {currentMode === 'adopter' ? (
                <>
                  {activeTab === 0 && <AdopterHome />}
                  {activeTab === 1 && <AdopterGame />}
                  {activeTab === 2 && <AdopterMyPage />}
                </>
              ) : (
                <>
                  {activeTab === 0 && <GrowerDashboard />}
                  {activeTab === 1 && <GrowerJournal />}
                  {activeTab === 2 && <GrowerMyPage />}
                </>
              )}
            </div>
            <BottomNav />
          </>
        )}
      </div>
    </div>
  );
}
