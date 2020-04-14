import * as types from './mutation-types'

const actions = {
  addToCart({state, commit}, info) {
    return new Promise((resolve) => {
      const oldInfo = state.cartList.find(item => item.iid === info.iid)
      let messageOut =  ''
      if(oldInfo) {
        const index = state.cartList.indexOf(oldInfo)
        commit(types.INCREMENT_COUNT, index)
        messageOut = '商品数量加1'

      } else {
        info.count = 1
        info.checked = true
        commit(types.ADD_TO_CART, info)
        messageOut = '加入购物车'
      }

      resolve(messageOut)
  })
}
}
export default actions