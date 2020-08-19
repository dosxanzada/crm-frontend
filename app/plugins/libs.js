import core from './core'
import Vue from 'vue'
import {ClientTable} from 'vue-tables-2'
import Notifications from 'vue-notification'
import VeeValidate, { Validator } from 'vee-validate'
import VeeValidateRu from 'vee-validate/dist/locale/ru'
import VueSocketio from 'vue-socket.io'

//
Vue.use(ClientTable, {
  texts:{
    count: "{count} жазбаның {from}-{to} көрсетіліп тұр|{count} жазба|Бір жазба",
    filter: "Іздеу: ",
    filterPlaceholder: "Іздеуді бастаңыз",
    limit: "Жазбалар:",
    page: "Бет:",
    noResults: "Ештеңе табылмады",
    filterBy: "Фильтр по {column}",
    loading: 'Күтіңіз...',
    defaultOption: 'Таңдау {column}',
    columns: 'Бағандар'
  },
}, false, 'bootstrap3', 'default');

//
const notify = {
  install (Vue, options) {
    Vue.mixin({
      methods: {
        notify (text, type = 'success', options = {}) {
          if (type === 'danger') type = 'error'
          this.$notify({
            ...options,
            text: text,
            type: type,
          })
        }
      }
    })
  },
}
Vue.use(Notifications)
Vue.use(notify)

//
Validator.localize('ru', VeeValidateRu);
Vue.use(VeeValidate, {
  locale: 'ru',
  dictionary: {
    ru: {attributes: {
      login: 'Логин',
      email: 'Email',
      fullname: 'Аты-жөні',
      department: 'Бөлім',
      position: 'Лауазым',
      phone: 'Телефон',
      whatsapp: 'Whatsapp',
      name: 'Аты',
      description: 'Сипаты',
      text: 'Сипаты',
      urgency: 'Маңызы',
      to: 'Жауапты',
      memoTo: 'Кімге',
      deadline: 'Тапсыру уақыты',
      currentPassword: 'Қазіргі құпия сөз',
      password: 'Құпия сөз',
      confirmPassword: 'Жаңа құпия сөз қайтадан',
      title: 'Тақырып',
      price: 'Баға',
      deadline: 'Орындау уақыты'
    }},
  }
})

Vue.use(VueSocketio, core.$config('app.soketUrl'))