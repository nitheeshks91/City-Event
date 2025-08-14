import { Ionicons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, I18nManager, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import secureStore from '../storage/secureStore';
import styles from '../styles/commonStyles';

const FAV_KEY = 'FAVORITES_IDS';

export default function ProfileScreen({ navigation }) {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);

  const navigateBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const loadFavourites = async () => {
      const raw = await secureStore.getItem(FAV_KEY);
      const favourites = raw ? JSON.parse(raw) : [];

      setItems(favourites);
    };
    loadFavourites();
  }, []);

  const logout = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  }

  const renderItem = ({ item }) => (
    <View style={{ marginTop: 32, flex: '1', flexDirection: 'row' }}>
      <Image
        source={{ uri: item.url }}
        style={[localStyles.image]}
        resizeMode="cover"
      />

      <View style={{ marginStart: 16, flex: 1 }}>
        <Text style={{ fontWeight: '800', fontSize: 14 }}>{item.name}</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
          <Ionicons name="calendar-outline" size={16} color="#0B0F17" />
          <Text style={{ fontWeight: '400', fontSize: 14, marginStart: 4 }}>{item.date}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <Ionicons name="location" size={16} color="#0B0F17" />
          <Text style={{ fontWeight: '400', fontSize: 14, marginStart: 8 }}>{item.address}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.containerLight, { padding: 32 }]}>
      <View style={[styles.topBar, { justifyContent: 'flex-start' }]}>
        <TouchableOpacity onPress={navigateBack}>
          <Ionicons style={{
            transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
          }} name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={[styles.title, { marginStart: 32 }]}>{t('profile')}</Text>
      </View>

      <Text style={{ fontSize: 18, fontWeight: 800, marginTop: 16 }}>{t('my_favourites')}</Text>

      <FlatList
        data={items}
        keyExtractor={(i) => String(i.id)}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
        ListEmptyComponent={() => (
          <Text style={{ marginTop: 32 }}>Event not added to favourite yet</Text>
        )}
      />

      <View style={{ flex: 1 }} />

      <View style={styles.bottomContainer}>
        <PrimaryButton style={{ marginTop: 16 }} title={t('logout')} onPress={logout} disabled={false} />
      </View>

    </View>
  );
}

const localStyles = StyleSheet.create({
  image: {
    width: 100,
    height: 90,
    borderRadius: 6,
  },
});