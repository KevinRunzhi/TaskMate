import { create } from 'zustand';
import { Task, CreateTaskInput, UpdateTaskInput, TaskFilter, Priority, TaskStatus } from '@/types';
import { generateId, sortTasks, filterTasks } from '@/utils/helpers';

interface TaskStore {
  // 状态
  tasks: Task[];
  filter: TaskFilter;
  isLoading: boolean;
  error: string | null;

  // 基础操作
  setTasks: (tasks: Task[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // 任务操作
  createTask: (input: CreateTaskInput) => Task;
  updateTask: (input: UpdateTaskInput) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  completeTask: (id: string) => void;

  // 批量操作
  deleteCompletedTasks: () => void;
  markAllAsCompleted: () => void;

  // 查询操作
  getTaskById: (id: string) => Task | undefined;
  getFilteredTasks: () => Task[];
  getSortedTasks: () => Task[];

  // 过滤器操作
  setFilter: (filter: Partial<TaskFilter>) => void;
  clearFilter: () => void;

  // 统计信息
  getStats: () => {
    total: number;
    completed: number;
    pending: number;
    inProgress: number;
    completionRate: number;
  };
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  // 初始状态
  tasks: [],
  filter: {},
  isLoading: false,
  error: null,

  // 基础操作
  setTasks: (tasks) => set({ tasks }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  // 创建任务
  createTask: (input) => {
    const newTask: Task = {
      id: generateId(),
      title: input.title,
      description: input.description,
      priority: input.priority,
      status: TaskStatus.PENDING,
      dueDate: input.dueDate,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: input.tags || [],
    };

    set((state) => ({
      tasks: [...state.tasks, newTask],
      error: null,
    }));

    return newTask;
  },

  // 更新任务
  updateTask: (input) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === input.id
          ? {
              ...task,
              ...input,
              updatedAt: new Date(),
              completedAt: input.status === TaskStatus.COMPLETED ? new Date() : task.completedAt,
            }
          : task
      ),
      error: null,
    }));
  },

  // 删除任务
  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
      error: null,
    }));
  },

  // 切换任务状态
  toggleTaskStatus: (id) => {
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id === id) {
          let newStatus: TaskStatus;
          if (task.status === TaskStatus.PENDING) {
            newStatus = TaskStatus.IN_PROGRESS;
          } else if (task.status === TaskStatus.IN_PROGRESS) {
            newStatus = TaskStatus.COMPLETED;
          } else {
            newStatus = TaskStatus.PENDING;
          }

          return {
            ...task,
            status: newStatus,
            updatedAt: new Date(),
            completedAt: newStatus === TaskStatus.COMPLETED ? new Date() : undefined,
          };
        }
        return task;
      }),
      error: null,
    }));
  },

  // 完成任务
  completeTask: (id) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: TaskStatus.COMPLETED,
              updatedAt: new Date(),
              completedAt: new Date(),
            }
          : task
      ),
      error: null,
    }));
  },

  // 删除所有已完成的任务
  deleteCompletedTasks: () => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.status !== TaskStatus.COMPLETED),
      error: null,
    }));
  },

  // 标记所有任务为已完成
  markAllAsCompleted: () => {
    const now = new Date();
    set((state) => ({
      tasks: state.tasks.map((task) => ({
        ...task,
        status: TaskStatus.COMPLETED,
        updatedAt: now,
        completedAt: task.status !== TaskStatus.COMPLETED ? now : task.completedAt,
      })),
      error: null,
    }));
  },

  // 根据ID获取任务
  getTaskById: (id) => {
    return get().tasks.find((task) => task.id === id);
  },

  // 获取过滤后的任务
  getFilteredTasks: () => {
    const { tasks, filter } = get();
    return filterTasks(tasks, filter);
  },

  // 获取排序后的任务
  getSortedTasks: () => {
    const { tasks } = get();
    return sortTasks(tasks);
  },

  // 设置过滤器
  setFilter: (newFilter) => {
    set((state) => ({
      filter: { ...state.filter, ...newFilter },
    }));
  },

  // 清除过滤器
  clearFilter: () => {
    set({ filter: {} });
  },

  // 获取统计信息
  getStats: () => {
    const { tasks } = get();
    const total = tasks.length;
    const completed = tasks.filter((task) => task.status === TaskStatus.COMPLETED).length;
    const inProgress = tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS).length;
    const pending = tasks.filter((task) => task.status === TaskStatus.PENDING).length;

    return {
      total,
      completed,
      pending,
      inProgress,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  },
}));