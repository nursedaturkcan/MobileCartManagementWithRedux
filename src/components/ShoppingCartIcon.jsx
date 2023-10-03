import { StyleSheet, TouchableOpacity,Text, View } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/Ionicons"
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const ShoppingCartIcon = () => {
    const {navigate}=useNavigation();
    // storeDan spetteki ürünlerin sayısını çekme
    const cartItems=useSelector((state)=>state)
  return (
    <TouchableOpacity onPress={() => navigate('Cart')} style={styles.button}>
    <View style={styles.itemCountContainer}>
      <Text style={styles.itemCountText}>{cartItems.length}</Text>
    </View>
    <Icon name="cart" size={20} color="#101010" />
  </TouchableOpacity>
  )
}

export default ShoppingCartIcon

const styles = StyleSheet.create({
  button: {marginRight: 10},
  itemCountContainer: {
    position: 'absolute',
    backgroundColor: '#ff7d7d',
    width: 20,
    height: 20,
    borderRadius: 10,
    right: -15,
    bottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20000,
  },
  itemCountText: {color: '#fff', fontWeight: 'bold'},
});