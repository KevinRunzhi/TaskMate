import { format, isToday, isTomorrow, isYesterday } from 'date-fns';
import { Priority, Task, TaskFilter } from '@/types';
import { DATE_FORMATS } from './constants';

// 生成唯一ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// 格式化日期显示
export const formatDate = (date: Date): string => {
  if (isToday(date)) {
    return '今天';
  }
  if (isTomorrow(date)) {
    return '明天';
  }
  if (isYesterday(date)) {
    return '昨天';
  }
  return format(date, DATE_FORMATS.DISPLAY);
};

// 格式化日期时间显示
export const formatDateTime = (date: Date): string => {
  if (isToday(date)) {
    return `今天 ${format(date, 'HH:mm')}`;
  }
  if (isTomorrow(date)) {
    return `明天 ${format(date, 'HH:mm')}`;
  }
  if (isYesterday(date)) {
    return `昨天 ${format(date, 'HH:mm')}`;
  }
  return format(date, DATE_FORMATS.DISPLAY_WITH_TIME);
};

// 获取优先级权重（用于排序）
export const getPriorityWeight = (priority: Priority): number => {
  switch (priority) {
    case Priority.URGENT:
      return 4;
    case Priority.HIGH:
      return 3;
    case Priority.MEDIUM:
      return 2;
    case Priority.LOW:
      return 1;
    default:
      return 0;
  }
};

// 任务排序函数
export const sortTasks = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => {
    // 首先按状态排序：待处理 > 进行中 > 已完成
    if (a.status !== b.status) {
      if (a.status === 'completed') return 1;
      if (b.status === 'completed') return -1;
      if (a.status === 'in_progress') return -1;
      if (b.status === 'in_progress') return 1;
    }

    // 如果状态相同，按优先级排序
    const priorityDiff = getPriorityWeight(b.priority) - getPriorityWeight(a.priority);
    if (priorityDiff !== 0) return priorityDiff;

    // 如果优先级也相同，按创建时间排序（新的在前）
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};

// 过滤任务
export const filterTasks = (tasks: Task[], filter: TaskFilter): Task[] => {
  return tasks.filter(task => {
    // 状态过滤
    if (filter.status && filter.status.length > 0) {
      if (!filter.status.includes(task.status)) {
        return false;
      }
    }

    // 优先级过滤
    if (filter.priority && filter.priority.length > 0) {
      if (!filter.priority.includes(task.priority)) {
        return false;
      }
    }

    // 日期范围过滤
    if (filter.dateRange) {
      if (task.dueDate) {
        const dueDate = new Date(task.dueDate);
        if (dueDate < filter.dateRange.start || dueDate > filter.dateRange.end) {
          return false;
        }
      }
    }

    // 标签过滤
    if (filter.tags && filter.tags.length > 0) {
      if (!task.tags || !filter.tags.some(tag => task.tags!.includes(tag))) {
        return false;
      }
    }

    // 搜索查询过滤
    if (filter.searchQuery) {
      const query = filter.searchQuery.toLowerCase();
      const title = task.title.toLowerCase();
      const description = task.description?.toLowerCase() || '';
      if (!title.includes(query) && !description.includes(query)) {
        return false;
      }
    }

    return true;
  });
};

// 获取任务统计信息
export const getTaskStats = (tasks: Task[]) => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.status === 'completed').length;
  const inProgress = tasks.filter(task => task.status === 'in_progress').length;
  const pending = tasks.filter(task => task.status === 'pending').length;

  const byPriority = {
    [Priority.URGENT]: tasks.filter(task => task.priority === Priority.URGENT).length,
    [Priority.HIGH]: tasks.filter(task => task.priority === Priority.HIGH).length,
    [Priority.MEDIUM]: tasks.filter(task => task.priority === Priority.MEDIUM).length,
    [Priority.LOW]: tasks.filter(task => task.priority === Priority.LOW).length,
  };

  return {
    total,
    completed,
    inProgress,
    pending,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    byPriority,
  };
};