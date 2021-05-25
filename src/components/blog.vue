<template>
    <div class="blog">
        <div class="blog-title">{{contentResp.title}}</div>
        <br>
        <div class="content">{{contentResp.content}}</div>
        <br>
        <div class="blog-date">{{contentResp.date}}</div>
        <br>
        <!--展示原文内容-->
        <div class="user-warp-plus">
            <div class="user-warp-item-plus">
                <div>
                    <div><i class="el-icon-view"></i>{{contentResp.lookNum}}</div>
                    <div v-on:click="likeIt(contentResp.blogId)" style="cursor: pointer;">
                        <i class="el-icon-star-off"></i><span id="like">{{contentResp.likeNum}}</span>
                    </div>
                    <div id="review"><i class="el-icon-chat-line-square"></i>{{contentResp.reviewNum}}</div>
                </div>
            </div>
        </div>

        <hr>

        <div class="review-container">
           <textarea class="form-control" rows="5" placeholder="写下你的评论..." v-model="mainText">
           </textarea>
            <br>
            <input type="button" name="btn-send" class="btn-submit" id="btnSend" value="提交"
                   v-on:click="submitReview(contentResp.blogId)">
        </div>

        <hr>
        <hr>

        <div class="reviewlist">
            <div class="itemit" v-for="(review, index) in reviewList">
                <div class="usermess">
                    <div class="user-name" id="review._id">
                        <a href="#">{{review.reviewerName}}</a>
                    </div>
                    <div class="date">{{review.date}}</div>
                </div>
                <div class="reviewcontent">
                    <span class="content-review">{{review.content}}</span>
                    <span class="btn-reply" v-on:click="showReplyDialog(review.reviewerName, index)">回复</span>
                </div>

                <div class="eachother" v-for="item in review.replyList">
                    <div class="date">{{item.date}}</div>
                    <a href="#">{{item.replyerName}}</a>
                    <span>@</span>
                    <a href="#">{{item.reviewerName}}</a>:
                    <span class="content-reply">{{item.content}}</span>
                </div>

                <div v-if="index === currentIndex">
                    <textarea name="reviewdialog" class="form-control" rows="3" placeholder="写下你的回复..." v-model="replyText">
                    </textarea>
                    <br>
                    <input type="button" name="btn-send" id="btn-send" class="btn-submit" value="发送" v-on:click="submitReply(review.reviewId)">
                </div>
                <hr/>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'blog',
        data() {
            return {
                url: '/blog/getBlogByBlogId?blogId=',
                upLookNumUrl: '/blog/updateNum?blogId=',
                getReviewAndReplyUrl: '/reviewAndReply/getByBlogId?blogId=',
                likeItUrl: '/blog/updateNum?blogId=',
                submitReviewUrl: '/reviewAndReply/submitReview',
                submitReplyUrl: '/reviewAndReply/submitReply',
                reviewList: [],
                replyList: [],
                contentResp: '',
                reviewerName: '',
                replyerName: '',
                currentIndex: -1,
                mainText: '',
                reviewId:'',
                replyText:''
            }
        },

        mounted: function () {
            let blogId = this.$route.params.blogId;
            let url = this.url + blogId;
            this.$http.get(url, {
                withCredentials: true  //打开cookie
            }).then(resp => {
                let code = resp.data.code;
                console.log("code = " + code)
                if (code === "0000") {
                    this.contentResp = resp.data.data;
                }
            }).catch(error => {
                console.log(error);
                this.$message("系统异常");
            });

            //更新浏览次数
            let upLookNumUrl = this.upLookNumUrl + blogId + '&type=1';
            this.$http.get(upLookNumUrl, {
                withCredentials: false
            }).then(resp => {
                let code = resp.data.code;
                console.log("update look num code = " + code)
            }).catch(error => {
                console.log(error);
                this.$message("系统异常");
            });

            //获取评论信息
            let getReviewAndReplyUrl = this.getReviewAndReplyUrl + blogId;
            this.$http.get(getReviewAndReplyUrl, {
                withCredentials: false
            }).then(resp => {
                let code = resp.data.code;
                if (code === "0000") {
                    this.reviewList = resp.data.data.reviewList.reverse();
                }
            }).catch(error => {
                console.log(error);
                this.$message("系统异常");
            });
        },

        methods: {
            //更新喜欢
            likeIt: function (blogId) {
                if(this.toLoginPage()){
                    return
                }
                let url = this.likeItUrl + blogId + '&type=2';
                this.$http.get(url, {
                    withCredentials: true  //打开cookie
                }).then(resp => {
                    let code = resp.data.code;
                    console.log("code = " + code)
                }).catch(error => {
                    console.log(error);
                    this.$message("系统异常");
                });
            },

            //提交评论
            submitReview: function (blogId) {
                if(this.toLoginPage()){
                    return
                }
                let url = this.submitReviewUrl;
                if ('' === this.mainText || null == this.mainText) {
                    this.$message("请填写评论");
                    return
                }
                let req = {
                    reviewerId: localStorage.getItem("loginId"),
                    blogId: blogId,
                    content: this.mainText
                };
                this.mainText = '';
                this.$http.post(url, req, {
                    withCredentials: true  //打开cookie
                }).then(resp => {
                    this.$message(resp.data.msg);
                }).catch(error => {
                    console.log(error);
                    this.$message("系统异常");
                });
            },

            //展示回复框
            showReplyDialog: function (name, index) {
                if (this.currentIndex !== index) {
                    this.currentIndex = index;
                    this.text = '@' + name + '：';
                } else {
                    this.currentIndex = -1;
                }
            },

            //提交回复
            submitReply: function (reviewId) {
                if(this.toLoginPage()){
                    return
                }
                let url = this.submitReplyUrl;
                if ('' === this.replyText || null == this.replyText) {
                    this.$message("请填写回复");
                    return
                }
                let req = {
                    reviewId:reviewId,
                    replyerId: localStorage.getItem("loginId"),
                    content:this.replyText
                };
                this.replyText = '';
                this.$http.post(url, req, {
                    withCredentials: true  //打开cookie
                }).then(resp => {
                    this.$message(resp.data.msg);
                }).catch(error => {
                    console.log(error);
                    this.$message("系统异常");
                });
            }
        }
    }
</script>

<style scoped>
    @import '../../static/css/blog.css';
</style>
