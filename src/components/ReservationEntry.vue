<template>
  <div>
    <v-container>
  <v-card class="pa-10 reservation-entry">
    <v-card-title>
      Reservation Entry
    </v-card-title>
      <v-text-field
      dense
      hide-details
      solo
      placeholder="Enter your email address"
      >

      </v-text-field>
      <v-text-field
      class="mt-5"
      dense
      hide-details
      solo
      placeholder="Enter # of tickets"
      >

      </v-text-field>
    </v-card>
    </v-container>
  
  </div>
</template>

<script>
  // eslint-disable-next-line no-unused-vars
  const GuestRepository = require('../guest-repository');

  export default {
    data: () => {
      return { 
        guestList:[]
      };
    },
    async mounted(){
await this.getGuestDetails()
    },
    methods:{
      async getGuestDetails(){
      const repo = new GuestRepository()
      // Fetch guests
      this.guestList = await repo.load()
    }
  }
  }
</script>

<style scoped>
.reservation-entry{
  margin-top:20%;
}
</style>
