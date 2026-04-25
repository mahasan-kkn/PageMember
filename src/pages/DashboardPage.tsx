import { ShieldCheck, User, Settings, ArrowRight, ShieldCheck as AdminShield } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();
  const firstName = user?.name.split(' ')[0] || 'Alex';

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-white tracking-tight">ยินดีต้อนรับคุณ {firstName}!</h1>
        <p className="text-lg text-on-surface-variant font-medium">นี่คือข้อมูลสรุปของ{user?.role === 'admin' ? 'ระบบ' : 'สมาชิก'}วันนี้</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Status */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 bg-surface/40 p-8 rounded-3xl border border-outline flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">คุณกำลังเข้าสู่ระบบอยู่</h3>
                <p className="text-on-surface-variant text-sm font-medium">เริ่มใช้งานตั้งแต่ 08:45 AM</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
              ใช้งานอยู่
            </span>
          </div>

          <div className="p-8 bg-surface-container-low/50 rounded-2xl border border-outline flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.2em]">
                {user?.role === 'admin' ? 'บทบาทปัจจุบัน' : 'แพ็กเกจปัจจุบัน'}
              </p>
              <p className="text-2xl font-bold text-white">
                {user?.role === 'admin' ? 'ผู้ดูแลระบบสูงสุด (Root Admin)' : 'พรีเมียม โปรเฟสชันแนล'}
              </p>
            </div>
            <button className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-container active:scale-95 transition-all shadow-lg shadow-primary/20">
              {user?.role === 'admin' ? 'จัดการระบบ' : 'จัดการแพ็กเกจ'}
            </button>
          </div>
        </motion.div>

        {/* Quick Links */}
        <div className="space-y-6">
          <Link to="/profile" className="block group bg-surface/40 p-6 rounded-3xl border border-outline hover:bg-surface/60 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-xl bg-surface-container border border-outline group-hover:text-primary transition-colors">
                <User size={24} />
              </div>
              <div>
                <p className="font-bold text-white group-hover:text-primary transition-colors">ดูโปรไฟล์</p>
                <p className="text-xs text-on-surface-variant font-medium">อัปเดตข้อมูลของคุณ</p>
              </div>
            </div>
          </Link>
          <Link to="/account" className="block group bg-surface/40 p-6 rounded-3xl border border-outline hover:bg-surface/60 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-xl bg-surface-container border border-outline group-hover:text-primary transition-colors">
                <Settings size={24} />
              </div>
              <div>
                <p className="font-bold text-white group-hover:text-primary transition-colors">ตั้งค่า</p>
                <p className="text-xs text-on-surface-variant font-medium">ความเป็นส่วนตัวและการตั้งค่า</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="relative h-80 w-full rounded-3xl overflow-hidden group border border-outline"
      >
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_eTPadsBJxlCyE3_r11cczplU10B0fTir-flCGnpuxOmK576PPZfyvMET2WrDL7z_f2Xn0AzpyFrfZjXLoJxcOIbxY-l0163D_3seeVjbXa2t8bIaD7ug41tuDguzB4fQODeRyuESYMYAzRf2oUtAxLFKKbQKtpXgEDnjx0uOYKUFqweJlAdcbyovTAkIuEzIehidiBzuvM1Tv8K_2c_jRyWj9hXiWVYxAoIzjALomAxRmQPxONWz78-AJC4K4bR3NAxRN4g1He8" 
          alt="Community Banner"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent flex items-center p-10 md:p-14">
          <div className="max-w-md text-white space-y-6">
            <h3 className="text-3xl font-black leading-tight tracking-tight">เข้าร่วมกิจกรรม Member Mixer ประจำสัปดาห์</h3>
            <p className="text-base text-on-surface-variant leading-relaxed font-semibold">
              เชื่อมต่อกับสมาชิกพรีเมียมคนอื่นๆ กว่า 200 ท่านในวันศุกร์นี้ที่ศูนย์กลางดิจิทัลของเรา
            </p>
            <button className="inline-flex items-center gap-3 px-8 py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-container transition-all shadow-xl shadow-primary/20">
              ตอบรับการเข้าร่วม
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
