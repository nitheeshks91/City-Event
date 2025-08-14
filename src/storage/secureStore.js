import * as SecureStore from 'expo-secure-store';

export default {
  async setItem(key, value) {
    return SecureStore.setItemAsync(key, value, { keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK });
  },
  async getItem(key) {
    return SecureStore.getItemAsync(key);
  },
  async removeItem(key) {
    return SecureStore.deleteItemAsync(key);
  }
};
