import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Priority } from '@/types';
import { DEFAULT_THEME, PRIORITY_LABELS } from '@/utils/constants';

interface PriorityIndicatorProps {
  priority: Priority;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

export const PriorityIndicator: React.FC<PriorityIndicatorProps> = ({
  priority,
  size = 'medium',
  showLabel = true,
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          dot: { width: 8, height: 8 },
          text: { fontSize: 12 },
          container: { gap: 4 },
        };
      case 'large':
        return {
          dot: { width: 16, height: 16 },
          text: { fontSize: 16 },
          container: { gap: 8 },
        };
      default:
        return {
          dot: { width: 12, height: 12 },
          text: { fontSize: 14 },
          container: { gap: 6 },
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <View style={[styles.container, sizeStyles.container]}>
      <View
        style={[
          styles.dot,
          sizeStyles.dot,
          { backgroundColor: DEFAULT_THEME.priority[priority] },
        ]}
      />
      {showLabel && (
        <Text
          style={[
            styles.label,
            sizeStyles.text,
            { color: DEFAULT_THEME.priority[priority] },
          ]}
        >
          {PRIORITY_LABELS[priority]}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    borderRadius: 50,
  },
  label: {
    fontWeight: '500',
  },
});