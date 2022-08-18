/*
  1.歌曲搜索接口
      请求地址:https://autumnfish.cn/search
      请求方法：get
      请求参数: keywords(查询关键字)
      响应内容:歌曲搜索结果
*/ 
/*
  2.歌曲url获取
       请求地址：https://autumnfish.cn/song/url
       请求方法:get
       请求参数:id(歌曲id)
       响应内容:歌曲的url地址
 
*/
/*
  3.歌曲详情获取
       请求地址：https://autumnfish.cn/song/detail
       请求方法:get
       请求参数:ids(歌曲id)
       响应内容:歌曲详情,包含封面信息
 
*/
/*
  4.歌曲详情获取
       请求地址：https://autumnfish.cn/comment/hot?type=0
       请求方法:get
       请求参数:id(歌曲id，type固定为0)
       响应内容:歌曲的热门评论
 
*/
/*
   5.mv地址获取
       请求地址：https://autumnfish.cn/mv/url
       请求方法:get
       请求参数:id(mvid，为0说明没有mv)
       响应内容:mv的地址
*/ 
var app = new Vue({
    el:"#player",
    data:{
        query:"",
        musicList:[],
        musicUrl:"",
        musicPic:"",
        content:[],
        isPlaying:false,
        isShow:false,//遮罩层的显示状态
        mvUrl:""
    },
    methods:{
        searchMusic:function(){
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords="+this.query)
            .then(
                function(response){
                    that.musicList = response.data.result.songs
                    console.log(response.data.result.songs)
                },
                function(err){}
            )
        },
        playMusic:function(musicId){
            var musicPlay = this;
            axios.get("https://autumnfish.cn/song/url?id="+musicId)
            .then(
                function(response){
                    musicPlay.musicUrl = response.data.data[0].url;
                },
                function(err){})
           //歌曲详情
            axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
            .then(
                function(response){
                    // console.log(response)
                    musicPlay.musicPic = response.data.songs[0].al.picUrl;
                },
                function(err){}
            )
            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId)
            .then(
                function(response){
                    console.log(response)
                    musicPlay.content = response.data.hotComments;
                },
                function(err){}
            )
        },
        play:function(){
            this.isPlaying = true;
        },
        pause:function(){
            this.isPlaying = false;
        },
        playMv:function(mvid){
            var mv = this;
            axios.get("https://autumnfish.cn/mv/url?id="+mvid)
            .then(
                function(response){
                   mv.mvUrl = response.data.data.url;
                   mv.isShow = true;
                },
                function(err){})
        },
        hidden:function(){
           this.isShow = false;
           this.mvUrl="";
        }
    }
})