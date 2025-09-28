import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Priority } from '@/types';
import { DEFAULT_THEME } from '@/utils/constants';
import { useTasks } from '@/hooks/useTasks';
import {
  TaskList,
  SearchBar,
  StatsCard,
  FloatingActionButton,
  PriorityFilter,
} from '@/components';

export const HomeScreen: React.FC = () => {
  const {
    tasks,
    filter,
    isLoading,
    getFilteredTasks,
    getSortedTasks,
    setFilter,
    clearFilter,
    getStats,
    toggleTask,
    deleteTask,
    loadTasks,
  } = useTasks();

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // 应用搜索和过滤
  const filteredTasks = useMemo(() => {
    let result = getSortedTasks();

    // 应用过滤器
    if (filter.priority || filter.status || filter.dateRange) {
      result = getFilteredTasks();
    }

    // 应用搜索
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query)
      );
    }

    return result;
  }, [tasks, filter, searchQuery, getSortedTasks, getFilteredTasks]);

  const stats = getStats();

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const handlePriorityFilter = (priorities: Priority[]) => {
    setFilter({ priority: priorities.length > 0 ? priorities : undefined });
  };

  const handleTogglePriority = (priority: Priority) => {
    const currentPriorities = filter.priority || [];
    const newPriorities = currentPriorities.includes(priority)
      ? currentPriorities.filter(p => p !== priority)
      : [...currentPriorities, priority];

    handlePriorityFilter(newPriorities);
  };

  const handleClearFilters = () => {
    clearFilter();
    setSearchQuery('');
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>TaskMate</Text>
      <Text style={styles.headerSubtitle}>您的智能任务管理助手</Text>

      {/* 统计卡片 */}
      <View style={styles.statsContainer}>
        <View style={styles.statsRow}>
          <StatsCard
            title="总任务"
            value={stats.total}
            icon="📋"
            color={DEFAULT_THEME.primary}
            style={styles.statCard}
          />
          <StatsCard
            title="已完成"
            value={stats.completed}
            icon="✅"
            color={DEFAULT_THEME.success}
            progress={stats.completionRate}
            style={styles.statCard}
          />
        </View>
        <View style={styles.statsRow}>
          <StatsCard
            title="进行中"
            value={stats.inProgress}
            icon="⏳"
            color={DEFAULT_THEME.warning}
            style={styles.statCard}
          />
          <StatsCard
            title="待开始"
            value={stats.pending}
            icon="⭕"
            color={DEFAULT_THEME.textSecondary}
            style={styles.statCard}
          />
        </View>
      </View>

      {/* 搜索栏 */}
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearchChange}
        placeholder="搜索任务标题或描述..."
      />

      {/* 优先级过滤器 */}
      {showFilters && (
        <PriorityFilter
          selectedPriorities={filter.priority || []}
          onTogglePriority={handleTogglePriority}
          onClearAll={() => handlePriorityFilter([])}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={DEFAULT_THEME.background} />

      <TaskList
        tasks={filteredTasks}
        onToggleTaskStatus={toggleTask}
        onDeleteTask={deleteTask}
        onRefresh={loadTasks}
        isRefreshing={isLoading}
        ListHeaderComponent={renderHeader}
        emptyText={
          searchQuery || filter.priority
            ? "没有找到匹配的任务"
            : "暂无任务"
        }
      />

      <FloatingActionButton
        onPress={() => {
          // TODO: Navigate to create task screen
          console.log('Create task');
        }}
        icon="+"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DEFAULT_THEME.surface,
  },
  header: {
    backgroundColor: DEFAULT_THEME.background,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: DEFAULT_THEME.text,
    textAlign: 'center',
    marginTop: 16,
  },
  headerSubtitle: {
    fontSize: 14,
    color: DEFAULT_THEME.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
  },
});