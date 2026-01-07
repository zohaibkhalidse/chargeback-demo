import { appStyles } from '@/constants/app-styles';
import { colors } from '@/constants/colors';
import BottomSheet, { BottomSheetBackdrop, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type AmountBottomSheetProps = {
  initialAmount?: string;
  onSelect: (amount: string) => void;
  onClose: () => void;
};

export type AmountBottomSheetRef = {
  open: () => void;
  close: () => void;
};

export const AmountBottomSheet = forwardRef<AmountBottomSheetRef, AmountBottomSheetProps>(({ initialAmount = '0', onSelect, onClose }, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const inputRef = useRef<any>(null);
  const [tempAmount, setTempAmount] = useState(initialAmount.replace('$', '').replace(',', ''));
  const [isOpen, setIsOpen] = useState(false);

  const snapPoints = useMemo(() => ['50%'], []);

  // Reset temp amount when initialAmount changes
  useEffect(() => {
    setTempAmount(initialAmount.replace('$', '').replace(',', ''));
  }, [initialAmount]);

  useImperativeHandle(ref, () => ({
    open: () => {
      setTempAmount(initialAmount.replace('$', '').replace(',', ''));
      bottomSheetRef.current?.expand();
      setIsOpen(true);
    },
    close: () => {
      bottomSheetRef.current?.close();
      setIsOpen(false);
      Keyboard.dismiss();
    },
  }));

  useEffect(() => {
    if (isOpen) {
      // Focus input when sheet opens - delay to ensure sheet is fully expanded
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        setIsOpen(false);
        Keyboard.dismiss();
        onClose();
      } else {
        setIsOpen(true);
      }
    },
    [onClose]
  );

  const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />, []);

  const handleAmountChange = (text: string) => {
    // Allow only numbers and decimal point
    const cleaned = text.replace(/[^0-9.]/g, '');
    // Prevent multiple decimal points
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      return;
    }
    setTempAmount(cleaned || '0');
  };

  const handleDone = () => {
    const formattedAmount = `$${parseFloat(tempAmount || '0').toFixed(2)}`;
    onSelect(formattedAmount);
    bottomSheetRef.current?.close();
    setIsOpen(false);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      enableContentPanningGesture={false}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.headerLeft} />
          <Text style={styles.headerTitle}>Amount</Text>
          <TouchableOpacity onPress={handleDone} style={styles.headerRight}>
            <Text style={styles.doneButton}>Done</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <BottomSheetTextInput
            ref={inputRef}
            style={styles.amountInput}
            value={tempAmount}
            onChangeText={handleAmountChange}
            keyboardType="decimal-pad"
            placeholder="0"
            placeholderTextColor={colors.textSecondary}
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});

AmountBottomSheet.displayName = 'AmountBottomSheet';

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: colors.cardBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handleIndicator: {
    backgroundColor: colors.border,
    width: 40,
    height: 4,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollView: {
    // flex: 1,
  },
  scrollContent: {
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    position: 'relative',
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    ...appStyles.headerTitle,
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  doneButton: {
    ...appStyles.headerButton,
  },
  inputWrapper: {
    marginTop: 32,
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    height: 56,
  },
  currencySymbol: {
    fontSize: 17,
    fontFamily: appStyles.body.fontFamily,
    color: colors.textPrimary,
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 17,
    fontFamily: appStyles.body.fontFamily,
    color: colors.textPrimary,
    padding: 0,
    height: 32,
    backgroundColor: 'transparent',
  },
});
