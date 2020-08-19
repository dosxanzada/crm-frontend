<template>
  <Modal :isOpen="model" :type="['lg', 'read-only']">

    <h3 slot="header" class="modal-title">Қызметкер картасы</h3>

    <div slot="content" class="row">
      <div class="col-md-6">
        <div class="form-group text-center">
          <img v-if="!model.avatar" class="avatar" src="./../../assets/design/avatar.jpg">
          <img v-else class="avatar" :src="avatar">
          <h2>{{model.fullname}}</h2>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label>Лауазымы</label>
          <span class="form-control">{{model.position}}</span>
        </div>
        <div class="form-group">
          <label>Бөлімі</label>
          <span class="form-control">{{model.department}}</span>
        </div>
        <div class="form-group">
          <label>Email</label>
          <a :href="'mailto:'+model.email" class="form-control">{{model.email}}</a>
        </div>
        <div v-if="model.phone" class="form-group">
          <label>Телефоны</label>
          <a :href="'tel:+'+parseInt(model.phone.replace(/\D+/g,''))" class="form-control">{{model.phone}}</a>
        </div>
      </div>
    </div>

    <div slot="footer">
      <button type="button" class="btn btn-default" data-dismiss="modal" @click="close"><i class="fa fa-times"></i>&nbsp;&nbsp;Жабу</button>
    </div>

  </Modal>
</template>

<script>
  import Modal from '@/Modal'

  export default {
    components: {
      Modal,
    },
    computed: {
      avatar () {
        return this.model && this.model.avatar ? this.$config('app.fileUrl') + this.model.avatar : ''
      },
    },
    props: ['model', 'departments', 'onClose'],
    methods: {
      close () {
        this.$emit('onClose')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .avatar { height: 300px; max-width: 300px; }
  a.form-control { color: #337ab7; }
</style>