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
      v-model="email"
      placeholder="Enter your email address"
      >

      </v-text-field>
      <v-text-field
      class="mt-5"
      dense
      hide-details
      solo
      v-model="tickets"
      placeholder="Enter # of tickets"
      >

      </v-text-field>

      <v-btn :loading="loading" @click="saveGuest()" color="success" class="mt-5">Submit</v-btn>
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
        guestList:[],
        email:'',
        tickets:'',
        loading:false
      };
    },
    async mounted(){
      const repo = new GuestRepository()
      this.guestList = await repo.load()
    },
    methods:{
      async saveGuest(){
        this.loading=true
      const repo = new GuestRepository()
      // Fetch guests
      //  this.guestList.splice(0, 1);
      this.guestList.push({
        email:this.email,
        tickets:this.tickets
      })

      await repo.save(this.guestList);
      this.loading=false
    }
  }
  }
</script>

<style scoped>
.reservation-entry{
  margin-top:20%;
}
</style>
