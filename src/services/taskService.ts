import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '@/types';
import { STORAGE_KEYS } from '@/utils/constants';

export class TaskService {
  // 加载任务数据
  static async loadTasks(): Promise<Task[]> {
    try {
      const tasksJson = await AsyncStorage.getItem(STORAGE_KEYS.TASKS);
      if (tasksJson) {
        const tasks = JSON.parse(tasksJson);
        // 转换日期字符串为Date对象
        return tasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
          completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
        }));
      }
      return [];
    } catch (error) {
      console.error('Error loading tasks:', error);
      throw new Error('Failed to load tasks');
    }
  }

  // 保存任务数据
  static async saveTasks(tasks: Task[]): Promise<void> {
    try {
      const tasksJson = JSON.stringify(tasks);
      await AsyncStorage.setItem(STORAGE_KEYS.TASKS, tasksJson);
    } catch (error) {
      console.error('Error saving tasks:', error);
      throw new Error('Failed to save tasks');
    }
  }

  // 清除所有任务数据
  static async clearTasks(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.TASKS);
    } catch (error) {
      console.error('Error clearing tasks:', error);
      throw new Error('Failed to clear tasks');
    }
  }

  // 导出任务数据为JSON
  static async exportTasks(): Promise<string> {
    try {
      const tasks = await this.loadTasks();
      return JSON.stringify(tasks, null, 2);
    } catch (error) {
      console.error('Error exporting tasks:', error);
      throw new Error('Failed to export tasks');
    }
  }

  // 从JSON导入任务数据
  static async importTasks(jsonData: string): Promise<Task[]> {
    try {
      const tasks = JSON.parse(jsonData);
      // 验证数据格式
      if (!Array.isArray(tasks)) {
        throw new Error('Invalid data format');
      }

      // 转换并验证每个任务
      const validatedTasks: Task[] = tasks.map((task: any) => {
        if (!task.id || !task.title || !task.priority || !task.status) {
          throw new Error('Invalid task data');
        }

        return {
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
          completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
        };
      });

      await this.saveTasks(validatedTasks);
      return validatedTasks;
    } catch (error) {
      console.error('Error importing tasks:', error);
      throw new Error('Failed to import tasks');
    }
  }

  // 获取存储统计信息
  static async getStorageStats(): Promise<{
    taskCount: number;
    storageSize: number;
    lastModified: Date | null;
  }> {
    try {
      const tasks = await this.loadTasks();
      const tasksJson = await AsyncStorage.getItem(STORAGE_KEYS.TASKS);
      const storageSize = tasksJson ? new Blob([tasksJson]).size : 0;

      const lastModified = tasks.length > 0
        ? new Date(Math.max(...tasks.map(task => task.updatedAt.getTime())))
        : null;

      return {
        taskCount: tasks.length,
        storageSize,
        lastModified,
      };
    } catch (error) {
      console.error('Error getting storage stats:', error);
      return {
        taskCount: 0,
        storageSize: 0,
        lastModified: null,
      };
    }
  }
}