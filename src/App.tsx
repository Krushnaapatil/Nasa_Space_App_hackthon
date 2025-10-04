import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Hero } from './pages/Hero';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Analysis } from './pages/Analysis';
import { ModelStatsPage } from './pages/ModelStatsPage';
import { Navigation } from './components/Navigation';

type AuthView = 'login' | 'register';
type AppView = 'hero' | 'about' | 'analysis' | 'modelStats' | 'contact';

function AppContent() {
  const { user, loading } = useAuth();
  const [authView, setAuthView] = useState<AuthView>('login');
  const [appView, setAppView] = useState<AppView>('hero');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (authView === 'login') {
      return <Login onSwitchToRegister={() => setAuthView('register')} />;
    }
    return <Register onSwitchToLogin={() => setAuthView('login')} />;
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation currentView={appView} onNavigate={setAppView} />

      {appView === 'hero' && <Hero onStartAnalysis={() => setAppView('analysis')} />}
      {appView === 'about' && <About />}
      {appView === 'analysis' && <Analysis />}
      {appView === 'modelStats' && <ModelStatsPage />}
      {appView === 'contact' && <Contact />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
