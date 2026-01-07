import { Icons } from '@/assets/icons';
import { Back, Down, Loan } from '@/assets/svgs';
import { AmountBottomSheet, AmountBottomSheetRef } from '@/components/ui/amount-bottom-sheet';
import { AppBottomSheet, AppBottomSheetRef, AppItem } from '@/components/ui/app-bottom-sheet';
import { CategoryBottomSheet, CategoryBottomSheetRef, CategoryItem } from '@/components/ui/category-bottom-sheet';
import { DatePickerBottomSheet, DatePickerBottomSheetRef } from '@/components/ui/date-picker-bottom-sheet';
import { DeleteButton } from '@/components/ui/delete-button';
import { FrequencyBottomSheet, FrequencyBottomSheetRef, FrequencyItem } from '@/components/ui/frequency-bottom-sheet';
import { ToggleSwitch } from '@/components/ui/toggle-switch';
import { appStyles } from '@/constants/app-styles';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/typography';
import { apps } from '@/data/apps';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditSubscriptionScreen() {
  const router = useRouter();
  const [isActive, setIsActive] = useState(true);
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const [amount, setAmount] = useState('$0.00');
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem>({ id: '4', name: 'Loan', icon: Loan });
  const [startDate, setStartDate] = useState(new Date(2025, 3, 12)); // Apr 12, 2025
  const [selectedFrequency, setSelectedFrequency] = useState<FrequencyItem>({ id: '1', name: 'Weekly' });

  const appBottomSheetRef = useRef<AppBottomSheetRef>(null);
  const amountBottomSheetRef = useRef<AmountBottomSheetRef>(null);
  const categoryBottomSheetRef = useRef<CategoryBottomSheetRef>(null);
  const datePickerBottomSheetRef = useRef<DatePickerBottomSheetRef>(null);
  const frequencyBottomSheetRef = useRef<FrequencyBottomSheetRef>(null);

  const handleFieldPress = (field: 'app' | 'amount' | 'category' | 'date' | 'frequency') => {
    switch (field) {
      case 'app':
        appBottomSheetRef.current?.open();
        break;
      case 'amount':
        amountBottomSheetRef.current?.open();
        break;
      case 'category':
        categoryBottomSheetRef.current?.open();
        break;
      case 'date':
        datePickerBottomSheetRef.current?.open();
        break;
      case 'frequency':
        frequencyBottomSheetRef.current?.open();
        break;
    }
  };

  const handleAppSelect = (app: AppItem) => {
    setSelectedApp(app);
  };

  const handleAmountSelect = (newAmount: string) => {
    setAmount(newAmount);
  };

  const handleCategorySelect = (category: CategoryItem) => {
    setSelectedCategory(category);
  };

  const handleDateSelect = (date: Date) => {
    setStartDate(date);
  };

  const handleFrequencySelect = (frequency: FrequencyItem) => {
    setSelectedFrequency(frequency);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleDelete = () => {
    // Handle delete action
    console.log('Delete subscription');
  };

  const handleSave = () => {
    // Handle save action
    console.log('Save subscription');
    // If there's a previous screen, go back, otherwise stay on this screen
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            }
          }} 
          style={styles.backButton}
        >
          <View style={styles.backButtonCircle}>
            <Back size={16} color={colors.textPrimary} />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Subscription</Text>
        <TouchableOpacity 
          onPress={handleSave}
          disabled={!selectedApp}
          style={!selectedApp && styles.saveButtonDisabled}
        >
          <Text style={[styles.saveButton, !selectedApp && styles.saveButtonTextDisabled]}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Subscription Header Card */}
        <View style={styles.card}>
          <View style={styles.subscriptionHeader}>
            <View style={styles.iconContainer}>
              <View style={[styles.iconCircle, ]}>
                {selectedApp ? (
                  selectedApp.iconUrl ? (
                    <Image
                      source={typeof selectedApp.iconUrl === 'string' ? { uri: selectedApp.iconUrl } : selectedApp.iconUrl}
                      style={styles.appIconImage}
                      contentFit="contain"
                    />
                  ) : (
                    <Text style={styles.iconText}>{selectedApp.icon || selectedApp.name.charAt(0)}</Text>
                  )
                ) : (
                  <Image
                    source={Icons.logo}
                    style={styles.logoImage}
                    contentFit="contain"
                  />
                )}
              </View>
            </View>
            <View style={styles.subscriptionInfo}>
              <Text style={[styles.subscriptionName, !selectedApp && styles.placeholderText]}>
                {selectedApp ? selectedApp.name : 'Choose an app'}
              </Text>
              <Text style={styles.subscriptionAmount}>{amount}</Text>
            </View>
          </View>
        </View>

        {/* Editable Details Card - Top */}
        <View style={styles.card}>
          <TouchableOpacity
            style={[styles.fieldRow, styles.lastFieldRow]}
            onPress={() => handleFieldPress('app')}
            activeOpacity={0.7}
          >
            <Text style={styles.fieldLabel}>App</Text>
            <View style={styles.fieldValueContainer}>
              <Text style={[styles.fieldValue, !selectedApp && styles.placeholderText]}>
                {selectedApp ? selectedApp.name : 'Choose an app'}
              </Text>
              <Down size={7} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.fieldRow, styles.lastFieldRow]}
            onPress={() => handleFieldPress('amount')}
            activeOpacity={0.7}
          >
            <Text style={styles.fieldLabel}>Amount</Text>
            <TouchableOpacity
              onPress={() => handleFieldPress('amount')}
              activeOpacity={0.7}
              style={styles.fieldValueContainer}
            >
              <Text style={styles.fieldValue}>{amount}</Text>
              <Down size={7} color={colors.textSecondary} />
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.fieldRow, { borderBottomWidth: 0 }]}
            onPress={() => handleFieldPress('category')}
            activeOpacity={0.7}
          >
            <Text style={styles.fieldLabel}>Category</Text>
            <View style={styles.fieldValueContainer}>
              <View style={styles.categoryIconContainer}>
                <selectedCategory.icon size={30} color={colors.textPrimary} />
              </View>
              <Text style={styles.fieldValue}>{selectedCategory.name}</Text>
              <Down size={7} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Editable Details Card - Bottom */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.fieldRow}
            onPress={() => handleFieldPress('date')}
            activeOpacity={0.7}
          >
            <Text style={styles.fieldLabel}>Start Date</Text>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{formatDate(startDate)}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.fieldRow}
            onPress={() => handleFieldPress('frequency')}
            activeOpacity={0.7}
          >
            <Text style={styles.fieldLabel}>Frequency</Text>
            <View style={styles.fieldValueContainer}>
              <Text style={styles.fieldValue}>{selectedFrequency.name}</Text>
              <Down size={7} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.fieldRow}
            onPress={() => {}}
            activeOpacity={0.7}
          >
            <Text style={styles.fieldLabel}>Remind Me</Text>
            <View style={styles.fieldValueContainer}>
              <Text style={styles.fieldValue}>2 days before</Text>
              <Down size={7} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>

          <View style={[styles.fieldRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.fieldLabel}>Active</Text>
            <ToggleSwitch value={isActive} onValueChange={setIsActive} />
          </View>
        </View>

        {/* Delete Button */}
        <DeleteButton onPress={handleDelete} />
      </ScrollView>

      {/* Bottom Sheets */}
      <AppBottomSheet
        ref={appBottomSheetRef}
        apps={apps}
        selectedAppId={selectedApp?.id}
        onSelect={handleAppSelect}
        onClose={() => {}}
      />
      <AmountBottomSheet
        ref={amountBottomSheetRef}
        initialAmount={amount}
        onSelect={handleAmountSelect}
        onClose={() => {}}
      />
      <CategoryBottomSheet
        ref={categoryBottomSheetRef}
        categories={[]}
        selectedCategoryId={selectedCategory.id}
        onSelect={handleCategorySelect}
        onClose={() => {}}
      />
      <DatePickerBottomSheet
        ref={datePickerBottomSheetRef}
        initialDate={startDate}
        onSelect={handleDateSelect}
        onClose={() => {}}
      />
      <FrequencyBottomSheet
        ref={frequencyBottomSheetRef}
        frequencies={[]}
        selectedFrequencyId={selectedFrequency.id}
        onSelect={handleFrequencySelect}
        onClose={() => {}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: appStyles.headerTitle,
  saveButton: appStyles.headerButton,
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonTextDisabled: {
    color: colors.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for delete button and safe area
  },
  appIconImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  logoImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  placeholderText: {
    color: colors.textSecondary,
    fontFamily:fonts.regular
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 8,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    // elevation: 2,
    
  },
  subscriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  iconContainer: {
    marginRight: 12,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.white,
  },
  subscriptionInfo: {
    flex: 1,
  },
  subscriptionName: {
    ...appStyles.mediumBody,
    marginBottom: 4,
  },
  subscriptionAmount: {
    ...appStyles.body,
    color:colors.textSecondary
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  fieldLabel: appStyles.label,
  fieldValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fieldValue: appStyles.body,
  categoryIconContainer: {
    marginRight: 8,
  },
  dateContainer: {
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  dateText: appStyles.secondary,
  lastFieldRow: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
});

