<template>
  <Modal :isOpen="model" @onSubmit="submit" type="lg">

    <h3 slot="header" class="modal-title">Жаңа тапсырма</h3>

    <div slot="content" class="row">

      <div class="col-lg-6">
        <div :class="['form-group', {'has-error': errors.has('title')}]">
          <label for="field-title">Тақырыбы *</label>
          <input id="field-title" class="form-control" v-validate="'required'" name="title" v-model="model.title" />
          <span v-show="errors.has('title')" class="help-block">{{ errors.first('title') }}</span>
        </div>
        <div :class="['form-group', {'has-error': errors.has('text')}]">
          <label for="field-text">Сипаттамасы *</label>
          <textarea id="field-text" class="form-control" rows="4" v-validate="'required'" name="text" v-model="model.text"></textarea>
          <span v-show="errors.has('text')" class="help-block">{{ errors.first('text') }}</span>
        </div>
        <div :class="['form-group', {'has-error': errors.has('price')}]">
          <label for="field-price">Бағасы *</label>
          <input type="number" id="field-price" class="form-control" v-validate="'required'" name="price" v-model="model.price" />
          <span v-show="errors.has('price')" class="help-block">{{ errors.first('price') }}</span>
        </div>
      </div>
      <div class="col-lg-6">
        <div :class="['form-group', {'has-error': errors.has('to')}]">
          <label for="field-to">Жауапты *</label>
          <Multiselect
            id="field-to"
            name="to"
            v-validate="'required'"
            v-model="selectedUser"
            :options="usersForSelect"
            track-by="name"
            label="name">
          </Multiselect>
          <span v-show="errors.has('to')" class="help-block">{{ errors.first('to') }}</span>
        </div>
        <div :class="['form-group', {'has-error': errors.has('deadline')}]">
          <label>Орындау уақыты *</label>
          <Datepicker
            input-class="form-control"
            language="ru"
            :monday-first="true"
            :disabled="datepickerState.disabled"
            :highlighted="datepickerState.highlighted"
            name="deadline"
            v-validate="'required'"
            v-model="model.deadline"></Datepicker>
          <span v-show="errors.has('deadline')" class="help-block">{{ errors.first('deadline') }}</span>
        </div>
        <div :class="['form-group', {'has-error': errors.has('comment')}]">
          <label for="field-comment">Түсініктеме</label>
          <textarea id="field-comment" class="form-control" rows="4" name="text" v-model="model.comment"></textarea>
          <span v-show="errors.has('comment')" class="help-block">{{ errors.first('comment') }}</span>
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
  import Datepicker from 'vuejs-datepicker'
  import Multiselect from 'vue-multiselect'

  export default {
    components: {
      Modal,
      Datepicker,
      Multiselect,
    },
    data () {
      return {
        datepickerState: {
          disabled: {
            to: new Date((new Date()).setDate((new Date()).getDate() - 1))
          },
          highlighted: {
            dates: [ new Date() ]
          }
        }
      }
    },
    props: ['model', 'users', 'onSubmit', 'onClose'],
    computed: {
      usersForSelect () {
        return this.$_.map(this.$props.users, u => {
          return {name: u.fullname, _id: u._id}
        })
      },
      selectedUser: {
        get: function () {
          return {name: this.getUser(this.$props.model.to).fullname, _id: this.$props.model.to}
        },
        set: function (newValue) {
          this.errors.items = this.$_.reject(this.errors.items, e => e.field === 'to')
          this.$props.model.to = newValue ? newValue._id : ''
        }
      }
    },
    methods: {
      close () {
        this.$emit('onClose')
      },
      getUser (_id) {
        let user = this.$_.find(this.$props.users, u => u._id === _id)
        return user ? user : {}
      },
      submit () {
        if (!this.model.to) {
          this.errors.items.push({
            id: '100',
            field: 'to',
            scope: null,
            msg: 'Кімге толтыру міндетті',
          })
        }
        this.$validator.validateAll().then(() => {
          if (!this.$_.size(this.errors.items)) {
            this.$emit('onSubmit', this.model)
          }
        }).catch(() => {})
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>