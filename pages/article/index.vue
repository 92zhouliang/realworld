<template>
  <div class="article-page">

  <div class="banner">
    <div class="container">
      <h1>{{article.title}}</h1>
      <article-meta :article="article" />
    </div>
  </div>

  <div class="container page">

    <div class="row article-content">
      <div class="col-md-12" v-html="article.body" />
    </div>

    <hr />

    <div class="article-actions">
      <article-meta :article="article" />
    </div>

    <div class="row">

      <div class="col-xs-12 col-md-8 offset-md-2">

        <article-comments :article="article"/>
        
      </div>

    </div>

  </div>

</div>
</template>

<script>
import MarkDown from "markdown-it";
import { getArticle } from "@/api/article";
import ArticleMeta from "./components/article-meta";
import ArticleComments from "./components/article-comments";
export default {
    name:"ArticleIndex",
    async asyncData({params}){
      const md = new MarkDown();
      const {data:{article}} = await getArticle(params.slug);
      // console.log(article,await getArticle(params.slug));
      return {
        article:{
          ...article,
          body:md.render(article.body)
        }
    }
  },
  components:{
    ArticleMeta,
    ArticleComments
  },
  head() {//利于SEO设置网页头信息
      return {
        title: `${this.article.title} ~ RealWorld`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.article.description
          }
        ]
      }
    }
}
</script>

<style>

</style>