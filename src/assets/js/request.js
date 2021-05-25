import request from './http'
/**
 * 集合所有请求
 */
const httpAxios = {
    // 下载单笔证明
    async downSingleProof(paramsOst){
        const res = await request({
            url: '/oms/v1/settle/singleSettle',
            params:paramsOst,
            responseType: 'blob'
        });
        return res;
    },
    // 批量数据下载单笔证明
    async downMutiFile(paramsOst){
        const res = await request({
            url: '/oms/v1/settle/batchSettle',
            method:"post",
            data:{
                batchNo:paramsOst.batchNo,
                type:paramsOst.type
            },
            responseType: 'blob'            //注意！下载pdf必须要加这句   辨别后台返回的类型
        });
        return res;
    },

}
export default httpAxios;
