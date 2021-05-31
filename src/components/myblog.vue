<template>
    <div class="bloglist">
        <article class="list">
            <ul>
                <li v-for="blogItem in blogList">
                    <div class="usermess">
                        <div>
                            <router-link :to="{}">
                                <img :src="photoUrl"/>
                            </router-link>
                        </div>
                        <div>
                            <div><a href="#">{{userName}}</a></div>
                            <div style="color:#ccc">{{blogItem.date}}</div>
                        </div>
                    </div>
                    <router-link :to="{path: '/blog/' + blogItem.blogId}">
                        <div class="blog-title">
                            {{blogItem.title}}
                        </div>
                        <div class="blog-content">{{blogItem.content}}</div>
                    </router-link>
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
        name: 'myblog',
        data() {
            return {
                url: '/blog/getBlogByLoginId?loginId=',
                getUserUrl: '/user/getUserInfo?userId=',
                blogList: [],
                photoUrl: '',
                userName: '',
                blogId: '',
                title: '',
                content: '',
                lookNum: '',
                likeNum: '',
                reviewNum: ''
            }
        },

        mounted: function () {
            //获取博客信息
            let loginId = this.$route.params.loginId;
            this.url = this.url + loginId;
            console.log(this.url);
            this.$http.get(this.url, {
                withCredentials: true
            }).then(resp => {
                let code = resp.data.code;
                let msg = resp.data.msg;
                if (code === "0000") {
                    let respData = resp.data.data;
                    this.blogList = respData.blogList.reverse();

                } else {
                    this.$message(msg);
                }
            }).catch(error => {
                console.log(error);
                this.$message("系统异常");
            });

            //获取用户信息
            let userId = localStorage.getItem("loginId");
            this.$http.get(this.getUserUrl + userId, {
                withCredentials: true
            }).then(resp => {
                let code = resp.data.code;
                if ("0000" === code) {
                    this.userName = resp.data.data.userName;
                    this.photoUrl = resp.data.data.photoUrl;
                } else {
                    this.$message(resp.data.msg)
                }
            }).catch(error => {
                console.log(error);
                this.$message("系统异常");
            });

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    @import '../../static/css/myblog.css';

</style>
