import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        arr:[],
    },
    getters:{
        shopCar(state){
            return state.arr;
        },

 
    },
    mutations:{
      getShopcar(state,arr){
        if(!arr){
            state.arr=[];
        }else{
            state.arr=[...arr]
        }
        console.log("你刚刚加入了一件商品")
      },

    },
    actions:{
        addShopcar({commit},payload){
            let url="http://127.0.0.1:81/addShopcar"
            axios.post(url,payload).then(res=>{
                console.log("添加成功",res)
                console.log("这里的this",this)
            }).catch(err=>{
                console.log("err:",err)
            })
        },
        getShopcar({commit},payload){
            let url="http://127.0.0.1:81/getShopcar";
            console.log("payload",payload)
            axios.get(url, {
                params: {
                    token:payload
                }
            }).then(res=>{
                // console.log("res:",res)
                commit("getShopcar",res.data.shopCar)
            }).catch(err=>{
                console.log("err:",err)
            })
        }
    }
})