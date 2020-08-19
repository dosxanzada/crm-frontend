<template>
  <ul class="sidebar-menu" data-widget="tree">
    <li v-for="item in sidebar" :class="[{active: item.isActive(), 'menu-open': item.isActive() && item.children, 'treeview': item.children,}]">

      <router-link v-if="item.children" :to="item.link">
        <i class="fa fa-folder"></i> <span>{{item.name}}</span>
      </router-link>

      <ul v-if="item.children" class="treeview-menu">
        <li v-for="child in item.children" :class="[{active: child.isActive(), 'menu-open': child.isActive() && child.children}]">
          <router-link :to="child.link">
            <i class="fa fa-folder"></i> <span>{{child.name}}</span>
          </router-link>
        </li>
      </ul>

      <router-link v-if="!item.children" :to="item.link">
        <i class="fa fa-folder"></i> <span>{{item.name}}</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    data () {
      return {
        sidebarData: [
          {
            link: { name: 'index' },
            name: 'Жаңалықтар',
            isActive: () => this.$isRoute('index'),
            roles: ['admin', 'user']
          },
          {
            link: { name: 'users' },
            name: 'Әріптестер',
            isActive: () => this.$isRoute('users'),
            roles: ['admin', 'user']
          },
          {
            link: { name: 'myUsers', params: { param: 'my' }},
            name: 'Менің қызметкерлерім',
            isActive: () => this.$isRoute('myUsers'),
            roles: ['admin']
          },
          {
            link: { name: 'tasks' },
            name: 'Тапсырмалар',
            isActive: () => this.$isRoute('tasks'),
            roles: ['admin', 'user']
          },
          {
            link: { name: 'clients' },
            name: 'Клиенттер',
            isActive: () => this.$isRoute('clients'),
            roles: ['admin', 'user']
          },
          {
            link: { name: 'stats' },
            name: 'Көрсеткіштер',
            isActive: () => this.$isRoute('stats'),
            roles: ['admin']
          },
        ]
      }
    },
    computed: {
      sidebar () {
        if (this.$auth().user.admin) {
          return this.sidebarData.filter(item => item.roles.includes('admin'))
        } else {
          return this.sidebarData.filter(item => item.roles.includes('user'))
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
