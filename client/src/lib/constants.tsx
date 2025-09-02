export const API_BASE_URL = typeof window !== 'undefined' 
  ? `${window.location.protocol}//${window.location.host}`
  : 'http://localhost:3000';

export const APP_NAME = "نظام إبراهيم للمحاسبة";
export const APP_VERSION = "1.0.0";

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    USER: '/api/auth/user',
  },
  DASHBOARD: {
    STATS: '/api/dashboard/stats',
    RECENT_TRANSACTIONS: '/api/dashboard/recent-transactions',
    CURRENCY_DISTRIBUTION: '/api/dashboard/currency-distribution',
    MONTHLY_REVENUE: '/api/dashboard/monthly-revenue',
  },
  REVENUES: '/api/revenues',
  EXPENSES: '/api/expenses',
  PRODUCTS: '/api/products',
  NOTIFICATIONS: '/api/notifications',
  USERS: '/api/users',
  TENANTS: '/api/tenants',
} as const;

// User Roles
export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  OWNER: 'owner',
  MANAGER: 'manager',
  ACCOUNTANT: 'accountant',
  WAREHOUSE_KEEPER: 'warehouse_keeper',
  VIEWER: 'viewer',
} as const;

// Currencies
export const CURRENCIES = [
  { value: 'SYP', label: 'الليرة السورية', symbol: 'ل.س' },
  { value: 'TRY', label: 'الليرة التركية', symbol: '₺' },
  { value: 'USD', label: 'الدولار الأمريكي', symbol: '$' },
] as const;

// Transaction Types
export const TRANSACTION_TYPES = [
  { value: 'sale', label: 'بيع' },
  { value: 'service', label: 'خدمة' },
  { value: 'advance_payment', label: 'دفعة مسبقة' },
  { value: 'other', label: 'أخرى' },
] as const;

// Payment Methods
export const PAYMENT_METHODS = [
  { value: 'cash', label: 'نقد' },
  { value: 'card', label: 'بطاقة' },
  { value: 'transfer', label: 'حوالة' },
  { value: 'other', label: 'أخرى' },
] as const;

// Expense Types
export const EXPENSE_TYPES = [
  { value: 'rent', label: 'إيجار' },
  { value: 'salaries', label: 'رواتب' },
  { value: 'services', label: 'خدمات' },
  { value: 'product_purchase', label: 'شراء منتجات' },
  { value: 'utilities', label: 'مرافق' },
  { value: 'maintenance', label: 'صيانة' },
  { value: 'other', label: 'أخرى' },
] as const;

export const UNITS = [
  { value: 'piece', label: 'قطعة' },
  { value: 'kg', label: 'كيلوغرام' },
  { value: 'liter', label: 'لتر' },
  { value: 'meter', label: 'متر' },
  { value: 'pack', label: 'علبة' },
  { value: 'box', label: 'صندوق' },
  { value: 'bottle', label: 'زجاجة' },
  { value: 'bag', label: 'كيس' }
];

export const NOTIFICATION_TYPES = [
  { value: 'low_stock', label: 'نقص في المخزون', color: 'amber' },
  { value: 'subscription_expiry', label: 'انتهاء الاشتراك', color: 'red' },
  { value: 'high_spending', label: 'إنفاق عالي', color: 'blue' },
  { value: 'backup_success', label: 'نسخة احتياطية', color: 'green' }
];
