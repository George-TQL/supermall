const getters = {
  cartLength(state) {
    return state.cartList.length
  },
  cartCheckedLength(state) {
    return state.cartList.filter(item => item.checked === true).length
  },
  cartList(state) {
    return state.cartList
  }
}

export default getters