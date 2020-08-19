<template>
  <div>
    <div v-for="item in news" :key="item._id">
      <div class="panel panel-body" @click="toggleModal('show', item)">
        <ul class="media-list">
          <li class="media stack-media-on-mobile">
            <div class="media-left">
              <div class="thumb">
                <img :src="$config('app.fileUrl') + item.images[0]" class="img-responsive img-rounded media-preview left-image" alt="Image placeholder">
                <span class="zoom-image"><i class="icon-play3"></i></span>
              </div>
            </div>

            <div class="media-body" style="width: auto;">
              <h3 class="media-heading"><p>{{item.title}}</p></h3>
              <p>{{item.body}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <ModalShow :model="modal.show" @onClose="toggleModal('show')"></ModalShow>

  </div>
</template>
<script>
  import ModalShow from './news/ModalShow'
  export default {
    components: {
      ModalShow
    },
    data () {
      return {
        news: [],
        modal: {
          show: false
        }
      }
    },
    computed: {},
    beforeMount () {
      this.$api('get', 'news').then(response => {
        this.news = response.data.news
      }).catch(err => {
        console.log(err.response)
      })
    },
    methods: {
      toggleModal (name, model, tab) {
        this.modal[name] = model === undefined ? !this.modal[name] : model
        this.modal.tab = tab ? tab : 0
      }
    }
  }
</script>

<style scoped>
  .media-left {
    min-width: 200px;
  }
  .panel-body {
    cursor: pointer;
  }
  .left-image { width: 200px; }
</style>