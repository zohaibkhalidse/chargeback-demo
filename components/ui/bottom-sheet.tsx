import { colors } from '@/constants/colors';
import React, { useCallback, useEffect } from 'react';
import { Dimensions, Modal, Platform, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const BOTTOM_SHEET_MAX_HEIGHT = SCREEN_HEIGHT * 0.75;

export type BottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  snapPoints?: number[];
};

export function BottomSheet({ visible, onClose, children }: BottomSheetProps) {
  const translateY = useSharedValue(BOTTOM_SHEET_MAX_HEIGHT);
  const opacity = useSharedValue(0);
  const context = useSharedValue({ y: 0 });

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, { damping: 20, stiffness: 90 });
      opacity.value = withTiming(0.5, { duration: 300 });
    } else {
      translateY.value = withSpring(BOTTOM_SHEET_MAX_HEIGHT, { damping: 20, stiffness: 90 });
      opacity.value = withTiming(0, { duration: 300 });
    }
  }, [visible, translateY, opacity]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = Math.max(0, context.value.y + event.translationY);
    })
    .onEnd(() => {
      const shouldClose = translateY.value > BOTTOM_SHEET_MAX_HEIGHT * 0.3;
      if (shouldClose) {
        translateY.value = withSpring(BOTTOM_SHEET_MAX_HEIGHT, { damping: 20, stiffness: 90 }, () => {
          runOnJS(onClose)();
        });
        opacity.value = withTiming(0, { duration: 300 });
      } else {
        translateY.value = withSpring(0, { damping: 20, stiffness: 90 });
      }
    });

  const animatedSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const animatedBackdropStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const handleClose = useCallback(() => {
    translateY.value = withSpring(BOTTOM_SHEET_MAX_HEIGHT, { damping: 20, stiffness: 90 }, () => {
      onClose();
    });
    opacity.value = withTiming(0, { duration: 300 });
  }, [onClose, translateY, opacity]);

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleClose} statusBarTranslucent>
      <GestureHandlerRootView style={styles.container}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <Animated.View style={[styles.backdrop, animatedBackdropStyle]} />
        </TouchableWithoutFeedback>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.sheet, animatedSheetStyle, { height: BOTTOM_SHEET_MAX_HEIGHT }]}>
            <View style={styles.handle} />
            <View style={styles.content}>{children}</View>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.backdrop,
  },
  sheet: {
    backgroundColor: colors.cardBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
  },
});
