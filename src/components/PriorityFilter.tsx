import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Priority } from '@/types';
import { DEFAULT_THEME, PRIORITY_LABELS } from '@/utils/constants';
import { PriorityIndicator } from './PriorityIndicator';

interface PriorityFilterProps {
  selectedPriorities: Priority[];
  onTogglePriority: (priority: Priority) => void;
  onClearAll: () => void;
}

export const PriorityFilter: React.FC<PriorityFilterProps> = ({
  selectedPriorities,
  onTogglePriority,
  onClearAll,
}) => {
  const priorities = Object.values(Priority);
  const isSelected = (priority: Priority) => selectedPriorities.includes(priority);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>按优先级筛选</Text>
        {selectedPriorities.length > 0 && (
          <TouchableOpacity onPress={onClearAll} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>清除</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.filtersContainer}>
        {priorities.map((priority) => (
          <TouchableOpacity
            key={priority}
            style={[
              styles.filterOption,
              {
                backgroundColor: isSelected(priority)
                  ? DEFAULT_THEME.priority[priority] + '20'
                  : DEFAULT_THEME.surface,
                borderColor: isSelected(priority)
                  ? DEFAULT_THEME.priority[priority]
                  : DEFAULT_THEME.border,
              },
            ]}
            onPress={() => onTogglePriority(priority)}
          >
            <PriorityIndicator
              priority={priority}
              size="small"
              showLabel={false}
            />
            <Text
              style={[
                styles.filterText,
                {
                  color: isSelected(priority)
                    ? DEFAULT_THEME.priority[priority]
                    : DEFAULT_THEME.textSecondary,
                  fontWeight: isSelected(priority) ? '600' : '400',
                },
              ]}
            >
              {PRIORITY_LABELS[priority]}
            </Text>
            {isSelected(priority) && (
              <Text style={[styles.checkmark, { color: DEFAULT_THEME.priority[priority] }]}>
                ✓
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {selectedPriorities.length > 0 && (
        <Text style={styles.selectedCount}>
          已选择 {selectedPriorities.length} 个优先级
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: DEFAULT_THEME.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: DEFAULT_THEME.text,
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: DEFAULT_THEME.primary + '20',
  },
  clearButtonText: {
    fontSize: 12,
    color: DEFAULT_THEME.primary,
    fontWeight: '500',
  },
  filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    gap: 6,
  },
  filterText: {
    fontSize: 14,
  },
  checkmark: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  selectedCount: {
    marginTop: 8,
    fontSize: 12,
    color: DEFAULT_THEME.textSecondary,
    textAlign: 'center',
  },
});