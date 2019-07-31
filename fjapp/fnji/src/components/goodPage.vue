<template>
  <div class="good-pages" >
      <div class="menu-wrap" ref="wrapMenu" >
        <div class="menu-content" ref='menuContent'>
          <div ref='menuList' :class="['menu-item',{selected:selected===i}]" v-for="(v,i) in pageData" :key="i" @click="selectMenu(i,$event)">
            
            <a>{{v.description}}</a>
          </div>
        </div>
      </div>


			<!-- 下方的纵滚动条 -->
      <div class="content-wrap"  ref="wrapGoods">
          <div class="goods-content" style="padding-bottom:100px">
            <div v-bind:id="v.class" v-for="(v,i) in pageData" :key="'0'+i" class="cat-panels" ref="goodList">
             
              <div class="title-div">
                <div class="title-icon" style="margin-top:10px" >
                  <img :src="'http://127.0.0.1:81/'+v.logo" :style="{width:Number.parseInt(v.logoSize.split(' ')[0])*1.5+'px'}" >
                </div >
                <div class="title-text">
                  {{v.description+"/"+v.class}}
                </div>
              </div>
              <div class="goods">
                <a v-for="(vv,i) in v.tableData" :key="'00'+i" class="good-wrap"  @click="toDetail(vv.id)" style="z-index=100px">
                  
                  <div class="good-img-wrap" :style="{backgroundColor:vv.bgColor}">
                    <img :src="vv.mainImage|srcstr">
                  </div>
                  <div class="imgtext">
                    <div class="title">{{vv.name}}</div>
                    <!-- {{vv}} -->
                    <div class="price">￥{{vv.price}}</div>
                  </div>
                </a>
                <a href="#" class="good-wrap look-more">
                    <!-- <div class="" style="height:320px"> -->
                      MORE
                    
                </a>
              </div>
            </div>
          </div>
      </div>
      <!-- 11111111111111 -->
   </div>

</template>

<script>
import BScroll from 'better-scroll'
import axios from 'axios'
import goodDetailVue from './goodDetail.vue';
export default {
  name: 'goodPage',
  data () {
    return {
      allData:{},
      a:"333333",
			listHeight:[],
			scrollY:0,
      menuScroll:'',
      // myquery:this.$route.query.goods
    }
  },
  computed:{
  //  limlen(){
  //    let arr=this.pageData;
  //    console.log("计算属性执行了","====================",arr)
  //    arr.forEach((a,b,c)=>{
  //     return a.tableData.length=5;
  //    });
     
  //    return arr;
     
  //  },
   ////////////////
    selected(){
      let len=this.listHeight.length;
      let menuList=this.$refs.menuList;
      for(let i=0;i<len;i++){
        let height1=this.listHeight[i];
        let height2=this.listHeight[i+1];
        if(!height2||(height1<=this.scrollY&&this.scrollY<height2)){
            this.menuScroll.scrollToElement(menuList[i-2],1000)
          return i;
        }
      }
      return 0;
    },
    /////////////
    pageData(){
      // console.log("11111111111111")
      let query=this.$route.query.goods
      console.log("参数",query)
      console.log("allllllllllll",this.allData)
      return this.allData[query]
    }
  },
  filters:{
      // 过滤器用于截取 src字符串
    srcstr(img){
      // console.log(img)
      let imgstr=img+"";
      let datacut=imgstr.slice(3);
      let imgurl='http://127.0.0.1:81/'+datacut;
      return imgurl.replace(/.png/,".jpg")
    },
  //    limlen(arr){
  //   //  console.log("计算属性执行了","====================",arr)
  //    let arr1=arr.map((a,b,c)=>{
  //     return a.tableData.length=5;
  //    });
  //    return arr1;
     
  //  }
  },
  // updated(){
  //   console.log("1")
  //    let query=this.$route.query.goods
  //   console.log("路由传过来的参数",query)
  //   let url="http://localhost:81/getHomedata";
  //     axios({
  //     url
  //   }).then(res=>{
  //     let str=res.data.data;
  //     let data=JSON.parse(str);
  //     console.log("*****",data)
  //     let obj1=data.goodshow;
  //     // this.arr=obj1[query];
  //     this.arr=obj1.furniture;
  //     console.log("此商品页的this.arr",this.arr)
  //     // console.log("aaarrr",arr)
  //     // this.arr=data.mainPage;
  //       	this.$nextTick(()=>{
  //     	//调用初始化better-scroll函数
  //     	// console.log("000000",this)
  //     	// this._initScroll()
  //     	// this._calculateHeight()
  //     })
  //   }).catch(err=>{
  //     console.log("err:",err)
  //   })
  // },
  mounted(){
   
  },
  created(){
      this.getData()
      console.log("0066600")
  },
  updated(){
    // this.getData()
  },
  methods:{
    //axios获取数据
    getData(){
      let query=this.$route.query.goods
        console.log("路由传过来的参数",query)
        let url="http://localhost:81/getHomedata";
          axios({
          url
        }).then(res=>{
          let str=res.data.data;
          let data=JSON.parse(str);
          let obj1=data.goodshow;
          delete obj1.homepage
          
          // for(let v in obj1){
          //   v.forEach(ele => {
          //     ele.tableData.length=5;
          //   });
          // }

          console.log("obj1",obj1)
          this.allData=obj1;
          this.$nextTick(()=>{
          	// 调用初始化better-scroll函数
            console.log("000000",this)
          	this._initScroll()
          	this._calculateHeight()
          })
        })
        .catch(err=>{
          console.log("err:",err)
        })
    },
    toDetail(id){
      // console.log("这个商品的ID",id)
      this.$router.push({
        name:"goodDetail",
        query:{
          id:id
        }
      })
    },
		selectMenu(i,event){
			// console.log("ev====>",event)
      //this.$event中有_construted属性，值为true
			if(!event._constructed){
				return;
			}
			// this.selected=this.pageData[i].class;
      let menuList=this.$refs.menuList;
			let goodList=this.$refs.goodList;
      let ele1=goodList[i];
      // let ele2=menuList[i-2]
       this.wrapScroll.scrollToElement(ele1,250);
      //  this.menuScroll.scrollToElement(ele2,250)
		},
  // 初始化better-scroll,找到要滚动的元素
    _initScroll(){
      let len=this.pageData.length*140;
      // console.log("this.limlen",this.limlen)
      // console.log(44444444444444,len)
      this.$refs.menuContent.style.width=len+"px";
      this.menuScroll=new BScroll(this.$refs.wrapMenu,{
        startX: 0,
        click:true,
				scrollX:true,
				scrollY:false
      });
      let self=this
      this.wrapScroll=new BScroll(self.$refs.wrapGoods,{
        click:true,
        probeType:3,
        scrollY:true
      });

      this.wrapScroll.on('scroll',(pos)=>{
        this.scrollY=Math.abs(Math.round(pos.y))
        // console.log("pos===>",pos)

      })
    },
		//获取高度数组
		 _calculateHeight(){
      let goodList =this.$refs.goodList;
      //  console.log("goodList",goodList)
      // console.log("00000000000000000",goodList)
      let height=0;
      this.listHeight.push(height);
      for(let i=0;i<goodList.length;i++){
        let item=goodList[i];
        height+=item.clientHeight;
        this.listHeight.push(height);
      }
      console.log("listHeight====>",this.listHeight)
    }
},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	::-webkit-scrollbar {
    width: 0px;
    height: 0px;
}
.goods{
  height: 1275px;
  box-sizing: border-box;
  width: 100%;
  position: relative;
}
.menu-item.selected>a{
  box-sizing: border-box;
	/* border-bottom:4px solid #000; */
  background: #ccc;
}
ul {
    display: inline-block;
    list-style-type: disc;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-inline-start: 0;
}
.imgtext{
  text-align: center;
  font: 24px/30px "宋体";
  color: black;
  margin-top:20px;
}
.good-wrap{
  display: inline-block;
  box-sizing: border-box;
  width: 320px;
   margin: 0 25px 25px 0;
   position: relative;
   z-index: 1;
}
.good-img-wrap img{
  width:100%;
  height: 100%;
}

.good-img-wrap{
  display: inline-block;
  box-sizing: border-box;
  width: 320px;
  height: 320px;
  padding: 60px;
  text-align: center;
  font: normal bolder 28px/320px;
}
.look-more{
  text-align: center;
  position: absolute;
  right: 20px;
  font: normal bolder 30px/320px "微软雅黑";
  height: 400px;
  border:1px solid black;
  /* transform: translate(108%,-107%); */
  background:#fff;
  /* border: none; */
}
.title-div{
  text-align: center;
  padding:75px 0;
}
.title-text{
  font:24px/30px "楷体";
}
.goods{
  box-sizing: border-box;
  padding-left: 42px;
}
.menu-wrap{
  height: 86px;
	width:100%;
  background: #fff;
  overflow-x:scroll;
	overflow-y:none ;
  box-sizing: border-box;
  /* box-shadow:0 3px 2px 1px whitesmoke; */
  z-index: 100
}
.menu-content{
  box-sizing: border-box;
  display:block;
  padding: 0 20px;
  height: 86px;
  overflow: none;
	/* z-index: 50; */
}
.menu-item{
  display: inline-block;
  padding: 0 10px;
  height: 100%;
  width: 115px;
    box-sizing: border-box;
}
.menu-wrap a{
  box-sizing:border-box;
  width: 112px;
  display: inline-block;
  font: 34px/86px "楷体";
  text-align: center;
  border-bottom:4px solid white;
  color: #666;
}
/* .good-pages{
  overflow: scroll;
} */
.content-wrap{
	position: fixed;
  width: 100%;
  top:211px;
  bottom:98px;
  overflow: scroll;
  /* background: red; */
}
/* .content-wrap>div{
  width:100%;
  height: 100%;
   height: 13400px;
} */
</style>
