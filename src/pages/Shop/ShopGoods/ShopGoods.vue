<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item" v-for="(item, index) in goods"
              :class="{current:currentIndex===index}"
              @click="clickMenuItem(index,$event)">
            <span class="text border-1px">
              <img class="icon" v-if="good.icon" :src="good.icon">
                {{good.name}}
</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodsWarpperUl">
          <li class="food-list food-list-hook" v-for="item in goods">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li class="food-item border-1px" v-for="food in item.foods">
                <div class="icon">
                  <img width="57" height="57"
                       :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'

  export default{
    data () {
      return {
        scrollY: 0, //右侧Y轴滑动的坐标
        tops: [], // 包含右侧所有分类小列表的top值
      }
    },
    mounted () {
      // 使用axios请求mockjs提供的接口
      this.$store.dispatch('getShopGoods', () => {// goods更新了, 界面还没有更新
        this.$nextTick(() => {
          // 初始化滚动
          this._initScroll()
          // 初始化tops
          this._initTops()
        })
      })
    },

    methods: {
      _initScroll () {
        // 左侧分类列表的BScroll
        new BScroll('.menu-wrapper',{
          click: true //响应点击
        })
        // 右侧food列表的BScroll
        this.foodsScroll = new BScroll('.foods-wrapper',{
          probeType: 2, // 手指滑动(惯性滑动和编码滑动不监视)
          click: true //响应点击
        })

        // 监视滑动过程
        this.foodsScroll.on('scroll', (pos) => {
          console.log(pos.y)
          // 保存y
          this.scrollY = Math.abs(pos.y)
        })
        // 监视滑动结束
        this.foodsScroll.on('scrollEnd',(pos) => {
          console.log('滑动结束', pos.y)
          this.scrollY = Math.abs(pos.y)  // 解决惯性滑动更新
        })
      },

      _initTops () {
        const tops = []
        let top = 0
        // 计算各个 top, 并保存到tops
        tops.push(top)

        // 得到ul下所有的子li
        const lis = this.$refs.foodsWarpperUl.getElementsByClassName('food-list-hook')
        Array.prototype.slice.call(lis).forEach((li, index) => {
          top += li.clientHeight
          tops.push(top)
        })
        // 保存tops
        this.tops = tops
        console.log(this.tops)
      },

      clickMenuItem (index) {

        // 得到滚动目标坐标
        const top = this.tops[index]
        // 更新目标scrollY值
        this.scrollY = top
        // 平滑滚动到指定位置
        this.foodsScroll.scrollTo(0, -top, 300)
      }
    },

    computed: {
      ...mapState(['goods']),
      currentIndex () {
        return this.tops.findIndex((top, index)=> {
          return this.scrollY>=top && this.scrollY<this.tops[index+1]
        })
      }
    }
  }
</script>
