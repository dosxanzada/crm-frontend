<template>
  <div>
    <Modal :isOpen="model" :type="['lg']">
      <div slot="header" style="text-align: right"> 
        <span style="cursor: pointer;" @click="close"><i class="fa fa-times"></i></span>
      </div>
      <div v-if="model" slot="content" id="memo" class="news">
        <div class="news-title">
          <h3>{{model.title}}</h3>
          <img class="news-image" :src="$config('app.fileUrl') + model.images[0]">
        </div>
        <p class="news-body">
          {{model.fullBody}}
        </p>
        <p class="news-date">{{$dateFormat(model.createdAt, 'd mmm yyyy')}}</p>
      </div>

      <div slot="footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" @click="close"><i class="fa fa-times"></i>&nbsp;&nbsp;Жабу</button>
      </div>
    </Modal>

  </div>
</template>

<script>
  import Modal from '@/Modal'

  export default {
    components: {
      Modal,
    },
    props: ['model'],
    methods: {
      close () {
        this.$emit('onClose')
      },
    }
  }
</script>

<style lang="scss" scoped>
  .news-title {
    text-align: center;

    & h3 {
      margin-top: 0;
    }

    & .news-image {
      width: 480px;
    }
  }

  .news-body {
    margin-top: 16px;
    line-height: 1.7;
  }

  .news-date {
    color: #aaa;
  }
</style>
