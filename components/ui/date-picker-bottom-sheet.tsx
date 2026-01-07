import { appStyles } from '@/constants/app-styles';
import { colors } from '@/constants/colors';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type DatePickerBottomSheetProps = {
  initialDate?: Date;
  onSelect: (date: Date) => void;
  onClose: () => void;
};

export type DatePickerBottomSheetRef = {
  open: () => void;
  close: () => void;
};

export const DatePickerBottomSheet = forwardRef<DatePickerBottomSheetRef, DatePickerBottomSheetProps>(({ initialDate = new Date(), onSelect, onClose }, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [tempSelectedDate, setTempSelectedDate] = useState(initialDate);
  const [showAndroidPicker, setShowAndroidPicker] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const snapPoints = useMemo(() => ['42%'], []);

  // Reset temp date when initialDate changes
  React.useEffect(() => {
    setTempSelectedDate(initialDate);
  }, [initialDate]);

  useImperativeHandle(ref, () => ({
    open: () => {
      setTempSelectedDate(initialDate);
      if (Platform.OS === 'android') {
        // On Android, just show the native picker directly
        setShowAndroidPicker(true);
        setIsOpen(true);
      } else {
        // On iOS, open the bottom sheet
        bottomSheetRef.current?.expand();
        setIsOpen(true);
      }
    },
    close: () => {
      if (Platform.OS === 'ios') {
        bottomSheetRef.current?.close();
      }
      setIsOpen(false);
      setShowAndroidPicker(false);
    },
  }));

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        setIsOpen(false);
        setShowAndroidPicker(false);
        onClose();
      } else {
        setIsOpen(true);
      }
    },
    [onClose]
  );

  const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />, []);

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowAndroidPicker(false);
      setIsOpen(false);
      if (event.type === 'set' && date) {
        // On Android, directly call onSelect when user sets the date
        onSelect(date);
        onClose();
      } else if (event.type === 'dismissed') {
        // User cancelled, just close
        onClose();
      }
    } else {
      // iOS - update temp date, user will press Done to confirm
      if (date) {
        setTempSelectedDate(date);
      }
    }
  };

  const handleDone = () => {
    onSelect(tempSelectedDate);
    bottomSheetRef.current?.close();
    setIsOpen(false);
    setShowAndroidPicker(false);
  };

  return (
    <>
      {/* On Android, only show the native picker, no bottom sheet */}
      {Platform.OS === 'android' && showAndroidPicker && <DateTimePicker value={tempSelectedDate} mode="date" display="default" onChange={handleDateChange} />}

      {/* On iOS, show the bottom sheet with date picker */}
      {Platform.OS === 'ios' && (
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdrop}
          enablePanDownToClose
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.handleIndicator}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.header}>
              <View style={styles.headerLeft} />
              <Text style={styles.headerTitle}>Start Date</Text>
              <TouchableOpacity onPress={handleDone} style={styles.headerRight}>
                <Text style={styles.doneButton}>Done</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.datePickerContainer}>
              <DateTimePicker value={tempSelectedDate} mode="date" display="spinner" onChange={handleDateChange} style={styles.datePicker} textColor={colors.textPrimary} />
            </View>
          </BottomSheetView>
        </BottomSheet>
      )}
    </>
  );
});

DatePickerBottomSheet.displayName = 'DatePickerBottomSheet';

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
  datePickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  datePicker: {
    width: '100%',
  },
  androidDateButton: {
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 12,
    alignItems: 'center',
  },
  androidDateText: {
    ...appStyles.body,
    fontSize: 20,
  },
});
