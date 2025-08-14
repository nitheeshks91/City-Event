import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/commonStyles';

export default function PrimaryButton({ style, title, onPress, disabled, icon }) {
  return (
    <TouchableOpacity style={[styles.buttonBase, styles.primaryButton, style, { opacity: disabled ? 0.6 : 1 }]} onPress={onPress} disabled={disabled} >
      <View style={styles.row}>
        <Text style={[styles.buttonTextLight]}>{title}</Text>
        {
          icon ?
            <Ionicons name={icon} size={20} color="#fff" style={[styles.icon, { marginStart: '10' }]} />
            : <View />
        }

      </View>

    </TouchableOpacity >
  );
}
