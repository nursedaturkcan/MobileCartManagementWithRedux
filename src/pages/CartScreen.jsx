import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Seperator from '../components/Seperator'
import { REMOVE_TO_CART, INCREASE_QUANTITY, DECREASE_QUANTITY } from '../redux/reducers/actionTypes'
import { useNavigation } from '@react-navigation/native'

const CartScreen = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const cartItems = useSelector((state) => state)
  const dispatch = useDispatch()
  const { navigate } = useNavigation();
  // miktar artırma fonk
  const increaseQuantity = (payload) => {
    dispatch({
      type: INCREASE_QUANTITY,
      payload,
    });
  };
  // miktar azaltma fonk
  const decreaseQuantity = (payload) => {
    dispatch({
      type: DECREASE_QUANTITY,
      payload,
    });
  };
  // sepetten silen funk
  const removeItemFromCart = (payload) => {
    dispatch({
      type: REMOVE_TO_CART,
      payload
    })
  }
  // fiyat toplamını gösteren fonk
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };
  useEffect(() => {
    const calculatedTotalPrice = calculateTotalPrice();
    setTotalPrice(calculatedTotalPrice);
  }, [cartItems]);
  
  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={Seperator()}
        renderItem={({ item }) => (
          <View style={styles.bookItemContainer}>
            <Image source={{ uri: item.imgUrl }} style={styles.thumbnail} />
            <View style={styles.bookItemMetaContainer}>
              <Text style={styles.textTitle}>{item.name}</Text>
              <Text style={styles.textAuthor}>{item.author}</Text>
              <Text style={styles.price} >{item.price}₺</Text>
              <View style={styles.bottom}>
                <View style={styles.quantityContainer}>
                  <Text>Quantity:</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => decreaseQuantity(item)}>
                    <Text style={styles.blackText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => increaseQuantity(item)}>
                    <Text style={styles.blackText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => removeItemFromCart(item)}>
                <Text style={styles.buttonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            {cartItems.length === 0 ? (
              <>
                <Text style={styles.emptyMessage}>Your Cart is empty</Text>
                <TouchableOpacity
                  style={styles.buttonEmpty}
                  onPress={() => navigate('Books')}>
                  <Text style={styles.buttonText}>Go to Books</Text>
                </TouchableOpacity>
              </>
            ) : null}
          </View>
        )}
      />


      {cartItems.length > 0 && (
       <View style={styles.bottomButton}>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPrice}>Total Price : {totalPrice}₺</Text>
        </View>
        <View >
          <TouchableOpacity
            style={styles.continue}
            onPress={() => navigate('Books')}>
            <Text style={styles.continueText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
       </View>
      )}
    </View>
  );
};





export default CartScreen

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  thumbnail: { width: 100, height: 150 },
  bookItemContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  bookItemMetaContainer: {
    padding: 5,
    paddingLeft: 10,
  },
  textTitle: { fontSize: 22, fontWeight: '400' },
  textAuthor:
  {
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonContainer: {
    position: 'absolute',
    top: 120,
    right: 10
  },
  price: {
    fontWeight: "bold",
    color: "#ff333390"
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#ff333390',
    padding: 5
  },
  buttonEmpty: {
    borderRadius: 8,
    backgroundColor: 'blue',
    padding: 10
  },
  buttonText: {
    fontSize: 18,
    color: '#fff'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 250,
    gap: 10,
  },
  emptyMessage: { fontSize: 28 },
  bottomButton: {
    flex: 0.5,
    alignItems: "center",

  },
  totalPriceContainer:{
    backgroundColor:"black",
    borderRadius: 8,
   
    padding: 5,
    width: "90%",
    height: 35,
   
    
  },
  totalPrice:{
   color:"#fff",
   textAlign:"center",
   fontSize:20
  },
  continue: {
    
    borderRadius: 8,
    backgroundColor:
      '#ff333390',
    padding: 5,
    width: "90%",
    height: 35,
    marginTop:30
  },
  continueText: {
    textAlign: "center",
    fontSize: 18, color: '#fff'
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
  },
  quantityButton: {
    borderWidth: 2,


    padding: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 18,


  },
  blackText: {
    color: "black"
  }
});