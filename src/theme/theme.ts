export type ThemeMode = 'light' | 'dark';

export const colors = {
  base: {
    shadow: '#000',
    background: { light: '#f3f3f5', dark: '#2d2d2d' },
    surface: { light: '#f9f9f9', dark: '#343434' },
    surfaceAlt: { light: '#f7f7f9', dark: '#4a4a4a' },
    surfaceForeground: { light: '#c1c1c1ff', dark: '#434343ff' },
    foreground: { light: '#242424', dark: '#ffffffff' },
    foregroundAlt: { light: '#717182', dark: '#b5b5b5' },
    border: { light: 'rgba(0,0,0,0.1)', dark: '#454545' },
    divider: { light: '#eaeaea', dark: '#505050' },
    progressbar: { light: '#eaeaea', dark: '#505050' },
    destructive: { light: '#ff3a3045', dark: '#ff443a5b' },
    destructiveText: '#fc0000ff',
    iconColor: '#f9f9f9',
    ring: '#b5b5b5',
    blue: '#007AFF',
    opacityBlue: '#007bff3d',
    modalBackground: { light: '#f3f3f5ac', dark: '#2d2d2d9b' },
  },
  components: {
    list: {
      work: '#0A84FF', // briefcase 🧳 — produttività, focus
      personal: '#30D158', // user 👤 — obiettivi personali
      shopping: '#003465ff', // shopping-bag 🛍️ — acquisti, spese
      wellness: '#BF5AF2', // heart ❤️ — salute e benessere
      home: '#64D2FF', // home 🏠 — casa, vita quotidiana
      priority: '#FFD60A', // star ⭐ — priorità o obiettivi top
      alert: '#FF453A', // alert-circle ⚠️ — scadenze o urgenze
      energy: '#FFB340', // zap ⚡ — energia, produttività
      relax: '#B58DFF', // coffee ☕ — relax, routine
      creative: '#FF375F', // music 🎵 — creatività, ispirazione
    },
    button: {
      default: '#007AFF',
      foreground: '#ffffffff',
      destructive: '#fc0000ff',
      disabledColor: '#c1c1c1ff',
      disabledBgColor: '#007bff3d',
    },
  },
};

export const typography = {
  h1: { fontSize: 32, fontWeight: '600', lineHeight: 44 },
  h2: { fontSize: 26, fontWeight: '600', lineHeight: 36 },
  h3: { fontSize: 20, fontWeight: '500', lineHeight: 28 },
  h4: { fontSize: 18, fontWeight: '500', lineHeight: 26 },
  p: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
  label: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
  button: { fontSize: 16, fontWeight: '600', lineHeight: 22 },
  input: { fontSize: 16, fontWeight: '400', lineHeight: 22 },
};
