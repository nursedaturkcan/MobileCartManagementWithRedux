import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet,Alert } from 'react-native'
import React from 'react'
import ShoppingCartIcon from '../components/ShoppingCartIcon'
import books from '../utils/mockData'

import Seperator from '../components/Seperator'
import { useDispatch } from 'react-redux'
import { ADD_TO_CART } from '../redux/reducers/actionTypes'
const BookScreen = () => {

  const dispatch=useDispatch();
  const addItemToCart=(payload)=>{
    dispatch({
      type:ADD_TO_CART,
      payload
    })
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={()=>Seperator()}
        renderItem={({ item }) => (
          <View style={styles.bookItemContainer}>
            <Image source={{ uri: item.imgUrl }} style={styles.img} />
            <View style={styles.bookInfo}>
              <View>
                <Text style={styles.bookTitle}>{item.name}</Text>
                <Text style={styles.textAuthor}>by {item.author}</Text>
                <Text style={styles.price}>{item.price}₺</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={()=>addItemToCart(item)} style={styles.button}>
                  <Text style={styles.buttonText}>Add + </Text>
                </TouchableOpacity>
              </View>

            </View>

          </View>
        )}
      />

    </View>
  )
}

export default BookScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10


  },
  bookItemContainer: {
    flexDirection: "row",
    padding: 10,
  
    gap: 10,
    marginTop: 10


  },
  bookInfo: {
    padding: 5,
    paddingLeft: 10,
    justifyContent: "space-between",

    width: "50%",
    marginLeft: 10

  },
  bookTitle: {
    fontWeight: "200",
    fontSize: 20
  },
  img: {
    width: 100,
    height: 150
  },
  textAuthor: {
    fontSize: 18,
    fontWeight: "400"
  },
  price:{
fontWeight:"bold",
color:"#ff333390"
  },
  buttonContainer: {
width:80

  },
  button: {
    backgroundColor: "#24A0ed",
    borderRadius: 6,
    padding: 5
  },
  buttonText: {
    fontSize: 22,
    color: "#fff"
  }
})