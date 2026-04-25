import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Home, CreditCard, User, Settings, LogOut, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const SidebarLink = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      active 
        ? 'bg-primary/10 text-primary font-bold' 
        : 'text-on-surface-variant hover:bg-surface-container-low'
    }`}
  >
    <Icon size={20} />
    <span className="text-sm">{label}</span>
  </Link>
);

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/', icon: Home, label: 'แดชบอร์ด' },
    { to: '/membership', icon: CreditCard, label: 'สมาชิกภาพ' },
    { to: '/profile', icon: User, label: 'โปรไฟล์' },
    { to: '/account', icon: Settings, label: 'ตั้งค่า' },
  ];

  if (user?.role === 'admin') {
    navItems.push({ to: '/admin', icon: Shield, label: 'Admin Panel' });
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-outline">
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-6 md:px-12">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-surface-container rounded-lg"
            >
              <Menu size={20} className="text-primary" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">MemberHub</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.to 
                    ? 'text-primary' 
                    : 'text-on-surface-variant hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 border-l border-outline pl-6">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-white leading-none">{user?.name || 'Supat S.'}</p>
              <div className="flex items-center justify-end gap-1.5 mt-1">
                {user?.role === 'admin' && (
                  <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-md font-black uppercase tracking-widest border border-primary/30">Admin</span>
                )}
                <p className="text-xs text-on-surface-variant">{user?.tier === 'gold' ? 'Gold Member' : 'Premium Member'}</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30 shadow-sm cursor-pointer">
              <img 
                src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
                alt="Profile"
                className="w-full h-full object-cover bg-surface-container"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full relative">
        {/* Mobile Menu Backdrop */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-20 left-0 h-[calc(100vh-80px)] w-64 bg-surface lg:bg-transparent border-r lg:border-none border-outline z-40 p-6 flex flex-col transition-transform lg:translate-x-0
          ${isMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        `}>
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all border ${
                  location.pathname === item.to 
                    ? 'bg-surface-container-low text-primary border-outline' 
                    : 'text-on-surface-variant hover:bg-surface-container-low/30 border-transparent'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto p-4 bg-primary/10 border border-primary/20 rounded-xl">
            <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1">Pro Version</p>
            <p className="text-sm text-on-surface-variant mb-3">Unlock advanced membership features.</p>
            <button className="w-full py-2 bg-primary hover:bg-primary-container text-white rounded-lg text-sm font-medium transition-colors">
              Upgrade Now
            </button>
          </div>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full mt-4 text-error font-medium hover:bg-error/10 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">ออกจากระบบ</span>
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      <footer className="bg-surface border-t border-outline py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant">
          <div className="flex items-center gap-4">
            <span className="font-bold text-white text-sm">MemberHub</span>
            <p>© 2024 MemberHub. สงวนลิขสิทธิ์ทั้งหมด</p>
          </div>
          <div className="flex gap-8">
            <Link to="#" className="hover:text-primary transition-colors">นโยบายความเป็นส่วนตัว</Link>
            <Link to="#" className="hover:text-primary transition-colors">เงื่อนไขการให้บริการ</Link>
            <Link to="#" className="hover:text-primary transition-colors">ศูนย์ช่วยเหลือ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
