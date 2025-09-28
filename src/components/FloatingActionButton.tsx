import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { DEFAULT_THEME } from '@/utils/constants';

interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: string;
  style?: ViewStyle;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  icon = '+',
  style,
  size = 'medium',
  disabled = false,
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          width: 48,
          height: 48,
          borderRadius: 24,
          fontSize: 20,
        };
      case 'large':
        return {
          width: 72,
          height: 72,
          borderRadius: 36,
          fontSize: 28,
        };
      default:
        return {
          width: 56,
          height: 56,
          borderRadius: 28,
          fontSize: 24,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          width: sizeStyles.width,
          height: sizeStyles.height,
          borderRadius: sizeStyles.borderRadius,
        },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.icon,
          { fontSize: sizeStyles.fontSize },
          disabled && styles.disabledIcon,
        ]}
      >
        {icon}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: DEFAULT_THEME.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  icon: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  disabled: {
    backgroundColor: DEFAULT_THEME.textSecondary,
    opacity: 0.6,
  },
  disabledIcon: {
    color: DEFAULT_THEME.background,
  },
});