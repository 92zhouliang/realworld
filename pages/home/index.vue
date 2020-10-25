<template>
  <div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item" v-if="user">
              <nuxt-link 
                class="nav-link" 
                :class="{
                  active:tab==='your_feed'
                }"
                exact
                :to="{
                  name:'home',
                  query:{
                    tab:'your_feed'
                  }
                }"
              >Your Feed</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link 
                class="nav-link" 
                :class="{
                  active:tab==='global_feed'
                }"
                exact
                :to="{
                  name:'home',
                  query:{
                    tab:'global_feed'
                  }
                }"
              >Global Feed</nuxt-link>
            </li>
            <li class="nav-item" v-if="tag">
              <nuxt-link 
                class="nav-link" 
                :class="{
                  active:tab==='tab'
                }"
                exact
                :to="{
                  name:'home',
                  query:{
                    tab:'tab',
                    tag
                  }
                }"
              >#{{tag}}</nuxt-link>
            </li>
          </ul>
        </div>

        <div 
        class="article-preview" 
        v-for="article in articles"
        :key="article.slug"
        >
          <div class="article-meta">
            <nuxt-link 
            :to="{
              name: 'profile',
              params:{
                username:article.author.username
              }}"><img :src="article.author.image" /></nuxt-link>
            <div class="info">
              <a href="" class="author">Eric Simons</a>
              <nuxt-link 
            :to="{
              name: 'profile',
              params:{
                username:article.author.username
              }}">
              {{article.author.username}}
              </nuxt-link>
              <span class="date">{{ article.createdAt | date}}</span>
            </div>
            <button 
              class="btn btn-outline-primary btn-sm pull-xs-right"  
              :class="{
                active:articles.favorited
              }"
              @click="onFavorite(article)"
              :disabled="article.favoriteDisabled"
            >
              <i class="ion-heart"></i> {{article.favoritesCount}}
            </button>
          </div>
          <nuxt-link 
            :to="{
              name:'article',
              params:{
                slug:article.slug
              }
            }"
           class="preview-link">
            <h1>{{ article.title}}</h1>
            <p>{{ article.description }}</p>
            <span>Read more...</span>
          </nuxt-link>
        </div>
        <nav>
          <ul class="pagination">
            <li class="page-item"
            :class="{
              active:item===page
            }"
            v-for="item in totalPage"
            :key="item"
            >
              <nuxt-link 
              class="page-link" 
              :to="{
                name:'home',
                query:{
                  page:item,
                  tag:$route.query.tag,
                  tab
                }
              }"
              >{{item}}</nuxt-link>
            </li>

          </ul>
        </nav>

      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>
          <div class="tag-list">
            <nuxt-link  
              class="tag-pill tag-default" 
              v-for="item in tags" :key="item"
              :to="{
                name:'home',
                query:{
                  tag:item,
                  tab:'tab'
                }
              }"
            >
              {{item}}
            </nuxt-link>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import { 
  getArticles,
  getFeedArticles,
  favorite,
  unFavorite
   } from "@/api/article";
import { getTags } from "@/api/tags";
import { mapState } from "vuex";
export default {
  name:"homeIndex",
  watchQuery:['page','tag','tab'],
  async asyncData({query,store}){
    const page = Number.parseInt(query.page||1);
    const limit = 20 ;
    const offset=(page-1)*limit;
    const tag = query.tag;
    const tab = query.tab || 'global_feed';
    const laodArticles=store.state.user && tab==='your_feed'?getFeedArticles:getArticles;

    const [{data:{articles,articlesCount}},{data:{tags}}] = await Promise.all([
            laodArticles({
                page,
                limit,
                tag
              }),
            getTags()
    ])
    return {
      articles:articles.map(item=>{return {...item,favoriteDisabled:false}}),
      articlesCount,
      tags:tags,
      limit,
      page,
      tag,
      tab
    }
      },
      computed:{
        totalPage(){
          return  Math.ceil(this.articlesCount/this.limit);
        },
        ...mapState(['user'])
      },
      methods:{
       async onFavorite(article){//文章点赞/取消点赞
          article.favoriteDisabled=true;
          if(article.favorited){
            await unFavorite(article.slug);
            article.favorited=false;
            article.favoritesCount += -1;
          }else{
            await favorite(article.slug);
            article.favorited=true;
            article.favoritesCount += 1;
          }
          article.favoriteDisabled=false;
        }
      }
  }
</script>

<style>

</style>