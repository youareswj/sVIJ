<template>
  <div clas="songer">
    <div class="album">
      <div class="spic"><img src="/static/img/jay.jpg"></div>
      <div class="sint"><h3>周杰伦</h3>
        <p>周杰伦（Jay Chou），1979年1月18日出生于台湾省新北市，华语流行男歌手、演员、词曲制作人、MV及电影导演、编剧及制作人。...</p>
      </div>
      <div class="clear"></div>
    </div>
    <scroller :on-refresh="refresh"
              :on-infinite="infinite" refresh-text="There Is Nothing" noDataText="没有啦!" ref="scroll" style="position:absolute;top:auto" height="100%">
      <div class="clear"></div>
    <div class="songlist">
      <ul>
        <li v-for="items in list"><p><router-link :to="{path:'/player',query:{id:items.musicData.songmid}}">{{items.musicData.songname}}</router-link></p><p class="gray">{{artist}}.{{items.musicData.albumname}}</p></li>
      </ul>
    </div>
    </scroller>
  </div>
</template>

<script>
  import  Vue from 'vue'
  import  x2js from 'x2js'
  import {getJson,loadXMLDoc} from 'static/js/getJson' //static地址要base文件resolve
  import VueScroller from 'vue-scroller'
  Vue.use(VueScroller);

  const param = {
    singermid:'0025NhlN2yWrP4',
    order:'listen',
    begin:0,
    num:30,
    songstatus:1
  }
  const xmlparam = {
    singermid:'0025NhlN2yWrP4',
    utf8:'1',
    outCharset:'utf-8',
    format:'xml',
    r:'1552980603130'
  }


export default {
  name: 'SongerList',
  data () {
    return {
       artist:'',
       songid:'',
       list : []
    }
  },
  mounted(){
    this.top = 1;
    this.bottom = 20;
  },
  created(){
    this.$ajax();
  },
  methods:{
  $ajax:function () {
    const _self = this; //将this传递出来
    getJson('/api/v8/fcg-bin/fcg_v8_singer_track_cp.fcg',param,function (res) {
        _self.artist = res.data.data.singer_name;
        _self.list = res.data.data.list;
    })
    getJson('/api/splcloud/fcgi-bin/fcg_get_singer_desc.fcg',xmlparam,function (res){
      const json = x2js.xml_str2json(res)
      console.log(x2js)
      // const reg = /[\u4e00-\u9fa5\d]/g;
      // var xml = res.data.desc.match(reg).join('');
      console.log(res.data)
    })
    },

    refresh (done) {
      done(true)//禁用下拉更新
    },

    infinite (done) { //上拉加载数据
      if(this.bottom>=30){
        setTimeout(() => {
          done(true)
        }, 1500)
        return;
      }
      const _self = this;
      setTimeout(() => {
        let start = this.bottom + 1
        this.bottom = this.bottom + 10;
        setTimeout(() => {
          done()
        })
      }, 1500)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .album{
    width: 100%;
    color: #fff;
    background: rgb(0,0,0,.5);
  }
  .spic {
    float: left;
    margin: 2% 0 0 2%;
  }
  .sint {
    float: right;
    width: 55%;
  }
  .sint p{
    margin: 0;
    padding-right: 4%;
  }
  .sint h3{
    font-size: 24px;
    margin: 0;
  }
  .songlist{
    margin-bottom: 10%;
    width: 100%;
    overflow: hidden;
    background: rgb(0,0,0,.5);
  }
  .songlist ul li{
    line-height: 32px;
  }

  .songlist p{
    text-align: left;
    padding-left: 22px;
  }
  .songlist p a{
    color: #fff;
  }
</style>
