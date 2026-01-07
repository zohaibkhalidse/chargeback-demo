import { Card, Check, Loan, Rent, Subscription, Utility } from '@/assets/svgs';
import { appStyles } from '@/constants/app-styles';
import { colors } from '@/constants/colors';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type CategoryItem = {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
};

export type CategoryBottomSheetProps = {
  categories: CategoryItem[];
  selectedCategoryId?: string;
  onSelect: (category: CategoryItem) => void;
  onClose: () => void;
};

export type CategoryBottomSheetRef = {
  open: () => void;
  close: () => void;
};

const categories: CategoryItem[] = [
  { id: '1', name: 'Subscription', icon: Subscription },
  { id: '2', name: 'Utility', icon: Utility },
  { id: '3', name: 'Card Payment', icon: Card },
  { id: '4', name: 'Loan', icon: Loan },
  { id: '5', name: 'Rent', icon: Rent },
];

export const CategoryBottomSheet = forwardRef<CategoryBottomSheetRef, CategoryBottomSheetProps>(({ selectedCategoryId, onSelect, onClose }, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [tempSelectedCategoryId, setTempSelectedCategoryId] = React.useState(selectedCategoryId);

  const snapPoints = useMemo(() => ['40%'], []);

  // Reset temp selection when sheet opens
  React.useEffect(() => {
    if (selectedCategoryId) {
      setTempSelectedCategoryId(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  useImperativeHandle(ref, () => ({
    open: () => {
      setTempSelectedCategoryId(selectedCategoryId);
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

  const handleSelectCategory = (category: CategoryItem) => {
    setTempSelectedCategoryId(category.id);
  };

  const handleDone = () => {
    const selectedCategory = categories.find((cat) => cat.id === tempSelectedCategoryId);
    if (selectedCategory) {
      onSelect(selectedCategory);
    }
    bottomSheetRef.current?.close();
  };

  const renderCategoryItem = ({ item }: { item: CategoryItem }) => {
    const isSelected = item.id === tempSelectedCategoryId;
    const IconComponent = item.icon;

    return (
      <TouchableOpacity style={styles.categoryItem} onPress={() => handleSelectCategory(item)} activeOpacity={0.7}>
        <View style={styles.categoryItemLeft}>
          <View style={styles.iconContainer}>
            <IconComponent size={30} color={colors.textPrimary} />
          </View>
          <Text style={styles.categoryName}>{item.name}</Text>
        </View>
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
          <Text style={styles.headerTitle}>Category</Text>
          <TouchableOpacity onPress={handleDone} style={styles.headerRight}>
            <Text style={styles.doneButton}>Done</Text>
          </TouchableOpacity>
        </View>

        <FlatList data={categories} renderItem={renderCategoryItem} keyExtractor={(item) => item.id} style={styles.list} contentContainerStyle={styles.listContent} />
      </BottomSheetView>
    </BottomSheet>
  );
});

CategoryBottomSheet.displayName = 'CategoryBottomSheet';

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
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  categoryItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: 12,
  },
  categoryName: {
    ...appStyles.body,
    flex: 1,
  },
});
