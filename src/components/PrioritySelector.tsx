import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Priority } from '@/types';
import { DEFAULT_THEME, PRIORITY_LABELS } from '@/utils/constants';

interface PrioritySelectorProps {
  selectedPriority: Priority;
  onSelectPriority: (priority: Priority) => void;
  disabled?: boolean;
}

export const PrioritySelector: React.FC<PrioritySelectorProps> = ({
  selectedPriority,
  onSelectPriority,
  disabled = false,
}) => {
  const priorities = Object.values(Priority);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>优先级</Text>
      <View style={styles.optionsContainer}>
        {priorities.map((priority) => (
          <TouchableOpacity
            key={priority}
            style={[
              styles.option,
              {
                backgroundColor: selectedPriority === priority
                  ? DEFAULT_THEME.priority[priority]
                  : DEFAULT_THEME.surface,
                borderColor: DEFAULT_THEME.priority[priority],
              },
            ]}
            onPress={() => !disabled && onSelectPriority(priority)}
            disabled={disabled}
          >
            <Text
              style={[
                styles.optionText,
                {
                  color: selectedPriority === priority
                    ? '#FFFFFF'
                    : DEFAULT_THEME.priority[priority],
                },
              ]}
            >
              {PRIORITY_LABELS[priority]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: DEFAULT_THEME.text,
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    minWidth: 80,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
  },
});