<template>
  <div>
        <v-simple-table class="text-center">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">
            Email Address:
          </th>
          <th class="text-center">
            Tickets
          </th>
          <th class="text-center">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(guest,i) in guestList"
          :key="i"
        >
          <td>{{ guest.email }}</td>
          <td>{{ guest.tickets }}</td>
          <td>
            <v-btn small @click="edit(guest,i)">Edit</v-btn>
          <v-btn small class="ml-3" @click="remove(guest)" color="error">Delete</v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

  <v-dialog v-model="editable">
    <!-- I understand this one could have been done better and we could have reused it. But to save me some time  -->
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

      <v-btn :loading="loading" @click="updateGuest()" color="success" class="mt-5">Update</v-btn>
    </v-card>
  </v-dialog>
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
        index:'', // index to edit
        editable:false,
        loading:false,
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
    },
    async remove(guest){
      const repo = new GuestRepository()

      this.guestList = this.guestList.filter(x=>{
        return x.email!==guest.email && x.tickets !== guest.tickets
      })

    await repo.save(this.guestList);

    },
    async updateGuest(index){
  console.debug(this.guestList.splice(index,1,{
        email:this.email,
        tickets:this.tickets
      }))
    },
    edit(guest,index){
      this.email = guest.email
      this.tickets = guest.tickets
      this.editable=!this.editable
      this.index=index 
    
    }
  }
  }
</script>
