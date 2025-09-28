import { useEffect, useCallback } from 'react';
import { useTaskStore } from '@/store/taskStore';
import { TaskService } from '@/services/taskService';
import { CreateTaskInput, UpdateTaskInput, Task } from '@/types';

export const useTasks = () => {
  const {
    tasks,
    filter,
    isLoading,
    error,
    setTasks,
    setLoading,
    setError,
    createTask: createTaskStore,
    updateTask: updateTaskStore,
    deleteTask: deleteTaskStore,
    toggleTaskStatus,
    completeTask,
    deleteCompletedTasks: deleteCompletedTasksStore,
    markAllAsCompleted: markAllAsCompletedStore,
    getTaskById,
    getFilteredTasks,
    getSortedTasks,
    setFilter,
    clearFilter,
    getStats,
  } = useTaskStore();

  // 初始化加载任务
  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const loadedTasks = await TaskService.loadTasks();
      setTasks(loadedTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [setTasks, setLoading, setError]);

  // 保存任务到持久化存储
  const saveTasks = useCallback(async (tasksToSave: Task[]) => {
    try {
      await TaskService.saveTasks(tasksToSave);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save tasks');
    }
  }, [setError]);

  // 创建任务
  const createTask = useCallback(async (input: CreateTaskInput) => {
    try {
      const newTask = createTaskStore(input);
      await saveTasks([...tasks, newTask]);
      return newTask;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
      throw err;
    }
  }, [createTaskStore, tasks, saveTasks, setError]);

  // 更新任务
  const updateTask = useCallback(async (input: UpdateTaskInput) => {
    try {
      updateTaskStore(input);
      const updatedTasks = tasks.map(task =>
        task.id === input.id ? { ...task, ...input, updatedAt: new Date() } : task
      );
      await saveTasks(updatedTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
      throw err;
    }
  }, [updateTaskStore, tasks, saveTasks, setError]);

  // 删除任务
  const deleteTask = useCallback(async (id: string) => {
    try {
      deleteTaskStore(id);
      const filteredTasks = tasks.filter(task => task.id !== id);
      await saveTasks(filteredTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
      throw err;
    }
  }, [deleteTaskStore, tasks, saveTasks, setError]);

  // 切换任务状态
  const toggleTask = useCallback(async (id: string) => {
    try {
      toggleTaskStatus(id);
      // 获取更新后的任务进行保存
      const task = getTaskById(id);
      if (task) {
        await saveTasks(tasks);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle task status');
      throw err;
    }
  }, [toggleTaskStatus, getTaskById, tasks, saveTasks, setError]);

  // 完成任务
  const markAsCompleted = useCallback(async (id: string) => {
    try {
      completeTask(id);
      await saveTasks(tasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete task');
      throw err;
    }
  }, [completeTask, tasks, saveTasks, setError]);

  // 删除所有已完成的任务
  const deleteCompletedTasks = useCallback(async () => {
    try {
      deleteCompletedTasksStore();
      const remainingTasks = tasks.filter(task => task.status !== 'completed');
      await saveTasks(remainingTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete completed tasks');
      throw err;
    }
  }, [deleteCompletedTasksStore, tasks, saveTasks, setError]);

  // 标记所有任务为已完成
  const markAllAsCompleted = useCallback(async () => {
    try {
      markAllAsCompletedStore();
      const completedTasks = tasks.map(task => ({
        ...task,
        status: 'completed' as const,
        updatedAt: new Date(),
        completedAt: task.status !== 'completed' ? new Date() : task.completedAt,
      }));
      await saveTasks(completedTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark all tasks as completed');
      throw err;
    }
  }, [markAllAsCompletedStore, tasks, saveTasks, setError]);

  // 导出任务
  const exportTasks = useCallback(async (): Promise<string> => {
    try {
      return await TaskService.exportTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export tasks');
      throw err;
    }
  }, [setError]);

  // 导入任务
  const importTasks = useCallback(async (jsonData: string) => {
    try {
      setLoading(true);
      const importedTasks = await TaskService.importTasks(jsonData);
      setTasks(importedTasks);
      return importedTasks;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import tasks');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setTasks, setLoading, setError]);

  // 初始化时加载任务
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // 返回所有需要的功能
  return {
    // 状态
    tasks,
    filter,
    isLoading,
    error,

    // 基础操作
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
    markAsCompleted,

    // 批量操作
    deleteCompletedTasks,
    markAllAsCompleted,

    // 导入导出
    exportTasks,
    importTasks,

    // 查询操作
    getTaskById,
    getFilteredTasks,
    getSortedTasks,

    // 过滤器操作
    setFilter,
    clearFilter,

    // 统计信息
    getStats,
  };
};