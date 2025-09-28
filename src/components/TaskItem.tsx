import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Task, TaskStatus } from '@/types';
import { DEFAULT_THEME, STATUS_LABELS } from '@/utils/constants';
import { formatDate } from '@/utils/helpers';
import { PriorityIndicator } from './PriorityIndicator';

interface TaskItemProps {
  task: Task;
  onPress?: () => void;
  onToggleStatus?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onPress,
  onToggleStatus,
  onDelete,
  showActions = true,
}) => {
  const isCompleted = task.status === TaskStatus.COMPLETED;
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !isCompleted;

  const getStatusColor = () => {
    switch (task.status) {
      case TaskStatus.COMPLETED:
        return DEFAULT_THEME.success;
      case TaskStatus.IN_PROGRESS:
        return DEFAULT_THEME.warning;
      default:
        return DEFAULT_THEME.textSecondary;
    }
  };

  const getStatusIcon = () => {
    switch (task.status) {
      case TaskStatus.COMPLETED:
        return '✓';
      case TaskStatus.IN_PROGRESS:
        return '⏳';
      default:
        return '○';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isCompleted && styles.completedContainer,
        isOverdue && styles.overdueContainer,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* 状态指示器 */}
      <TouchableOpacity
        style={[styles.statusButton, { borderColor: getStatusColor() }]}
        onPress={onToggleStatus}
      >
        <Text style={[styles.statusIcon, { color: getStatusColor() }]}>
          {getStatusIcon()}
        </Text>
      </TouchableOpacity>

      {/* 任务内容 */}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              isCompleted && styles.completedTitle,
            ]}
            numberOfLines={2}
          >
            {task.title}
          </Text>
          <PriorityIndicator priority={task.priority} size="small" showLabel={false} />
        </View>

        {task.description && (
          <Text
            style={[
              styles.description,
              isCompleted && styles.completedText,
            ]}
            numberOfLines={2}
          >
            {task.description}
          </Text>
        )}

        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text style={[styles.status, { color: getStatusColor() }]}>
              {STATUS_LABELS[task.status]}
            </Text>
            {task.dueDate && (
              <Text style={[
                styles.dueDate,
                isOverdue && styles.overdueDueDate,
              ]}>
                {formatDate(task.dueDate)}
              </Text>
            )}
          </View>

          {task.tags && task.tags.length > 0 && (
            <View style={styles.tags}>
              {task.tags.slice(0, 2).map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
              {task.tags.length > 2 && (
                <Text style={styles.moreTagsText}>+{task.tags.length - 2}</Text>
              )}
            </View>
          )}
        </View>
      </View>

      {/* 删除按钮 */}
      {showActions && onDelete && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={onDelete}
        >
          <Text style={styles.deleteIcon}>×</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: DEFAULT_THEME.background,
    borderRadius: 12,
    padding: 16,
    marginVertical: 4,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: DEFAULT_THEME.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  completedContainer: {
    backgroundColor: DEFAULT_THEME.surface,
    opacity: 0.8,
  },
  overdueContainer: {
    borderColor: DEFAULT_THEME.error,
    borderWidth: 1,
  },
  statusButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  statusIcon: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: DEFAULT_THEME.text,
    flex: 1,
    marginRight: 8,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: DEFAULT_THEME.textSecondary,
  },
  description: {
    fontSize: 14,
    color: DEFAULT_THEME.textSecondary,
    marginBottom: 8,
    lineHeight: 20,
  },
  completedText: {
    color: DEFAULT_THEME.textSecondary,
    opacity: 0.6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  status: {
    fontSize: 12,
    fontWeight: '500',
  },
  dueDate: {
    fontSize: 12,
    color: DEFAULT_THEME.textSecondary,
  },
  overdueDueDate: {
    color: DEFAULT_THEME.error,
    fontWeight: '600',
  },
  tags: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tag: {
    backgroundColor: DEFAULT_THEME.primary + '20',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 10,
    color: DEFAULT_THEME.primary,
    fontWeight: '500',
  },
  moreTagsText: {
    fontSize: 10,
    color: DEFAULT_THEME.textSecondary,
  },
  deleteButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: DEFAULT_THEME.error + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  deleteIcon: {
    fontSize: 18,
    color: DEFAULT_THEME.error,
    fontWeight: 'bold',
  },
});