<template>
  <div>
    <div v-for="client in clients" :key="client._id" class="panel border-left-lg border-left-danger">
      <div class="panel-body">
        <div class="row">
          <div class="col-md-8">
            <h3 class="no-margin-top">{{client.fullname}}</h3>
            <p>{{client.company}}</p>
            <blockquote class="mb-15">
              <p><i>Email:</i> {{client.email}}</p>
              <p><i>Телефоны:</i> <a target="_blank" :href="`https://api.whatsapp.com/send?phone=${client.phone}`">{{client.phone}}</a></p>
            </blockquote>
            <p v-if="client.processedBy && client.processedBy.hasOwnProperty('fullname')">Бапталды: {{client.processedBy.fullname}}</p>
          </div>
        </div>
      </div>

      <!-- <div class="panel-footer panel-footer-condensed">
        <div class="heading-elements">
          <span class="heading-text">Орындалу уақыты: <span class="text-semibold">{{ $dateFormat(task.deadline, 'd mmm yyyy') }}</span></span>
          <div class="pull-right">
            <span v-if="task.complete.status">Орындалды: {{ $dateFormat(task.complete.date, 'd mmm yyyy HH:mm') }}</span>
            <span v-else>Жұмыс барысында</span>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Clients',
  data () {
    return {
      clients: []
    }
  },
  beforeMount () {
    this.$api('get', 'clients').then(response => {
      this.clients = response.data.clients
    })
  }
}
</script>
