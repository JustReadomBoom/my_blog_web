<template>

	<div class="form">
		<div class="usercenter">
			<div class="user-style">
				<div class="userimg-style"><img v-bind:src="photoUrl"/></div>
				<div class="username-plus"><span>{{userName}}</span></div>
			</div>
		</div>
		<div class="input-control" style="margin-top:80px">
      		<input type="text" name="nickName" v-model="nickName" placeholder="昵称" />
    	</div>

		<select v-model="sex" class="selectSex" name="sex">
			<option selected disabled style="display: none" value="">请选择性别</option>
			<option value="1">男</option>
			<option value="2">女</option>
		</select>

		<div class="input-control">
			<input type="text" name="age" v-model="age" placeholder="年龄" />
		</div>
    	<div class="input-control">
      		<input type="text" name="mobile" v-model="mobile" placeholder="电话" />
    	</div>
    	<div class="input-control">
      		<input type="text" name="email" v-model="email" placeholder="邮箱" />
    	</div>
    	<div class="button-control">
      	<input type="button" name="submit" value="提交" v-on:click="submit"/>
    </div>
	</div>

</template>

<script>
	export default {
		name: 'usercenter',
		data () {
			return {
				url: '/user/getUserInfo?userId=',
				updateUserUrl: '/user/updateUser',
                nickName: '',
                userName:'',
                photoUrl: '',
                sex:'',
                mobile:'',
                email:'',
                age:''
			}
		},

		mounted: function (){
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
			submit: function (){
				let obj = {
				    userId: localStorage.getItem("loginId"),
                    nickName: this.nickName,
                    sex: this.sex,
					age: this.age,
                    mobile: this.mobile,
                    email: this.email
				};
				this.$http.post(this.updateUserUrl, obj, {
					withCredentials: true
				}).then( resp => {
				    let code = resp.data.code;
                    this.$message(resp.data.msg)
				    if("0000" === code){
						this.$router.push({path:"/usercenter"})
					}
				}).catch( error => {
					console.log(error);
                    this.$message("系统异常");
				});
			}
		}
	}
</script>

<style>

@import '../../static/css/mymess.css';

</style>
