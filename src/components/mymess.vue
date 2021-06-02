<template>

	<div class="form">
		<div class="usercenter">
			<div class="user-style">
				<div class="userimg-style"><img v-bind:src="photoUrl"/></div>
				<el-upload :action="uploadImgUrl" :on-success="uploadSuccess" :show-file-list="false" :max-size="5 * 1024 * 1024"
						  max-count="1">
					<i class="el-icon-upload2"></i>
				</el-upload>
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
				uploadImgUrl: '/user/uploadImg?userId=',
                nickName: '',
                userName:'',
                photoUrl: '',
                sex:'',
                mobile:'',
                email:'',
                age:'',
                imgUrl:''
			}
		},

		mounted: function (){
            if (this.toLoginPage()) {
                return
            }
            let userId = localStorage.getItem("loginId");
            this.uploadImgUrl = this.uploadImgUrl + userId;
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
			},

            uploadSuccess: function (e) {
			    let code = e.code;
			    if("0000" === code){
			        this.photoUrl = e.data.imgUrl;
				}
				this.$message(e.msg);
			}
		}
	}
</script>

<style>

@import '../../static/css/mymess.css';

</style>
