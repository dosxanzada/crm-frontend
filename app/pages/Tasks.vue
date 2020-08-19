<template>
  <div>
    <PageButtons>
      <button class="btn btn-success" @click="toggleModal('create', {})"><i class="fa fa-plus"></i>&nbsp;&nbsp;Жаңа тапсырма</button>
    </PageButtons>
    
    <Box v-if="!tasks || tasks.length === 0">
      <div class="empty">
        <p><i class="fa fa-exclamation-triangle"></i>&nbsp;Тапсырмалар жоқ</p>
      </div>
    </Box> 
    <div v-else>
      <div v-for="task in tasks" :key="task._id" class="panel border-left-lg border-left-danger">
        <div class="panel-body">
          <div class="row">
            <div class="col-md-8">
              <h3 class="no-margin-top">{{task.title}}</h3>
              <p>{{task.text}}</p>
              <p>Жауапты: <strong>{{ task.to && task.to.fullname }}</strong></p>
              <blockquote class="mb-15">
                <p><i>Бағасы:</i> {{task.price}}</p>
                <p><i>Түсініктеме:</i> {{ task.comment }}</p>
              </blockquote>
              <button class="btn btn-primary" v-if="task.to && task.to._id === $auth().user._id && !task.complete.status" @click="confirmTask(task._id)">Тапсырманы мақұлдау</button>
            </div>
          </div>
        </div>

        <div class="panel-footer panel-footer-condensed">
          <div class="heading-elements">
            <span class="heading-text">Орындалу уақыты: <span class="text-semibold">{{ $dateFormat(task.deadline, 'd mmm yyyy') }}</span></span>
            <div class="pull-right">
              <span v-if="task.complete.status">Орындалды: {{ $dateFormat(task.complete.date, 'd mmm yyyy HH:mm') }}</span>
              <span v-else>Жұмыс барысында</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ModalCreate :model="modal.create" :users="users" @onSubmit="createTask" @onClose="toggleModal('create')"></ModalCreate>
    <ModalEdit :model="modal.edit" :users="users" @onSubmit="editTask" @onClose="toggleModal('edit')"></ModalEdit>
    <ModalDelete :model="modal.deleted" @onSubmit="deleteTask" @onClose="toggleModal('deleted')"></ModalDelete>
  </div>
</template>

<script>
  import PageButtons from '@/PageButtons'
  import Box from '@/Box'
  import ModalCreate from './tasks/ModalCreateTask'
  import ModalEdit from './tasks/ModalEditTask'
  import ModalDelete from './tasks/ModalDeleteTask'

  export default {
    components: {
      PageButtons,
      Box,
      ModalCreate,
      ModalEdit,
      ModalDelete,
    },
    data () {
      return {
        tasks: [],
        users: [],
        modal: {
          create: false,
          edit: false,
          deleted: false,
          // end: false,
          show: false,
        },
      }
    },
    computed: {},
    methods: {
      toggleModal (name, model, tab) {
        this.modal[name] = model === undefined ? !this.modal[name] : model
        this.modal.tab = tab ? tab : 0
      },
      createTask (task) {
        this.$api('post', 'tasks', task).then(response => {
          this.modal.create = false
          this.loadTasks()
          this.notify(response.data.message)
        }).catch(e => {
          this.notify(e.response.data.message, 'danger')
          this.$log(e, 'danger')
        })
      },
      editTask (task) {
        task.files = this.$_.reduce(task.files, (result, f) => {
          if (f.file) {
            result.push(f.file)
          }
          return result
        }, [])
        let data = this.$createFormData(task)
        this.$api('put', 'tasks/' + task._id, data).then(response => {
          this.modal.edit = false
          this.loadTasks()
          this.notify(response.data.message)
        }).catch(e => {
          this.notify('Уақытша тапсырманы өзгертуге болмайды', 'info')
          this.$log(e, 'danger')
        })
      },
      deleteTask (task) {
        this.$api('delete', 'tasks/' + task._id).then(response => {
          this.modal.deleted = false
          this.loadTasks()
          this.notify(response.data.message)
        }).catch(e => {
          this.notify('Уақытша тапсырманы жоюға болмайды', 'info')
          this.$log(e, 'danger')
        })
      },
      confirmTask (_id) {
        this.$api('post', `tasks/confirm`, { taskId: _id }).then(response => {
          this.modal.show = false
          this.loadTasks()
          this.notify(response.data.message)
        }).catch(e => {
          this.notify(e.response.data.message, 'info')
          this.$log(e, 'danger')
        })
      },
      
      loadTasks () {
        let filter = this.$route.params.param1 ? `/?f=${this.$route.params.param1}` : ''
        this.tasks = []
        return this.$api('get', 'tasks' + filter).then(response => {
          console.log(response.data.tasks)
          return this.tasks = response.data.tasks
        }).catch(e => {
          this.notify(e, 'danger')
        })
      },
      loadUsers () {
        return this.$api('get', 'users').then(response => {
          this.users = response.data.users.filter(user => user._id !== this.$auth().user._id && user.head === this.$auth().user._id)
        }).catch(e => {
          this.notify(e, 'danger')
        })
      },
      getUser (_id) {
        let user = this.$_.find(this.users, u => u._id === _id)
        return user ? user : {}
      }
    },

    mounted () {
      this.loadTasks()
      this.loadUsers()
    },
    watch: {
      '$route' (to, from) {
        this.loadTasks()
      }
    },
  }
</script>

<style lang="scss">
  .empty {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h3 { margin-top: 0; }
</style>
