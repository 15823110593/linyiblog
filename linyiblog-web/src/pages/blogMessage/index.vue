<template>
  <div class="comment-container">
    <Comment></Comment>
  </div>
</template>

<script>
  import Comment from '@/components/comment'
  
  export default {
      components: {
        Comment
      }
    }
</script>

<style scoped>
 .comment-container{
   width: 80%;
 }
</style>
