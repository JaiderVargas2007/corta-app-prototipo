/* ============================================================
   CORTA — Ventas de ruta
   Prototipo 100% front-end (HTML/CSS/JS + localStorage)
   Pensado para luego conectarse a: App -> API REST -> PHP -> MySQL
   Todas las funciones "api.*" son el punto donde, en producción,
   irían las llamadas fetch() a los endpoints reales.
   ============================================================ */

/* ---------------------- ICONOS (SVG inline) ---------------------- */
const ICONS = {
  home: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 11.5 12 4l8 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  truck: `<svg viewBox="0 0 24 24" fill="none"><path d="M2 7h11v9H2z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M13 10h4l3 3v3h-7z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="6" cy="18" r="1.8" stroke="currentColor" stroke-width="2"/><circle cx="17" cy="18" r="1.8" stroke="currentColor" stroke-width="2"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3.2" stroke="currentColor" stroke-width="2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M15.5 6.5a3.2 3.2 0 0 1 0 6.2M19 20c0-2.8-1.8-5.1-4.3-5.8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 20V10M11 20V4M18 20v-7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
  more: `<svg viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="1.8" fill="currentColor"/><circle cx="12" cy="12" r="1.8" fill="currentColor"/><circle cx="19" cy="12" r="1.8" fill="currentColor"/></svg>`,
  box: `<svg viewBox="0 0 24 24" fill="none"><path d="M3.5 7.5 12 3l8.5 4.5-8.5 4.5-8.5-4.5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M3.5 7.5v9L12 21l8.5-4.5v-9M12 12v9" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
  cash: `<svg viewBox="0 0 24 24" fill="none"><rect x="2.5" y="6" width="19" height="12" rx="2.5" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="2.6" stroke="currentColor" stroke-width="2"/></svg>`,
  doc: `<svg viewBox="0 0 24 24" fill="none"><path d="M6 3h8l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M14 3v5h5M8 13h8M8 17h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="2"/><path d="m20 20-3.8-3.8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/></svg>`,
  edit: `<svg viewBox="0 0 24 24" fill="none"><path d="m16.5 3.5 4 4L8 20H4v-4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none"><path d="M6 3h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2C10.5 19 5 13.5 4 6a2 2 0 0 1 2-3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6.6 7-11.5A7 7 0 0 0 5 9.5C5 14.4 12 21 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="9.5" r="2.3" stroke="currentColor" stroke-width="1.8"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none"><rect x="3.5" y="5" width="17" height="16" rx="2.5" stroke="currentColor" stroke-width="1.8"/><path d="M3.5 9.5h17M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  chevronRight: `<svg viewBox="0 0 24 24" fill="none"><path d="m9 6 6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0 1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none"><path d="m5 13 4.5 4.5L20 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  bank: `<svg viewBox="0 0 24 24" fill="none"><path d="M3 10 12 4l9 6M4.5 10h15V20H4.5zM4.5 20h15M8 13.5v4M12 13.5v4M16 13.5v4" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3a5 5 0 0 0-5 5v3.2c0 .6-.2 1.1-.6 1.6L5 15h14l-1.4-2.2c-.4-.5-.6-1-.6-1.6V8a5 5 0 0 0-5-5z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9.5 18a2.5 2.5 0 0 0 5 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  gear: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.9a7 7 0 0 0-2-1.2L14 3h-4l-.4 2.6a7 7 0 0 0-2 1.2l-2.3-.9-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-.9c.6.5 1.3.9 2 1.2L10 21h4l.4-2.6c.7-.3 1.4-.7 2-1.2l2.3.9 2-3.4-2-1.5c.1-.4.1-.8.1-1.2Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  logout: `<svg viewBox="0 0 24 24" fill="none"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  wallet: `<svg viewBox="0 0 24 24" fill="none"><path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h11A2.5 2.5 0 0 1 19 7.5V8H5.5A2.5 2.5 0 0 1 3 5.5" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><rect x="3" y="8" width="18" height="11" rx="2.3" stroke="currentColor" stroke-width="1.8"/><circle cx="16" cy="13.5" r="1.3" fill="currentColor"/></svg>`,
  history: `<svg viewBox="0 0 24 24" fill="none"><path d="M3 12a9 9 0 1 0 2.6-6.3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M3 4v5h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 7.5V12l3 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  excel: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2.5" stroke="currentColor" stroke-width="1.8"/><path d="m8 8 8 8M16 8l-8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  transfer: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 8h13l-3-3M20 16H7l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  credit: `<svg viewBox="0 0 24 24" fill="none"><rect x="2.5" y="5.5" width="19" height="13" rx="2.3" stroke="currentColor" stroke-width="1.8"/><path d="M2.5 10h19" stroke="currentColor" stroke-width="1.8"/></svg>`,
  cookie: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2c-1.5 2.5-4.5 3-4.5 6 0 1.5 1 2.5 1 2.5s-3 .5-3 4c0 2.75 2.25 4.5 4.5 4.5 1 0 1.75-.35 2-.5.25.15 1 .5 2 .5 2.25 0 4.5-1.75 4.5-4.5 0-3.5-3-4-3-4s1-1 1-2.5c0-3-3-3.5-4.5-6z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
  gift: `<svg viewBox="0 0 24 24" fill="none"><rect x="3.5" y="9" width="17" height="12" rx="1.5" stroke="currentColor" stroke-width="1.8"/><path d="M2.5 6h19v3h-19zM12 9v12M12 6c-1-2.5-3-3.5-4.5-2.5S6 6.5 8 6.5H12ZM12 6c1-2.5 3-3.5 4.5-2.5S18 6.5 16 6.5H12Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M12 11v5.5M12 8v.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" fill="none"><path d="M3.5 20.5 4.8 16A8.4 8.4 0 1 1 8 19.2l-4.5 1.3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8.7 8.6c.2-.5.5-.5.8-.5h.5c.2 0 .4 0 .6.5s.7 1.6.7 1.7.1.2 0 .4c-.1.2-.2.3-.3.4l-.5.5c-.2.2-.3.4-.1.7.2.3.8 1.2 1.7 1.9 1.1.9 2 1.2 2.3 1.3.3.1.4.1.6-.1l.7-.8c.2-.3.4-.2.7-.1l1.5.7c.2.1.4.2.5.3.1.2.1.9-.2 1.4s-1.4 1-2 1c-.5 0-1.1 0-3.5-1.4-3-1.7-4.2-4.3-4.3-4.5-.1-.2-.9-1.2-.9-2.3s.6-1.6.8-1.9Z" fill="currentColor"/></svg>`,
  printer: `<svg viewBox="0 0 24 24" fill="none"><path d="M7 8V3.5h10V8" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><rect x="4" y="8" width="16" height="8" rx="1.8" stroke="currentColor" stroke-width="1.8"/><path d="M7 14h10v6.5H7z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" fill="none"><path d="m12 3 9 5-9 5-9-5 9-5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="m3 13 9 5 9-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M8 11V7.5a4 4 0 0 1 8 0V11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  tag: `<svg viewBox="0 0 24 24" fill="none"><path d="m11 3 8 8-8 8-8-8V3h8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="8" cy="8" r="1.3" fill="currentColor"/></svg>`
};

/* ---------------------- UTILIDADES ---------------------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $all = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function fmtMoney(n) {
  n = Math.round(n || 0);
  return '$ ' + n.toLocaleString('es-CO');
}
function todayStr() {
  const d = new Date();
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d - tz).toISOString().slice(0, 10);
}
function addDays(dateStr, days) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d - tz).toISOString().slice(0, 10);
}
function fmtDateShort(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric', month: 'short' });
}
function fmtDateLong(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  let s = d.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
}
function uid(prefix) {
  return prefix + '_' + Math.random().toString(36).slice(2, 9);
}
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function startOfWeek(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const day = (d.getDay() + 6) % 7; // lunes=0
  d.setDate(d.getDate() - day);
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d - tz).toISOString().slice(0, 10);
}

/* Generador pseudo-aleatorio con semilla fija -> datos de prueba coherentes y repetibles */
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }
function pickN(rng, arr, n) {
  const copy = arr.slice();
  const out = [];
  n = Math.min(n, copy.length);
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(rng() * copy.length);
    out.push(copy.splice(idx, 1)[0]);
  }
  return out;
}
function randInt(rng, min, max) { return Math.floor(rng() * (max - min + 1)) + min; }

/* ---------------------- SEMILLA DE DATOS ---------------------- */
const NOMBRES_CLIENTES = [
  ['Juan Pérez', '301 123 4567', 'Cra 5 #12-34, Barrio Centro'],
  ['Jaime Rojas', '302 234 5678', 'Cll 10 #8-20, Barrio San José'],
  ['Fernando "Nano" Gómez', '303 345 6789', 'Cra 2 #15-10, Barrio El Prado'],
  ['María Fernanda López', '304 456 7890', 'Cll 20 #5-05, Barrio Las Flores'],
  ['Oscar Medina', '305 567 8901', 'Cra 8 #22-14, Barrio Bella Vista'],
  ['Diana Torres', '306 678 9012', 'Cll 14 #9-30, Barrio Centro'],
  ['Camilo Ruiz', '307 789 0123', 'Cra 12 #4-18, Barrio San José'],
  ['Laura Sánchez', '308 890 1234', 'Cll 6 #11-22, Barrio El Prado'],
  ['Andrés Castillo', '309 901 2345', 'Cra 3 #7-40, Barrio Las Flores'],
  ['Patricia Nieto', '310 012 3456', 'Cll 18 #2-09, Barrio Bella Vista']
];
const DEPARTAMENTOS = ['Cortadores', 'Sets', 'Conos', 'Accesorios'];
const FORMAS_VENTA = ['Unidad', 'Docena', 'Set', 'Caja x12', 'Mayoreo'];

/* [nombre, precioNormal, precioEspecial, costo, stock, presentacion, departamento, formaVenta] */
const PRODUCTOS_SEED = [
  ['Cortador Estrella', 3500, 3100, 1800, 120, 'Individual · metal', 'Cortadores', 'Unidad'],
  ['Cortador Corazón', 3500, 3100, 1800, 95, 'Individual · metal', 'Cortadores', 'Unidad'],
  ['Cortador Círculo', 2800, 2500, 1400, 150, 'Individual · metal', 'Cortadores', 'Unidad'],
  ['Cortador Luna', 4200, 3700, 2100, 60, 'Individual · metal', 'Cortadores', 'Unidad'],
  ['Cortador Flor', 3900, 3450, 2000, 80, 'Individual · metal', 'Cortadores', 'Unidad'],
  ['Cortador Oso', 5200, 4600, 2600, 14, 'Individual · plástico', 'Cortadores', 'Unidad'],
  ['Cortador Casita', 4800, 4250, 2400, 55, 'Individual · metal', 'Cortadores', 'Unidad'],
  ['Set Navideño x6', 22000, 19500, 11500, 30, 'Set · 6 piezas', 'Sets', 'Set'],
  ['Cortador Mariposa', 3700, 3250, 1900, 70, 'Individual · metal', 'Cortadores', 'Unidad'],
  ['Set Números 0-9', 35000, 31000, 18000, 8, 'Set · 10 piezas', 'Sets', 'Set'],
  ['Cono para waffle', 6800, 6000, 3400, 40, 'Individual · metal', 'Conos', 'Unidad'],
  ['Set de espátulas x3', 15000, 13200, 7800, 25, 'Set · 3 piezas', 'Accesorios', 'Set'],
  ['Rodillo antiadherente', 9800, 8700, 5200, 20, 'Individual', 'Accesorios', 'Unidad']
];

function buildSeed() {
  const rng = mulberry32(20260901);
  const today = todayStr();

  const carros = [
    { id: 1, nombre: 'Carro 1', conductor: 'Wilson Cárdenas' },
    { id: 2, nombre: 'Carro 2', conductor: 'Marcela Ibáñez' },
    { id: 3, nombre: 'Carro 3', conductor: 'Édgar Salazar' }
  ];

  const CLIENTES_ESPECIALES = [3, 4, 9]; // ids con lista de precios "especial"
  const clientes = NOMBRES_CLIENTES.map((c, i) => ({
    id: i + 1, nombre: c[0], telefono: c[1], direccion: c[2],
    carroDefault: (i % 3) + 1,
    listaPrecio: CLIENTES_ESPECIALES.includes(i + 1) ? 'especial' : 'normal'
  }));

  const productos = PRODUCTOS_SEED.map((p, i) => ({
    id: i + 1, nombre: p[0], precioNormal: p[1], precioEspecial: p[2], costo: p[3],
    stock: p[4], presentacion: p[5], departamento: p[6], formaVenta: p[7]
  }));

  const usuarios = [
    { id: 1, nombre: 'Roberto Salcedo', correo: 'jefe@corta.com', rol: 'Jefe / Administrador' },
    { id: 2, nombre: 'Wilson Cárdenas', correo: 'wilson@corta.com', rol: 'Conductor · Carro 1' },
    { id: 3, nombre: 'Marcela Ibáñez', correo: 'marcela@corta.com', rol: 'Conductor · Carro 2' },
    { id: 4, nombre: 'Édgar Salazar', correo: 'edgar@corta.com', rol: 'Conductor · Carro 3' }
  ];

  // Asignaciones: quién visita cada carro, día por día (últimos 30 días)
  const asignaciones = {};
  const dias = [];
  for (let i = 29; i >= 0; i--) dias.push(addDays(today, -i));

  dias.forEach((fecha, di) => {
    carros.forEach(carro => {
      const n = randInt(rng, 3, 4);
      const ids = pickN(rng, clientes.map(c => c.id), n);
      asignaciones[`${carro.id}_${fecha}`] = ids;
    });
  });

  // Ventas: para cada carro/día, la mayoría de los clientes asignados compran algo
  const ventas = [];
  let ventaId = 1;
  dias.forEach((fecha) => {
    carros.forEach(carro => {
      const asignados = asignaciones[`${carro.id}_${fecha}`] || [];
      asignados.forEach(clienteId => {
        if (rng() < 0.14) return; // ese día no compró
        const clienteRef = clientes.find(c => c.id === clienteId);
        const nItems = randInt(rng, 1, 3);
        const prodsElegidos = pickN(rng, productos, nItems);
        const items = prodsElegidos.map(p => ({
          productoId: p.id, cantidad: randInt(rng, 1, 3),
          precioUnit: clienteRef.listaPrecio === 'especial' ? p.precioEspecial : p.precioNormal
        }));
        const subtotal = items.reduce((s, it) => s + it.cantidad * it.precioUnit, 0);
        const aplicaDescuento = rng() < 0.12;
        const descuento = aplicaDescuento ? Math.round(subtotal * (randInt(rng, 5, 15) / 100) / 100) * 100 : 0;
        const total = Math.max(0, subtotal - descuento);

        const rf = rng();
        const formaPago = rf < 0.45 ? 'efectivo' : (rf < 0.72 ? 'transferencia' : 'credito');

        let estado = 'pagado';
        let abonos = [];
        if (formaPago === 'credito') {
          if (rng() < 0.5) {
            estado = 'pendiente';
          } else {
            estado = 'abono';
            const valorAbono = Math.round((total * (randInt(rng, 25, 65) / 100)) / 100) * 100;
            abonos.push({ id: uid('ab'), valor: valorAbono, fecha: addDays(fecha, randInt(rng, 0, 3)), metodo: pick(rng, ['efectivo', 'transferencia']) });
          }
        } else if (rng() < 0.06) {
          estado = 'pendiente';
        }

        ventas.push({
          id: ventaId++, fecha, carroId: carro.id, clienteId, items,
          descuento, total, formaPago, estado, abonos
        });
      });
    });
  });

  // Cierres: los días anteriores a hoy quedan como "carro confirmado";
  // el día de hoy se deja abierto para poder probar el flujo de confirmación.
  const cierres = {};
  dias.forEach(fecha => {
    if (fecha === today) return;
    carros.forEach(carro => {
      cierres[`${carro.id}_${fecha}`] = { confirmadoEn: fecha + 'T18:45:00' };
    });
  });

  return { carros, clientes, productos, usuarios, asignaciones, ventas, cierres, meta: { seedDate: today, nextVentaId: ventaId, notifDismissed: [] } };
}

/* ---------------------- CAPA DE "API" (localStorage) ----------------------
   En producción, cada una de estas funciones haría un fetch() a la API REST
   (PHP + MySQL). Aquí simulan la persistencia con localStorage. */
const STORAGE_KEY = 'corta_db_v1';
let DB = null;

/* Ajusta datos guardados de una versión anterior del prototipo al modelo actual
   (doble lista de precios, departamentos, costo, cierres de carro, etc.) */
function migrateDB(db) {
  db.cierres = db.cierres || {};
  db.productos = (db.productos || []).map(p => {
    const base = p.precioNormal != null ? p.precioNormal : (p.precio != null ? p.precio : 0);
    return {
      id: p.id, nombre: p.nombre,
      precioNormal: p.precioNormal != null ? p.precioNormal : base,
      precioEspecial: p.precioEspecial != null ? p.precioEspecial : Math.round(base * 0.9 / 100) * 100,
      costo: p.costo != null ? p.costo : Math.round(base * 0.55 / 100) * 100,
      stock: p.stock || 0,
      presentacion: p.presentacion || 'Individual',
      departamento: p.departamento || 'Cortadores',
      formaVenta: p.formaVenta || 'Unidad'
    };
  });
  db.clientes = (db.clientes || []).map(c => ({ listaPrecio: 'normal', ...c }));
  return db;
}
function loadDB() {
  let raw = null;
  try { raw = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { raw = null; }
  if (!raw || !raw.meta || raw.meta.seedDate !== todayStr()) {
    raw = buildSeed();
  } else {
    raw = migrateDB(raw);
  }
  saveDB(raw);
  DB = raw;
  return DB;
}
function saveDB(db = DB) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}
function api_save() { saveDB(DB); }

/* ---------------------- ESTADO DE NAVEGACIÓN ---------------------- */
const State = {
  view: 'dashboard',
  params: {},
  history: [],
  dashFilter: 'semana',
  dashRange: { start: addDays(todayStr(), -6), end: todayStr() },
  histFilters: { fecha: '', carro: 'todos', cliente: '', estado: 'todos' },
  repFilter: 'semana',
  repRange: { start: addDays(todayStr(), -6), end: todayStr() },
  clientesSearch: '',
  ventaForm: null,
  session: null,
  productosDept: 'todos',
  repCarro: 'todos',
  listaPreciosTab: 'normal'
};

const TOP_TABS = ['dashboard', 'carros', 'clientes', 'reportes', 'mas'];
const VIEW_TAB = {
  dashboard: 'dashboard', carros: 'carros', carroDetail: 'carros',
  clientes: 'clientes', clienteDetail: 'clientes',
  reportes: 'reportes',
  mas: 'mas', productos: 'mas', pagos: 'mas', historial: 'mas',
  perfil: 'mas', usuarios: 'mas', config: 'mas', notificaciones: 'mas', listasPrecios: 'mas',
  ventaNueva: null
};
const VIEW_TITLE = {
  dashboard: 'Inicio', carros: 'Carros', carroDetail: 'Carro', clientes: 'Clientes',
  clienteDetail: 'Cliente', reportes: 'Reportes', mas: 'Más', productos: 'Productos',
  pagos: 'Pagos y deudas', historial: 'Historial de ventas', perfil: 'Perfil del jefe',
  usuarios: 'Usuarios', config: 'Configuración', notificaciones: 'Notificaciones',
  listasPrecios: 'Listas de precios', ventaNueva: 'Registrar venta'
};

function navigate(view, params = {}, opts = {}) {
  const { push = true, resetHistory = false } = opts;
  if (resetHistory) {
    State.history = [];
  } else if (push && State.view) {
    State.history.push({ view: State.view, params: State.params });
  }
  State.view = view;
  State.params = params;
  renderApp();
  $('#app-content').scrollTop = 0;
  window.scrollTo(0, 0);
}
function goBack() {
  const prev = State.history.pop();
  if (prev) { State.view = prev.view; State.params = prev.params; renderApp(); }
  else navigate('dashboard', {}, { resetHistory: true });
}

/* ---------------------- TOAST ---------------------- */
let toastTimer = null;
function toast(msg) {
  const t = $('#toast');
  t.innerHTML = `${ICONS.check}<span>${esc(msg)}</span>`;
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, 2600);
}

/* ---------------------- SHEET (modal inferior) ---------------------- */
function openSheet(html, onOpen) {
  $('#sheet-body').innerHTML = `<div class="sheet-handle"></div>${html}`;
  $('#sheet-overlay').hidden = false;
  document.body.style.overflow = 'hidden';
  if (onOpen) onOpen($('#sheet-body'));
}
function closeSheet() {
  $('#sheet-overlay').hidden = true;
  $('#sheet-body').innerHTML = '';
  document.body.style.overflow = '';
}
$('#sheet-overlay').addEventListener('click', (e) => { if (e.target.id === 'sheet-overlay') closeSheet(); });

/* ---------------------- IMPRESIÓN (ticket térmico 80mm) ---------------------- */
function imprimirTickets(htmlCopias) {
  $('#print-area').innerHTML = htmlCopias;
  setTimeout(() => window.print(), 80);
}
function ticketHeader(subtitulo) {
  return `
    <div class="t-center"><h4>CORTA</h4></div>
    <div class="t-center t-small">Ventas de ruta · Cortadores de galletas</div>
    <div class="t-center t-small">NIT 900.123.456-7</div>
    <div class="t-line"></div>
    <div class="t-small">${esc(subtitulo)}</div>
    <div class="t-line"></div>`;
}
function ticketFactura(v) {
  const cliente = DB.clientes.find(c => c.id === v.clienteId);
  const itemsOrdenados = v.items.slice().sort((a, b) => (b.cantidad * b.precioUnit) - (a.cantidad * a.precioUnit));
  const subtotal = itemsOrdenados.reduce((s, it) => s + it.cantidad * it.precioUnit, 0);
  return `
    <div class="ticket">
      ${ticketHeader(`Factura #${v.id} · ${fmtDateShort(v.fecha)}`)}
      <div class="t-small">Cliente: ${esc(cliente.nombre)}</div>
      <div class="t-small">Carro: ${esc(nombreCarro(v.carroId))}</div>
      <div class="t-small">Lista: ${listaLabel(cliente.listaPrecio)}</div>
      <div class="t-line"></div>
      ${itemsOrdenados.map(it => `
        <div class="t-item">
          <div class="t-row"><span>${esc(nombreProducto(it.productoId))}</span></div>
          <div class="t-row t-small"><span>${it.cantidad} × ${fmtMoney(it.precioUnit)}</span><span>${fmtMoney(it.cantidad * it.precioUnit)}</span></div>
        </div>`).join('')}
      <div class="t-line"></div>
      <div class="t-row t-small"><span>Subtotal</span><span>${fmtMoney(subtotal)}</span></div>
      ${v.descuento ? `<div class="t-row t-small"><span>Descuento</span><span>-${fmtMoney(v.descuento)}</span></div>` : ''}
      <div class="t-row t-total"><span>TOTAL</span><span>${fmtMoney(v.total)}</span></div>
      <div class="t-small" style="margin-top:4px;">Pago: ${payLabel(v.formaPago)} · Estado: ${v.estado === 'pagado' ? 'Pagado' : v.estado === 'abono' ? 'Abono' : 'Pendiente'}</div>
      ${ventaSaldo(v) > 0 ? `<div class="t-small">Saldo pendiente: ${fmtMoney(ventaSaldo(v))}</div>` : ''}
      <div class="t-line"></div>
      <div class="t-small"><strong>Uso interno (no mostrar al cliente)</strong></div>
      <div class="t-row t-small"><span>Costo</span><span>${fmtMoney(costoVenta(v))}</span></div>
      <div class="t-row t-small"><span>Ganancia est.</span><span>${fmtMoney(gananciaVenta(v))}</span></div>
      <div class="t-center t-small" style="margin-top:8px;">¡Gracias por su compra!</div>
    </div>`;
}
function imprimirFactura(ventaId) {
  const v = DB.ventas.find(v => v.id === ventaId);
  const copias = [ticketFactura(v), ticketFactura(v), ticketFactura(v)].join('');
  imprimirTickets(copias);
}
function imprimirListaPrecios(lista) {
  const key = lista === 'especial' ? 'precioEspecial' : 'precioNormal';
  const html = `
    <div class="ticket">
      ${ticketHeader(`Lista de precios · ${listaLabel(lista)}`)}
      ${DB.productos.map(p => `
        <div class="t-row t-small" style="margin-bottom:3px;"><span>${esc(p.nombre)}</span><span>${fmtMoney(p[key])}</span></div>`).join('')}
      <div class="t-line"></div>
      <div class="t-center t-small">${fmtDateLong(todayStr())}</div>
    </div>`;
  imprimirTickets(html);
}
function imprimirCierre(carroId, fecha) {
  const ventasDia = DB.ventas.filter(v => v.carroId === carroId && v.fecha === fecha);
  const s = statsFor(ventasDia);
  const html = `
    <div class="ticket">
      ${ticketHeader(`Cierre de carro · ${esc(nombreCarro(carroId))}`)}
      <div class="t-small">Fecha: ${fmtDateLong(fecha)}</div>
      <div class="t-line"></div>
      ${ventasDia.map(v => `<div class="t-row t-small"><span>${esc(nombreCliente(v.clienteId))}</span><span>${fmtMoney(v.total)}</span></div>`).join('')}
      <div class="t-line"></div>
      <div class="t-row t-small"><span>Clientes atendidos</span><span>${s.clientes}</span></div>
      <div class="t-row t-small"><span>Productos vendidos</span><span>${s.productosVendidos}</span></div>
      <div class="t-row t-total"><span>Total vendido</span><span>${fmtMoney(s.totalVendido)}</span></div>
      <div class="t-row t-small"><span>Pendiente</span><span>${fmtMoney(s.totalPendiente)}</span></div>
    </div>`;
  imprimirTickets(html);
}

/* ============================================================
   LOGIN
   ============================================================ */
$('#login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = $('#login-email').value.trim();
  const pass = $('#login-pass').value;
  if (!email || !pass) { $('#login-error').hidden = false; return; }
  $('#login-error').hidden = true;
  loadDB();
  State.session = { nombre: 'Roberto Salcedo', correo: email, rol: 'Jefe / Administrador' };
  $('#screen-login').hidden = true;
  $('#app').hidden = false;
  buildNav();
  navigate('dashboard', {}, { resetHistory: true });
});

function logout() {
  if (!confirm('¿Cerrar sesión? Volverás a la pantalla de inicio de sesión.')) return;
  $('#app').hidden = true;
  $('#screen-login').hidden = false;
  State.view = 'dashboard'; State.history = [];
  toast('Sesión cerrada');
}

/* ============================================================
   NAVEGACIÓN (sidebar + bottom nav)
   ============================================================ */
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Inicio', icon: 'home' },
  { id: 'carros', label: 'Carros', icon: 'truck' },
  { id: 'clientes', label: 'Clientes', icon: 'users' },
  { id: 'reportes', label: 'Reportes', icon: 'chart' },
  { id: 'mas', label: 'Más', icon: 'more' }
];
const SIDE_EXTRA = [
  { id: 'productos', label: 'Productos', icon: 'box' },
  { id: 'listasPrecios', label: 'Listas de precios', icon: 'tag' },
  { id: 'historial', label: 'Historial de ventas', icon: 'history' },
  { id: 'pagos', label: 'Pagos y deudas', icon: 'wallet' },
  { id: 'config', label: 'Configuración', icon: 'gear' }
];

function buildNav() {
  $('#bottomnav').innerHTML = NAV_ITEMS.map(n => `
    <button class="nav-item" data-action="tab" data-view="${n.id}">
      ${ICONS[n.icon]}<span>${n.label}</span>
    </button>`).join('');

  $('#sidebar-nav').innerHTML =
    NAV_ITEMS.filter(n => n.id !== 'mas').map(n => `
      <button class="side-item" data-action="tab" data-view="${n.id}">${ICONS[n.icon]}<span>${n.label}</span></button>`).join('')
    + `<div style="height:10px"></div>`
    + SIDE_EXTRA.map(n => `
      <button class="side-item" data-action="tab" data-view="${n.id}">${ICONS[n.icon]}<span>${n.label}</span></button>`).join('')
    + `<button class="side-item" data-action="logout" style="margin-top:6px">${ICONS.logout}<span>Cerrar sesión</span></button>`;

  $('#sidebar-user').innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;padding:6px 8px;">
      <div class="avatar" style="width:34px;height:34px;font-size:12px;">${initials(State.session.nombre)}</div>
      <div style="min-width:0;">
        <div style="font-weight:700;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(State.session.nombre)}</div>
        <div style="font-size:11.5px;color:var(--ink-soft);">${esc(State.session.rol)}</div>
      </div>
    </div>`;
}

function updateNavHighlight() {
  const activeTab = VIEW_TAB[State.view];
  $all('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.view === activeTab));
  $all('.side-item[data-view]').forEach(b => b.classList.toggle('active', b.dataset.view === (activeTab === 'mas' ? State.view : activeTab)));
  $('#btn-back').hidden = State.history.length === 0;
  $('#topbar-title').textContent = VIEW_TITLE[State.view] || 'Corta';
  $('#fab-venta').style.display = (State.view === 'ventaNueva') ? 'none' : 'flex';
}

/* ============================================================
   RENDER PRINCIPAL
   ============================================================ */
function renderApp() {
  const html = VIEWS[State.view] ? VIEWS[State.view](State.params) : `<div class="empty-state">Vista no encontrada.</div>`;
  $('#app-content').innerHTML = `<div class="view">${html}</div>`;
  updateNavHighlight();
  if (VIEW_MOUNT[State.view]) VIEW_MOUNT[State.view](State.params);
}

/* ============================================================
   CÁLCULOS DE DATOS
   ============================================================ */
function ventaSaldo(v) {
  if (v.estado === 'pagado') return 0;
  const abonado = (v.abonos || []).reduce((s, a) => s + a.valor, 0);
  return Math.max(0, v.total - abonado);
}
function ventaCobrado(v) {
  if (v.estado === 'pagado') return v.total;
  return (v.abonos || []).reduce((s, a) => s + a.valor, 0);
}
function ventasEnRango(start, end, carroId = null) {
  return DB.ventas.filter(v => v.fecha >= start && v.fecha <= end && (!carroId || v.carroId === carroId));
}
function rangoDeFiltro(filter, custom) {
  const t = todayStr();
  if (filter === 'hoy') return { start: t, end: t };
  if (filter === 'semana') return { start: startOfWeek(t), end: t };
  if (filter === 'mes') return { start: t.slice(0, 8) + '01', end: t };
  if (filter === 'anio') return { start: t.slice(0, 4) + '-01-01', end: t };
  return custom;
}
function statsFor(ventasArr) {
  const totalVendido = ventasArr.reduce((s, v) => s + v.total, 0);
  const totalPendiente = ventasArr.reduce((s, v) => s + ventaSaldo(v), 0);
  const clientesSet = new Set(ventasArr.map(v => v.clienteId));
  const productosVendidos = ventasArr.reduce((s, v) => s + v.items.reduce((a, it) => a + it.cantidad, 0), 0);
  return { totalVendido, totalPendiente, clientes: clientesSet.size, productosVendidos, nVentas: ventasArr.length };
}
function nombreCliente(id) { const c = DB.clientes.find(c => c.id === id); return c ? c.nombre : '—'; }
function nombreCarro(id) { const c = DB.carros.find(c => c.id === id); return c ? c.nombre : '—'; }
function nombreProducto(id) { const p = DB.productos.find(p => p.id === id); return p ? p.nombre : '—'; }
function badgeEstado(estado) {
  const label = estado === 'pagado' ? 'Pagado' : estado === 'pendiente' ? 'Pendiente' : 'Abono';
  return `<span class="badge badge-${estado}">${label}</span>`;
}
function payIcon(fp) { return fp === 'efectivo' ? ICONS.cash : fp === 'transferencia' ? ICONS.transfer : ICONS.credit; }
function payLabel(fp) { return fp === 'efectivo' ? 'Efectivo' : fp === 'transferencia' ? 'Transferencia' : 'Crédito'; }

/* Precio de un producto según la lista asignada al cliente (normal o especial) */
function precioParaCliente(producto, cliente) {
  if (cliente && cliente.listaPrecio === 'especial') return producto.precioEspecial;
  return producto.precioNormal;
}
function listaLabel(lista) { return lista === 'especial' ? 'Especial' : 'Normal'; }

/* Confirmación / cierre de carro por fecha */
function claveCierre(carroId, fecha) { return `${carroId}_${fecha}`; }
function estaConfirmado(carroId, fecha) { return !!(DB.cierres || {})[claveCierre(carroId, fecha)]; }
function infoCierre(carroId, fecha) { return (DB.cierres || {})[claveCierre(carroId, fecha)] || null; }

/* Ganancia estimada de una venta: (precio - costo) x cantidad, menos el descuento aplicado */
function gananciaVenta(v) {
  const gananciaBruta = v.items.reduce((s, it) => {
    const p = DB.productos.find(p => p.id === it.productoId);
    const costo = p ? p.costo : 0;
    return s + (it.precioUnit - costo) * it.cantidad;
  }, 0);
  return Math.max(0, gananciaBruta - (v.descuento || 0));
}
function costoVenta(v) {
  return v.items.reduce((s, it) => {
    const p = DB.productos.find(p => p.id === it.productoId);
    return s + (p ? p.costo : 0) * it.cantidad;
  }, 0);
}

/* ============================================================
   VISTA: DASHBOARD
   ============================================================ */
function viewDashboard() {
  const t = todayStr();
  const hoy = statsFor(ventasEnRango(t, t));
  const semana = statsFor(ventasEnRango(startOfWeek(t), t));
  const mes = statsFor(ventasEnRango(t.slice(0, 8) + '01', t));
  const anio = statsFor(ventasEnRango(t.slice(0, 4) + '-01-01', t));
  const pendienteTotal = statsFor(DB.ventas).totalPendiente;

  const range = rangoDeFiltro(State.dashFilter, State.dashRange);
  const filtered = ventasEnRango(range.start, range.end);
  const s = statsFor(filtered);

  // datos para el gráfico: últimos 7 días (o rango si es corto)
  const chartDays = [];
  for (let i = 6; i >= 0; i--) chartDays.push(addDays(t, -i));
  const chartVals = chartDays.map(d => statsFor(ventasEnRango(d, d)).totalVendido);
  const maxVal = Math.max(1, ...chartVals);

  return `
    <div class="greeting">
      <div class="hello">Hola, ${esc(State.session.nombre.split(' ')[0])} 👋</div>
      <h2>Resumen de ventas</h2>
    </div>

    <div class="stat-grid">
      <div class="stat-card"><div class="stat-label">${ICONS.calendar} Ventas de hoy</div><div class="stat-value">${fmtMoney(hoy.totalVendido)}</div></div>
      <div class="stat-card"><div class="stat-label">${ICONS.chart} Ventas semana</div><div class="stat-value">${fmtMoney(semana.totalVendido)}</div></div>
      <div class="stat-card"><div class="stat-label">${ICONS.box} Ventas mes</div><div class="stat-value">${fmtMoney(mes.totalVendido)}</div></div>
      <div class="stat-card"><div class="stat-label">${ICONS.gift} Ventas año</div><div class="stat-value">${fmtMoney(anio.totalVendido)}</div></div>
      <div class="stat-card wide accent">
        <div><div class="stat-label">${ICONS.wallet} Dinero pendiente por cobrar</div><div class="stat-value">${fmtMoney(pendienteTotal)}</div></div>
        <button class="btn btn-sm" style="background:rgba(255,255,255,.18);color:#fff" data-action="tab" data-view="pagos">Ver</button>
      </div>
    </div>

    <div class="section-title">Filtrar periodo</div>
    <div class="filter-row" id="dash-filters">
      ${['hoy', 'semana', 'mes', 'anio', 'rango'].map(f => `<button class="chip ${State.dashFilter === f ? 'active' : ''}" data-filter="${f}">${{ hoy: 'Hoy', semana: 'Semana', mes: 'Mes', anio: 'Año', rango: 'Rango' }[f]}</button>`).join('')}
    </div>
    ${State.dashFilter === 'rango' ? `
    <div class="range-inputs" style="margin-bottom:14px;">
      <input type="date" id="dash-start" value="${State.dashRange.start}">
      <input type="date" id="dash-end" value="${State.dashRange.end}">
    </div>` : ''}

    <div class="card chart-card">
      <div class="chart-head">
        <div>
          <div class="stat-label" style="margin-bottom:4px">${ICONS.chart} Vendido en el periodo</div>
          <div class="big">${fmtMoney(s.totalVendido)}</div>
        </div>
        <div style="text-align:right">
          <div class="stat-label">Clientes atendidos</div>
          <div class="big" style="font-size:18px">${s.clientes}</div>
        </div>
      </div>
      <div class="bars">
        ${chartDays.map((d, i) => `
          <div class="bar-col">
            <div class="bar ${chartVals[i] > 0 ? 'filled' : ''}" style="height:${Math.max(4, (chartVals[i] / maxVal) * 100)}%" title="${fmtMoney(chartVals[i])}"></div>
            <div class="bar-label">${new Date(d + 'T00:00:00').toLocaleDateString('es-CO', { weekday: 'short' }).slice(0, 3)}</div>
          </div>`).join('')}
      </div>
    </div>

    <div class="section-title">En el periodo seleccionado</div>
    <div class="stat-grid">
      <div class="stat-card"><div class="stat-label">${ICONS.users} Clientes atendidos</div><div class="stat-value">${s.clientes}</div></div>
      <div class="stat-card"><div class="stat-label">${ICONS.box} Productos vendidos</div><div class="stat-value">${s.productosVendidos}</div></div>
      <div class="stat-card"><div class="stat-label">${ICONS.doc} N.º de ventas</div><div class="stat-value">${s.nVentas}</div></div>
      <div class="stat-card"><div class="stat-label">${ICONS.wallet} Pendiente del periodo</div><div class="stat-value">${fmtMoney(s.totalPendiente)}</div></div>
    </div>

    <div class="section-title">Carros</div>
    <div class="list">
      ${DB.carros.map(c => carroMiniRow(c)).join('')}
    </div>
  `;
}
function carroMiniRow(carro) {
  const t = todayStr();
  const s = statsFor(DB.ventas.filter(v => v.carroId === carro.id && v.fecha === t));
  return `
    <div class="row-card" data-action="open-carro" data-id="${carro.id}">
      <div class="avatar">${ICONS.truck}</div>
      <div class="row-main">
        <div class="row-title">${esc(carro.nombre)}</div>
        <div class="row-sub">${s.clientes} clientes hoy · ${esc(carro.conductor)}</div>
      </div>
      <div class="row-end"><div class="row-amount">${fmtMoney(s.totalVendido)}</div></div>
      <div class="chevron">${ICONS.chevronRight}</div>
    </div>`;
}
function mountDashboard() {
  $('#dash-filters').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter]'); if (!btn) return;
    State.dashFilter = btn.dataset.filter;
    renderApp();
  });
  const s = $('#dash-start'), en = $('#dash-end');
  if (s) s.addEventListener('change', () => { State.dashRange.start = s.value; renderApp(); });
  if (en) en.addEventListener('change', () => { State.dashRange.end = en.value; renderApp(); });
}

/* ============================================================
   VISTA: CARROS (lista) + DETALLE
   ============================================================ */
function viewCarros() {
  return `
    <div class="page-header"><h2>Carros de venta</h2></div>
    <div class="list">
      ${DB.carros.map(carro => {
    const stats = statsFor(DB.ventas.filter(v => v.carroId === carro.id));
    return `
        <div class="carro-card" data-action="open-carro" data-id="${carro.id}">
          <div class="carro-top">
            <div><h3>${esc(carro.nombre)}</h3><div class="carro-sub">Conductor: ${esc(carro.conductor)}</div></div>
            <div class="carro-icon">${ICONS.truck}</div>
          </div>
          <div class="carro-stats">
            <div><div class="k">Vendido total</div><div class="v">${fmtMoney(stats.totalVendido)}</div></div>
            <div><div class="k">Clientes</div><div class="v">${stats.clientes}</div></div>
            <div><div class="k">Pendiente</div><div class="v pending">${fmtMoney(stats.totalPendiente)}</div></div>
          </div>
        </div>`;
  }).join('')}
    </div>`;
}

function viewCarroDetail(params) {
  const carro = DB.carros.find(c => c.id === params.id);
  const fecha = params.fecha || todayStr();
  const asignados = DB.asignaciones[`${carro.id}_${fecha}`] || [];
  const ventasDia = DB.ventas.filter(v => v.carroId === carro.id && v.fecha === fecha);
  const totalVendido = ventasDia.reduce((s, v) => s + v.total, 0);
  const totalCobrado = ventasDia.reduce((s, v) => s + ventaCobrado(v), 0);
  const totalPendiente = ventasDia.reduce((s, v) => s + ventaSaldo(v), 0);
  const confirmado = estaConfirmado(carro.id, fecha);
  const cierre = infoCierre(carro.id, fecha);

  return `
    <div class="detail-hero">
      <div class="dh-top">
        <div class="carro-icon">${ICONS.truck}</div>
        <div>
          <h2>${esc(carro.nombre)}</h2>
          <div class="dh-meta">${ICONS.users} Conductor: ${esc(carro.conductor)}</div>
        </div>
      </div>
      <div class="detail-stats">
        <div><div class="k">Vendido</div><div class="v">${fmtMoney(totalVendido)}</div></div>
        <div><div class="k">Cobrado</div><div class="v" style="color:var(--sage)">${fmtMoney(totalCobrado)}</div></div>
        <div><div class="k">Pendiente</div><div class="v" style="color:var(--clay)">${fmtMoney(totalPendiente)}</div></div>
      </div>
    </div>

    <div class="date-picker-row">
      <div class="icon-square" data-action="carro-day" data-dir="-1">${ICONS.chevronRight.replace('m9 6 6 6-6 6', 'm15 6-6 6 6 6')}</div>
      <input type="date" id="carro-fecha" value="${fecha}">
      <div class="icon-square" data-action="carro-day" data-dir="1">${ICONS.chevronRight}</div>
    </div>

    ${confirmado ? `
      <div class="lock-banner confirmed">
        ${ICONS.lock}
        <div class="lb-text"><strong>Carro confirmado</strong>Cerrado el ${fmtDateShort(cierre.confirmadoEn.slice(0, 10))}. No se pueden agregar más pedidos para esta fecha.</div>
        <button class="btn btn-secondary btn-sm" data-action="ver-reporte-cierre" data-carro="${carro.id}" data-fecha="${fecha}">Ver reporte</button>
      </div>` : `
      <div class="lock-banner">
        ${ICONS.clock}
        <div class="lb-text"><strong>Pedidos pendientes de confirmar</strong>Estos pedidos son provisionales hasta que confirmes el carro.</div>
        <button class="btn btn-primary btn-sm" data-action="confirmar-carro" data-carro="${carro.id}" data-fecha="${fecha}">Confirmar carro</button>
      </div>`}

    <div class="page-header" style="margin-bottom:10px;">
      <h2 style="font-size:16px;">${confirmado ? 'Pedidos confirmados' : 'Clientes atendidos'} · ${fmtDateShort(fecha)}</h2>
      ${confirmado ? '' : `<button class="btn btn-secondary btn-sm" data-action="asignar-clientes" data-carro="${carro.id}" data-fecha="${fecha}">${ICONS.plus} Asignar</button>`}
    </div>

    <div class="list">
      ${asignados.length === 0 ? `
        <div class="empty-state">
          <div class="es-icon">${ICONS.users}</div>
          <h4>Sin clientes asignados</h4>
          <p>Este carro no tiene clientes asignados este día. Usa "Asignar" para agregar.</p>
        </div>` : asignados.map(cid => {
    const cliente = DB.clientes.find(c => c.id === cid);
    const ventaCli = ventasDia.find(v => v.clienteId === cid);
    return `
        <div class="row-card" data-action="cliente-dia" data-cliente="${cid}" data-carro="${carro.id}" data-fecha="${fecha}">
          <div class="avatar">${initials(cliente.nombre)}</div>
          <div class="row-main">
            <div class="row-title">${esc(cliente.nombre)}</div>
            <div class="row-sub">${ventaCli ? `${ventaCli.items.reduce((s, i) => s + i.cantidad, 0)} productos` : 'Sin venta registrada hoy'}</div>
          </div>
          <div class="row-end">
            ${ventaCli ? `<div class="row-amount">${fmtMoney(ventaCli.total)}</div>${badgeEstado(ventaCli.estado)}` : `<span class="badge" style="background:var(--line-soft);color:var(--ink-soft)">Por visitar</span>`}
          </div>
        </div>`;
  }).join('')}
    </div>
  `;
}
function mountCarroDetail(params) {
  const carro = DB.carros.find(c => c.id === params.id);
  const fecha = params.fecha || todayStr();
  $('#carro-fecha').addEventListener('change', (e) => {
    navigate('carroDetail', { id: carro.id, fecha: e.target.value }, { push: false });
  });
  $all('[data-action="carro-day"]').forEach(b => b.addEventListener('click', () => {
    navigate('carroDetail', { id: carro.id, fecha: addDays(fecha, parseInt(b.dataset.dir)) }, { push: false });
  }));
  const asignarBtn = $('[data-action="asignar-clientes"]');
  if (asignarBtn) asignarBtn.addEventListener('click', () => sheetAsignarClientes(carro.id, fecha));
  $all('[data-action="cliente-dia"]').forEach(row => row.addEventListener('click', () => {
    sheetClienteDia(parseInt(row.dataset.cliente), parseInt(row.dataset.carro), row.dataset.fecha);
  }));
  const confirmarBtn = $('[data-action="confirmar-carro"]');
  if (confirmarBtn) confirmarBtn.addEventListener('click', () => sheetConfirmarCarro(carro.id, fecha));
  const verReporteBtn = $('[data-action="ver-reporte-cierre"]');
  if (verReporteBtn) verReporteBtn.addEventListener('click', () => sheetReporteCierre(carro.id, fecha));
}

/* ---------------------- Confirmar carro + reporte de cierre ---------------------- */
function sheetConfirmarCarro(carroId, fecha) {
  const ventasDia = DB.ventas.filter(v => v.carroId === carroId && v.fecha === fecha);
  const s = statsFor(ventasDia);
  openSheet(`
    <div class="sheet-head"><h3>Confirmar carro</h3><button class="icon-btn" data-action="close-sheet">✕</button></div>
    <p class="field-note" style="margin-bottom:6px;">${esc(nombreCarro(carroId))} · ${fmtDateLong(fecha)}</p>
    <p class="row-sub" style="margin-bottom:4px;">Al confirmar, este carro queda cerrado para esta fecha y no se podrán registrar más pedidos. Los pagos pendientes se pueden seguir cobrando después.</p>
    <div class="confirm-summary">
      <div class="stat-card"><div class="stat-label">${ICONS.doc} Pedidos</div><div class="stat-value">${s.nVentas}</div></div>
      <div class="stat-card"><div class="stat-label">${ICONS.users} Clientes</div><div class="stat-value">${s.clientes}</div></div>
      <div class="stat-card"><div class="stat-label">${ICONS.cash} Vendido</div><div class="stat-value">${fmtMoney(s.totalVendido)}</div></div>
      <div class="stat-card"><div class="stat-label">${ICONS.wallet} Pendiente</div><div class="stat-value">${fmtMoney(s.totalPendiente)}</div></div>
    </div>
    <button class="whatsapp-btn" id="wa-aviso" type="button">${ICONS.whatsapp} Enviar aviso por WhatsApp <span class="wa-tag">Próximamente</span></button>
    <button class="btn btn-primary btn-block" id="confirmar-carro-btn" style="margin-top:14px;">${ICONS.lock} Confirmar carro</button>
  `, (sheet) => {
    $('#wa-aviso', sheet).addEventListener('click', () => toast('La integración con WhatsApp estará disponible próximamente'));
    $('#confirmar-carro-btn', sheet).addEventListener('click', () => {
      DB.cierres = DB.cierres || {};
      DB.cierres[claveCierre(carroId, fecha)] = { confirmadoEn: fecha + 'T' + new Date().toTimeString().slice(0, 5) + ':00' };
      api_save();
      closeSheet();
      toast('Carro confirmado');
      navigate('carroDetail', { id: carroId, fecha }, { push: false });
      setTimeout(() => sheetReporteCierre(carroId, fecha), 250);
    });
  });
}
function sheetReporteCierre(carroId, fecha) {
  const ventasDia = DB.ventas.filter(v => v.carroId === carroId && v.fecha === fecha);
  const s = statsFor(ventasDia);
  const porProducto = {};
  ventasDia.forEach(v => v.items.forEach(it => {
    porProducto[it.productoId] = (porProducto[it.productoId] || 0) + it.cantidad;
  }));
  const productosOrdenados = Object.entries(porProducto).sort((a, b) => b[1] - a[1]);

  openSheet(`
    <div class="sheet-head"><h3>Reporte de cierre</h3><button class="icon-btn" data-action="close-sheet">✕</button></div>
    <p class="field-note" style="margin-bottom:14px;">${esc(nombreCarro(carroId))} · ${fmtDateLong(fecha)}</p>
    <div class="stat-grid" style="margin-bottom:14px;">
      <div class="stat-card"><div class="stat-label">${ICONS.cash} Vendido</div><div class="stat-value">${fmtMoney(s.totalVendido)}</div></div>
      <div class="stat-card"><div class="stat-label">${ICONS.wallet} Pendiente</div><div class="stat-value">${fmtMoney(s.totalPendiente)}</div></div>
      <div class="stat-card"><div class="stat-label">${ICONS.users} Clientes</div><div class="stat-value">${s.clientes}</div></div>
      <div class="stat-card"><div class="stat-label">${ICONS.box} Productos</div><div class="stat-value">${s.productosVendidos}</div></div>
    </div>
    <div class="section-title" style="margin-top:0;">Clientes atendidos</div>
    <div class="list" style="margin-bottom:14px;">
      ${ventasDia.map(v => `<div class="row-card" style="cursor:default;"><div class="avatar">${initials(nombreCliente(v.clienteId))}</div><div class="row-main"><div class="row-title">${esc(nombreCliente(v.clienteId))}</div></div><div class="row-end">${badgeEstado(v.estado)}<div class="row-amount" style="margin-top:4px">${fmtMoney(v.total)}</div></div></div>`).join('') || `<div class="small-muted">Sin ventas registradas este día.</div>`}
    </div>
    <div class="section-title">Productos vendidos</div>
    <div class="list" style="margin-bottom:16px;">
      ${productosOrdenados.length === 0 ? `<div class="small-muted">Sin productos vendidos.</div>` :
      productosOrdenados.map(([pid, cant]) => `<div class="price-row"><span class="pr-name">${esc(nombreProducto(parseInt(pid)))}</span><span class="pr-val">${cant} und.</span></div>`).join('')}
    </div>
    <button class="btn btn-secondary btn-block" id="imprimir-cierre">${ICONS.printer} Imprimir reporte</button>
  `, (sheet) => {
    $('#imprimir-cierre', sheet).addEventListener('click', () => imprimirCierre(carroId, fecha));
  });
}

function sheetAsignarClientes(carroId, fecha) {
  const key = `${carroId}_${fecha}`;
  const actuales = new Set(DB.asignaciones[key] || []);
  openSheet(`
    <div class="sheet-head"><h3>Asignar clientes</h3><button class="icon-btn" data-action="close-sheet">✕</button></div>
    <p class="field-note" style="margin-bottom:14px;">${esc(nombreCarro(carroId))} · ${fmtDateShort(fecha)}</p>
    <div class="list" id="asignar-list">
      ${DB.clientes.map(c => `
        <label class="row-card" style="cursor:pointer;">
          <div class="avatar">${initials(c.nombre)}</div>
          <div class="row-main"><div class="row-title">${esc(c.nombre)}</div><div class="row-sub">${esc(c.direccion)}</div></div>
          <input type="checkbox" data-cid="${c.id}" ${actuales.has(c.id) ? 'checked' : ''} style="width:20px;height:20px;accent-color:var(--copper);">
        </label>`).join('')}
    </div>
    <button class="btn btn-primary btn-block" id="save-asignacion" style="margin-top:16px;">Guardar asignación</button>
  `, (sheet) => {
    $('#save-asignacion', sheet).addEventListener('click', () => {
      const ids = $all('input[type=checkbox]', sheet).filter(i => i.checked).map(i => parseInt(i.dataset.cid));
      DB.asignaciones[key] = ids;
      api_save();
      closeSheet();
      toast('Clientes asignados');
      navigate('carroDetail', { id: carroId, fecha }, { push: false });
    });
  });
}

function sheetClienteDia(clienteId, carroId, fecha) {
  const cliente = DB.clientes.find(c => c.id === clienteId);
  const venta = DB.ventas.find(v => v.clienteId === clienteId && v.carroId === carroId && v.fecha === fecha);
  openSheet(`
    <div class="sheet-head"><h3>${esc(cliente.nombre)}</h3><button class="icon-btn" data-action="close-sheet">✕</button></div>
    <p class="field-note" style="margin-bottom:12px;">${fmtDateShort(fecha)} · ${esc(nombreCarro(carroId))}</p>
    ${venta ? `
      <div class="list" style="margin-bottom:14px;">
        ${venta.items.map(it => `
          <div class="venta-item">
            <div class="vi-main"><div class="vi-name">${esc(nombreProducto(it.productoId))}</div><div class="vi-sub">${it.cantidad} × ${fmtMoney(it.precioUnit)}</div></div>
            <div class="row-amount">${fmtMoney(it.cantidad * it.precioUnit)}</div>
          </div>`).join('')}
      </div>
      ${venta.descuento ? `<div class="row-sub" style="margin-bottom:8px;">Descuento aplicado: -${fmtMoney(venta.descuento)}</div>` : ''}
      <div class="total-box" style="margin-bottom:12px;">
        <div><div class="t-label">Total</div><div class="t-value">${fmtMoney(venta.total)}</div></div>
        ${badgeEstado(venta.estado)}
      </div>
      <div class="row-sub">Forma de pago: ${payLabel(venta.formaPago)} ${venta.estado !== 'pagado' ? `· Pendiente: ${fmtMoney(ventaSaldo(venta))}` : ''}</div>
      <button class="btn btn-secondary btn-block" style="margin-top:16px;" data-action="ver-cliente-full" data-id="${clienteId}">Ver ficha del cliente</button>
    ` : estaConfirmado(carroId, fecha) ? `
      <div class="empty-state" style="padding:24px 10px;">
        <div class="es-icon">${ICONS.lock}</div>
        <h4>Este carro ya fue confirmado</h4>
        <p>No se pueden registrar más pedidos para esta fecha.</p>
      </div>
    ` : `
      <div class="empty-state" style="padding:24px 10px;">
        <div class="es-icon">${ICONS.box}</div>
        <h4>Aún no hay venta registrada</h4>
        <p>Registra la venta de este cliente para este día.</p>
      </div>
      <button class="btn btn-primary btn-block" data-action="nueva-venta-para" data-cliente="${clienteId}" data-carro="${carroId}" data-fecha="${fecha}">${ICONS.plus} Registrar venta</button>
    `}
  `, (sheet) => {
    const btn = $('[data-action="nueva-venta-para"]', sheet);
    if (btn) btn.addEventListener('click', () => {
      closeSheet();
      navigate('ventaNueva', { clienteId, carroId, fecha });
    });
    const verBtn = $('[data-action="ver-cliente-full"]', sheet);
    if (verBtn) verBtn.addEventListener('click', () => { closeSheet(); navigate('clienteDetail', { id: clienteId }); });
  });
}

/* ============================================================
   VISTA: CLIENTES (lista + detalle)
   ============================================================ */
function viewClientes() {
  const q = State.clientesSearch.trim().toLowerCase();
  const list = DB.clientes.filter(c => !q || c.nombre.toLowerCase().includes(q) || c.telefono.includes(q));
  return `
    <div class="page-header"><h2>Clientes</h2><button class="btn btn-primary btn-sm" data-action="crear-cliente">${ICONS.plus} Nuevo</button></div>
    <div class="search-bar">${ICONS.search}<input type="text" id="clientes-search" placeholder="Buscar por nombre o teléfono" value="${esc(State.clientesSearch)}"></div>
    <div class="list">
      ${list.length === 0 ? `<div class="empty-state"><div class="es-icon">${ICONS.search}</div><h4>Sin resultados</h4><p>No encontramos clientes con ese nombre.</p></div>` :
      list.map(c => {
        const ventasCli = DB.ventas.filter(v => v.clienteId === c.id);
        const deuda = ventasCli.reduce((s, v) => s + ventaSaldo(v), 0);
        return `
        <div class="row-card" data-action="open-cliente" data-id="${c.id}">
          <div class="avatar">${initials(c.nombre)}</div>
          <div class="row-main"><div class="row-title">${esc(c.nombre)}</div><div class="row-sub">${esc(c.telefono)} · ${esc(nombreCarro(c.carroDefault))}</div></div>
          <div class="row-end">${deuda > 0 ? `<div class="row-amount" style="color:var(--clay)">${fmtMoney(deuda)}</div><div class="small-muted">pendiente</div>` : `<span class="badge badge-pagado">Al día</span>`}</div>
          <div class="chevron">${ICONS.chevronRight}</div>
        </div>`;
      }).join('')}
    </div>`;
}
function mountClientes() {
  $('#clientes-search').addEventListener('input', (e) => { State.clientesSearch = e.target.value; renderApp(); $('#clientes-search').focus(); $('#clientes-search').setSelectionRange(999, 999); });
  const crear = $('[data-action="crear-cliente"]');
  if (crear) crear.addEventListener('click', sheetCrearEditarCliente);
}

function sheetCrearEditarCliente(clienteId) {
  const cliente = clienteId ? DB.clientes.find(c => c.id === clienteId) : null;
  openSheet(`
    <div class="sheet-head"><h3>${cliente ? 'Editar cliente' : 'Nuevo cliente'}</h3><button class="icon-btn" data-action="close-sheet">✕</button></div>
    <div class="form-grid">
      <div class="field"><label>Nombre completo</label><input id="f-nombre" value="${cliente ? esc(cliente.nombre) : ''}" placeholder="Ej: Laura Sánchez"></div>
      <div class="field"><label>Teléfono</label><input id="f-telefono" value="${cliente ? esc(cliente.telefono) : ''}" placeholder="300 123 4567"></div>
      <div class="field"><label>Dirección</label><input id="f-direccion" value="${cliente ? esc(cliente.direccion) : ''}" placeholder="Cra 5 #12-34, Barrio..."></div>
      <div class="field"><label>Carro asignado por defecto</label>
        <select id="f-carro">${DB.carros.map(c => `<option value="${c.id}" ${cliente && cliente.carroDefault === c.id ? 'selected' : ''}>${esc(c.nombre)}</option>`).join('')}</select>
      </div>
      <div class="field">
        <label>Lista de precios</label>
        <div class="pay-options-2" id="f-lista">
          <div class="pay-opt ${(!cliente || cliente.listaPrecio !== 'especial') ? 'active' : ''}" data-lista="normal">${ICONS.tag}Normal</div>
          <div class="pay-opt ${cliente && cliente.listaPrecio === 'especial' ? 'active' : ''}" data-lista="especial">${ICONS.tag}Especial</div>
        </div>
        <p class="field-note">Este cliente comprará con esta lista hasta que la cambies aquí.</p>
      </div>
      <button class="btn btn-primary btn-block" id="save-cliente">${cliente ? 'Guardar cambios' : 'Crear cliente'}</button>
    </div>
  `, (sheet) => {
    let listaSeleccionada = cliente && cliente.listaPrecio === 'especial' ? 'especial' : 'normal';
    $all('#f-lista .pay-opt', sheet).forEach(opt => opt.addEventListener('click', () => {
      listaSeleccionada = opt.dataset.lista;
      $all('#f-lista .pay-opt', sheet).forEach(o => o.classList.toggle('active', o === opt));
    }));
    $('#save-cliente', sheet).addEventListener('click', () => {
      const nombre = $('#f-nombre', sheet).value.trim();
      const telefono = $('#f-telefono', sheet).value.trim();
      const direccion = $('#f-direccion', sheet).value.trim();
      const carroDefault = parseInt($('#f-carro', sheet).value);
      if (!nombre) { toast('Escribe el nombre del cliente'); return; }
      if (cliente) {
        Object.assign(cliente, { nombre, telefono, direccion, carroDefault, listaPrecio: listaSeleccionada });
        toast('Cliente actualizado');
      } else {
        const id = Math.max(0, ...DB.clientes.map(c => c.id)) + 1;
        DB.clientes.push({ id, nombre, telefono, direccion, carroDefault, listaPrecio: listaSeleccionada });
        toast('Cliente creado');
      }
      api_save();
      closeSheet();
      renderApp();
    });
  });
}

function viewClienteDetail(params) {
  const cliente = DB.clientes.find(c => c.id === params.id);
  const ventasCli = DB.ventas.filter(v => v.clienteId === cliente.id).sort((a, b) => b.fecha.localeCompare(a.fecha) || b.id - a.id);
  const totalComprado = ventasCli.reduce((s, v) => s + v.total, 0);
  const deuda = ventasCli.reduce((s, v) => s + ventaSaldo(v), 0);
  return `
    <div class="detail-hero">
      <div class="dh-top">
        <div class="avatar" style="width:52px;height:52px;font-size:18px;">${initials(cliente.nombre)}</div>
        <div style="flex:1">
          <h2>${esc(cliente.nombre)}</h2>
          <div class="dh-meta">${ICONS.phone} ${esc(cliente.telefono)}</div>
          <div class="dh-meta" style="margin-top:2px">${ICONS.pin} ${esc(cliente.direccion)}</div>
          <span class="dept-tag">${ICONS.tag} Lista ${listaLabel(cliente.listaPrecio)}</span>
        </div>
        <button class="icon-square" data-action="editar-cliente" data-id="${cliente.id}">${ICONS.edit}</button>
      </div>
      <div class="detail-stats">
        <div><div class="k">Total comprado</div><div class="v">${fmtMoney(totalComprado)}</div></div>
        <div><div class="k">Deuda actual</div><div class="v" style="color:${deuda > 0 ? 'var(--clay)' : 'var(--sage)'}">${fmtMoney(deuda)}</div></div>
        <div><div class="k">Carro habitual</div><div class="v" style="font-size:13.5px">${esc(nombreCarro(cliente.carroDefault))}</div></div>
      </div>
    </div>

    <div class="page-header" style="margin-bottom:10px;">
      <h2 style="font-size:16px;">Historial de compras</h2>
      <button class="btn btn-secondary btn-sm" data-action="nueva-venta-para" data-cliente="${cliente.id}" data-carro="${cliente.carroDefault}" data-fecha="${todayStr()}">${ICONS.plus} Venta</button>
    </div>
    <div class="list">
      ${ventasCli.length === 0 ? `<div class="empty-state"><div class="es-icon">${ICONS.doc}</div><h4>Sin compras aún</h4><p>Este cliente todavía no tiene ventas registradas.</p></div>` :
      ventasCli.map(v => `
        <div class="row-card hist-item" data-action="ver-venta" data-id="${v.id}">
          <div class="avatar">${ICONS.doc}</div>
          <div class="row-main"><div class="row-title">${fmtDateShort(v.fecha)}</div><div class="row-sub">${esc(nombreCarro(v.carroId))} · ${payLabel(v.formaPago)}</div></div>
          <div class="row-end">${badgeEstado(v.estado)}<div class="row-amount" style="margin-top:4px">${fmtMoney(v.total)}</div></div>
        </div>`).join('')}
    </div>
  `;
}
function mountClienteDetail(params) {
  const editBtn = $('[data-action="editar-cliente"]');
  if (editBtn) editBtn.addEventListener('click', () => sheetCrearEditarCliente(params.id));
  const nuevaVenta = $('[data-action="nueva-venta-para"]');
  if (nuevaVenta) nuevaVenta.addEventListener('click', () => navigate('ventaNueva', { clienteId: params.id, carroId: parseInt(nuevaVenta.dataset.carro), fecha: nuevaVenta.dataset.fecha }));
  $all('[data-action="ver-venta"]').forEach(row => row.addEventListener('click', () => sheetVerVenta(parseInt(row.dataset.id))));
}

function sheetVerVenta(ventaId) {
  const v = DB.ventas.find(v => v.id === ventaId);
  const itemsOrdenados = v.items.slice().sort((a, b) => (b.cantidad * b.precioUnit) - (a.cantidad * a.precioUnit));
  const cliente = DB.clientes.find(c => c.id === v.clienteId);
  openSheet(`
    <div class="sheet-head"><h3>Venta #${v.id}</h3><button class="icon-btn" data-action="close-sheet">✕</button></div>
    <p class="field-note" style="margin-bottom:10px;">${fmtDateLong(v.fecha)} · ${esc(nombreCarro(v.carroId))} · ${esc(nombreCliente(v.clienteId))} · Lista ${listaLabel(cliente.listaPrecio)}</p>
    <div class="list" style="margin-bottom:14px;">
      ${itemsOrdenados.map(it => `
        <div class="venta-item">
          <div class="vi-main"><div class="vi-name">${esc(nombreProducto(it.productoId))}</div><div class="vi-sub">${it.cantidad} × ${fmtMoney(it.precioUnit)}</div></div>
          <div class="row-amount">${fmtMoney(it.cantidad * it.precioUnit)}</div>
        </div>`).join('')}
    </div>
    ${v.descuento ? `<div class="row-sub" style="margin-bottom:6px;">Descuento: -${fmtMoney(v.descuento)}</div>` : ''}
    <div class="total-box"><div><div class="t-label">Total</div><div class="t-value">${fmtMoney(v.total)}</div></div>${badgeEstado(v.estado)}</div>
    <div class="row-sub" style="margin:12px 2px;">Forma de pago: ${payLabel(v.formaPago)}</div>
    ${v.abonos && v.abonos.length ? `
      <div class="section-title" style="margin-top:14px;">Abonos registrados</div>
      <div class="list">${v.abonos.map(a => `<div class="row-card" style="cursor:default;"><div class="avatar">${ICONS.wallet}</div><div class="row-main"><div class="row-title">${fmtMoney(a.valor)}</div><div class="row-sub">${fmtDateShort(a.fecha)} · ${payLabel(a.metodo)}</div></div></div>`).join('')}</div>
    ` : ''}
    <div class="internal-box">
      <div class="ib-title">Datos internos (no mostrar al cliente)</div>
      <div class="ib-row"><span>Costo total</span><span>${fmtMoney(costoVenta(v))}</span></div>
      <div class="ib-row"><span>Ganancia estimada</span><strong>${fmtMoney(gananciaVenta(v))}</strong></div>
    </div>
    <button class="btn btn-secondary btn-block" style="margin-top:14px;" data-action="imprimir-factura" data-id="${v.id}">${ICONS.printer} Imprimir factura (3 copias)</button>
    ${ventaSaldo(v) > 0 ? `<button class="btn btn-primary btn-block" style="margin-top:10px;" data-action="pagar-desde-venta" data-id="${v.id}">Registrar pago</button>` : ''}
  `, (sheet) => {
    const payBtn = $('[data-action="pagar-desde-venta"]', sheet);
    if (payBtn) payBtn.addEventListener('click', () => { closeSheet(); setTimeout(() => sheetRegistrarPago(v.clienteId, v.id), 180); });
    $('[data-action="imprimir-factura"]', sheet).addEventListener('click', () => imprimirFactura(v.id));
  });
}

/* ============================================================
   VISTA: PRODUCTOS
   ============================================================ */
function viewProductos() {
  const depFiltro = State.productosDept || 'todos';
  const lista = depFiltro === 'todos' ? DB.productos : DB.productos.filter(p => p.departamento === depFiltro);
  return `
    <div class="page-header"><h2>Productos</h2><button class="btn btn-primary btn-sm" data-action="crear-producto">${ICONS.plus} Nuevo</button></div>
    <div class="filter-row" id="dept-filters">
      <button class="chip ${depFiltro === 'todos' ? 'active' : ''}" data-dept="todos">Todos</button>
      ${DEPARTAMENTOS.map(d => `<button class="chip ${depFiltro === d ? 'active' : ''}" data-dept="${esc(d)}">${esc(d)}</button>`).join('')}
    </div>
    <div class="product-grid">
      ${lista.map(p => `
        <div class="product-card" data-action="editar-producto" data-id="${p.id}">
          <div class="p-icon">${ICONS.cookie}</div>
          <h4>${esc(p.nombre)}</h4>
          <div class="small-muted">${esc(p.presentacion)} · ${esc(p.formaVenta)}</div>
          <div class="p-price">${fmtMoney(p.precioNormal)}</div>
          <div class="small-muted">Especial: ${fmtMoney(p.precioEspecial)} · Costo: ${fmtMoney(p.costo)}</div>
          <div class="p-stock ${p.stock <= 15 ? 'stock-low' : ''}">${p.stock <= 15 ? '¡Stock bajo! ' : ''}Stock: ${p.stock}</div>
          <span class="dept-tag">${esc(p.departamento)}</span>
        </div>`).join('')}
    </div>
  `;
}
function mountProductos() {
  const crear = $('[data-action="crear-producto"]');
  if (crear) crear.addEventListener('click', () => sheetProducto());
  $all('[data-action="editar-producto"]').forEach(card => card.addEventListener('click', () => sheetProducto(parseInt(card.dataset.id))));
  $('#dept-filters').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-dept]'); if (!btn) return;
    State.productosDept = btn.dataset.dept;
    renderApp();
  });
}
function sheetProducto(productoId) {
  const p = productoId ? DB.productos.find(p => p.id === productoId) : null;
  openSheet(`
    <div class="sheet-head"><h3>${p ? 'Editar producto' : 'Nuevo producto'}</h3><button class="icon-btn" data-action="close-sheet">✕</button></div>
    <div class="form-grid">
      <div class="field"><label>Nombre</label><input id="f-pnombre" value="${p ? esc(p.nombre) : ''}" placeholder="Ej: Cortador Estrella"></div>
      <div class="form-row-2">
        <div class="field" style="margin-bottom:0"><label>Precio normal</label><input id="f-precio-normal" type="number" min="0" value="${p ? p.precioNormal : ''}" placeholder="3500"></div>
        <div class="field" style="margin-bottom:0"><label>Precio especial</label><input id="f-precio-especial" type="number" min="0" value="${p ? p.precioEspecial : ''}" placeholder="3100"></div>
      </div>
      <div class="form-row-2">
        <div class="field" style="margin-bottom:0"><label>Costo</label><input id="f-costo" type="number" min="0" value="${p ? p.costo : ''}" placeholder="1800"></div>
        <div class="field" style="margin-bottom:0"><label>Stock</label><input id="f-stock" type="number" min="0" value="${p ? p.stock : ''}" placeholder="100"></div>
      </div>
      <div class="form-row-2">
        <div class="field" style="margin-bottom:0"><label>Departamento</label>
          <select id="f-departamento">${DEPARTAMENTOS.map(d => `<option ${p && p.departamento === d ? 'selected' : ''}>${esc(d)}</option>`).join('')}</select>
        </div>
        <div class="field" style="margin-bottom:0"><label>Forma de venta</label>
          <select id="f-formaventa">${FORMAS_VENTA.map(f => `<option ${p && p.formaVenta === f ? 'selected' : ''}>${esc(f)}</option>`).join('')}</select>
        </div>
      </div>
      <div class="field"><label>Presentación</label><input id="f-presentacion" value="${p ? esc(p.presentacion) : ''}" placeholder="Individual · metal"></div>
      <button class="btn btn-primary btn-block" id="save-producto">${p ? 'Guardar cambios' : 'Crear producto'}</button>
      ${p ? `<button class="btn btn-danger btn-block" id="del-producto">${ICONS.trash} Eliminar producto</button>` : ''}
    </div>
  `, (sheet) => {
    $('#save-producto', sheet).addEventListener('click', () => {
      const nombre = $('#f-pnombre', sheet).value.trim();
      const precioNormal = parseFloat($('#f-precio-normal', sheet).value) || 0;
      const precioEspecial = parseFloat($('#f-precio-especial', sheet).value) || precioNormal;
      const costo = parseFloat($('#f-costo', sheet).value) || 0;
      const stock = parseInt($('#f-stock', sheet).value) || 0;
      const departamento = $('#f-departamento', sheet).value;
      const formaVenta = $('#f-formaventa', sheet).value;
      const presentacion = $('#f-presentacion', sheet).value.trim() || 'Individual';
      if (!nombre) { toast('Escribe el nombre del producto'); return; }
      if (p) { Object.assign(p, { nombre, precioNormal, precioEspecial, costo, stock, departamento, formaVenta, presentacion }); toast('Producto actualizado'); }
      else {
        const id = Math.max(0, ...DB.productos.map(p => p.id)) + 1;
        DB.productos.push({ id, nombre, precioNormal, precioEspecial, costo, stock, departamento, formaVenta, presentacion });
        toast('Producto creado');
      }
      api_save(); closeSheet(); renderApp();
    });
    const del = $('#del-producto', sheet);
    if (del) del.addEventListener('click', () => {
      if (!confirm('¿Eliminar este producto?')) return;
      DB.productos = DB.productos.filter(x => x.id !== p.id);
      api_save(); closeSheet(); renderApp(); toast('Producto eliminado');
    });
  });
}

/* ============================================================
   VISTA: LISTAS DE PRECIOS
   ============================================================ */
function viewListasPrecios() {
  const tab = State.listaPreciosTab;
  const key = tab === 'especial' ? 'precioEspecial' : 'precioNormal';
  const clientesEnLista = DB.clientes.filter(c => (c.listaPrecio || 'normal') === tab);
  return `
    <div class="page-header"><h2>Listas de precios</h2></div>
    <div class="tabs-row">
      <button class="tab-btn ${tab === 'normal' ? 'active' : ''}" data-lptab="normal">Normal</button>
      <button class="tab-btn ${tab === 'especial' ? 'active' : ''}" data-lptab="especial">Especial</button>
    </div>
    <div class="soon-box" style="margin-top:0;margin-bottom:14px;">${ICONS.tag}<span>${clientesEnLista.length} cliente(s) compran con la lista <strong>${listaLabel(tab)}</strong>: ${clientesEnLista.map(c => esc(c.nombre)).join(', ') || '—'}.</span></div>
    <div class="list" style="margin-bottom:16px;">
      ${DB.productos.map(p => `
        <div class="price-row">
          <div><div class="pr-name">${esc(p.nombre)}</div><div class="pr-dept">${esc(p.departamento)}</div></div>
          <span class="pr-val">${fmtMoney(p[key])}</span>
        </div>`).join('')}
    </div>
    <button class="btn btn-secondary btn-block" id="imprimir-lista">${ICONS.printer} Imprimir esta lista</button>
  `;
}
function mountListasPrecios() {
  $all('[data-lptab]').forEach(b => b.addEventListener('click', () => { State.listaPreciosTab = b.dataset.lptab; renderApp(); }));
  $('#imprimir-lista').addEventListener('click', () => imprimirListaPrecios(State.listaPreciosTab));
}

/* ============================================================
   VISTA: REGISTRAR VENTA
   ============================================================ */
function viewVentaNueva(params) {
  State.ventaForm = State.ventaForm && State.ventaForm._locked ? State.ventaForm : {
    fecha: params.fecha || todayStr(),
    carroId: params.carroId || DB.carros[0].id,
    clienteId: params.clienteId || null,
    items: [],
    descuento: 0,
    formaPago: 'efectivo',
    estado: 'pagado',
    abonoInicial: 0,
    _locked: true
  };
  const f = State.ventaForm;
  const clientesDisponibles = clientesParaCarroFecha(f.carroId, f.fecha);

  return `
    <div class="page-header"><h2>Registrar venta</h2></div>
    <div class="form-grid">
      <div class="form-row-2">
        <div class="field" style="margin-bottom:0"><label>Fecha</label><input type="date" id="v-fecha" value="${f.fecha}"></div>
        <div class="field" style="margin-bottom:0"><label>Carro</label>
          <select id="v-carro">${DB.carros.map(c => `<option value="${c.id}" ${f.carroId === c.id ? 'selected' : ''}>${esc(c.nombre)}</option>`).join('')}</select>
        </div>
      </div>
      <div class="field">
        <label>Cliente</label>
        <select id="v-cliente">
          <option value="">Selecciona un cliente…</option>
          ${clientesDisponibles.map(c => `<option value="${c.id}" ${f.clienteId === c.id ? 'selected' : ''}>${esc(c.nombre)}</option>`).join('')}
        </select>
        <p class="field-note" id="v-lista-nota">Se muestran primero los clientes asignados a este carro en esta fecha.</p>
      </div>
    </div>

    ${estaConfirmado(f.carroId, f.fecha) ? `<div class="lock-banner">${ICONS.lock}<div class="lb-text"><strong>Este carro ya fue confirmado</strong>Elige otra fecha o carro para poder registrar el pedido.</div></div>` : ''}

    <div class="section-title">Productos</div>
    <div class="card" style="margin-bottom:12px;">
      <div class="form-row-2" style="margin-bottom:10px;">
        <select id="v-producto" style="grid-column:1/2;">
          ${DB.productos.map(p => `<option value="${p.id}">${esc(p.nombre)} · ${fmtMoney(precioParaCliente(p, DB.clientes.find(c => c.id === f.clienteId)))}</option>`).join('')}
        </select>
        <div class="qty-stepper" style="justify-content:center;">
          <button type="button" id="v-qty-minus">−</button>
          <span id="v-qty">1</span>
          <button type="button" id="v-qty-plus">+</button>
        </div>
      </div>
      <button class="btn btn-secondary btn-block" id="v-add-item">${ICONS.plus} Agregar producto</button>
    </div>

    <div id="v-items-wrap">${renderVentaItems()}</div>

    <div class="section-title">Descuento y pago</div>
    <div class="card form-grid">
      <div class="field" style="margin-bottom:0"><label>Descuento (COP)</label><input type="number" min="0" id="v-descuento" value="${f.descuento}"></div>

      <div class="field" style="margin-bottom:0">
        <label>Forma de pago</label>
        <div class="pay-options" id="v-formapago">
          <div class="pay-opt ${f.formaPago === 'efectivo' ? 'active' : ''}" data-pay="efectivo">${ICONS.cash}Efectivo</div>
          <div class="pay-opt ${f.formaPago === 'transferencia' ? 'active' : ''}" data-pay="transferencia">${ICONS.transfer}Transfer.</div>
          <div class="pay-opt ${f.formaPago === 'credito' ? 'active' : ''}" data-pay="credito">${ICONS.credit}Crédito</div>
        </div>
      </div>

      <div class="field" style="margin-bottom:0">
        <label>Estado de la venta</label>
        <div class="pay-options" id="v-estado">
          <div class="pay-opt ${f.estado === 'pagado' ? 'active' : ''}" data-estado="pagado">${ICONS.check}Pagado</div>
          <div class="pay-opt ${f.estado === 'pendiente' ? 'active' : ''}" data-estado="pendiente">${ICONS.wallet}Pendiente</div>
          <div class="pay-opt ${f.estado === 'abono' ? 'active' : ''}" data-estado="abono">${ICONS.cash}Abono</div>
        </div>
      </div>

      <div class="field" id="v-abono-wrap" style="margin-bottom:0;display:${f.estado === 'abono' ? 'block' : 'none'}">
        <label>Valor abonado ahora</label>
        <input type="number" min="0" id="v-abono" value="${f.abonoInicial}">
      </div>
    </div>

    <div id="v-total-wrap">${renderVentaTotal()}</div>

    <button class="btn btn-primary btn-block" style="margin-top:18px;" id="v-submit">Registrar venta</button>
  `;
}
function clientesParaCarroFecha(carroId, fecha) {
  const asignados = DB.asignaciones[`${carroId}_${fecha}`] || [];
  const asignadosSet = new Set(asignados);
  const enCarro = DB.clientes.filter(c => asignadosSet.has(c.id));
  const resto = DB.clientes.filter(c => !asignadosSet.has(c.id));
  return [...enCarro, ...resto];
}
function ventaCalculos() {
  const f = State.ventaForm;
  const subtotal = f.items.reduce((s, it) => s + it.cantidad * it.precioUnit, 0);
  const total = Math.max(0, subtotal - (parseFloat(f.descuento) || 0));
  return { subtotal, total };
}
function renderVentaItems() {
  const f = State.ventaForm;
  if (f.items.length === 0) {
    return `<div class="empty-state" style="padding:20px 10px;"><div class="es-icon">${ICONS.box}</div><h4>Sin productos aún</h4><p>Agrega uno o varios productos a esta venta.</p></div>`;
  }
  return `<div class="list" style="margin-bottom:14px;">${f.items.map((it, idx) => `
    <div class="venta-item">
      <div class="vi-main"><div class="vi-name">${esc(nombreProducto(it.productoId))}</div><div class="vi-sub">${it.cantidad} × ${fmtMoney(it.precioUnit)}</div></div>
      <div class="row-amount">${fmtMoney(it.cantidad * it.precioUnit)}</div>
      <button type="button" class="vi-remove" data-remove-item="${idx}">${ICONS.trash}</button>
    </div>`).join('')}</div>`;
}
function renderVentaTotal() {
  const { subtotal, total } = ventaCalculos();
  const f = State.ventaForm;
  return `
    <div class="card" style="margin-top:6px;">
      <div style="display:flex;justify-content:space-between;font-size:13.5px;color:var(--ink-soft);margin-bottom:6px;"><span>Subtotal</span><span>${fmtMoney(subtotal)}</span></div>
      <div style="display:flex;justify-content:space-between;font-size:13.5px;color:var(--ink-soft);margin-bottom:12px;"><span>Descuento</span><span>-${fmtMoney(f.descuento || 0)}</span></div>
      <div class="total-box"><div><div class="t-label">Total a pagar</div><div class="t-value">${fmtMoney(total)}</div></div></div>
    </div>`;
}
function mountVentaNueva() {
  const f = State.ventaForm;
  $('#v-fecha').addEventListener('change', (e) => { f.fecha = e.target.value; renderApp(); });
  $('#v-carro').addEventListener('change', (e) => { f.carroId = parseInt(e.target.value); renderApp(); });
  $('#v-cliente').addEventListener('change', (e) => { f.clienteId = e.target.value ? parseInt(e.target.value) : null; refreshProductoOptions(); });
  function refreshProductoOptions() {
    const sel = $('#v-producto');
    const cliente = DB.clientes.find(c => c.id === f.clienteId);
    if (sel) sel.innerHTML = DB.productos.map(p => `<option value="${p.id}">${esc(p.nombre)} · ${fmtMoney(precioParaCliente(p, cliente))}</option>`).join('');
    const nota = $('#v-lista-nota');
    if (nota) nota.textContent = cliente ? `Lista de precios de este cliente: ${listaLabel(cliente.listaPrecio)}.` : 'Se muestran primero los clientes asignados a este carro en esta fecha.';
  }

  let qty = 1;
  $('#v-qty-minus').addEventListener('click', () => { qty = Math.max(1, qty - 1); $('#v-qty').textContent = qty; });
  $('#v-qty-plus').addEventListener('click', () => { qty = qty + 1; $('#v-qty').textContent = qty; });

  $('#v-add-item').addEventListener('click', () => {
    const prodId = parseInt($('#v-producto').value);
    const prod = DB.productos.find(p => p.id === prodId);
    const clienteActual = DB.clientes.find(c => c.id === f.clienteId);
    const existing = f.items.find(it => it.productoId === prodId);
    if (existing) existing.cantidad += qty;
    else f.items.push({ productoId: prodId, cantidad: qty, precioUnit: precioParaCliente(prod, clienteActual) });
    qty = 1; $('#v-qty').textContent = 1;
    $('#v-items-wrap').innerHTML = renderVentaItems();
    bindRemoveItems();
    $('#v-total-wrap').innerHTML = renderVentaTotal();
  });
  bindRemoveItems();
  function bindRemoveItems() {
    $all('[data-remove-item]').forEach(btn => btn.addEventListener('click', () => {
      f.items.splice(parseInt(btn.dataset.removeItem), 1);
      $('#v-items-wrap').innerHTML = renderVentaItems();
      bindRemoveItems();
      $('#v-total-wrap').innerHTML = renderVentaTotal();
    }));
  }

  $('#v-descuento').addEventListener('input', (e) => { f.descuento = parseFloat(e.target.value) || 0; $('#v-total-wrap').innerHTML = renderVentaTotal(); });

  $all('#v-formapago .pay-opt').forEach(opt => opt.addEventListener('click', () => {
    f.formaPago = opt.dataset.pay;
    $all('#v-formapago .pay-opt').forEach(o => o.classList.toggle('active', o === opt));
    if (f.formaPago !== 'credito' && f.estado !== 'pagado') {
      f.estado = 'pagado';
      $all('#v-estado .pay-opt').forEach(o => o.classList.toggle('active', o.dataset.estado === 'pagado'));
      $('#v-abono-wrap').style.display = 'none';
    }
  }));
  $all('#v-estado .pay-opt').forEach(opt => opt.addEventListener('click', () => {
    f.estado = opt.dataset.estado;
    $all('#v-estado .pay-opt').forEach(o => o.classList.toggle('active', o === opt));
    $('#v-abono-wrap').style.display = f.estado === 'abono' ? 'block' : 'none';
  }));
  const abonoInput = $('#v-abono');
  if (abonoInput) abonoInput.addEventListener('input', (e) => { f.abonoInicial = parseFloat(e.target.value) || 0; });

  $('#v-submit').addEventListener('click', submitVenta);
}
function submitVenta() {
  const f = State.ventaForm;
  if (estaConfirmado(f.carroId, f.fecha)) { toast('Este carro ya fue confirmado para esta fecha'); return; }
  if (!f.clienteId) { toast('Selecciona un cliente'); return; }
  if (f.items.length === 0) { toast('Agrega al menos un producto'); return; }
  const { total } = ventaCalculos();

  let abonos = [];
  let estado = f.estado;
  if (estado === 'abono') {
    const monto = Math.min(total, Math.max(0, f.abonoInicial || 0));
    if (monto <= 0) { estado = 'pendiente'; }
    else {
      abonos.push({ id: uid('ab'), valor: monto, fecha: f.fecha, metodo: f.formaPago === 'credito' ? 'efectivo' : f.formaPago });
      if (monto >= total) estado = 'pagado';
    }
  }

  const id = DB.meta.nextVentaId++;
  DB.ventas.push({ id, fecha: f.fecha, carroId: f.carroId, clienteId: f.clienteId, items: f.items, descuento: f.descuento || 0, total, formaPago: f.formaPago, estado, abonos });

  f.items.forEach(it => {
    const p = DB.productos.find(p => p.id === it.productoId);
    if (p) p.stock = Math.max(0, p.stock - it.cantidad);
  });

  const key = `${f.carroId}_${f.fecha}`;
  if (!(DB.asignaciones[key] || []).includes(f.clienteId)) {
    DB.asignaciones[key] = [...(DB.asignaciones[key] || []), f.clienteId];
  }

  api_save();
  toast('Venta registrada correctamente');
  const clienteId = f.clienteId, carroId = f.carroId, fecha = f.fecha;
  State.ventaForm = null;
  navigate('carroDetail', { id: carroId, fecha }, { resetHistory: false, push: false });
}

/* ============================================================
   VISTA: PAGOS Y DEUDAS
   ============================================================ */
function viewPagos() {
  const deudores = DB.clientes.map(c => {
    const ventasCli = DB.ventas.filter(v => v.clienteId === c.id);
    const deuda = ventasCli.reduce((s, v) => s + ventaSaldo(v), 0);
    const pendientes = ventasCli.filter(v => ventaSaldo(v) > 0).length;
    return { cliente: c, deuda, pendientes };
  }).filter(x => x.deuda > 0).sort((a, b) => b.deuda - a.deuda);

  const totalDeuda = deudores.reduce((s, d) => s + d.deuda, 0);

  return `
    <div class="page-header"><h2>Pagos y deudas</h2></div>
    <div class="stat-card wide accent" style="margin-bottom:18px;">
      <div><div class="stat-label">${ICONS.wallet} Total por cobrar</div><div class="stat-value">${fmtMoney(totalDeuda)}</div></div>
      <div style="font-size:13px;opacity:.85">${deudores.length} clientes</div>
    </div>
    <div class="list">
      ${deudores.length === 0 ? `<div class="empty-state"><div class="es-icon">${ICONS.check}</div><h4>¡Todo al día!</h4><p>Ningún cliente tiene dinero pendiente por pagar.</p></div>` :
      deudores.map(d => `
        <div class="row-card" data-action="pagos-cliente" data-id="${d.cliente.id}">
          <div class="avatar">${initials(d.cliente.nombre)}</div>
          <div class="row-main"><div class="row-title">${esc(d.cliente.nombre)}</div><div class="row-sub">${d.pendientes} venta(s) pendiente(s)</div></div>
          <div class="row-end"><div class="row-amount" style="color:var(--clay)">${fmtMoney(d.deuda)}</div></div>
          <div class="chevron">${ICONS.chevronRight}</div>
        </div>`).join('')}
    </div>
  `;
}
function mountPagos() {
  $all('[data-action="pagos-cliente"]').forEach(row => row.addEventListener('click', () => sheetRegistrarPago(parseInt(row.dataset.id))));
}
function sheetRegistrarPago(clienteId, preferVentaId) {
  const cliente = DB.clientes.find(c => c.id === clienteId);
  const pendientes = DB.ventas.filter(v => v.clienteId === clienteId && ventaSaldo(v) > 0).sort((a, b) => a.fecha.localeCompare(b.fecha));
  if (pendientes.length === 0) { toast('Este cliente no tiene ventas pendientes'); return; }
  openSheet(`
    <div class="sheet-head"><h3>Registrar pago</h3><button class="icon-btn" data-action="close-sheet">✕</button></div>
    <p class="field-note" style="margin-bottom:14px;">${esc(cliente.nombre)}</p>
    <div class="form-grid">
      <div class="field">
        <label>Venta a abonar</label>
        <select id="pg-venta">
          ${pendientes.map(v => `<option value="${v.id}" ${preferVentaId === v.id ? 'selected' : ''}>#${v.id} · ${fmtDateShort(v.fecha)} · Saldo ${fmtMoney(ventaSaldo(v))}</option>`).join('')}
        </select>
      </div>
      <div class="form-row-2">
        <div class="field" style="margin-bottom:0"><label>Valor del pago</label><input type="number" min="0" id="pg-valor" value="${ventaSaldo(pendientes[0])}"></div>
        <div class="field" style="margin-bottom:0"><label>Fecha</label><input type="date" id="pg-fecha" value="${todayStr()}"></div>
      </div>
      <div class="field">
        <label>Método de pago</label>
        <div class="pay-options" id="pg-metodo">
          <div class="pay-opt active" data-m="efectivo">${ICONS.cash}Efectivo</div>
          <div class="pay-opt" data-m="transferencia">${ICONS.transfer}Transfer.</div>
        </div>
      </div>
      <div class="card" id="pg-saldo-box" style="background:var(--paper-2)">
        <div style="display:flex;justify-content:space-between;font-size:13.5px;"><span>Saldo restante estimado</span><strong id="pg-saldo-val">${fmtMoney(0)}</strong></div>
      </div>
      <button class="btn btn-primary btn-block" id="pg-submit">Registrar pago</button>
    </div>
  `, (sheet) => {
    const ventaSel = $('#pg-venta', sheet), valorInput = $('#pg-valor', sheet);
    function updateSaldoPreview() {
      const v = DB.ventas.find(v => v.id === parseInt(ventaSel.value));
      const saldoActual = ventaSaldo(v);
      const val = Math.min(saldoActual, Math.max(0, parseFloat(valorInput.value) || 0));
      $('#pg-saldo-val', sheet).textContent = fmtMoney(Math.max(0, saldoActual - val));
    }
    ventaSel.addEventListener('change', () => { valorInput.value = ventaSaldo(DB.ventas.find(v => v.id === parseInt(ventaSel.value))); updateSaldoPreview(); });
    valorInput.addEventListener('input', updateSaldoPreview);
    updateSaldoPreview();
    let metodo = 'efectivo';
    $all('#pg-metodo .pay-opt', sheet).forEach(o => o.addEventListener('click', () => { metodo = o.dataset.m; $all('#pg-metodo .pay-opt', sheet).forEach(x => x.classList.toggle('active', x === o)); }));

    $('#pg-submit', sheet).addEventListener('click', () => {
      const venta = DB.ventas.find(v => v.id === parseInt(ventaSel.value));
      const saldoActual = ventaSaldo(venta);
      const valor = Math.min(saldoActual, Math.max(0, parseFloat(valorInput.value) || 0));
      if (valor <= 0) { toast('Ingresa un valor válido'); return; }
      venta.abonos = venta.abonos || [];
      venta.abonos.push({ id: uid('ab'), valor, fecha: $('#pg-fecha', sheet).value || todayStr(), metodo });
      venta.estado = ventaSaldo(venta) <= 0 ? 'pagado' : 'abono';
      api_save();
      closeSheet();
      toast('Pago registrado');
      renderApp();
    });
  });
}

/* ============================================================
   VISTA: HISTORIAL DE VENTAS
   ============================================================ */
function viewHistorial() {
  const fl = State.histFilters;
  let list = DB.ventas.slice();
  if (fl.fecha) list = list.filter(v => v.fecha === fl.fecha);
  if (fl.carro !== 'todos') list = list.filter(v => v.carroId === parseInt(fl.carro));
  if (fl.cliente) list = list.filter(v => v.clienteId === parseInt(fl.cliente));
  if (fl.estado !== 'todos') list = list.filter(v => v.estado === fl.estado);
  list.sort((a, b) => b.fecha.localeCompare(a.fecha) || b.id - a.id);

  return `
    <div class="page-header"><h2>Historial de ventas</h2></div>
    <div class="card form-grid" style="margin-bottom:16px;">
      <div class="form-row-2">
        <div class="field" style="margin-bottom:0"><label>Fecha</label><input type="date" id="h-fecha" value="${fl.fecha}"></div>
        <div class="field" style="margin-bottom:0"><label>Carro</label>
          <select id="h-carro"><option value="todos">Todos</option>${DB.carros.map(c => `<option value="${c.id}" ${fl.carro == c.id ? 'selected' : ''}>${esc(c.nombre)}</option>`).join('')}</select>
        </div>
      </div>
      <div class="field" style="margin-bottom:0"><label>Cliente</label>
        <select id="h-cliente"><option value="">Todos</option>${DB.clientes.map(c => `<option value="${c.id}" ${fl.cliente == c.id ? 'selected' : ''}>${esc(c.nombre)}</option>`).join('')}</select>
      </div>
      <div class="filter-row">
        ${['todos', 'pagado', 'pendiente', 'abono'].map(e => `<button class="chip ${fl.estado === e ? 'active' : ''}" data-estado="${e}">${e === 'todos' ? 'Todos' : e.charAt(0).toUpperCase() + e.slice(1)}</button>`).join('')}
      </div>
    </div>
    <div class="small-muted" style="margin-bottom:10px;">${list.length} venta(s) encontradas</div>
    <div class="list">
      ${list.length === 0 ? `<div class="empty-state"><div class="es-icon">${ICONS.search}</div><h4>Sin resultados</h4><p>Ajusta los filtros para ver más ventas.</p></div>` :
      list.map(v => `
        <div class="row-card hist-item" data-action="ver-venta" data-id="${v.id}">
          <div class="avatar">${initials(nombreCliente(v.clienteId))}</div>
          <div class="row-main"><div class="row-title">${esc(nombreCliente(v.clienteId))}</div><div class="row-sub">${fmtDateShort(v.fecha)} · ${esc(nombreCarro(v.carroId))}</div></div>
          <div class="row-end">${badgeEstado(v.estado)}<div class="row-amount" style="margin-top:4px">${fmtMoney(v.total)}</div></div>
        </div>`).join('')}
    </div>
  `;
}
function mountHistorial() {
  const fl = State.histFilters;
  $('#h-fecha').addEventListener('change', (e) => { fl.fecha = e.target.value; renderApp(); });
  $('#h-carro').addEventListener('change', (e) => { fl.carro = e.target.value; renderApp(); });
  $('#h-cliente').addEventListener('change', (e) => { fl.cliente = e.target.value; renderApp(); });
  $all('[data-estado]').forEach(b => b.addEventListener('click', () => { fl.estado = b.dataset.estado; renderApp(); }));
  $all('[data-action="ver-venta"]').forEach(row => row.addEventListener('click', () => sheetVerVenta(parseInt(row.dataset.id))));
}

/* ============================================================
   VISTA: REPORTES
   ============================================================ */
function viewReportes() {
  const range = rangoDeFiltro(State.repFilter, State.repRange);
  const carroFiltro = State.repCarro; // 'todos' o id de carro
  const carroIdNum = carroFiltro === 'todos' ? null : parseInt(carroFiltro);
  const ventasFiltradas = ventasEnRango(range.start, range.end, carroIdNum);
  const general = statsFor(ventasFiltradas);

  const porProducto = {};
  ventasFiltradas.forEach(v => v.items.forEach(it => {
    if (!porProducto[it.productoId]) porProducto[it.productoId] = { cantidad: 0, total: 0 };
    porProducto[it.productoId].cantidad += it.cantidad;
    porProducto[it.productoId].total += it.cantidad * it.precioUnit;
  }));
  const productosOrdenados = Object.entries(porProducto).sort((a, b) => b[1].total - a[1].total);

  return `
    <div class="page-header"><h2>Reportes</h2></div>
    <div class="filter-row">
      ${['hoy', 'semana', 'mes', 'anio', 'rango'].map(f => `<button class="chip ${State.repFilter === f ? 'active' : ''}" data-repfilter="${f}">${{ hoy: 'Hoy', semana: 'Semana', mes: 'Mes', anio: 'Año', rango: 'Rango' }[f]}</button>`).join('')}
    </div>
    ${State.repFilter === 'rango' ? `
    <div class="range-inputs" style="margin:12px 0;">
      <input type="date" id="rep-start" value="${State.repRange.start}">
      <input type="date" id="rep-end" value="${State.repRange.end}">
    </div>` : ''}

    <div class="section-title">Carro</div>
    <div class="filter-row">
      <button class="chip ${carroFiltro === 'todos' ? 'active' : ''}" data-repcarro="todos">Todos (general)</button>
      ${DB.carros.map(c => `<button class="chip ${carroFiltro == c.id ? 'active' : ''}" data-repcarro="${c.id}">${esc(c.nombre)}</button>`).join('')}
    </div>

    <div class="card" style="margin-top:14px;">
      <div class="section-title" style="margin-top:0;">${carroIdNum ? 'Resultado · ' + esc(nombreCarro(carroIdNum)) : 'Resultado general'}</div>
      <div class="stat-grid">
        <div class="stat-card"><div class="stat-label">${ICONS.cash} Total vendido</div><div class="stat-value">${fmtMoney(general.totalVendido)}</div></div>
        <div class="stat-card"><div class="stat-label">${ICONS.wallet} Pendiente</div><div class="stat-value">${fmtMoney(general.totalPendiente)}</div></div>
        <div class="stat-card"><div class="stat-label">${ICONS.users} Clientes atendidos</div><div class="stat-value">${general.clientes}</div></div>
        <div class="stat-card"><div class="stat-label">${ICONS.box} Productos vendidos</div><div class="stat-value">${general.productosVendidos}</div></div>
      </div>
    </div>

    ${carroIdNum ? '' : `
    <div class="section-title">Resultado por carro</div>
    <div class="list">
      ${DB.carros.map(c => {
    const s = statsFor(ventasEnRango(range.start, range.end, c.id));
    return `
        <div class="row-card" data-action="ir-reporte-carro" data-id="${c.id}">
          <div class="avatar">${ICONS.truck}</div>
          <div class="row-main"><div class="row-title">${esc(c.nombre)}</div><div class="row-sub">${s.clientes} clientes · ${s.nVentas} ventas</div></div>
          <div class="row-end"><div class="row-amount">${fmtMoney(s.totalVendido)}</div><div class="small-muted">pend. ${fmtMoney(s.totalPendiente)}</div></div>
        </div>`;
  }).join('')}
    </div>`}

    <div class="section-title">Ventas por producto</div>
    <div class="list" style="margin-bottom:6px;">
      ${productosOrdenados.length === 0 ? `<div class="small-muted">Sin ventas en este periodo.</div>` :
      productosOrdenados.map(([pid, d]) => `
        <div class="price-row">
          <div><div class="pr-name">${esc(nombreProducto(parseInt(pid)))}</div><div class="pr-dept">${d.cantidad} unidades vendidas</div></div>
          <span class="pr-val">${fmtMoney(d.total)}</span>
        </div>`).join('')}
    </div>

    <div class="section-title">Exportar</div>
    <div class="report-actions">
      <button class="report-btn" data-action="soon">${ICONS.doc}Generar PDF</button>
      <button class="report-btn" data-action="soon">${ICONS.excel}Exportar Excel</button>
    </div>
    <div class="soon-box">${ICONS.info}<span>La generación de PDF y la exportación a Excel estarán disponibles cuando el prototipo se conecte al backend (PHP + MySQL).</span></div>
  `;
}
function mountReportes() {
  $all('[data-repfilter]').forEach(b => b.addEventListener('click', () => { State.repFilter = b.dataset.repfilter; renderApp(); }));
  $all('[data-repcarro]').forEach(b => b.addEventListener('click', () => { State.repCarro = b.dataset.repcarro; renderApp(); }));
  $all('[data-action="ir-reporte-carro"]').forEach(row => row.addEventListener('click', () => { State.repCarro = row.dataset.id; renderApp(); }));
  const s = $('#rep-start'), en = $('#rep-end');
  if (s) s.addEventListener('change', () => { State.repRange.start = s.value; renderApp(); });
  if (en) en.addEventListener('change', () => { State.repRange.end = en.value; renderApp(); });
  $all('[data-action="soon"]').forEach(b => b.addEventListener('click', () => toast('Función disponible próximamente')));
}

/* ============================================================
   VISTA: MÁS (menú)
   ============================================================ */
function viewMas() {
  const items = [
    { id: 'perfil', icon: 'users', title: 'Perfil del jefe', sub: 'Tu información de cuenta' },
    { id: 'usuarios', icon: 'gear', title: 'Usuarios', sub: 'Conductores y accesos' },
    { id: 'productos', icon: 'box', title: 'Productos', sub: 'Catálogo por departamento' },
    { id: 'listasPrecios', icon: 'tag', title: 'Listas de precios', sub: 'Precios normales y especiales' },
    { id: 'pagos', icon: 'wallet', title: 'Pagos y deudas', sub: 'Clientes con saldo pendiente' },
    { id: 'historial', icon: 'history', title: 'Historial de ventas', sub: 'Todas las ventas registradas' },
    { id: 'reportes', icon: 'chart', title: 'Reportes', sub: 'Resultados por periodo y carro' },
    { id: 'config', icon: 'gear', title: 'Configuración', sub: 'Preferencias generales' },
    { id: 'notificaciones', icon: 'bell', title: 'Notificaciones', sub: 'Avisos de stock y cobros' }
  ];
  return `
    <div class="page-header"><h2>Más</h2></div>
    <div class="profile-card">
      <div class="avatar">${initials(State.session.nombre)}</div>
      <div><h3>${esc(State.session.nombre)}</h3><p>${esc(State.session.rol)}</p></div>
    </div>
    <div class="menu-list">
      ${items.map(it => `
        <button class="menu-row" data-action="tab" data-view="${it.id}">
          <div class="mi">${ICONS[it.icon]}</div>
          <div class="mr"><div class="mt">${it.title}</div><div class="ms">${it.sub}</div></div>
          <div class="chevron">${ICONS.chevronRight}</div>
        </button>`).join('')}
      <button class="menu-row danger" data-action="logout">
        <div class="mi">${ICONS.logout}</div>
        <div class="mr"><div class="mt">Cerrar sesión</div></div>
      </button>
    </div>
  `;
}

/* ---------------- Sub-pantallas de "Más" ---------------- */
function viewPerfil() {
  const s = State.session;
  return `
    <div class="page-header"><h2>Perfil del jefe</h2></div>
    <div class="detail-hero">
      <div class="profile-card" style="padding:4px 0 16px;">
        <div class="avatar" style="width:58px;height:58px;font-size:20px;">${initials(s.nombre)}</div>
        <div><h3>${esc(s.nombre)}</h3><p>${esc(s.rol)}</p></div>
      </div>
      <div class="form-grid">
        <div class="field"><label>Nombre</label><input id="p-nombre" value="${esc(s.nombre)}"></div>
        <div class="field"><label>Correo</label><input id="p-correo" value="${esc(s.correo)}"></div>
        <div class="field"><label>Teléfono</label><input id="p-telefono" value="315 900 2233"></div>
        <button class="btn btn-primary btn-block" id="p-save">Guardar cambios</button>
      </div>
    </div>
  `;
}
function mountPerfil() {
  $('#p-save').addEventListener('click', () => {
    State.session.nombre = $('#p-nombre').value.trim() || State.session.nombre;
    State.session.correo = $('#p-correo').value.trim() || State.session.correo;
    buildNav();
    toast('Perfil actualizado');
    renderApp();
  });
}

function viewUsuarios() {
  return `
    <div class="page-header"><h2>Usuarios</h2><button class="btn btn-primary btn-sm" data-action="crear-usuario">${ICONS.plus} Nuevo</button></div>
    <div class="list">
      ${DB.usuarios.map(u => `
        <div class="row-card" style="cursor:default;">
          <div class="avatar">${initials(u.nombre)}</div>
          <div class="row-main"><div class="row-title">${esc(u.nombre)}</div><div class="row-sub">${esc(u.correo)}</div></div>
          <div class="row-end"><span class="badge" style="background:var(--copper-tint);color:var(--copper-dark)">${esc(u.rol)}</span></div>
        </div>`).join('')}
    </div>
  `;
}
function mountUsuarios() {
  const crear = $('[data-action="crear-usuario"]');
  if (crear) crear.addEventListener('click', () => {
    openSheet(`
      <div class="sheet-head"><h3>Nuevo usuario</h3><button class="icon-btn" data-action="close-sheet">✕</button></div>
      <div class="form-grid">
        <div class="field"><label>Nombre</label><input id="u-nombre" placeholder="Nombre completo"></div>
        <div class="field"><label>Correo</label><input id="u-correo" placeholder="correo@corta.com"></div>
        <div class="field"><label>Rol</label>
          <select id="u-rol"><option>Jefe / Administrador</option>${DB.carros.map(c => `<option>Conductor · ${c.nombre}</option>`).join('')}</select>
        </div>
        <button class="btn btn-primary btn-block" id="u-save">Crear usuario</button>
      </div>
    `, (sheet) => {
      $('#u-save', sheet).addEventListener('click', () => {
        const nombre = $('#u-nombre', sheet).value.trim();
        if (!nombre) { toast('Escribe el nombre'); return; }
        const id = Math.max(0, ...DB.usuarios.map(u => u.id)) + 1;
        DB.usuarios.push({ id, nombre, correo: $('#u-correo', sheet).value.trim(), rol: $('#u-rol', sheet).value });
        api_save(); closeSheet(); renderApp(); toast('Usuario creado');
      });
    });
  });
}

function viewConfig() {
  return `
    <div class="page-header"><h2>Configuración</h2></div>
    <div class="card">
      <div class="switch-row"><div><div class="sr-t">Notificaciones de ventas</div><div class="sr-s">Avisos cuando se registre una venta</div></div><button class="switch on" data-switch="s1"></button></div>
      <div class="switch-row"><div><div class="sr-t">Recordatorio de cobros</div><div class="sr-s">Avisar sobre pagos pendientes</div></div><button class="switch on" data-switch="s2"></button></div>
      <div class="switch-row"><div><div class="sr-t">Alerta de stock bajo</div><div class="sr-s">Cuando un producto tenga poco inventario</div></div><button class="switch on" data-switch="s3"></button></div>
      <div class="switch-row" style="border-bottom:none;"><div><div class="sr-t">Respaldo automático</div><div class="sr-s">Sincronizar datos cada noche</div></div><button class="switch" data-switch="s4"></button></div>
    </div>
    <div class="section-title">Empresa</div>
    <div class="link-card" data-action="soon"><span>Nombre de la empresa</span><span class="small-muted">Corta</span></div>
    <div class="link-card" data-action="soon"><span>Moneda</span><span class="small-muted">COP $</span></div>
    <div class="link-card" data-action="soon"><span>Zona horaria</span><span class="small-muted">Bogotá (GMT-5)</span></div>
    <div class="soon-box">${ICONS.info}<span>Estas preferencias se guardarán en el servidor una vez el prototipo se conecte al backend.</span></div>
  `;
}
function mountConfig() {
  $all('[data-switch]').forEach(b => b.addEventListener('click', () => b.classList.toggle('on')));
  $all('[data-action="soon"]').forEach(b => b.addEventListener('click', () => toast('Función disponible próximamente')));
}

function viewNotificaciones() {
  const bajoStock = DB.productos.filter(p => p.stock <= 15);
  const deudasViejas = DB.clientes.map(c => {
    const v = DB.ventas.filter(x => x.clienteId === c.id && ventaSaldo(x) > 0).sort((a, b) => a.fecha.localeCompare(b.fecha))[0];
    return v ? { cliente: c, venta: v } : null;
  }).filter(Boolean).slice(0, 4);

  const notifs = [
    ...deudasViejas.map(d => ({ icon: 'wallet', title: `${d.cliente.nombre} tiene un pago pendiente`, sub: `Desde el ${fmtDateShort(d.venta.fecha)} · ${fmtMoney(ventaSaldo(d.venta))}` })),
    ...bajoStock.map(p => ({ icon: 'box', title: `Stock bajo: ${p.nombre}`, sub: `Quedan ${p.stock} unidades` }))
  ];

  return `
    <div class="page-header"><h2>Notificaciones</h2></div>
    <div class="list">
      ${notifs.length === 0 ? `<div class="empty-state"><div class="es-icon">${ICONS.bell}</div><h4>Sin novedades</h4><p>Aquí verás avisos de cobros y stock.</p></div>` :
      notifs.map(n => `
        <div class="row-card" style="cursor:default;">
          <div class="avatar">${ICONS[n.icon]}</div>
          <div class="row-main"><div class="row-title">${esc(n.title)}</div><div class="row-sub">${esc(n.sub)}</div></div>
        </div>`).join('')}
    </div>
  `;
}

/* ============================================================
   MAPA DE VISTAS
   ============================================================ */
const VIEWS = {
  dashboard: viewDashboard, carros: viewCarros, carroDetail: viewCarroDetail,
  clientes: viewClientes, clienteDetail: viewClienteDetail,
  productos: viewProductos, ventaNueva: viewVentaNueva, pagos: viewPagos,
  historial: viewHistorial, reportes: viewReportes, mas: viewMas,
  perfil: viewPerfil, usuarios: viewUsuarios, config: viewConfig, notificaciones: viewNotificaciones,
  listasPrecios: viewListasPrecios
};
const VIEW_MOUNT = {
  dashboard: mountDashboard, carroDetail: mountCarroDetail, clientes: mountClientes,
  clienteDetail: mountClienteDetail, productos: mountProductos, ventaNueva: mountVentaNueva,
  pagos: mountPagos, historial: mountHistorial, reportes: mountReportes,
  perfil: mountPerfil, usuarios: mountUsuarios, config: mountConfig, listasPrecios: mountListasPrecios
};

/* ============================================================
   DELEGACIÓN GLOBAL DE EVENTOS
   ============================================================ */
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-action]');
  if (!t) return;
  const action = t.dataset.action;
  if (action === 'tab') { navigate(t.dataset.view, {}, { resetHistory: true }); }
  else if (action === 'open-carro') { navigate('carroDetail', { id: parseInt(t.dataset.id), fecha: todayStr() }); }
  else if (action === 'open-cliente') { navigate('clienteDetail', { id: parseInt(t.dataset.id) }); }
  else if (action === 'close-sheet') { closeSheet(); }
  else if (action === 'logout') { logout(); }
});

$('#btn-back').addEventListener('click', goBack);
$('#btn-notif').addEventListener('click', () => navigate('notificaciones'));
$('#fab-venta').addEventListener('click', () => { State.ventaForm = null; navigate('ventaNueva', { fecha: todayStr(), carroId: DB.carros[0].id }); });

/* ============================================================
   INICIO
   ============================================================ */
loadDB();
