import { Check } from '@/assets/svgs';
import { appStyles } from '@/constants/app-styles';
import { colors } from '@/constants/colors';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type FrequencyItem = {
  id: string;
  name: string;
};

export type FrequencyBottomSheetProps = {
  frequencies: FrequencyItem[];
  selectedFrequencyId?: string;
  onSelect: (frequency: FrequencyItem) => void;
  onClose: () => void;
};

export type FrequencyBottomSheetRef = {
  open: () => void;
  close: () => void;
};

const frequencies: FrequencyItem[] = [
  { id: '1', name: 'Weekly' },
  { id: '2', name: 'Monthly' },
  { id: '3', name: 'Annually' },
];

export const FrequencyBottomSheet = forwardRef<FrequencyBottomSheetRef, FrequencyBottomSheetProps>(({ selectedFrequencyId, onSelect, onClose }, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [tempSelectedFrequencyId, setTempSelectedFrequencyId] = React.useState(selectedFrequencyId);

  const snapPoints = useMemo(() => ['30%'], []);

  // Reset temp selection when sheet opens
  React.useEffect(() => {
    if (selectedFrequencyId) {
      setTempSelectedFrequencyId(selectedFrequencyId);
    }
  }, [selectedFrequencyId]);

  useImperativeHandle(ref, () => ({
    open: () => {
      setTempSelectedFrequencyId(selectedFrequencyId);
      bottomSheetRef.current?.expand();
    },
    close: () => {
      bottomSheetRef.current?.close();
    },
  }));

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose]
  );

  const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />, []);

  const handleSelectFrequency = (frequency: FrequencyItem) => {
    setTempSelectedFrequencyId(frequency.id);
  };

  const handleDone = () => {
    const selectedFrequency = frequencies.find((freq) => freq.id === tempSelectedFrequencyId);
    if (selectedFrequency) {
      onSelect(selectedFrequency);
    }
    bottomSheetRef.current?.close();
  };

  const renderFrequencyItem = ({ item }: { item: FrequencyItem }) => {
    const isSelected = item.id === tempSelectedFrequencyId;

    return (
      <TouchableOpacity style={styles.frequencyItem} onPress={() => handleSelectFrequency(item)} activeOpacity={0.7}>
        <Text style={styles.frequencyName}>{item.name}</Text>
        {isSelected && <Check size={17} color={colors.primary} />}
      </TouchableOpacity>
    );
  };

  return (
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
          <Text style={styles.headerTitle}>Frequency</Text>
          <TouchableOpacity onPress={handleDone} style={styles.headerRight}>
            <Text style={styles.doneButton}>Done</Text>
          </TouchableOpacity>
        </View>

        <FlatList data={frequencies} renderItem={renderFrequencyItem} keyExtractor={(item) => item.id} style={styles.list} contentContainerStyle={styles.listContent} />
      </BottomSheetView>
    </BottomSheet>
  );
});

FrequencyBottomSheet.displayName = 'FrequencyBottomSheet';

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
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
  frequencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  frequencyName: {
    ...appStyles.body,
    flex: 1,
  },
});
