<template>
  <div clas="songer">
    <div class="album">
      <div class="spic"><img src="/static/img/jay.jpg"></div>
      <div class="sint"><h3>周杰伦</h3>
        <p>周杰伦（Jay Chou），1979年1月18日出生于台湾省新北市，华语流行男歌手、演员、词曲制作人、MV及电影导演、编剧及制作人。...</p>
      </div>
      <div class="clear"></div>
    </div>
    <div class="songlist">
      <li v-for="items in list"><p class="white">{{items.musicData.songname}}</p><p class="gray">{{artist}}.{{items.musicData.albumname}}</p></li>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  const first = [1,2,3];
  const param = {
    singermid:'0025NhlN2yWrP4',
    order:'listen',
    begin:0,
    num:30,
    songstatus:1
  }


export default {
  name: 'SongerList',
  data () {
    return {
       artist:'',
       list : []
    }
  },
  created () {
    this.$ajax()
  },
  methods:{
    $ajax:function () {
      axios.get('/api/v8/fcg-bin/fcg_v8_singer_track_cp.fcg',{
        params:param
      }).then(res=>{
        console.log(res);
        this.artist = res.data.data.singer_name;
        this.list = res.data.data.list;
      })
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
    margin-top: 2%;
    width: 100%;
    overflow: hidden;
  }

  .songlist p{
    text-align: left;
    padding-left: 22px;
  }
</style>
