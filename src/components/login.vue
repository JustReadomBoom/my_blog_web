<template>
    <div class="login">
        <h1>登录</h1>
        <div class="input-control">
            <input type="text" name="userName" v-model="userName" placeholder="用户名"/>
        </div>
        <div class="input-control">
            <input type="password" name="pwd" v-model="pwd" placeholder="密码"/>
        </div>
        <div class="button-control">
            <input type="button" name="submit" value="登录" v-on:click="submit"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                userName: '',
                pwd: '',
                url: '/user/login',
                loginId: ''
            }
        },
        methods: {
            submit: function () {
                this.$http.post(this.url,
                    {
                        userName: this.userName,
                        pwd: this.pwd
                    },
                    {
                        withCredentials: true
                    }).then(resp => {
                    let code = resp.data.code;
                    if (code === '0000') {
                        let loginId = resp.data.data.loginId;
                        localStorage.setItem("loginId", loginId);
                        this.$router.push({path: '/list'});
                    } else {
                        this.$message(resp.data.msg)
                    }
                }).catch(error => {
                    console.log(error);
                    this.$message(error)
                });
            }
        }
    }
</script>

<style scoped>
    @import '../../static/css/login.css';
</style>
