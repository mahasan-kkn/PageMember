import { Star, ShieldCheck, Mail, History, Monitor, Bell, Landmark, LogOut, ChevronRight, CheckCircle2, RefreshCw as Sync } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function ProfileSettingsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest hover:text-white transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          กลับสู่แดชบอร์ด
        </Link>
      </div>
      <header className="space-y-2">
        <h1 className="text-4xl font-black text-white tracking-tight">ตั้งค่าโปรไฟล์</h1>
        <p className="text-lg text-on-surface-variant font-medium">จัดการข้อมูลส่วนตัวและความปลอดภัยของคุณ</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Profile Info */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-surface/40 p-10 rounded-3xl border border-outline">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">รายละเอียดส่วนตัว</h2>
              <span className="inline-flex px-4 py-1 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-widest border border-primary/20">
                สมาชิกปัจจุบัน
              </span>
            </div>

            <form className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] ml-1">ชื่อ-นามสกุล</label>
                  <input 
                    type="text" 
                    defaultValue="Alex Rivers"
                    className="w-full h-14 px-5 rounded-xl border border-outline bg-surface-container-low/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none font-bold text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] ml-1">อีเมล</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      defaultValue="alex.rivers@memberhub.com"
                      readOnly
                      className="w-full h-14 px-5 rounded-xl border border-outline bg-surface text-on-surface-variant font-bold cursor-not-allowed"
                    />
                    <Mail size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40" />
                  </div>
                  <p className="text-[10px] text-on-surface-variant font-bold px-1 uppercase tracking-wider">ติดต่อฝ่ายสนับสนุนเพื่อเปลี่ยนอีเมลหลักของคุณ</p>
                </div>
              </div>

              <div className="pt-10 border-t border-outline">
                <h3 className="text-xl font-bold text-white mb-10 tracking-tight">อัปเดตรหัสผ่าน</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] ml-1">รหัสผ่านใหม่</label>
                    <input 
                      type="password" 
                      placeholder="••••••••••••"
                      className="w-full h-14 px-5 rounded-xl border border-outline bg-surface-container-low/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] ml-1">ยืนยันรหัสผ่าน</label>
                    <input 
                      type="password" 
                      placeholder="••••••••••••"
                      className="w-full h-14 px-5 rounded-xl border border-outline bg-surface-container-low/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-6 pt-4">
                <button type="button" className="px-8 py-3 font-bold text-on-surface-variant hover:text-white hover:bg-surface-container rounded-xl transition-all h-14">ยกเลิก</button>
                <button type="submit" className="px-10 py-3 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/20 hover:bg-primary-container active:scale-95 transition-all h-14">
                  บันทึกการเปลี่ยนแปลง
                </button>
              </div>
            </form>
          </section>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-primary/5 p-8 rounded-3xl border border-primary/20 flex items-center gap-6 shadow-xl">
              <div className="w-16 h-16 bg-surface border border-primary/30 rounded-2xl flex items-center justify-center text-primary shadow-lg">
                <History size={28} />
              </div>
              <div>
                <p className="text-[10px] text-primary font-black uppercase tracking-[0.25em] mb-1">เป็นสมาชิกตั้งแต่</p>
                <p className="text-3xl font-black text-white tracking-tight">ม.ค. 2023</p>
              </div>
            </div>
            <div className="bg-surface/40 p-8 rounded-3xl border border-outline flex items-center gap-6 shadow-xl">
              <div className="w-16 h-16 bg-surface border border-outline rounded-2xl flex items-center justify-center text-on-surface-variant shadow-lg">
                <Monitor size={28} />
              </div>
              <div>
                <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.25em] mb-1">เซสชันที่ใช้งานอยู่</p>
                <p className="text-3xl font-black text-white tracking-tight">2 อุปกรณ์</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <aside className="space-y-8">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-surface/40 rounded-3xl p-10 border border-outline relative overflow-hidden shadow-2xl"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-white tracking-tight">ระดับสมาชิก</h3>
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Star size={24} className="text-primary" fill="currentColor" />
                </div>
              </div>
              <div className="mb-10">
                <span className="text-4xl font-black text-primary tracking-tighter">ระดับโกลด์</span>
              </div>
              <ul className="space-y-5">
                {[
                  'เข้าถึงคอร์สเรียนได้ไม่จำกัด',
                  'ฝ่ายสนับสนุนลำดับความสำคัญสูง (24/7)',
                  'เซสชันการให้คำปรึกษารายสัปดาห์'
                ].map((perk) => (
                  <li key={perk} className="flex items-center gap-4 text-sm font-semibold text-on-surface-variant group">
                    <CheckCircle2 size={20} className="text-primary transition-transform group-hover:scale-110" />
                    {perk}
                  </li>
                ))}
              </ul>
              <button className="w-full mt-12 py-4 rounded-xl border-2 border-primary text-primary font-black hover:bg-primary hover:text-white transition-all active:scale-95 shadow-lg shadow-primary/10">
                อัปเกรดแพ็กเกจ
              </button>
            </div>
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
          </motion.div>

          <section className="bg-surface/40 p-10 rounded-3xl border border-outline shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-8 tracking-tight">การดำเนินการด่วน</h3>
            <div className="space-y-3">
              {[
                { icon: Bell, label: 'ตั้งค่าการแจ้งเตือน' },
                { icon: Landmark, label: 'ประวัติการชำระเงิน' },
              ].map((action) => (
                <button key={action.label} className="w-full flex items-center justify-between p-5 rounded-2xl hover:bg-surface-container transition-all group border border-outline hover:border-primary/30">
                  <div className="flex items-center gap-4">
                    <action.icon size={22} className="text-on-surface-variant group-hover:text-primary transition-colors" />
                    <span className="font-bold text-white">{action.label}</span>
                  </div>
                  <ChevronRight size={20} className="text-outline group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </button>
              ))}
              <div className="h-6" />
              <button className="w-full flex items-center gap-4 p-5 rounded-2xl bg-error/5 hover:bg-error/10 text-error font-black transition-all group border border-error/10">
                <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
                <span>ออกจากระบบ</span>
              </button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
