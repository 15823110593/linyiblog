import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home = () => import(/* webpackChunkName: 'home'*/ '@/pages/home')
const ue = () => import(/* webpackChunkName: 'ue'*/ '@/pages/admin/ue/ue')
const detail = () => import(/* webpackChunkName: 'detail'*/ '@/pages/detail')
const search = () => import(/* webpackChunkName: 'search'*/ '@/pages/search')
const tecShare = () => import(/* webpackChunkName: 'tecShare'*/ '@/pages/tecShare')
const studyNote = () => import(/* webpackChunkName: 'studyNote'*/ '@/pages/studyNote')
const casualNote = () => import(/* webpackChunkName: 'casualNote'*/ '@/pages/casualNote')
const bookShare = () => import(/* webpackChunkName: 'bookShare'*/ '@/pages/bookShare')

//admin
const admin = () => import(/* webpackChunkName: 'admin'*/ '@/pages/admin/home')
const sysConfig = () => import(/* webpackChunkName: 'sysConfig'*/ '@/pages/admin/sysConfig')

// 解决重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}


export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/',
    },
    {
      path: '/admin',
      redirect: '/ue',
    },
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {
        show: true
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail,
      meta: {
        show: true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: search,
      meta: {
        show: true
      }
    },
    {
      path: '/tecShare',
      name: 'tecShare',
      component: tecShare,
      meta: {
        show: true
      }
    },
    {
      path: '/studyNote',
      name: 'studyNote',
      component: studyNote,
      meta: {
        show: true
      }
    },
    {
      path: '/casualNote',
      name: 'casualNote',
      component: casualNote,
      meta: {
        show: true
      }
    },
    {
      path: '/bookShare',
      name: 'bookShare',
      component: bookShare,
      meta: {
        show: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      meta: {
        show: false
      },
      children: [
        {
          path: '/ue',
          name: 'ue',
          component: ue,
          meta: {
            show: false
          }
        },
        {
          path: '/sysConfig',
          name: 'sysConfig',
          component: sysConfig,
          meta: {
            show: false
          }
        },
      ]
    },
  ]
})
