import { Priority, Theme } from '@/types';

// 默认主题
export const DEFAULT_THEME: Theme = {
  primary: '#007AFF',
  secondary: '#5856D6',
  background: '#FFFFFF',
  surface: '#F2F2F7',
  text: '#000000',
  textSecondary: '#8E8E93',
  border: '#E5E5EA',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  priority: {
    [Priority.LOW]: '#34C759',      // 绿色
    [Priority.MEDIUM]: '#FF9500',   // 橙色
    [Priority.HIGH]: '#FF3B30',     // 红色
    [Priority.URGENT]: '#AF52DE',   // 紫色
  },
};

// 优先级标签
export const PRIORITY_LABELS = {
  [Priority.LOW]: '低优先级',
  [Priority.MEDIUM]: '中优先级',
  [Priority.HIGH]: '高优先级',
  [Priority.URGENT]: '紧急',
};

// 任务状态标签
export const STATUS_LABELS = {
  pending: '待处理',
  in_progress: '进行中',
  completed: '已完成',
};

// 日期格式
export const DATE_FORMATS = {
  DISPLAY: 'yyyy年MM月dd日',
  DISPLAY_WITH_TIME: 'yyyy年MM月dd日 HH:mm',
  API: 'yyyy-MM-dd',
  ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
};

// 存储键
export const STORAGE_KEYS = {
  TASKS: '@taskmate:tasks',
  SETTINGS: '@taskmate:settings',
  THEME: '@taskmate:theme',
};