import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useEventsApi from '../hooks/useEventsApi';
import styles from '../styles/commonStyles';

export default function HomeScreen({ navigation }) {
  const { t } = useTranslation();
  const { items, loading, fetchData } = useEventsApi();

  const navigateToProfile = () => {
    navigation.push('Profile');
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={{ marginTop: 24, marginStart: 16 }} onPress={() => navigation.push('Detail', { item })}>
      {
        item.images[0].url ?
          <Image
            source={{ uri: item.images[0].url }}
            style={[localStyles.image]}
            resizeMode="cover"
          />
          : <View />
      }
      <Text style={{ fontWeight: '800', fontSize: 14, marginTop: 12 }}>{item.name}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
        <Ionicons name="calendar-outline" size={16} color="#0B0F17" />
        <Text style={{ fontWeight: '400', fontSize: 14, marginStart: 4 }}>{item.dates.start.localDate}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
        <Ionicons name="location" size={16} color="#0B0F17" />
        <Text style={{ fontWeight: '400', fontSize: 14, marginStart: 8 }}>{item._embedded.venues[0].name}, {item._embedded.venues[0].address.line1}, {item._embedded.venues[0].city.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.page}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginStart: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 800 }}>{t('home_title')}</Text>
        <TouchableOpacity onPress={navigateToProfile}>
          <Ionicons name="person-circle-outline" size={40} color="#0B0F17" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(i) => String(i.id)}
        renderItem={renderItem}
        onEndReached={fetchData}
        onEndReachedThreshold={0.8}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

const localStyles = StyleSheet.create({
  image: {
    width: 200,
    height: 150,
    borderRadius: 6,
  },
});