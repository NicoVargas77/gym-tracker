// ─── DATA ───────────────────────────────────────────────
const DAYS = [
  {
    label:'Día 1', name:'Pecho + Tríceps', badge:'PUSH',
    meta:'6 ejercicios · ~45 min · Empuje horizontal y vertical',
    warmup:'5 min caminadora + movilidad hombros',
    xp: 120,
    exercises:[
      {name:'Press banca barra olímpica',equip:'Barra olímpica + jaula',series:'4 × 8-10',rest:'2 min'},
      {name:'Press inclinado Smith',equip:'Barra Smith',series:'3 × 10-12',rest:'90s'},
      {name:'Aperturas en polea cruzada',equip:'Polea',series:'3 × 12-15',rest:'60s'},
      {name:'Fondos en jaula o banco',equip:'Jaula / banco',series:'3 × 12',rest:'60s'},
      {name:'Extensión tríceps en polea',equip:'Polea alta',series:'3 × 12-15',rest:'60s'},
      {name:'Caminadora inclinada 8-10%',equip:'Caminadora',series:'10 min',rest:'—'}
    ],
    tip:'<b>Progresión:</b> Cuando completes todas las reps limpio, sube 2.5-5kg la siguiente sesión.'
  },
  {
    label:'Día 2', name:'Espalda + Bíceps', badge:'PULL',
    meta:'6 ejercicios · ~45 min · Tirón vertical y horizontal',
    warmup:'5 min caminadora + movilidad escapular',
    xp: 130,
    exercises:[
      {name:'Peso muerto barra olímpica',equip:'Barra olímpica',series:'4 × 6-8',rest:'2 min'},
      {name:'Jalón en polea al pecho',equip:'Polea alta',series:'3 × 10-12',rest:'90s'},
      {name:'Remo con barra',equip:'Barra olímpica',series:'3 × 10-12',rest:'90s'},
      {name:'Remo en polea sentado',equip:'Polea baja',series:'3 × 12',rest:'75s'},
      {name:'Curl bíceps mancuernas alterno',equip:'Mancuernas',series:'3 × 12-15',rest:'60s'},
      {name:'Caminadora inclinada',equip:'Caminadora',series:'10 min',rest:'—'}
    ],
    tip:'<b>Peso muerto:</b> Prioridad absoluta. Si hay fatiga residual de piernas, baja el peso, no el volumen.'
  },
  {
    label:'Día 3', name:'Piernas + Glúteos', badge:'LEGS',
    meta:'5 ejercicios · ~50 min · Cuádriceps, isquio y glúteo',
    warmup:'5 min movilidad cadera + activación glúteo',
    xp: 150,
    exercises:[
      {name:'Sentadilla barra olímpica',equip:'Barra olímpica + jaula',series:'4 × 8-10',rest:'2 min'},
      {name:'Prensa en Smith (pies altos)',equip:'Barra Smith',series:'3 × 12',rest:'90s'},
      {name:'Hip thrust en Smith',equip:'Barra Smith + banco',series:'4 × 12-15',rest:'90s'},
      {name:'Extensión cuádriceps en polea',equip:'Polea baja',series:'3 × 15',rest:'60s'},
      {name:'Curl femoral con mancuerna',equip:'Mancuerna + banco',series:'3 × 12',rest:'60s'}
    ],
    tip:'<b>Sin cardio al final</b> — piernas es suficiente estímulo. Descanso activo: movilidad de cadera.'
  },
  {
    label:'Día 4', name:'Hombros + Core + Cardio', badge:'OHP',
    meta:'7 ejercicios · ~50 min · Empuje vertical + core + quema',
    warmup:'5 min movilidad rotadora + face pulls livianos',
    xp: 140,
    exercises:[
      {name:'Press militar barra olímpica',equip:'Barra olímpica',series:'4 × 8-10',rest:'2 min'},
      {name:'Elevaciones laterales mancuernas',equip:'Mancuernas',series:'3 × 15',rest:'60s'},
      {name:'Face pull en polea',equip:'Polea alta',series:'3 × 15',rest:'60s'},
      {name:'Encogimientos con barra',equip:'Barra',series:'3 × 12',rest:'60s'},
      {name:'Plancha',equip:'—',series:'3 × 45 seg',rest:'45s'},
      {name:'Crunch en polea o rueda abdominal',equip:'Polea / rueda',series:'3 × 15',rest:'60s'},
      {name:'Caminadora inclinada 8-10%, 5.5-6.5 km/h',equip:'Caminadora',series:'20 min',rest:'—'}
    ],
    tip:'<b>Face pull + cardio final:</b> Protege el manguito rotador y ataca la grasa visceral. No lo saltes.'
  }
];

// ─── LEVEL SYSTEM ───────────────────────────────────────
const LEVELS = [
  { level: 1,  xpRequired: 0,    title: 'Rango E · Principiante', color: '#6a7a9a', img: 'rank-e.jpeg' },
  { level: 2,  xpRequired: 200,  title: 'Rango E · Iniciado',     color: '#6a7a9a', img: 'rank-e.jpeg' },
  { level: 3,  xpRequired: 450,  title: 'Rango D · Aprendiz',     color: '#00b4ff', img: 'rank-d.jpeg' },
  { level: 4,  xpRequired: 750,  title: 'Rango D · Guerrero',     color: '#00b4ff', img: 'rank-d.jpeg' },
  { level: 5,  xpRequired: 1100, title: 'Rango C · Cazador',      color: '#00fff0', img: 'rank-c.jpeg' },
  { level: 6,  xpRequired: 1500, title: 'Rango C · Élite',        color: '#00fff0', img: 'rank-c.jpeg' },
  { level: 7,  xpRequired: 2000, title: 'Rango B · Maestro',      color: '#a78bfa', img: 'rank-b.jpeg' },
  { level: 8,  xpRequired: 2600, title: 'Rango B · Campeón',      color: '#a78bfa', img: 'rank-b.jpeg' },
  { level: 9,  xpRequired: 3300, title: 'Rango A · Leyenda',      color: '#ffc533', img: 'rank-a.jpeg' },
  { level: 10, xpRequired: 4100, title: 'Rango S · El Elegido',   color: '#ff3c6e', img: 'rank-s.jpeg' },
];

function getLevelData(totalXp) {
  let current = LEVELS[0];
  let next = LEVELS[1];
  for (let i = 0; i < LEVELS.length; i++) {
    if (totalXp >= LEVELS[i].xpRequired) {
      current = LEVELS[i];
      next = LEVELS[i + 1] || null;
    }
  }
  const xpInLevel = totalXp - current.xpRequired;
  const xpToNext = next ? next.xpRequired - current.xpRequired : 1;
  const pct = next ? Math.min(100, Math.round((xpInLevel / xpToNext) * 100)) : 100;
  return { current, next, xpInLevel, xpToNext, pct };
}

// ─── STATE ──────────────────────────────────────────────
function getState() {
  try { return JSON.parse(localStorage.getItem('gymState') || '{}'); } catch { return {}; }
}

function saveState(s) {
  localStorage.setItem('gymState', JSON.stringify(s));
}

function getMetrics() {
  try { return JSON.parse(localStorage.getItem('gymMetrics') || '[]'); } catch { return []; }
}

let currentDay = 0;

function getChecked(day) {
  const s = getState();
  return new Set(s.checked && s.checked[day] ? s.checked[day] : []);
}

function saveChecked(day, set) {
  const s = getState();
  if (!s.checked) s.checked = {};
  s.checked[day] = [...set];
  saveState(s);
}

// ─── CHARACTER ───────────────────────────────────────────
// NOTE: To use real images, place them in assets/characters/
// and name them: rank-e.png, rank-d.png, rank-c.png, rank-b.png, rank-a.png, rank-s.png
// The drawCharacter function will automatically use them if found.
function drawCharacter(level, auraColor, imgFile) {
  const wrap = document.getElementById('charSvgWrap');
  const col = auraColor || '#00b4ff';

  // Update aura color
  document.getElementById('charAura').style.background =
    `radial-gradient(circle, rgba(${hexToRgb(col)},0.2) 0%, transparent 70%)`;

  // Try image first, fall back to SVG
  const imgPath = `assets/characters/${imgFile}`;
  const img = new Image();
  img.onload = () => {
    wrap.innerHTML = `
      <div class="char-aura" id="charAura" style="background: radial-gradient(circle, rgba(${hexToRgb(col)},0.2) 0%, transparent 70%)"></div>
      <img src="${imgPath}" class="char-img" alt="Character rank ${level}">
    `;
  };
  img.onerror = () => {
    // Fallback: draw SVG
    drawSVGCharacter(wrap, level, col);
  };
  img.src = imgPath;
}

function drawSVGCharacter(wrap, level, col) {
  const isHighLevel = level >= 7;
  const isSRank = level >= 9;
  let svgContent = '';

  if (isSRank) {
    svgContent = `
      <path d="M40 45 C20 30 5 50 15 70 L40 55 Z" fill="${col}" opacity="0.3"/>
      <path d="M40 45 C60 30 75 50 65 70 L40 55 Z" fill="${col}" opacity="0.3"/>
      <ellipse cx="40" cy="25" rx="12" ry="12" fill="${col}" opacity="0.9"/>
      <rect x="30" y="35" width="20" height="28" rx="4" fill="${col}" opacity="0.85"/>
      <rect x="16" y="37" width="14" height="6" rx="3" fill="${col}" opacity="0.7"/>
      <rect x="50" y="37" width="14" height="6" rx="3" fill="${col}" opacity="0.7"/>
      <rect x="31" y="61" width="8" height="20" rx="4" fill="${col}" opacity="0.7"/>
      <rect x="41" y="61" width="8" height="20" rx="4" fill="${col}" opacity="0.7"/>
      <ellipse cx="40" cy="49" rx="5" ry="5" fill="${col}" opacity="0.6"/>
      <circle cx="36" cy="24" r="2" fill="#fff" opacity="0.9"/>
      <circle cx="44" cy="24" r="2" fill="#fff" opacity="0.9"/>`;
  } else if (isHighLevel) {
    svgContent = `
      <line x1="40" y1="5" x2="40" y2="15" stroke="${col}" stroke-width="1" opacity="0.5"/>
      <line x1="15" y1="40" x2="25" y2="40" stroke="${col}" stroke-width="1" opacity="0.5"/>
      <line x1="55" y1="40" x2="65" y2="40" stroke="${col}" stroke-width="1" opacity="0.5"/>
      <ellipse cx="40" cy="22" rx="11" ry="11" fill="${col}" opacity="0.85"/>
      <rect x="27" y="32" width="26" height="28" rx="5" fill="${col}" opacity="0.8"/>
      <rect x="12" y="33" width="16" height="7" rx="3" fill="${col}" opacity="0.7"/>
      <rect x="52" y="33" width="16" height="7" rx="3" fill="${col}" opacity="0.7"/>
      <rect x="29" y="59" width="9" height="22" rx="4" fill="${col}" opacity="0.7"/>
      <rect x="42" y="59" width="9" height="22" rx="4" fill="${col}" opacity="0.7"/>
      <circle cx="36" cy="21" r="2" fill="#fff" opacity="0.95"/>
      <circle cx="44" cy="21" r="2" fill="#fff" opacity="0.95"/>
      <circle cx="40" cy="46" r="4" fill="${col}" opacity="0.5"/>`;
  } else {
    svgContent = `
      <ellipse cx="40" cy="22" rx="10" ry="10" fill="${col}" opacity="0.8"/>
      <rect x="29" y="31" width="22" height="26" rx="4" fill="${col}" opacity="0.75"/>
      <rect x="15" y="33" width="15" height="6" rx="3" fill="${col}" opacity="0.6" transform="rotate(-15 23 36)"/>
      <rect x="50" y="33" width="15" height="6" rx="3" fill="${col}" opacity="0.6" transform="rotate(15 57 36)"/>
      <rect x="30" y="56" width="8" height="22" rx="4" fill="${col}" opacity="0.65"/>
      <rect x="42" y="56" width="8" height="22" rx="4" fill="${col}" opacity="0.65"/>
      <circle cx="36" cy="21" r="1.8" fill="#fff" opacity="0.9"/>
      <circle cx="44" cy="21" r="1.8" fill="#fff" opacity="0.9"/>`;
  }

  wrap.innerHTML = `
    <div class="char-aura" id="charAura" style="background: radial-gradient(circle, rgba(${hexToRgb(col)},0.2) 0%, transparent 70%)"></div>
    <svg width="80" height="100" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      ${svgContent}
    </svg>
  `;
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

// ─── HUD ────────────────────────────────────────────────
function updateHUD() {
  const s = getState();
  const totalXp = s.totalXp || 0;
  const streak = s.streak || 0;
  const sessions = s.sessions || 0;
  const ld = getLevelData(totalXp);

  document.getElementById('headerLevel').textContent = `LVL ${ld.current.level}`;
  document.getElementById('headerXpBar').style.width = ld.pct + '%';
  document.getElementById('headerXpLabel').textContent =
    ld.next ? `${ld.xpInLevel}/${ld.xpToNext}` : 'MAX';
  document.getElementById('streakPill').textContent = `🔥 ${streak}`;

  document.getElementById('charName').textContent = `HUNTER · LVL ${ld.current.level}`;
  document.getElementById('charTitle').textContent = ld.current.title;
  document.getElementById('charTitle').style.color = ld.current.color;
  document.getElementById('charXp').textContent = totalXp;
  document.getElementById('charSessions').textContent = sessions;
  document.getElementById('charStreak').textContent = streak + '🔥';

  drawCharacter(ld.current.level, ld.current.color, ld.current.img);
}

// ─── WORKOUT RENDER ──────────────────────────────────────
function renderPills() {
  const s = getState();
  const completed = s.completedDays || [];
  document.getElementById('dayPills').innerHTML = DAYS.map((d,i) => {
    const isDone = completed.includes(i);
    return `<div class="day-pill${i===currentDay?' on':''}${isDone?' done':''}" onclick="selectDay(${i})">${d.label}</div>`;
  }).join('');
}

function renderDay() {
  const d = DAYS[currentDay];
  const checkedSet = getChecked(currentDay);
  const total = d.exercises.length;
  const done = checkedSet.size;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const s = getState();
  const completedDays = s.completedDays || [];
  const alreadyDone = completedDays.includes(currentDay);

  document.getElementById('dayContent').innerHTML = `
    <div class="wk-head">
      <span class="wk-name">${d.name}</span>
      <span class="wk-badge">${d.badge}</span>
    </div>
    <div class="wk-meta">${d.meta}</div>
    <div class="wk-warmup"><b>⚡ Calentamiento</b> ${d.warmup}</div>
    <div class="session-xp">
      <span class="session-xp-label">XP por completar esta sesión</span>
      <span class="session-xp-val">+${d.xp} XP</span>
    </div>
    <div class="session-progress">
      <div class="sp-top">
        <span class="sp-label">Progreso de sesión</span>
        <span class="sp-count">${done}/${total} ejercicios</span>
      </div>
      <div class="sp-bar"><div class="sp-fill" style="width:${pct}%"></div></div>
    </div>
    ${d.exercises.map((e,i) => {
      const isChecked = checkedSet.has(i);
      return `
        <div class="ex-row${isChecked?' completed':''}" id="exrow-${i}">
          <div class="ex-check${isChecked?' checked':''}" id="excheck-${i}" onclick="toggleExercise(${i})"></div>
          <div class="ex-info">
            <div class="ex-name">${e.name}</div>
            <div class="ex-equip">${e.equip}</div>
          </div>
          <div class="ex-right">
            <div class="ex-series">${e.series}</div>
            <div class="ex-rest">${e.rest}</div>
          </div>
        </div>`;
    }).join('')}
    ${d.tip ? `<div class="tip-box">${d.tip}</div>` : ''}
    <button class="complete-btn" id="completeBtn" onclick="completeSession()"
      ${alreadyDone ? 'disabled' : ''}>
      ${alreadyDone ? '✓ SESIÓN COMPLETADA' : '⚡ COMPLETAR SESIÓN · +' + d.xp + ' XP'}
    </button>
  `;
}

function toggleExercise(idx) {
  const checkedSet = getChecked(currentDay);
  if (checkedSet.has(idx)) {
    checkedSet.delete(idx);
  } else {
    checkedSet.add(idx);
  }
  saveChecked(currentDay, checkedSet);
  renderDay();
}

function completeSession() {
  const s = getState();
  const d = DAYS[currentDay];
  const completedDays = s.completedDays || [];
  if (completedDays.includes(currentDay)) return;

  const prevXp = s.totalXp || 0;
  const prevLevel = getLevelData(prevXp).current.level;

  const checkedSet = getChecked(currentDay);
  const bonus = checkedSet.size === d.exercises.length ? 30 : 0;
  const xpGained = d.xp + bonus;

  s.totalXp = prevXp + xpGained;
  s.sessions = (s.sessions || 0) + 1;
  completedDays.push(currentDay);
  s.completedDays = completedDays;

  const today = new Date().toDateString();
  if (s.lastSessionDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    s.streak = s.lastSessionDate === yesterday ? (s.streak || 0) + 1 : 1;
    s.lastSessionDate = today;
  }

  saveState(s);

  const newLevel = getLevelData(s.totalXp).current.level;
  const leveledUp = newLevel > prevLevel;

  updateHUD();
  renderPills();
  renderDay();

  if (leveledUp) {
    triggerLevelUp(newLevel, getLevelData(s.totalXp).current.title);
  } else {
    showToast(bonus > 0
      ? `+${xpGained} XP 🎯 BONUS por completar todo!`
      : `+${xpGained} XP ganados!`);
  }
}

// ─── LEVEL UP EFFECTS ────────────────────────────────────
function triggerLevelUp(level, title) {
  const flash = document.getElementById('levelupFlash');
  flash.classList.add('show');
  setTimeout(() => flash.classList.remove('show'), 1500);

  const emojis = ['⚡','✨','🔵','💫','🌟'];
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.className = 'particle';
      p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      p.style.left = (20 + Math.random() * 60) + '%';
      p.style.top = (40 + Math.random() * 20) + '%';
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1500);
    }, i * 80);
  }

  showToast(`⚡ LEVEL UP · LVL ${level} · ${title}`);
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function selectDay(i) {
  currentDay = i;
  renderPills();
  renderDay();
}

function showTab(id, btn) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('on'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('on'));
  document.getElementById(id).classList.add('on');
  btn.classList.add('on');
  if (id === 'metrics') renderLatest();
  if (id === 'history') renderHistory();
}

// ─── METRICS ─────────────────────────────────────────────
function saveMetric() {
  const f = {
    fecha: document.getElementById('mDate').value,
    peso: document.getElementById('mPeso').value,
    grasa: document.getElementById('mGrasa').value,
    musculo: document.getElementById('mMusculo').value,
    visceral: document.getElementById('mVisceral').value,
    tmb: document.getElementById('mTmb').value,
    agua: document.getElementById('mAgua').value,
    esq: document.getElementById('mEsq').value,
    prot: document.getElementById('mProt').value,
    osea: document.getElementById('mOsea').value
  };
  if (!f.fecha || !f.peso) { alert('Fecha y peso son obligatorios'); return; }
  const list = getMetrics();
  list.unshift(f);
  localStorage.setItem('gymMetrics', JSON.stringify(list));
  ['mPeso','mGrasa','mMusculo','mVisceral','mTmb','mAgua','mEsq','mProt','mOsea'].forEach(id => {
    document.getElementById(id).value = '';
  });
  showToast('✓ Medición guardada');
  renderLatest();
}

function renderLatest() {
  const list = getMetrics();
  const c = document.getElementById('latestSummary');
  if (!list.length) { c.innerHTML = ''; return; }
  const l = list[0];
  const warn = parseFloat(l.visceral || 0) >= 10
    ? `<div class="alert-box"><b>⚠ Grasa visceral ${l.visceral}</b> — zona de atención. Priorizar piernas + caminadora inclinada.</div>`
    : '';
  c.innerHTML = `${warn}
    <div class="section-label" style="margin-bottom:10px">ÚLTIMA MEDICIÓN · ${l.fecha}</div>
    <div class="summary-grid">
      <div class="sum-card"><div class="sum-label">Peso</div><div class="sum-val">${l.peso} <span class="sum-unit">kg</span></div></div>
      <div class="sum-card"><div class="sum-label">Grasa</div><div class="sum-val">${l.grasa} <span class="sum-unit">%</span></div></div>
      <div class="sum-card"><div class="sum-label">Músculo</div><div class="sum-val">${l.musculo} <span class="sum-unit">%</span></div></div>
      <div class="sum-card"><div class="sum-label">Visceral</div><div class="sum-val">${l.visceral} <span class="sum-unit">idx</span></div></div>
    </div>`;
}

// ─── HISTORY ─────────────────────────────────────────────
let chartInstance = null;

function renderHistory() {
  const list = getMetrics();
  const c = document.getElementById('historyList');

  const sorted = [...list].sort((a,b) => a.fecha.localeCompare(b.fecha));
  const labels = sorted.map(l => { const [y,m,d] = l.fecha.split('-'); return `${d}/${m}`; });
  const pesoData = sorted.map(l => parseFloat(l.peso) || null);
  const grasaData = sorted.map(l => parseFloat(l.grasa) || null);

  if (chartInstance) { chartInstance.destroy(); chartInstance = null; }

  if (sorted.length >= 1) {
    const ctx = document.getElementById('progressChart').getContext('2d');
    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Peso (kg)',
            data: pesoData,
            borderColor: '#00b4ff',
            backgroundColor: 'rgba(0,180,255,0.06)',
            borderWidth: 2,
            pointBackgroundColor: '#00b4ff',
            pointRadius: 4,
            tension: 0.3,
            fill: true,
            yAxisID: 'yPeso'
          },
          {
            label: 'Grasa (%)',
            data: grasaData,
            borderColor: '#00ff88',
            backgroundColor: 'rgba(0,255,136,0.04)',
            borderWidth: 2,
            pointBackgroundColor: '#00ff88',
            pointRadius: 4,
            tension: 0.3,
            fill: true,
            yAxisID: 'yGrasa'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0d0d22',
            borderColor: 'rgba(0,180,255,0.2)',
            borderWidth: 1,
            titleColor: '#6a7a9a',
            bodyColor: '#e8f0ff',
            padding: 10,
            callbacks: {
              label: ctx => ctx.dataset.label + ': ' + (ctx.parsed.y !== null ? ctx.parsed.y.toFixed(1) : '—')
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(0,180,255,0.04)' },
            ticks: { color: '#3a4a6a', font: { family: "'Orbitron'", size: 9 } }
          },
          yPeso: {
            position: 'left',
            grid: { color: 'rgba(0,180,255,0.04)' },
            ticks: { color: '#00b4ff', font: { family: "'Orbitron'", size: 9 }, callback: v => v + 'kg' }
          },
          yGrasa: {
            position: 'right',
            grid: { drawOnChartArea: false },
            ticks: { color: '#00ff88', font: { family: "'Orbitron'", size: 9 }, callback: v => v + '%' }
          }
        }
      }
    });
  }

  if (!list.length) {
    c.innerHTML = '<div class="empty"><span>📊</span>Sin registros aún.<br>Agrega tu primera medición en Stats.</div>';
    return;
  }

  c.innerHTML = list.map((l, idx) => `
    <div class="hist-card">
      <div class="hist-head">
        <span class="hist-date">${l.fecha}</span>
        <span class="hist-weight">${l.peso} kg</span>
        <button class="hist-delete" onclick="deleteMetric(${idx})">✕ BORRAR</button>
      </div>
      <div class="hist-stats">
        ${l.grasa ? `<span class="hstat">Grasa <b>${l.grasa}%</b></span>` : ''}
        ${l.musculo ? `<span class="hstat">Músculo <b>${l.musculo}%</b></span>` : ''}
        ${l.visceral ? `<span class="hstat">Visceral <b>${l.visceral}</b></span>` : ''}
        ${l.tmb ? `<span class="hstat">TMB <b>${l.tmb}kcal</b></span>` : ''}
        ${l.agua ? `<span class="hstat">Agua <b>${l.agua}%</b></span>` : ''}
        ${l.prot ? `<span class="hstat">Proteína <b>${l.prot}%</b></span>` : ''}
      </div>
    </div>`).join('');
}

// ─── DELETE METRIC ───────────────────────────────────────
function deleteMetric(idx) {
  const list = getMetrics();
  list.splice(idx, 1);
  localStorage.setItem('gymMetrics', JSON.stringify(list));
  showToast('Registro eliminado');
  renderHistory();
  renderLatest();
}

// ─── INIT ────────────────────────────────────────────────
document.getElementById('mDate').value = new Date().toISOString().split('T')[0];
updateHUD();
renderPills();
renderDay();
renderLatest();
