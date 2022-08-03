export const theme = {
  gray100: '#ffffff',
  gray200: '#f0f0f0',
  gray300: '#b1b1b1',
  gray400: '#a7a7a7',
  gray500: '#878787',
  gray600: '#696969',
  gray700: '#4f4f4f',
  gray800: '#292929',
  gray900: '#0b0b0b',
  orange: '#ff9a62',
  green: '#4ecb71',
  blue: '#85b6ff',
  error: '#ff0000',
  headerHeight: '64px',
  sidebarWidth: '200px',
};

export const BUTTON_COLORS = {
  clear: { color: '#fff', hover: '#f0f0f0' },
  red: { color: '#fe8c8c', hover: '#fe7474' },
  blue: { color: '#7fdff2', hover: '#52c4db' },
  green: { color: '#bfffb3', hover: '#87e875' },
} as const;

export const GEOCODE_ENDPOINT =
  'https://maps.googleapis.com/maps/api/geocode/json';

export const STORE_MENU_TYPES = [
  'rental-cycle',
  'store-user',
  'sightseeing-route',
] as const;
