# LevelUp Trainer — Contexto del Proyecto

## Qué es esto
App de tracking de gym con sistema de gamificación estilo RPG (inspirado en "Arise: Level Up In Real Life" y el manhwa Solo Leveling). Diseñada como PWA mobile-first para iPhone, máximo 430px de ancho.

## Stack
- HTML5 + CSS3 + Vanilla JS (sin frameworks)
- Chart.js 4.4.1 para gráficos
- localStorage para persistencia de datos
- PWA con manifest.json y service worker (sw.js)
- Fuentes: Orbitron (títulos/HUD), Rajdhani (UI), Inter (cuerpo)

## Estructura de archivos
```
levelup-trainer/
├── index.html              ← HTML principal limpio
├── manifest.json           ← PWA manifest
├── sw.js                   ← Service worker (offline)
├── CLAUDE.md               ← Este archivo
├── css/
│   └── styles.css          ← Todo el CSS
├── js/
│   └── app.js              ← Toda la lógica JS
└── assets/
    ├── characters/         ← Imágenes de personajes por rango
    │   ├── rank-e.jpeg     ← LVL 1-2 (Rango E)
    │   ├── rank-d.jpeg     ← LVL 3-4 (Rango D)
    │   ├── rank-c.jpeg     ← LVL 5-6 (Rango C)
    │   ├── rank-b.jpeg     ← LVL 7-8 (Rango B)
    │   ├── rank-a.jpeg     ← LVL 9   (Rango A)
    │   └── rank-s.jpeg     ← LVL 10  (Rango S)
    ├── icon-192.png        ← PWA icon
    └── icon-512.png        ← PWA icon
```

## Sistema de niveles (js/app.js → const LEVELS)
| Nivel | XP requerido | Rango | Color |
|-------|-------------|-------|-------|
| 1-2   | 0 / 200     | E     | #6a7a9a (gris) |
| 3-4   | 450 / 750   | D     | #00b4ff (azul) |
| 5-6   | 1100 / 1500 | C     | #00fff0 (cyan) |
| 7-8   | 2000 / 2600 | B     | #a78bfa (púrpura) |
| 9     | 3300        | A     | #ffc533 (gold) |
| 10    | 4100        | S     | #ff3c6e (rojo) |

## XP por sesión
- Día 1 (Push): 120 XP + 30 bonus si completa todos
- Día 2 (Pull): 130 XP + 30 bonus
- Día 3 (Legs): 150 XP + 30 bonus
- Día 4 (OHP):  140 XP + 30 bonus

## Personajes (assets/characters/)
La función `drawCharacter()` en app.js intenta cargar la imagen del rango.
Si no existe, usa un SVG fallback dibujado por código.
Nombres exactos requeridos: rank-e.jpeg, rank-d.jpeg, rank-c.jpeg, rank-b.jpeg, rank-a.jpeg, rank-s.jpeg

## localStorage keys
- `gymState`: { totalXp, sessions, streak, lastSessionDate, completedDays[], checked{} }
- `gymMetrics`: Array de mediciones corporales

## Paleta de colores (css/styles.css → :root)
- Fondo principal: #050510
- Azul primario: #00b4ff
- Cyan: #00fff0
- Gold: #ffc533
- Verde (éxito): #00ff88
- Rojo (eliminar): #ff3c6e

## Features implementados
- [x] 4 días de entrenamiento (Push/Pull/Legs/OHP+Core+Cardio)
- [x] Checkboxes por ejercicio con progreso de sesión
- [x] Sistema XP + niveles + racha diaria
- [x] Personaje SVG que evoluciona con el rango (fallback si no hay imagen)
- [x] HUD con barra XP en header
- [x] Level up con flash + partículas + toast
- [x] Registro de métricas corporales (10 campos)
- [x] Gráfico de evolución peso/grasa (Chart.js)
- [x] Historial con botón eliminar registro
- [x] PWA ready (manifest + service worker)

## Features pendientes / próximas iteraciones
- [x] Agregar imágenes reales de personajes en assets/characters/
- [ ] Validación de sesión por duración mínima (timer)
- [ ] Campo de peso usado por ejercicio (tracking de carga)
- [ ] Pantalla de resumen post-sesión
- [ ] Iconos PWA (icon-192.png, icon-512.png)
- [ ] Push notifications para recordatorio de entreno

## Notas importantes
- Max width: 430px (diseño mobile-first)
- NO usar frameworks — vanilla JS puro
- Mantener single-file philosophy en CSS y JS separados (no dividir más)
- localStorage es la única persistencia — no hay backend
- El usuario entrena con barra olímpica, jaula, Smith y poleas
- Objetivo: recomposición corporal, 82kg, grasa visceral índice 10

## Comandos útiles en Claude Code
```bash
# Servir localmente para probar
npx serve .

# O con Python
python3 -m http.server 8080
```
