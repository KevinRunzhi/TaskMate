import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Priority, Task } from '@/types';
import { DEFAULT_THEME, PRIORITY_LABELS } from '@/utils/constants';
import { PriorityIndicator } from './PriorityIndicator';

interface PriorityStatsProps {
  tasks: Task[];
  showPercentage?: boolean;
}

export const PriorityStats: React.FC<PriorityStatsProps> = ({
  tasks,
  showPercentage = true,
}) => {
  const priorities = Object.values(Priority);
  const totalTasks = tasks.length;

  const getStatsForPriority = (priority: Priority) => {
    const priorityTasks = tasks.filter(task => task.priority === priority);
    const count = priorityTasks.length;
    const completed = priorityTasks.filter(task => task.status === 'completed').length;
    const percentage = totalTasks > 0 ? Math.round((count / totalTasks) * 100) : 0;
    const completionRate = count > 0 ? Math.round((completed / count) * 100) : 0;

    return {
      count,
      completed,
      percentage,
      completionRate,
    };
  };

  if (totalTasks === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>暂无任务数据</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>优先级分布</Text>

      <View style={styles.statsContainer}>
        {priorities.map((priority) => {
          const stats = getStatsForPriority(priority);

          if (stats.count === 0) {
            return null;
          }

          return (
            <View key={priority} style={styles.statItem}>
              <View style={styles.statHeader}>
                <PriorityIndicator
                  priority={priority}
                  size="small"
                  showLabel={true}
                />
                <View style={styles.statNumbers}>
                  <Text style={styles.statCount}>
                    {stats.count} 个任务
                  </Text>
                  {showPercentage && (
                    <Text style={styles.statPercentage}>
                      ({stats.percentage}%)
                    </Text>
                  )}
                </View>
              </View>

              {/* 进度条 */}
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${stats.completionRate}%`,
                        backgroundColor: DEFAULT_THEME.priority[priority],
                      },
                    ]}
                  />
                </View>
                <Text style={styles.completionText}>
                  {stats.completed}/{stats.count} 完成 ({stats.completionRate}%)
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          总计: {totalTasks} 个任务
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: DEFAULT_THEME.background,
    borderRadius: 12,
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: DEFAULT_THEME.text,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 14,
    color: DEFAULT_THEME.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  statsContainer: {
    gap: 12,
  },
  statItem: {
    backgroundColor: DEFAULT_THEME.surface,
    borderRadius: 8,
    padding: 12,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumbers: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statCount: {
    fontSize: 14,
    fontWeight: '500',
    color: DEFAULT_THEME.text,
  },
  statPercentage: {
    fontSize: 12,
    color: DEFAULT_THEME.textSecondary,
  },
  progressContainer: {
    gap: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: DEFAULT_THEME.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  completionText: {
    fontSize: 12,
    color: DEFAULT_THEME.textSecondary,
  },
  summary: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: DEFAULT_THEME.border,
  },
  summaryText: {
    fontSize: 14,
    fontWeight: '500',
    color: DEFAULT_THEME.text,
    textAlign: 'center',
  },
});