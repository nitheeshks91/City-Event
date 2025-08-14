import { I18nManager, StyleSheet } from 'react-native';
import theme from '../app/theme';

const commonStyles = StyleSheet.create({
  // ===== Layout Containers =====
  page: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.light.background
  },
  containerDark: {
    flex: 1,
    backgroundColor: '#0B0F17',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  containerLight: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  bottomContainer: {
    paddingBottom: 45,
  },

  // ===== Top Bar =====
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ===== Switch / Locale Button =====
  // switchButton: {
  //   position: 'absolute',
  //   top: Platform.OS === 'android' ? 40 : 60,
  //   right: 16,
  //   zIndex: 10,
  //   padding: 8,
  // },
  // switchTextDark: {
  //   color: '#FFFFFF',
  //   fontSize: 14,
  //   textDecorationLine: 'underline',
  // },


  // ===== Text Styles =====
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  text14Underline: {
    fontSize: 14,
    color: '#0B0F17',
    fontWeight: '800',
    textDecorationLine: 'underline',
  },
  appName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  version: {
    color: '#ffffff', // originally noted as "black" but set to white
    fontSize: 12,
    fontWeight: '200',
  },
  buttonTextLight: {
    color: '#ffffff',
  },
  tertiaryTextDark: {
    color: '#0B0F17',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },

  // ===== Buttons =====
  buttonBase: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#0B0F17',
  },
  tertiaryButton: {
    alignItems: 'center',
  },

  // ===== Images =====
  logo: {
    width: 150,
    height: 150,
  },
  imageRounded: {
    width: 200,
    height: 150,
    borderRadius: 6,
  },
  iconStyle: {
    transform: { scaleX: I18nManager.isRTL ? -1 : 1 },
  },
  map: {
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 16,
    marginVertical: 16
  }
});

export default commonStyles;