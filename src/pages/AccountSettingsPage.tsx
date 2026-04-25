import { Palette, Moon, Bell, Shield, RefreshCw as Sync, Save, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useState } from 'react';

const Toggle = ({ active, onToggle }: { active: boolean, onToggle: () => void }) => (
  <button 
    onClick={onToggle}
    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
      active ? 'bg-primary' : 'bg-outline-variant'
    }`}
  >
    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
      active ? 'translate-x-5' : 'translate-x-0'
    }`} />
  </button>
);

export default function AccountSettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [billingNotif, setBillingNotif] = useState(true);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest hover:text-white transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          กลับสู่แดชบอร์ด
        </Link>
      </div>
      <header className="space-y-2">
        <h1 className="text-4xl font-black text-white tracking-tight">ตั้งค่าบัญชี</h1>
        <p className="text-lg text-on-surface-variant max-w-2xl font-medium">
          จัดการการตั้งค่าสมาชิก การแจ้งเตือน และปรับแต่งประสบการณ์ MemberHub ของคุณ
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Appearance */}
        <motion.section 
          whileHover={{ y: -4 }}
          className="md:col-span-7 bg-surface/40 p-10 rounded-3xl border border-outline flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Palette size={24} />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">รูปลักษณ์</h3>
            </div>
            <p className="text-on-surface-variant mb-10 font-medium">ปรับแต่งหน้าตาของ MemberHub บนอุปกรณ์ของคุณ</p>
          </div>
          <div className="flex items-center justify-between p-5 bg-surface-container-low/50 border border-outline rounded-2xl">
            <div className="flex items-center gap-3">
              <Moon size={20} className="text-on-surface-variant" />
              <span className="font-bold text-white">โหมดมืด</span>
            </div>
            <Toggle active={darkMode} onToggle={() => setDarkMode(!darkMode)} />
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section 
          whileHover={{ y: -4 }}
          className="md:col-span-5 bg-primary/20 p-10 text-white rounded-3xl border border-primary/30 flex flex-col justify-center items-center text-center space-y-3"
        >
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-2 border border-primary/30">
            <Star size={32} fill="currentColor" className="text-primary" />
          </div>
          <div className="text-3xl font-black tracking-tight">254 วัน</div>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-80">สมาชิกพรีเมียมยังคงใช้งานได้</p>
        </motion.section>

        {/* Notifications */}
        <section className="md:col-span-12 bg-surface/40 p-10 rounded-3xl border border-outline">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Bell size={24} />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">การแจ้งเตือน</h3>
          </div>
          
          <div className="space-y-4">
            {[
              { label: 'อัปเดตทางอีเมล', desc: 'สรุปรายสัปดาห์และข่าวสารสมาชิก', active: emailUpdates, setter: setEmailUpdates },
              { label: 'การแจ้งเตือนแบบพุช', desc: 'แจ้งเตือนกิจกรรมสมาชิกแบบเรียลไทม์', active: pushNotif, setter: setPushNotif },
              { label: 'แจ้งเตือนการเรียกเก็บเงิน', desc: 'ข้อมูลสำคัญเกี่ยวกับการสมัครสมาชิกของคุณ', active: billingNotif, setter: setBillingNotif }
            ].map((item, idx, arr) => (
              <div key={item.label} className={`flex items-center justify-between py-5 ${idx !== arr.length - 1 ? 'border-b border-outline' : ''}`}>
                <div className="flex flex-col">
                  <span className="font-bold text-white">{item.label}</span>
                  <span className="text-sm text-on-surface-variant font-medium">{item.desc}</span>
                </div>
                <Toggle active={item.active} onToggle={() => item.setter(!item.active)} />
              </div>
            ))}
          </div>
        </section>

        {/* Security Info */}
        <section className="md:col-span-8 bg-surface-container-low/30 rounded-3xl p-10 flex flex-col sm:flex-row items-center gap-8 border border-outline">
          <div className="w-16 h-16 rounded-2xl bg-surface border border-outline flex items-center justify-center text-primary shadow-xl flex-shrink-0">
            <Shield size={32} />
          </div>
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-black text-white mb-1">ความปลอดภัยและความเป็นส่วนตัว</h4>
            <p className="text-on-surface-variant text-sm mb-5 font-medium leading-relaxed">บัญชีของคุณได้รับการปกป้องด้วย 2FA และการเข้ารหัสระดับองค์กร</p>
            <button className="text-primary font-bold text-sm hover:text-white transition-colors flex items-center gap-2">
              จัดการการตั้งค่าความปลอดภัย 
              <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* Sync Card */}
        <section className="md:col-span-4 bg-surface/40 p-8 rounded-3xl border border-outline relative overflow-hidden group">
          <div className="relative z-10">
            <h4 className="font-bold text-sm text-white mb-1">ซิงค์โปรไฟล์</h4>
            <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-wider mb-6">ซิงค์ล่าสุด: วันนี้ 10:45 น.</p>
            <div className="flex -space-x-3">
              {[1, 2].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-4 border-surface bg-surface-container-highest overflow-hidden">
                  <img src={`https://i.pravatar.cc/40?u=${i}`} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-4 border-surface bg-primary text-white flex items-center justify-center">
                <Sync size={16} />
              </div>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 text-primary/5 group-hover:text-primary/10 transition-colors">
            <Sync size={140} />
          </div>
        </section>
      </div>

      <footer className="flex items-center justify-end gap-6 pt-10 border-t border-outline">
        <button className="px-8 py-3 font-bold text-on-surface-variant hover:text-white hover:bg-surface-container rounded-xl transition-all h-14">
          ยกเลิก
        </button>
        <button className="px-12 py-3 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/20 hover:bg-primary-container active:scale-95 transition-all h-14 flex items-center gap-3">
          <Save size={20} />
          บันทึกการตั้งค่า
        </button>
      </footer>
    </div>
  );
}

const ArrowRight = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
