import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { Task } from '@/types';
import { DEFAULT_THEME } from '@/utils/constants';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onTaskPress?: (task: Task) => void;
  onToggleTaskStatus?: (taskId: string) => void;
  onDeleteTask?: (taskId: string) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  showActions?: boolean;
  emptyText?: string;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement;
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onTaskPress,
  onToggleTaskStatus,
  onDeleteTask,
  onRefresh,
  isRefreshing = false,
  showActions = true,
  emptyText = '暂无任务',
  ListHeaderComponent,
  ListFooterComponent,
}) => {
  const renderTaskItem = ({ item: task }: { item: Task }) => (
    <TaskItem
      task={task}
      onPress={() => onTaskPress?.(task)}
      onToggleStatus={() => onToggleTaskStatus?.(task.id)}
      onDelete={() => onDeleteTask?.(task.id)}
      showActions={showActions}
    />
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📝</Text>
      <Text style={styles.emptyText}>{emptyText}</Text>
      <Text style={styles.emptySubtext}>
        创建你的第一个任务开始吧！
      </Text>
    </View>
  );

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      data={tasks}
      renderItem={renderTaskItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={renderSeparator}
      ListEmptyComponent={renderEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[DEFAULT_THEME.primary]}
            tintColor={DEFAULT_THEME.primary}
          />
        ) : undefined
      }
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        tasks.length === 0 && styles.emptyContentContainer,
      ]}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DEFAULT_THEME.surface,
  },
  contentContainer: {
    padding: 16,
    flexGrow: 1,
  },
  emptyContentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  separator: {
    height: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: DEFAULT_THEME.textSecondary,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: DEFAULT_THEME.textSecondary,
    textAlign: 'center',
    opacity: 0.7,
  },
});