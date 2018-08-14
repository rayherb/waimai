export default {
  totalCount (state) {
    return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0)
  },

  totalPrice (state) {
    return state.cartFoods.reduce((preTotal, food) => preTotal + food.count * food.price, 0)
  },
  // 总数量
  totalCount (state) {
    return state.shopCart.reduce((preTotal, food) => {
      return preTotal + food.count
    }, 0)
  },
// 总价格
  totalPrice (state) {
    return state.shopCart.reduce((preTotal, food) => {
      return preTotal + food.count*food.price
    }, 0)
  }

}
