<template>
  <Modal :isOpen="model" type="lg" @onSubmit="submit">

    <h3 slot="header" class="modal-title">Қызметкер қосу</h3>

    <div slot="content" class="row">
      <div class="col-lg-6">
        <div :class="['form-group', {'has-error': errors.has('fullname')}]">
          <label for="field-fullname">Аты-жөні *</label>
          <input id="field-fullname" class="form-control" v-validate="'required'" name="fullname" v-model="model.fullname">
          <span v-show="errors.has('fullname')" class="help-block">{{ errors.first('fullname') }}</span>
        </div>
        <div :class="['form-group', {'has-error': errors.has('email')}]">
          <label for="field-email">Email *</label>
          <input id="field-email" class="form-control" v-validate="'required|email'" name="email" v-model="model.email">
          <span v-show="errors.has('email')" class="help-block">{{ errors.first('email') }}</span>
        </div>
        <div :class="['form-group', {'has-error': errors.has('password')}]">
          <label for="field-password">Құпия сөз *</label>
          <input id="field-password" class="form-control" v-validate="'required'" name="password" type="password" v-model="model.password">
          <span v-show="errors.has('password')" class="help-block">{{ errors.first('password') }}</span>
        </div>
        <div :class="['form-group', {'has-error': errors.has('admin')}]">
          <label for="field-admin">Админ</label>
          <el-switch id="field-admin" name="admin" v-model="model.admin"></el-switch>
          <span v-show="errors.has('admin')" class="help-block">{{ errors.first('admin') }}</span>
        </div>
      </div>
      <div class="col-lg-6">
        <div :class="['form-group', {'has-error': errors.has('department')}]">
          <label for="field-department">Бөлім *</label>
          <input id="field-department" class="form-control" v-validate="'required'" name="department" v-model="model.department">
          <span v-show="errors.has('department')" class="help-block">{{ errors.first('department') }}</span>
        </div>
        <div :class="['form-group', {'has-error': errors.has('position')}]">
          <label for="field-position">Лауазым *</label>
          <input id="field-position" class="form-control" v-validate="'required'" name="position" v-model="model.position">
          <span v-show="errors.has('position')" class="help-block">{{ errors.first('position') }}</span>
        </div>
        <div :class="['form-group', {'has-error': errors.has('phone')}]">
          <label for="field-phone">Телефон *</label>
          <masked-input id="field-phone" class="form-control" mask="\+1 (111) 111-11-11" name="phone" v-validate="'required'" v-model="model.phone"></masked-input>
          <span v-show="errors.has('phone')" class="help-block">{{ errors.first('phone') }}</span>
        </div>
        <div :class="['form-group', {'has-error': errors.has('birthday')}]">
          <label for="field-birthday">Туған күні</label>
          <input type="date" id="field-birthday" class="form-control" name="birthday" v-model="model.birthday">
          <span v-show="errors.has('birthday')" class="help-block">{{ errors.first('birthday') }}</span>
        </div>
      </div>
    </div>

    <div slot="footer">
      <button type="button" class="btn btn-default" data-dismiss="modal" @click="close"><i class="fa fa-times"></i>&nbsp;&nbsp;Бас тарту</button>
      <button type="submit" class="btn btn-success"><i class="fa fa-check"></i>&nbsp;&nbsp;Қосу</button>
    </div>

  </Modal>
</template>

<script>
  import Modal from '@/Modal'
  import MaskedInput from 'vue-masked-input'
  import { Switch } from 'element-ui'

  export default {
    components: {
      Modal,
      MaskedInput,
      'el-switch': Switch
    },
    props: ['model', 'users', 'departments', 'onSubmit', 'onClose'],
    methods: {
      close () {
        this.$emit('onClose')
      },
      submit () {
        this.$validator.validateAll().then(() => {
          if (this.$_.find(this.$props.users, u => u.login === this.$props.model.login)) {
            this.errors.items.push({
              field: 'login',
              scope: null,
              msg: '',
            })
          } else if (!this.errors.has('login')) {
            this.errors.items = this.$_.reject(this.errors.items, e => e.field === 'login')
          }
          if (this.$_.find(this.$props.users, u => u.email === this.$props.model.email)) {
            this.errors.items.push({
              field: 'email',
              scope: null,
              msg: 'Бұндай поштамен қызметкер тіркелген',
            })
          } else if (!this.errors.has('login')) {
            this.errors.items = this.$_.reject(this.errors.items, e => e.field === 'email')
          }
          if (!this.$_.size(this.errors.items)) {
            this.$emit('onSubmit', this.model)
          }
        }).catch(() => {
          console.log('asdasd')
        })
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>