<template>
  <div class="login-box">

    <div class="login-logo">
      <img src="../assets/design/icon_main_logo.png" width="75%" alt="CONTROL">
    </div>

    <div class="login-box-body">
      <p class="login-box-msg">Жүйеге кіру</p>

      <form @submit="login">
        <div class="form-group has-feedback">
          <input type="text" class="form-control" placeholder="Email" v-model="loginData.email">
          <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input type="password" class="form-control" placeholder="Құпия сөз" v-model="loginData.password">
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <button type="submit" class="btn btn-primary btn-block btn-flat">Кіру</button>
      </form>
    </div>
  </div>
</template>

<script>
  import base64js from 'base64-js'
  import TextDecoderLite from 'text-encoder-lite'

  export default {
    data () {
      return {
        loginData: {
          email: '',
          password: '',
        }
      }
    },
    methods: {
      login (event) {
        event.preventDefault()
        this.$api('post', 'auth/login', this.loginData).then(response => {
          this.$login(response.data.token)
          this.$router.push({name: 'index'})
        }).catch(e => {
          this.notify('Пошта немесе құпия сөз дұрыс емес', 'danger')
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .login-box { width: auto; max-width: 420px; }
  .login-box-body { padding: 50px 50px 70px; }
</style>