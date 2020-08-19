<template>
  <div>
    <PageButtons v-if="$auth().hasRole('admin')">
      <button class="btn btn-success" @click="toggleModal('createUser', {})"><i class="fa fa-plus"></i>&nbsp;&nbsp;Қызметкер қосу</button>
    </PageButtons>

    <Box>
      <div v-if="!users || users.length === 0" class="empty">
        <p><i class="fa fa-exclamation-triangle"></i>&nbsp;Қызметкерлер жоқ</p>
      </div>
      <v-client-table v-else ref="table" v-bind="tableData" :data="users" :columnsDropdown="true">
        <div slot="tools" slot-scope="props">
          <div class="buttons">
            <button class="btn btn-default" @click="toggleModal('showUser', props.row)">
              <i class="fa fa fa-user"></i>&nbsp;&nbsp;Толығырақ
            </button>
            <button v-if="$auth().hasRole('admin') && checkMy(props.row, true)" class="btn btn-sm btn-default" @click="toggleModal('editUser', $_.clone(props.row))"><i class="fa fa-edit"></i></button>
            <button v-if="$auth().hasRole('admin') && checkMy(props.row)" class="btn btn-sm btn-default" @click="toggleModal('deleteUser', props.row)"><i class="fa fa-trash"></i></button>
          </div>
        </div>
        <div slot="email" slot-scope="props">
          <a :href="'mailto:'+props.row.email">{{props.row.email}}</a>
        </div>
        <div slot="phone" slot-scope="props">
          <a v-if="props.row.phone" :href="'tel:+'+parseInt(props.row.phone.replace(/\D+/g,''))">{{props.row.phone}}</a>
        </div>
      </v-client-table>
    </Box>

    <ModalCreateUser :model="modal.createUser" @onSubmit="createUser" @onClose="toggleModal('createUser')"></ModalCreateUser>
    <ModalDeleteUser :model="modal.deleteUser" @onSubmit="deleteUser" @onClose="toggleModal('deleteUser')"></ModalDeleteUser>
    <ModalEditUser :model="modal.editUser" @onSubmit="editUser" @onClose="toggleModal('editUser')"></ModalEditUser>
    <ModalShowUser :model="modal.showUser" @onClose="toggleModal('showUser')"></ModalShowUser>
  </div>
</template>

<script>
  import PageTitle from '@/PageTitle'
  import PageButtons from '@/PageButtons'
  import Box from '@/Box'
  import ModalCreateUser from './users/ModalCreateUser'
  import ModalEditUser from './users/ModalEditUser'
  import ModalShowUser from './users/ModalShowUser'
  import ModalDeleteUser from './users/ModalDeleteUser'

  export default {
    plugins: ['auth'],
    components: {
      PageTitle,
      PageButtons,
      Box,
      ModalCreateUser,
      ModalDeleteUser,
      ModalEditUser,
      ModalShowUser,
    },
    data () {
      return {
        seoTitle: this.$trans('pages.index.seoTitle'),
        users: [],
        filter: false,
        modal: {
          editUser: false,
          showUser: false,
          createUser: false,
          deleteUser: false,
        },
        tableData: {
          columns: ['fullname', 'position', 'department', 'phone', 'email', 'tools'],
          options: {
            headings: {
              admin: '',
              fullname: 'Аты-жөні',
              position: 'Лауазымы',
              department: 'Бөлім',
              phone: 'Телефоны',
              email: 'Email',
              tools: 'Қосымша ақпарат',
            },
            // orderBy: {
            //   column: '',
            //   ascending: false
            // },
            sortable: ['fullname', 'position', 'department', 'phone', 'email',],
            filterable: ['fullname', 'position', 'department', 'phone', 'email',],
            customSorting: {
              id: function (ascending) {
                return (a, b) => {
                  a = a.id * 1
                  b = b.id * 1

                  if (ascending)
                    return a >= b ? 1 : -1

                  return a <= b ? 1 : -1
                }
              }
            },
            columnsClasses: {
              admin: 'admin',
            },
          },
        },
      }
    },
    computed: {
    },
    methods: {
      toggleModal (name, model) {
        this.modal[name] = model === undefined ? !this.modal[name] : model
      },
      createUser (user) {
        if (user.birthday) user.birthday = new Date(user.birthday)
        this.$api('post', 'users', user).then(response => {
          this.loadUsers()
          this.modal.createUser = false
          this.notify(response.data.message)
        }).catch((e) => {
          this.notify('Уақытша қызметкерді қосу мүмкін емес', 'info')
          this.$log(e, 'danger')
        })
      },
      editUser (user) {
        this.$api('put', 'users/' + user._id, user).then(response => {
          this.loadUsers()
          this.modal.editUser = false
          this.notify(response.data.message)
        }).catch(e => {
          this.notify('Уақытша қызметкер мәліметін өзгерту мүмкін емес', 'info')
          this.modal.editUser = false
          this.$log(e, 'danger')
        })
      },
      deleteUser (user) {
        this.$api('delete', 'users/' + user._id).then(response => {
          this.users = this.$_.remove(this.users, u => u._id !== user._id)
          this.modal.deleteUser = false
          this.notify(response.data.message)
        }).catch(e => {
          this.notify('Уақытша қызметкерді жою мүмкін емес', 'info')
          this.modal.deleteUser = false
          this.$log(e, 'danger')
        })
      },
      loadUsers () {
        const filter = this.$route.params.param || ''
        this.$api('get', `users?my=${filter}`).then(response => {
          this.users = response.data.users.filter(user => user._id !== this.$auth().user._id && user.login !== 'admin')
        }).catch(e => {
          this.notify(e, 'danger')
        })
      },
      
      updateFilter () {
        let department = this.$route.params.param1
        if (department === undefined) {
          department = false
        }
        this.filter = department
      },
      checkMy (user, required) {
        if (required) return this.$auth().user._id === user.head
        return this.$auth().user._id === user.head && !user.admin
      }
    },

    mounted () {
      this.loadUsers()
    },
    watch: {
      '$route' (to, from) {
        this.loadUsers()
      }
    },
  }
</script>

<style lang="scss" scoped>
  .empty {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>