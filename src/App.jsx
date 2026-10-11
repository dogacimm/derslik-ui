import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Flame,
  GraduationCap,
  House,
  LibraryBig,
  Menu,
  NotebookPen,
  Search,
  Settings,
  Sparkles,
  Star,
  Target,
  Trophy,
  X,
} from 'lucide-react';

const navItems = [
  { label: 'Ana Sayfa', icon: House },
  { label: 'Not Defterim', icon: NotebookPen },
  { label: 'Hatırlatmalar', icon: Bell },
  { label: 'İlerlemem', icon: Target },
  { label: 'Takvim & Program', icon: CalendarDays },
  { label: 'Eğitim Kütüphanesi', icon: LibraryBig },
];

const subjects = [
  { name: 'Matematik', detail: 'Fonksiyonlar', color: 'violet', progress: 72, icon: '∑' },
  { name: 'Biyoloji', detail: 'Hücre bölünmeleri', color: 'mint', progress: 46, icon: '✿' },
  { name: 'Edebiyat', detail: 'Şiir bilgisi', color: 'peach', progress: 88, icon: '✎' },
];

const initialTasks = [
  { id: 1, text: 'Matematik testinden 15 soru çöz', done: true },
  { id: 2, text: 'Biyoloji konu özetini oku', done: false },
  { id: 3, text: 'Yarının ders çantasını hazırla', done: false },
  { id: 4, text: 'Ders planına 20 dakika çalış', done: true },
];

const schedule = [
  { time: '09:00', title: 'Matematik', detail: 'Fonksiyon tekrar', tag: 'Ödev' },
  { time: '11:30', title: 'Biyoloji', detail: 'Hücreler', tag: 'Kısa tekrar' },
  { time: '15:00', title: 'Edebiyat', detail: 'Şiir analizi', tag: 'İnceleme' },
];

const notesSeed = [
  'Matematikte fonksiyon örneklerini çözmeyi unutma.',
  'Bugün 3 sayfa deneme oku.',
  'Biyoloji notlarını özetleyip tekrar et.',
];

function App() {
  const [active, setActive] = useState('Ana Sayfa');
  const [mobileNav, setMobileNav] = useState(false);
  const [search, setSearch] = useState('');
  const [tasks, setTasks] = useState(initialTasks);
  const [notes, setNotes] = useState(notesSeed);
  const [noteDraft, setNoteDraft] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const filteredSubjects = useMemo(() => {
    const value = search.trim().toLowerCase();
    if (!value) return subjects;
    return subjects.filter((item) => `${item.name} ${item.detail}`.toLowerCase().includes(value));
  }, [search]);

  const doneCount = tasks.filter((task) => task.done).length;

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  }

  function addNote(e) {
    e.preventDefault();
    if (!noteDraft.trim()) return;
    setNotes((current) => [noteDraft.trim(), ...current]);
    setNoteDraft('');
  }

  return (
    <div className={`app-shell ${darkMode ? 'theme-dark' : ''}`}>
      {mobileNav && (
        <button className="scrim" aria-label="Menüyü kapat" onClick={() => setMobileNav(false)} />
      )}

      <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark">
            <Star size={20} fill="currentColor" />
          </div>
          <div>
            <span className="brand-name">
              Derslik<span className="brand-dot">.</span>
            </span>
            <span className="brand-sub">KENDİNE AİT BİR ALAN</span>
          </div>
          <button className="mobile-close" aria-label="Menüyü kapat" onClick={() => setMobileNav(false)}>
            <X size={16} />
          </button>
        </div>

        <div className="side-label">ÇALIŞMA ALANIN</div>

        <nav className="nav-list">
          {navItems.map(({ label, icon: Icon }, index) => (
            <button
              key={label}
              type="button"
              className={`nav-item ${active === label ? 'nav-active' : ''}`}
              onClick={() => {
                setActive(label);
                setMobileNav(false);
              }}
            >
              <span className={`nav-icon nav-icon-${index}`}>
                <Icon size={18} />
              </span>
              <span>{label}</span>
              {active === label && <span className="active-dot" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="streak-card">
            <div className="streak-top">
              <span className="streak-icon">
                <Flame size={17} fill="currentColor" />
              </span>
              <span>Minik bir seri!</span>
            </div>
            <strong>3 gün üst üste</strong>
            <div className="streak-days">
              <span className="done">P</span>
              <span className="done">S</span>
              <span className="done">Ç</span>
              <span>Pe</span>
              <span>C</span>
              <span>Ct</span>
              <span>Pz</span>
            </div>
          </div>

          <button type="button" className="nav-item settings-item" onClick={() => setActive('Ayarlar')}>
            <span className="nav-icon nav-icon-6">
              <Settings size={18} />
            </span>
            <span>Ayarlar</span>
          </button>

          <div className="profile-row">
            <div className="avatar">D</div>
            <div className="profile-copy">
              <strong>Merhaba, öğrenci!</strong>
              <span>Bugün harika işler yapalım</span>
            </div>
            <Sparkles size={16} className="profile-spark" />
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button className="menu-toggle" aria-label="Menüyü aç" onClick={() => setMobileNav(true)}>
            <Menu size={18} />
          </button>

          <div className="breadcrumb">
            Çalışma alanın <ChevronRight size={13} /> <strong>{active}</strong>
          </div>

          <div className="top-actions">
            <label className="search-box">
              <Search size={16} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Bir şey ara..." />
            </label>

            <button type="button" className="notification-button" aria-label="Bildirimler">
              <Bell size={17} />
              <i />
            </button>

            <button type="button" className="theme-toggle" aria-label="Tema değiştir" onClick={() => setDarkMode((value) => !value)}>
              {darkMode ? '☀️' : '🌙'}
            </button>

            <div className="top-avatar">D</div>
          </div>
        </header>

        <div className="page-content">
          <section className="hero-card">
            <div className="hero-copy">
              <div className="hero-chip">
                <Sparkles size={12} /> BUGÜNÜN MOTİVASYONU
              </div>
              <h1>
                Hayallerine giden yol <span>bugün</span> başlar.
              </h1>
              <p>
                Küçük adımlar, büyük sonuçlar doğurur. Senin için en değerli zaman, bu sabahın içindeki en iyi çalışmadır.
              </p>
              <button type="button" className="hero-button" onClick={() => setActive('Takvim & Program')}>
                Çalışmaya başla <ArrowRight size={16} />
              </button>
            </div>

            <div className="hero-illustration" aria-label="Derslik yıldız maskotu">
              <div className="orb orb-1" />
              <div className="orb orb-2" />
              <div className="orb orb-3" />
              <div className="star-wrap">
                <div className="star-core">
                  <span className="spark spark-a">✦</span>
                  <span className="spark spark-b">✧</span>
                  <span className="spark spark-c">✦</span>
                  <svg viewBox="0 0 300 300" role="img" aria-label="Derslik yıldız karakteri">
                    <defs>
                      <linearGradient id="starFace" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#f2d1ff" />
                        <stop offset="30%" stopColor="#c78af9" />
                        <stop offset="70%" stopColor="#8f5bf5" />
                        <stop offset="100%" stopColor="#5b27d4" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M150 20 C171 72 185 105 216 115 C248 125 270 134 288 150 C266 166 244 174 214 185 C184 196 169 229 150 284 C131 229 116 196 86 185 C56 174 34 166 12 150 C30 134 52 125 84 115 C115 105 129 72 150 20Z"
                      fill="url(#starFace)"
                    />
                    <path d="M150 25 C168 78 182 108 206 118 C233 129 252 136 269 150 C250 163 228 171 202 181 C178 190 164 220 150 262 C136 220 122 190 98 181 C72 171 50 163 31 150 C48 136 67 129 94 118 C118 108 132 78 150 25Z" fill="rgba(255,255,255,0.18)" />
                    <ellipse cx="119" cy="148" rx="9" ry="13" fill="#2f214f" />
                    <ellipse cx="181" cy="148" rx="9" ry="13" fill="#2f214f" />
                    <circle cx="121" cy="144" r="3" fill="#fff" />
                    <circle cx="184" cy="144" r="3" fill="#fff" />
                    <path d="M136 171 Q150 184 164 171" fill="none" stroke="#352061" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          <section className="metrics-grid">
            <div className="metric-card purple">
              <div className="metric-icon">
                <Clock3 size={18} />
              </div>
              <span className="metric-label">Çalışma süresi</span>
              <strong>1 sa 25 dk</strong>
              <small>Hedefine çok yakınsın</small>
            </div>

            <div className="metric-card pink">
              <div className="metric-icon">
                <Target size={18} />
              </div>
              <span className="metric-label">Günlük hedef</span>
              <strong>2 / 3</strong>
              <div className="mini-progress">
                <span style={{ width: '67%' }} />
              </div>
            </div>

            <div className="metric-card yellow">
              <div className="metric-icon">
                <Flame size={18} />
              </div>
              <span className="metric-label">Çalışma serin</span>
              <strong>3 gün</strong>
              <small>Devam et, yıldız ol!</small>
            </div>

            <div className="metric-card mint">
              <div className="metric-icon">
                <Trophy size={18} />
              </div>
              <span className="metric-label">Toplanan puan</span>
              <strong>128</strong>
              <small>Her adım bir başarı</small>
            </div>
          </section>

          <section className="content-grid">
            <div className="panel">
              <div className="panel-head">
                <div>
                  <p className="eyebrow-small">Bugün</p>
                  <h2>Mini görevler</h2>
                </div>
                <span className="task-badge">{doneCount}/{tasks.length}</span>
              </div>

              <div className="task-bar">
                <span style={{ width: `${(doneCount / tasks.length) * 100}%` }} />
              </div>

              <div className="task-list">
                {tasks.map((task) => (
                  <button
                    key={task.id}
                    type="button"
                    className={`task-row ${task.done ? 'done' : ''}`}
                    onClick={() => toggleTask(task.id)}
                  >
                    <span className="task-check">{task.done && <Check size={12} />}</span>
                    <span className="task-text">{task.text}</span>
                    {task.done && <span className="task-status">Tamamlandı</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="panel-head">
                <div>
                  <p className="eyebrow-small">Kursunu</p>
                  <h2>Ders köşesi</h2>
                </div>
                <button type="button" className="icon-button" aria-label="Ders ekle">
                  <Star size={15} />
                </button>
              </div>

              <div className="subject-list">
                {filteredSubjects.map((subject) => (
                  <button
                    key={subject.name}
                    type="button"
                    className="subject-row"
                    onClick={() => setActive('Eğitim Kütüphanesi')}
                  >
                    <div className={`subject-symbol ${subject.color}`}>{subject.icon}</div>
                    <div className="subject-body">
                      <strong>{subject.name}</strong>
                      <span>{subject.detail}</span>
                      <div className="subject-progress">
                        <span style={{ width: `${subject.progress}%` }} />
                      </div>
                    </div>
                    <span className="subject-percent">%{subject.progress}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="bottom-grid">
            <div className="panel">
              <div className="panel-head">
                <div>
                  <p className="eyebrow-small">Önceden</p>
                  <h2>Program</h2>
                </div>
                <button type="button" className="icon-button" aria-label="Programı aç">
                  <CalendarDays size={15} />
                </button>
              </div>

              <div className="schedule-list">
                {schedule.map((item) => (
                  <div key={item.time} className="schedule-item">
                    <div className="schedule-time">{item.time}</div>
                    <div className="schedule-copy">
                      <strong>{item.title}</strong>
                      <span>{item.detail}</span>
                    </div>
                    <span className="schedule-tag">{item.tag}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="panel-head">
                <div>
                  <p className="eyebrow-small">Kısa</p>
                  <h2>Notlar</h2>
                </div>
                <button type="button" className="icon-button" aria-label="Not ekle">
                  <NotebookPen size={15} />
                </button>
              </div>

              <form className="note-form" onSubmit={addNote}>
                <input value={noteDraft} onChange={(e) => setNoteDraft(e.target.value)} placeholder="Yeni notunu yaz..." />
                <button type="submit">Ekle</button>
              </form>

              <div className="note-list">
                {notes.map((note, index) => (
                  <div key={`${note}-${index}`} className="note-item">
                    <span className="note-dot">✦</span>
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="focus-strip">
            <div className="focus-copy">
              <p className="eyebrow-small">Bugünkü merkez</p>
              <h3>Derin odaklama için 25 dakikalık çalışma bloğu</h3>
            </div>
            <button type="button" className="focus-button" onClick={() => setActive('Takvim & Program')}>
              Planı aç <ArrowRight size={15} />
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
