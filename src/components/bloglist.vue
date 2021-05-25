<template>
    <div class="bloglist">
        <article class="list">
            <ul>
                <li v-for="(blogItem, index) in blogList">
                    <div class="usermess">
                        <div>
                            <router-link :to="{}">
                                <img :src="blogItem.authImgUrl"/>
                            </router-link>
                        </div>
                        <div>
                            <div><a href="#">{{blogItem.nickName}}</a></div>
                            <div class="date">发布时间：{{blogItem.date}}</div>
                        </div>
                    </div>
                    <router-link :to="{path: '/blog/' + blogItem.blogId}">
                        <div class="blog-title">
                            {{blogItem.title}}
                        </div>
                        <div class="blog-content">{{blogItem.content}}</div>
                    </router-link>
                    <div class="tag">
                        {{blogItem.tag}}
                    </div>
                    <div class="footer">
                        <div><i class="el-icon-view"></i>{{blogItem.lookNum}}</div>
                        <div><i class="el-icon-star-off"></i>{{blogItem.likeNum}}</div>
                        <div><i class="el-icon-chat-line-square"></i>{{blogItem.reviewNum}}</div>
                    </div>
                    <hr/>
                </li>
            </ul>
        </article>

    </div>
</template>

<script>
    export default {
        name: 'blogList',
        data() {
            return {
                url: '/blog/getBlogList',
                blogList: [],
                nickName: '',
                date:'',
                blogId:'',
                title:'',
                content:'',
                tag:'',
                lookNum:'',
                likeNum:'',
                reviewNum:'',
                authId:'',
                authImgUrl:''
            }
        },

        mounted: function () {
            this.$http.get(this.url, {
                withCredentials: true
            }).then(resp => {
                let code = resp.data.code;
                if (code === "0000") {
                    let respData = resp.data.data;
                    this.blogList = respData.blogList.reverse();
                } else {
                    this.$message(resp.data.msg)
                }
            }).catch(error => {
                console.log(error);
                this.$message("系统异常");
            });
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    @import '../../static/css/bloglist.css';

</style>
