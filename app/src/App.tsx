import { useEffect } from 'react';

import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

import { Atmosphere } from './components/Atmosphere';
import { InBodySheet } from './components/InBodySheet';
import { RestTimer } from './components/RestTimer';
import { TabBar } from './components/TabBar';
import { AppProvider, useApp } from './lib/store';
import { BodyScreen } from './screens/BodyScreen';
import { ChatScreen } from './screens/ChatScreen';
import { DietDayScreen } from './screens/DietDayScreen';
import { DietPlanScreen } from './screens/DietPlanScreen';
import { TrainActiveScreen } from './screens/TrainActiveScreen';
import { TrainListScreen } from './screens/TrainListScreen';
import { TrainProgressScreen } from './screens/TrainProgressScreen';

function Screen() {
  const { tab, dietView, trainView } = useApp();
  if (tab === 'body') return <BodyScreen />;
  if (tab === 'diet') return dietView === 'plan' ? <DietPlanScreen /> : <DietDayScreen />;
  if (tab === 'train') {
    if (trainView === 'active') return <TrainActiveScreen />;
    if (trainView === 'progress') return <TrainProgressScreen />;
    return <TrainListScreen />;
  }
  return <ChatScreen />;
}

function Shell() {
  const { tab, dietView, trainView } = useApp();
  return (
    <div
      style={{
        height: '100%',
        position: 'relative',
        color: '#F2EFE8',
        fontFamily: "'Golos Text',sans-serif",
        overflow: 'hidden',
        background: 'linear-gradient(180deg,#221C15 0%,#171310 48%,#120F0A 100%)',
      }}
    >
      <Atmosphere />
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* key перезапускает входные анимации при смене экрана */}
        <div key={`${tab}-${dietView}-${trainView}`} style={{ height: '100%' }}>
          <Screen />
        </div>
      </div>
      <TabBar />
      <RestTimer />
      <InBodySheet />
    </div>
  );
}

export function App() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    // Style.Dark = светлый текст/иконки на тёмном фоне
    void StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
  }, []);

  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
