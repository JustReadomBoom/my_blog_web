<template>
    <div class="bloglist">
        <article class="list">
            <ul>
                <li v-for="blogitem in bloglist">
                    <div class="usermess">
                        <div>
                            <router-link :to="{}">
                                <img :src="'../../static/images/' + user.icon"/>
                            </router-link>
                        </div>
                        <div>
                            <div><a href="#">{{user.name}}</a></div>
                            <div style="color:#ccc">{{blogitem.date}}</div>
                        </div>
                    </div>
                    <router-link :to="{path: '/blog/' + blogitem._id}">
                        <div class="blog-title">
                            {{blogitem.title}}
                        </div>
                        <div class="blog-content">{{blogitem.content}}</div>
                    </router-link>
                    <div class="footer">
                        <div class="tag">{{blogitem.tag}}</div>
                        <div><i class="fa fa-eye" aria-hidden="true"></i>{{blogitem.look_num}}</div>
                        <div><i class="fa fa-heart" aria-hidden="true"></i>{{blogitem.like_num}}</div>
                        <div><i class="fa fa-comment" aria-hidden="true"></i>{{blogitem.review_num}}</div>
                    </div>
                    <hr/>
                </li>
            </ul>
        </article>

    </div>
</template>

<script>
    export default {
        name: 'myblog',
        data() {
            return {
                url: '/myblog/',
                bloglist: [],
                user: {},
            }
        },

        mounted: function () {
            this.url = this.url + this.$route.params.id;
            console.log(this.url);
            this.$http.get(this.url, {
                withCredentials: true
            }).then(resp => {
                let code = resp.data.code;
                if(code === "0000"){
                    let respData = resp.data.data;
                }


                this.bloglist = resp.data.bloglist.reverse();
                this.user = resp.data.user;
                this.$store.state.totalmess = resp.body.totalmess;
                this.$store.state.title = '我的文章';
            }).catch(error => {
                console.log(error);
            });
        },

        //用过滤器对图片链接进行拼接
        filters: {
            imgFormat: function (value, tag) {
                return '../assets/images/' + value;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    @import '../../static/css/myblog.css';

</style>
