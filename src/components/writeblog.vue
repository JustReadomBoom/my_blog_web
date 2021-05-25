<template>
    <div class="write-blog">
        <div class="form-group-plus">
            <input type="text" class="form-control-plus" placeholder="请输入标题" v-model="blogTitle" autofocus="true"
                   name="blogTitle">
        </div>
        <div class="form-group-plus">
            <textarea class="form-control-plus" v-model="blogContent" placeholder="请输入正文" rows="18"></textarea>
        </div>
        <div class="form-group-plus">
            <input type="text" class="form-control-plus" placeholder="请输入标签" v-model="blogTag" name="blogTag">
        </div>
        <div>
            <input type="button" value="发表" v-on:click="publish">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'writeBlog',
        data() {
            return {
                url: '/blog/submitBlog',
                blogTitle: '',
                blogContent: '',
                blogTag: ''
            }
        },
        methods: {
            publish: function () {
                let obj = {
                    blogTitle: this.blogTitle,
                    blogContent: this.blogContent,
                    blogTag: this.blogTag,
                    writerId: localStorage.getItem("loginId")
                };
                this.$http.post(this.url, obj, {
                    withCredentials: true  //打开cookie
                }).then(resp => {
                    let code = resp.data.code;
                    console.log("code = " + code)
                    if ("0000" === code) {
                        this.$router.push({path: '/list'});
                    } else {
                        this.$message(resp.data.msg);
                    }
                }).catch(error => {
                    console.log(error);
                    this.$message("系统异常");
                });
            }
        }
    }
</script>

<style scoped>

    @import '../../static/css/writeblog.css';

</style>