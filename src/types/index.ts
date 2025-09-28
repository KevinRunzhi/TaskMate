// 优先级枚举
export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

// 任务状态
export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

// 任务接口
export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: TaskStatus;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  tags?: string[];
}

// 创建任务时的输入类型
export interface CreateTaskInput {
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: Date;
  tags?: string[];
}

// 更新任务时的输入类型
export interface UpdateTaskInput {
  id: string;
  title?: string;
  description?: string;
  priority?: Priority;
  status?: TaskStatus;
  dueDate?: Date;
  tags?: string[];
}

// 任务筛选器
export interface TaskFilter {
  status?: TaskStatus[];
  priority?: Priority[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  tags?: string[];
  searchQuery?: string;
}

// 应用状态接口
export interface AppState {
  tasks: Task[];
  filter: TaskFilter;
  isLoading: boolean;
  error: string | null;
}

// 导航相关类型
export type RootStackParamList = {
  Home: undefined;
  TaskDetail: { taskId: string };
  CreateTask: undefined;
  EditTask: { taskId: string };
  Settings: undefined;
};

// 主题颜色
export interface Theme {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  priority: {
    [Priority.LOW]: string;
    [Priority.MEDIUM]: string;
    [Priority.HIGH]: string;
    [Priority.URGENT]: string;
  };
}