import { Check, Search as SearchIcon } from '@/assets/svgs';
import { appStyles } from '@/constants/app-styles';
import { colors } from '@/constants/colors';
import BottomSheet, { BottomSheetBackdrop, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type AppItem = {
  id: string;
  name: string;
  icon?: string; // Icon emoji/text fallback
  iconColor?: string;
  iconUrl?: any; // require() path or URL for app icon image
};

export type AppBottomSheetProps = {
  apps: AppItem[];
  selectedAppId?: string;
  onSelect: (app: AppItem) => void;
  onClose: () => void;
};

export type AppBottomSheetRef = {
  open: () => void;
  close: () => void;
};

export const AppBottomSheet = forwardRef<AppBottomSheetRef, AppBottomSheetProps>(({ apps, selectedAppId, onSelect, onClose }, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [tempSelectedAppId, setTempSelectedAppId] = React.useState(selectedAppId);

  const snapPoints = useMemo(() => ['70%'], []);

  // Reset temp selection when sheet opens
  React.useEffect(() => {
    if (selectedAppId) {
      setTempSelectedAppId(selectedAppId);
    }
  }, [selectedAppId]);

  useImperativeHandle(ref, () => ({
    open: () => {
      setTempSelectedAppId(selectedAppId);
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

  const filteredApps = useMemo(() => {
    if (!searchQuery) return apps;
    return apps.filter((app) => app.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [apps, searchQuery]);

  const handleSelectApp = (app: AppItem) => {
    setTempSelectedAppId(app.id);
  };

  const handleDone = () => {
    const selectedApp = apps.find((app) => app.id === tempSelectedAppId);
    if (selectedApp) {
      onSelect(selectedApp);
    }
    bottomSheetRef.current?.close();
  };

  const renderAppItem = ({ item }: { item: AppItem }) => {
    const isSelected = item.id === tempSelectedAppId;

    return (
      <TouchableOpacity style={styles.appItem} onPress={() => handleSelectApp(item)} activeOpacity={0.7}>
        <View style={styles.appItemLeft}>
          <View style={[styles.appIcon, !item.iconUrl && { backgroundColor: item.iconColor || colors.background }]}>
            {item.iconUrl ? (
              <Image source={typeof item.iconUrl === 'string' ? { uri: item.iconUrl } : item.iconUrl} style={styles.appIconImage} contentFit="contain" />
            ) : (
              <Text style={styles.appIconText}>{item.icon || item.name.charAt(0)}</Text>
            )}
          </View>
          <Text style={styles.appName}>{item.name}</Text>
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
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft} />
          <Text style={styles.headerTitle}>App</Text>
          <TouchableOpacity onPress={handleDone} style={styles.headerRight}>
            <Text style={styles.doneButton}>Done</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchIcon size={17} color={colors.textSecondary} />
          <BottomSheetTextInput style={styles.searchInput} placeholder="Search" placeholderTextColor={colors.textSecondary} value={searchQuery} onChangeText={setSearchQuery} />
        </View>

        {/* App List */}
        <FlatList data={filteredApps} renderItem={renderAppItem} keyExtractor={(item) => item.id} style={styles.list} contentContainerStyle={styles.listContent} />
      </BottomSheetView>
    </BottomSheet>
  );
});

AppBottomSheet.displayName = 'AppBottomSheet';

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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    fontFamily: appStyles.body.fontFamily,
    color: colors.textPrimary,
    marginLeft: 12,
    padding: 0,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
  appItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  appItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  appIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  appIconImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  appIconText: {
    fontSize: 16,
    fontFamily: appStyles.body.fontFamily,
    fontWeight: 'bold',
    color: colors.white,
  },
  appName: {
    ...appStyles.body,
    flex: 1,
  },
});
