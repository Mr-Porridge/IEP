import Vue from 'vue'
import Router from 'vue-router'
import basicDataRouter from './basic_data'
import showListRouter from './show_school_list'

Vue.use(Router)

/* eslint-disable */
export default new Router({
  mode: 'history', /* 这一句不可以少 */
  routes: [
    basicDataRouter,
    showListRouter,
  ]
})
