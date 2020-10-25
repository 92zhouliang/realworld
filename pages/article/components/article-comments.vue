<template>
  <div>
      <form class="card comment-form">
          <div class="card-block">
            <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
          </div>
          <div class="card-footer">
            <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
            <button class="btn btn-sm btn-primary">
             Post Comment
            </button>
          </div>
        </form>
        
        <div class="card" v-for="comment in comments" :key="comment.id">
          <div class="card-block">
            <p class="card-text">{{comment.body}}</p>
          </div>
          <div class="card-footer">
            <nuxt-link 
                class="comment-author"
                :to="{
                    name:'profile',
                    query:{
                        username:comment.author.username
                    }
                }"
            >
              <img :src="comment.author.image" class="comment-author-img" />
            </nuxt-link>
            &nbsp;
            <nuxt-link 
                class="comment-author"
                :to="{
                    name:'profile',
                    query:{
                        username:comment.author.username
                    }
                }"
            >
              {{comment.author.username}}
            </nuxt-link>
            <span class="date-posted">{{ comment.author.createdAt | date('MMM DD, YYYY') }}</span>
          </div>
        </div>

  </div>
</template>

<script>
import { getComments } from "@/api/article";
export default {
    props:{
        article:{
            type:Object,
            required:true
        }
    },
    name:'ArticleComments',
    data(){
        return {
            comments:[]
        }
    },
    async mounted(){//直接客户端渲染
        const {data:{comments}} = await getComments(this.article.slug);
        this.comments=comments;
    }
}
</script>

<style>

</style>