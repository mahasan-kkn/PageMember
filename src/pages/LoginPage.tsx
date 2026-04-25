import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Check, Eye, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check for admin login
    if (email === 'alongkorn.meesin@gmail.com') {
      login(email, 'admin');
      navigate('/');
      return;
    }

    // Default member login
    login(email, 'member');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans text-on-surface">
      <header className="w-full bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-outline">
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-6 md:px-12">
          <Link to="/" className="flex items-center gap-2 group transition-transform active:scale-95">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 group-hover:bg-primary-container transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">MemberHub</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link className="text-on-surface-variant hover:text-white font-medium text-sm transition-colors" to="#">ราคา</Link>
            <Link className="text-on-surface-variant hover:text-white font-medium text-sm transition-colors" to="#">ชุมชน</Link>
            <Link className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-container transition-all" to="#">สมัครสมาชิก</Link>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6 md:p-12 overflow-hidden relative">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-20 items-center">
          {/* Visual Brand Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:flex flex-col gap-6"
          >
            <h1 className="text-5xl font-bold text-white leading-tight">
              ยินดีต้อนรับกลับสู่ <br />
              <span className="text-primary">กลุ่มคนพิเศษ</span>
            </h1>
            <p className="text-lg text-on-surface-variant max-w-md">
              เข้าถึงสิทธิประโยชน์พิเศษสำหรับสมาชิก เชื่อมต่อกับผู้นำท่านอื่น และติดตามทรัพยากรล่าสุดของชุมชน
            </p>
            
            <div className="mt-8 relative h-[420px] w-full rounded-3xl overflow-hidden border border-outline shadow-2xl">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwHdGOVZ2yKo0cHmTUZU3xci-9hLfVr1tO3kFCBEYwKhyeYjHpfofvQeJFfStFq_7rtDDmAm6rDA5zGJiBMK68ENv5e2j9pmkX_TLG5Ah3pdcA8BtaxH2h8_ZnxA0-D4veaQkT82mF4TMPlzedXAGnzopCfEDHTkDtDXd96fFVueZcOeuE2b_ixBwKvzCFtNwqOkQNXFghEVHjBy8kHMnPhR3M2G5lQPy4Pm6Z8F_kTisX-9VLIcoDFuSUTUZAmCSsJYy0FDnXzvg" 
                alt="Community"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 bg-surface/80 backdrop-blur-md p-8 rounded-2xl border border-outline shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Check size={16} className="text-primary" />
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">แนะนำสมาชิก</span>
                </div>
                <p className="text-white italic leading-relaxed text-lg">
                  "การได้เป็นส่วนหนึ่งของ MemberHub ได้เปลี่ยนเครือข่ายของฉันไปอย่างสิ้นเชิง"
                </p>
              </div>
            </div>
          </motion.div>

          {/* Login Form Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-surface p-10 rounded-3xl shadow-2xl border border-outline">
              <div className="mb-10 text-center lg:text-left">
                <h2 className="text-3xl font-bold text-white mb-2">เข้าสู่ระบบ</h2>
                <p className="text-on-surface-variant">กรุณากรอกข้อมูลเพื่อเข้าใช้งาน</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                {email === 'alongkorn.meesin@gmail.com' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-3 bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-3 text-primary text-xs font-bold"
                  >
                    <ShieldAlert size={16} />
                    ระบบตรวจพบสิทธิ์ผู้ดูแลระบบ (Admin)
                  </motion.div>
                )}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1" htmlFor="email">อีเมล</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                    <input 
                      id="email"
                      type="email" 
                      placeholder="alex@rivers.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-white placeholder:text-on-surface-variant/50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest" htmlFor="password">รหัสผ่าน</label>
                    <Link to="#" className="text-xs font-bold text-primary hover:text-white transition-colors">ลืมรหัสผ่าน?</Link>
                  </div>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                    <input 
                      id="password"
                      type="password" 
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3.5 bg-surface-container-low border border-outline rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-white placeholder:text-on-surface-variant/50"
                      required
                    />
                    <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-white">
                      <Eye size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 py-1">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-outline rounded-lg checked:bg-primary checked:border-primary transition-all" />
                      <Check size={14} className="absolute text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 pointer-events-none" />
                    </div>
                    <span className="text-sm text-on-surface-variant font-medium select-none">จดจำฉัน</span>
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  เข้าสู่ระบบ
                  <LogIn size={20} />
                </button>
              </form>

              <div className="mt-10">
                <div className="relative flex items-center justify-center mb-8">
                  <div className="w-full border-t border-outline" />
                  <span className="absolute bg-surface px-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">หรือเข้าใช้งานด้วย</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-3 py-3 border border-outline rounded-xl hover:bg-surface-container-low transition-colors font-bold text-sm">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzSxt9m4Itor-4Z4jJPeNOHigmmlC33SKlV6CqDf_pCxALwSlgvofFAKqWH2h8KK3y01FR00VD63Seo9Jbwc1o7R_ZroUvvnLodv0sL1Zu16mEkkbGE0H1IGW3QRooXD24Sl7moRe1dlOidNqAt7fCA1BUzdlRqpDApeQBJrJ-49f7sCh4FkxS24ksjVRCxLgAZer1YPe0hD_EjDYTD-5xPBzNlCr93TUJYivZd_IGCDi65RgyOVGbZOIEKOhpZLNzHZ9Pq7kYafU" alt="Google" className="w-5 h-5" />
                    Google
                  </button>
                  <button className="flex items-center justify-center gap-3 py-3 border border-outline rounded-xl hover:bg-surface-container-low transition-colors font-bold text-sm">
                    <div className="w-5 h-5 flex items-center justify-center font-bold"></div>
                    Apple
                  </button>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-on-surface-variant">
                  ยังไม่มีบัญชี? <Link to="#" className="text-primary font-bold hover:text-white transition-colors">สมัคร MemberHub</Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="w-full bg-surface border-t border-outline py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant font-medium">
          <span>© 2024 MemberHub. สงวนลิขสิทธิ์ทั้งหมด</span>
          <div className="flex gap-8">
            <Link to="#" className="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว</Link>
            <Link to="#" className="hover:text-white transition-colors">เงื่อนไขการให้บริการ</Link>
            <Link to="#" className="hover:text-white transition-colors">ศูนย์ช่วยเหลือ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
