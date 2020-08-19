<template>
  <div>
    <Box>
      <div class="calendar-wrapper">
        <div :class="['form-group']">
          <label>Мерзімнің басы</label>
          <Datepicker
            input-class="form-control calendar"
            language="ru"
            :monday-first="true"
            :disabled="datepickerOneState.disabled"
            :highlighted="datepickerOneState.highlighted"
            name="from"
            @selected="selectFromDate($event)"
            v-model="dates.from"></Datepicker>
        </div>
        <div :class="['form-group']">
          <label>Мерзімнің аяғы</label>
          <Datepicker
            input-class="form-control calendar"
            language="ru"
            :monday-first="true"
            :disabled="datepickerTwoState.disabled"
            :highlighted="datepickerTwoState.highlighted"
            name="to"
            @selected="selectToDate($event)"
            v-model="dates.to"></Datepicker>
        </div>
      </div>
      <div class="mt2">
        <button class="btn btn-primary" @click="formStats()">Көрсеткішті жүктеу</button>
      </div>
    </Box>

    <!-- Quick stats boxes -->
    <div class="row" v-if="!(Object.keys(stats).length === 0)">
      <div class="col-lg-3">
        <div class="bg-grey-400">
          <div class="panel-body">
            <h3 class="no-margin">{{ stats.tasksAmount }}</h3>
            Барлық тапсырмалар
          </div>
        </div>
      </div>

      <div class="col-lg-3">
        <div class="bg-green-800">
          <div class="panel-body">
            <h3 class="no-margin">{{ stats.successTasks }}</h3>
            Уақытында орындалған
          </div>
        </div>
      </div>

      <div class="col-lg-3">
        <div class="bg-pink-400">
          <div class="panel-body">
            <h3 class="no-margin">{{ stats.deadlinedTasks }}</h3>
            Уақытына үлгермеген
          </div>
        </div>
      </div>

      <div class="col-lg-3">
        <div class="bg-primary-300">
          <div class="panel-body">
            <h3 class="no-margin">{{ stats.upcomingTasks }}</h3>
            Алдағы
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PageButtons from '@/PageButtons'
  import Box from '@/Box'
  import Datepicker from 'vuejs-datepicker'
  export default {
    components: {
      PageButtons,
      Box,
      Datepicker,
    },
    data () {
      return {
        dates: {
          to: null,
          from: null
        },
        datepickerOneState: {
          highlighted: {
            dates: [ new Date() ]
          },
          disabled: {
            to: null,
            from: null
          }
        },
        datepickerTwoState: {
          highlighted: {
            dates: [ new Date() ]
          },
          disabled: {
            to: null,
            from: null
          }
        },
        stats: {}
      }
    },
    computed: {
      isEmpty () {
        return Object.keys(this.stats).length === 0
      }
    },
    methods: {
      selectFromDate (event) {
        this.datepickerTwoState.disabled.to = new Date(event)
      },
      selectToDate (event) {
        if (!this.dates.from) this.datepickerOneState.disabled.from = new Date(event)
      },
      formStats () {
        if (this.dates.from || this.dates.to) {
          this.$api('post', 'stats', { dateFrom: (this.dates.from).getTime(), dateTo: this.dates.to.getTime() }).then(response => {
            this.stats = {}
            this.stats = response.data.stats
          }).catch(err => {
            console.log(err.response.data)
          })
        } else {
          this.notify('Көрсеткіштің аралығын таңдаңыз', 'danger')
        }
        
      }
    },

    mounted () {
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
  .calendar {
    display: block;

    &:first-child {
      margin-right: 8px;
    }
  }
  
  .calendar-wrapper {
    display: flex;
  }

  .mt2 {
    margin-top: 16px;
    clear: left;
  }

  .bg-pink-400 {
    background-color: #EC407A;
    border-color: #EC407A;
    color: #fff;
  }

  .bg-green-800 {
    background-color: #558B2F;
    border-color: #558B2F;
    color: #fff;
  }

  .bg-grey-400 {
    background-color: #888;
    border-color: #888;
    color: #fff;
  }

  .bg-primary-300 {
    background-color: #64B5F6;
    border-color: #64B5F6;
    color: #fff;
  }

  h3 { margin-top: 0; }
</style>
