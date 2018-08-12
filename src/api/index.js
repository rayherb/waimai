/*
与后台交互模块
 */
import ajax from './ajax'

/**
 * 获取地址信息(根据经纬度串)
 */
export const reqAddress = geohash => ajax('/api/position/' + geohash)

/**
 * 获取msite页面食品分类列表
 */
export const reqCategorys = () => ajax('/api/index_category')

/**
 * 获取msite商铺列表(根据经纬度)
 */
export const reqShops = ({latitude, longitude}) => ajax('/api/shops', {latitude, longitude})

/**
 * 获取图片验证码
 */
export const reqCaptchas = () => ajax('/api/captchas')

/**
 * 账号密码登录
 */
export const accountLogin = (name, pwd, captcha) => ajax('/api/login_pwd', {
  name,
  pwd,
  captcha
}, 'POST')

/**
 * 获取短信验证码
 */
export const mobileCode = phone => ajax('/api/sendcode', {phone})