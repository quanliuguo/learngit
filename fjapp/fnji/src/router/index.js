import Vue from 'vue'
import Router from 'vue-router'
import myhead from "@/components/myhead"
import myfootnav from "@/components/myfootnav"
import homePage from "@/components/homePage/homePage"
import Banner from "@/components/Banner"
import ImgHot from "@/components/ImgHot"
import myMenu from "@/components/myMenu"
import pageContent from "@/components/pageContent"
import VideoImg from "@/components/VideoImg"
import searchShop from "@/components/searchShop"
import goodPage from "@/components/goodPage"
import grocery from "@/components/grocery"
import gallery from "@/components/gallery"
import home from "@/components/home"
import fnjinews from "@/components/fnjinews"
import login from "@/components/login"
import register from "@/components/register"
import member from "@/components/member"
import goodDetail from "@/components/goodDetail"
import shopCar from "@/components/shopCar"
import user from "@/components/user"
// import furniture from "@/components/furniture"

Vue.use(Router)

export default new Router({
  // linkActiveClass:"active",
  routes: [
    // {path:"/",redirect:"/member/reg"},
     { path:"/",
      name: 'homePage',
      component:homePage,
      children:[
        {
          path:"/",
          name:"pageContent",
          component:pageContent
        },
        {
          path:"/goodPage",
          name:"goodPage",
          component:goodPage
        },
        
        {
          path:"/grocery",
          name:"grocery",
          component:grocery
        },
        {
          path:"/gallery",
          name:"gallery",
          component:gallery
        },
        {
          path:"/home",
          name:"home",
          component:home
        },
        {
          path:"/fnjinews",
          name:"fnjinews",
          component:fnjinews
        },
      ]
    },

    {//一级    member  默认二级是login
      path:"/member",
      name:"member",
      component:member,
      children:[
        //二级
        {
          path:"/",
          redirect:"/member/login"
        },
        {
          path:"login",
          name:"login",
          component:login
        },
        {path:"reg",
        name:"register",
        component:register
      },
        // {path:"reg",name:"register",component:register},
        {
          path:"goodDetail",
          name:"goodDetail",
          component:goodDetail
        },
        {
          path:"shopCar",
          name:"shopCar",
          meta:{isLogin:true,keepAlive:true},
          component:shopCar
        },
        {
          path:"user",
          name:"user",
          meta:{isLogin:true,keepAlive:true},
          component:user
        },
      ]
    },
    {//搜索页面
      path:"/search-shop",
      name:"searchShop",
      component:searchShop,
    }
  ]
})
