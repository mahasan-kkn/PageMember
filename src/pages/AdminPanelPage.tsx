import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Users, UserPlus, Search, Edit2, Trash2, Shield, MoreHorizontal, Mail, Calendar, X, Save, Check, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

interface Member {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  tier: 'free' | 'premium' | 'gold';
  joinedAt: string;
}

export default function AdminPanelPage() {
  const { user: currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<Partial<Member>>({
    name: '',
    email: '',
    role: 'member',
    tier: 'free'
  });

  // Mock members data
  const [members, setMembers] = useState<Member[]>([
    { id: '1', name: 'Sarah Jenkins', email: 'sarah@example.com', role: 'member', tier: 'premium', joinedAt: '2023-05-12' },
    { id: '2', name: 'Michael Chen', email: 'mchen@tech.io', role: 'member', tier: 'gold', joinedAt: '2023-08-20' },
    { id: '3', name: 'Alisa Thorne', email: 'alisa.t@design.com', role: 'member', tier: 'free', joinedAt: '2024-01-05' },
    { id: '4', name: 'David Smith', email: 'dsmith@corp.com', role: 'member', tier: 'premium', joinedAt: '2023-11-30' },
    { id: 'admin-1', name: 'Alongkorn Meesin', email: 'alongkorn.meesin@gmail.com', role: 'admin', tier: 'gold', joinedAt: '2023-01-01' },
  ]);

  if (currentUser?.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center text-error border border-error/20">
          <Shield size={40} />
        </div>
        <h1 className="text-2xl font-black text-white">เข้าถึงไม่ได้</h1>
        <p className="text-on-surface-variant max-w-sm">คุณไม่มีสิทธิ์เข้าถึงหน้านี้ เฉพาะผู้ดูแลระบบเท่านั้น</p>
        <Link to="/" className="text-primary font-bold hover:underline">กลับสู่แดชบอร์ด</Link>
      </div>
    );
  }

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setEditingMember(null);
    setFormData({ name: '', email: '', role: 'member', tier: 'free' });
    setIsModalOpen(true);
  };

  const openEditModal = (member: Member) => {
    setEditingMember(member);
    setFormData(member);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      setMembers(members.map(m => m.id === editingMember.id ? { ...m, ...formData } as Member : m));
    } else {
      const newMember: Member = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        joinedAt: new Date().toISOString().split('T')[0]
      } as Member;
      setMembers([newMember, ...members]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบสมาชิกรายนี้?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest hover:text-white transition-colors">
          <ArrowLeft size={16} strokeWidth={3} />
          กลับสู่แดชบอร์ด
        </Link>
      </div>

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-primary/10 rounded-lg text-primary border border-primary/20">
               <Shield size={20} />
             </div>
             <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">ADMIN CONSOLE</h4>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">จัดการสมาชิก</h1>
          <p className="text-lg text-on-surface-variant font-medium">จัดการ บัญชี สิทธิ์ และการเข้าถึงระบบทั้งหมด</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-3 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-container transition-all shadow-lg shadow-primary/20 h-fit"
        >
          <UserPlus size={20} />
          เพิ่มสมาชิกใหม่
        </button>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'สมาชิกทั้งหมด', value: members.length, icon: Users, color: 'text-primary' },
          { label: 'สมาชิกใหม่ (เดือนนี้)', value: '12', icon: Calendar, color: 'text-green-500' },
          { label: 'Admin', value: members.filter(m => m.role === 'admin').length, icon: Shield, color: 'text-amber-500' },
          { label: 'รายได้ประมาณการ', value: '฿12,450', icon: Trash2, color: 'text-blue-500' }, // Placeholder icon
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-surface/40 p-6 rounded-2xl border border-outline"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{stat.label}</span>
              <stat.icon size={18} className={stat.color} />
            </div>
            <p className="text-3xl font-black text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Table Container */}
      <div className="bg-surface/40 rounded-3xl border border-outline overflow-hidden">
        <div className="p-6 border-b border-outline flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-96">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="ค้นหาสมาชิกด้วยชื่อ หรือ อีเมล..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surface-container-low border border-outline rounded-xl focus:ring-2 focus:ring-primary outline-none text-white text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-3 bg-surface-container rounded-xl border border-outline text-on-surface-variant hover:text-white transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">สมาชิก</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">ระดับ</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">บทบาท</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">วันที่เข้าร่วม</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface-container border border-outline overflow-hidden">
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.id}`} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-white group-hover:text-primary transition-colors">{member.name}</p>
                        <p className="text-xs text-on-surface-variant">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                      member.tier === 'gold' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      member.tier === 'premium' ? 'bg-primary/10 text-primary border-primary/20' :
                      'bg-surface-container text-on-surface-variant border-outline'
                    }`}>
                      {member.tier}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-on-surface font-semibold">
                      {member.role === 'admin' ? (
                        <Shield size={14} className="text-amber-500" />
                      ) : (
                        <Users size={14} className="text-primary" />
                      )}
                      {member.role === 'admin' ? 'Admin' : 'Member'}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-on-surface-variant font-medium">
                    {new Date(member.joinedAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                         onClick={() => openEditModal(member)}
                         className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant hover:text-white transition-colors"
                        >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(member.id)}
                        className="p-2 hover:bg-error/10 rounded-lg text-on-surface-variant hover:text-error transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredMembers.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-on-surface-variant font-medium">ไม่พบสมาชิกที่ตรงตามเงื่อนไขการค้นหา</p>
            </div>
          )}
        </div>
      </div>

      {/* CRUD Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-surface border border-outline rounded-3xl shadow-2xl overflow-hidden z-10"
            >
              <div className="p-8 border-b border-outline flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    {editingMember ? 'แก้ไขข้อมูลสมาชิก' : 'เพิ่มสมาชิกใหม่'}
                  </h3>
                  <p className="text-sm text-on-surface-variant mt-1">กรอกข้อมูลรายละเอียดของสมาชิกให้ครบถ้วน</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-surface-container rounded-xl text-on-surface-variant transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSave} className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest ml-1">ชื่อ-นามสกุล</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-14 px-5 rounded-xl border border-outline bg-surface-container-low/50 focus:ring-2 focus:ring-primary outline-none text-white font-bold"
                      placeholder="เช่น John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest ml-1">อีเมลแอดเดรส</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-14 px-5 rounded-xl border border-outline bg-surface-container-low/50 focus:ring-2 focus:ring-primary outline-none text-white font-bold"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest ml-1">บทบาท</label>
                      <select 
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                        className="w-full h-14 px-5 rounded-xl border border-outline bg-surface-container-low/50 focus:ring-2 focus:ring-primary outline-none text-white font-bold appearance-none"
                      >
                        <option value="member">Member</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest ml-1">สมาชิกระดับ</label>
                      <select 
                        value={formData.tier}
                        onChange={(e) => setFormData({ ...formData, tier: e.target.value as any })}
                        className="w-full h-14 px-5 rounded-xl border border-outline bg-surface-container-low/50 focus:ring-2 focus:ring-primary outline-none text-white font-bold appearance-none"
                      >
                        <option value="free">Free</option>
                        <option value="premium">Premium</option>
                        <option value="gold">Gold</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 h-14 bg-surface-container text-white font-bold rounded-xl hover:bg-surface-container-high transition-all"
                  >
                    ยกเลิก
                  </button>
                  <button 
                    type="submit" 
                    className="flex-[2] h-14 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-container transition-all flex items-center justify-center gap-2"
                  >
                    <Save size={20} />
                    บันทึกข้อมูล
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
