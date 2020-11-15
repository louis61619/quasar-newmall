import axios from 'axios'

//不用default可能創建多個實例
export function request(config) {
    
        //1.創建axios實例
        const instance = axios.create({
            baseURL: 'http://152.136.185.210:8000/api/w6',
            // timeout: 10000
        })

        //2.axios的攔截器
        //2.1.請求攔截的作用
        instance.interceptors.request.use(config => {
            // console.log(config)
            //1.比如config中的信息不符和服務器的要求

            //2.比如每次發送網路請求時，都會在介面顯示一個請求的圖標

            //3.某些網路請求(比如登入(token)),必須攜帶一些特殊的信息

            return config
        },err => {
            console.log(err)
        })

        //2.2響應攔截(請求完畢後得到的結果數據)
        instance.interceptors.response.use(res =>{
            return res.data
        }, err => {
            console.log(err);
        })

        //3.發送真正的網路請求
        return instance(config)
            
}