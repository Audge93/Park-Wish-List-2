import React, { useEffect } from 'react';
import { useAppStore } from './store';
import { PARKS } from './constants';
import Onboarding from './screens/Onboarding.jsx';
import Home from './screens/Home.jsx';
import Search from './screens/Search.jsx';
import MyList from './screens/MyList.jsx';
import MapScreen from './screens/MapScreen.jsx';
import Settings from './screens/Settings.jsx';
import DetailSheet from './components/DetailSheet.jsx';
import Toast from './components/Toast.jsx';

export default function App() {
  const init = useAppStore((s) => s.init);
  const currentTab = useAppStore((s) => s.currentTab);
  const setCurrentTab = useAppStore((s) => s.setCurrentTab);
  const settings = useAppStore((s) => s.settings);

  useEffect(() => { init(); }, [init]);

  if (!settings.hasSeenOnboarding && currentTab === 'onboarding') return <Onboarding />;

  const Screen = {
    home: Home,
    search: Search,
    list: MyList,
    map: MapScreen,
    settings: Settings
  }[currentTab] || Home;

  return (
    <div className="app-shell">
      <main className="screen">
        <Screen />
      </main>
      <nav className="bottom-tabs">
        {[
          ['home', '⌂', 'Home'],
          ['search', '⌕', 'Search'],
          ['list', '♡', 'My List'],
          ['map', '⌖', 'Map']
        ].map(([key, icon, label]) => (
          <button key={key} className={currentTab === key ? 'active' : ''} onClick={() => setCurrentTab(key)}>
            <span>{icon}</span>
            <small>{label}</small>
          </button>
        ))}
      </nav>
      <DetailSheet />
      <Toast />
    </div>
  );
}
