import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, I18nManager, Image, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from "react-native-maps";
import PrimaryButton from '../components/PrimaryButton';
import secureStore from '../storage/secureStore';
import styles from '../styles/commonStyles';

const FAV_KEY = 'FAVORITES_IDS';

export default function DetailScreen({ route, navigation }) {
  const { item } = route.params;
  const { t } = useTranslation();
  const [isFav, setIsFav] = useState(false);

  const navigateBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    (async () => {
      try {
        const raw = await secureStore.getItem(FAV_KEY);
        const cacheItems = raw ? JSON.parse(raw) : [];

        const isFav = cacheItems.some(it => it.id === item.id);
        setIsFav(isFav);
      } catch (e) {
        console.warn(e);
      }
    })();
  }, [item]);

  const toggleFav = async () => {
    try {
      const event = {
        "id": item.id,
        "url": item.images[0].url,
        "name": item.name,
        "date": item.dates.start.localDate,
        "address": item._embedded.venues[0].name + ", " + item._embedded.venues[0].address.line1 + ", " + item._embedded.venues[0].city.name
      }
      const raw = await secureStore.getItem(FAV_KEY);
      const cacheItems = raw ? JSON.parse(raw) : [];

      const isFav = cacheItems.some(it => it.id === event.id);

      const updated = [];
      if (isFav) {
        updated.push(...cacheItems.filter(it => it.id !== event.id));
      } else {
        updated.push(...cacheItems);
        updated.push(event);
      }

      await secureStore.setItem(FAV_KEY, JSON.stringify(updated));
      setIsFav(!isFav);
    } catch (e) {
      console.log(e)
      Alert.alert('Error', 'Failed to update favorites');
    }
  };

  const location = item._embedded.venues[0].location;

  return (
    <View style={[styles.containerLight, { padding: 32 }]}>

      <View style={[styles.topBar, { justifyContent: 'flex-start' }]}>
        <TouchableOpacity onPress={navigateBack}>
          <Ionicons style={{
            transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
          }} name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={[styles.title, { marginStart: 32 }]}>{t('detail_title')}</Text>
      </View>

      <Image
        source={{ uri: item.images[0].url }}
        style={{ height: 200, marginTop: 32, borderRadius: 8 }}
        resizeMode="cover"
      />

      <View style={{ padding: 16 }} />
      <PrimaryButton onPress={toggleFav} icon={isFav ? 'heart' : 'heart-outline'} />

      <View style={{ padding: 16 }}>
        <Text style={{ fontWeight: '800', fontSize: 14, marginTop: 12 }}>{item.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
          <Ionicons name="calendar-outline" size={16} color="#0B0F17" />
          <Text style={{ fontWeight: '400', fontSize: 14, marginStart: 4 }}>{item.dates.start.localDate}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <Ionicons name="location" size={16} color="#0B0F17" />
          <Text style={{ fontWeight: '400', fontSize: 14, marginStart: 8 }}>{item._embedded.venues[0].name}, {item._embedded.venues[0].address.line1}, {item._embedded.venues[0].city.name}</Text>
        </View>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: parseFloat(location.latitude),
          longitude: parseFloat(location.longitude),
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(location.latitude),
            longitude: parseFloat(location.longitude),
          }}
          title={item.name}
        />
      </MapView>
    </View>
  );
}
