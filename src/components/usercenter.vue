<template>
    <div>
        <div class="usercenter">
            <router-link :to="{path: '/mymess/'}">
                <div class="user">
                    <div class="userimg"><img v-bind:src="photoUrl"/></div>
                    <div class="username">
                        <span class="userLeft">账号:{{userName}}</span>
                        <span class="userRight">性别:{{sex}}</span>

                    </div>
                    <br/>
                    <div class="username">
                        <span class="userLeft">手机号:{{mobile}}</span>
                        <span class="userRight">年龄:{{age}}</span>
                    </div>
                    <br/>
                    <div class="username">
                        <span class="userLeft">邮箱:{{email}}</span>
                    </div>

                </div>
            </router-link>

            <!--<router-link :to="{path: '/messlist/'}">-->
            <!--<div class="myblog-plus mymess-plus">-->
            <!--<i class="fa fa-commenting" aria-hidden="true"></i>-->
            <!--&nbsp;&nbsp;&nbsp;我的消息-->
            <!--<span v-if=" this.$store.state.totalmess > 0 ">-->
            <!--+{{this.$store.state.totalmess}}-->
            <!--</span>-->
            <!--</div>-->
            <!--</router-link>-->
            <!--<router-link :to="{path: '/'}">-->
            <!--<div class="myblog-plus mymess-plus">-->
            <!--<i class="fa fa-sign-out" aria-hidden="true"></i>-->
            <!--&nbsp;&nbsp;&nbsp;退出登录-->
            <!--</div>-->
            <!--</router-link>-->

            <div class="myblog-plus mymess-plus" v-on:click="myBlog()">
                <i class="fa fa-sign-out"></i>我的文章
            </div>

            <div class="myblog-plus mymess-plus" v-on:click="changeUser()">
                <i class="fa fa-sign-out"></i>修改个人信息
            </div>

            <div class="myblog-plus mymess-plus" v-on:click="doLogout()">
                <i class="fa fa-sign-out"></i>退出登录
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'usercenter',
        data() {
            return {
                url: '/user/getUserInfo?userId=',
                userName: '',
                age: '',
                sex: '',
                mobile: '',
                email: '',
                photoUrl: ''
            }
        },

        mounted: function () {
            if (this.toLoginPage()) {
                return
            }
            let userId = localStorage.getItem("loginId");
            this.$http.get(this.url + userId, {
                withCredentials: true
            }).then(resp => {
                let code = resp.data.code;
                if ("0000" === code) {
                    this.userName = resp.data.data.userName;
                    this.age = resp.data.data.age;
                    this.sex = resp.data.data.sex === 1 ? "男" : "女";
                    this.mobile = resp.data.data.mobile;
                    this.email = resp.data.data.email;
                    this.photoUrl = resp.data.data.photoUrl;
                } else {
                    this.$message(resp.data.msg)
                }
            }).catch(error => {
                console.log(error);
                this.$message("系统异常");
            });
        },

        methods: {
            doLogout: function () {
                if (this.toLoginPage()) {
                    return
                }
                localStorage.removeItem("loginId");
                this.$router.push({path: "/"})
            },

            changeUser: function () {
                this.$router.push({path: "/mymess"})
            },

            myBlog: function () {
                this.$router.push({path: "/myblog/" + localStorage.getItem("loginId")})
            }
        }
    }
</script>

<style scoped>

    @import '../../static/css/usercenter.css';

</style>
