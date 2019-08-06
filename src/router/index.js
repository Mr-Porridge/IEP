import Vue from 'vue'
import Router from 'vue-router'
import basicDataRouter from './basic_data'
import showListRouter from './show_school_list'
import schoolTablesRouter from './school_tables'
import showSchoolTablesRouter from './school_tables/showSchoolTables'
import creatSchoolTablesRouter from './school_tables/creatSchoolTables'
import toBeDevelopedRouter from './to_be_developed'


Vue.use(Router)

/* eslint-disable */
export default new Router({
  /*mode: 'history', /!* 这一句不可以少 *!/
  base:'./var/www/html',*/
  base:'/group2/',
  routes: [
    basicDataRouter,
    showListRouter,
    schoolTablesRouter,
    showSchoolTablesRouter,
    creatSchoolTablesRouter,
    toBeDevelopedRouter,
  ]
})
