import {request} from "@/plugins/request";

//获取文章列表
export const getArticles =(params)=>{
    return request({
        url:'/api/articles',
        method:'GET',
        params
    })
}
//获取关注的用户文章列表
export const getFeedArticles =(params)=>{
    return request({
        url:'/api/articles/feed',
        method:'GET',
        headers:{
            Authorization:`Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTIxMDQ4LCJ1c2VybmFtZSI6InF3emFzc2QiLCJleHAiOjE2MDg3MTE0NzJ9.K6ydE8EAbARj7IPoiN1uWo91ruhqf0xxipAFg-tiVkM`
        },
        params
    })
}
//文章点赞
export const favorite =slug=>{
    return request({
        url:`/api/articles/${slug}/favorite`,
        method:'POST'
    })
}
//取消文章点赞
export const unFavorite =slug=>{
    return request({
        url:`/api/articles/${slug}/favorite`,
        method:'DELETE'
    })
}
//获取文章详情
export const getArticle =slug=>{
    return request({
        url:`/api/articles/${slug}`,
        method:'GET'
    })
}
//获取文章评论 api/articles/:slug/comments
export const getComments =slug=>{
    return request({
        url:`api/articles/${slug}/comments`,
        method:'GET'
    })
}