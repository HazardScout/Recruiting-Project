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
            <v-btn small @click="edit()">Edit</v-btn>
          <v-btn small class="ml-3" @click="remove(guest)" color="error">Delete</v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
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
    },
    async remove(guest){
      const repo = new GuestRepository()

      this.guestList = this.guestList.filter(x=>{
        return x.email!==guest.email && x.tickets !== guest.tickets
      })

    await repo.save(this.guestList);

    },
    edit(){
      this.$router.push({
        path:'/'
      })
    }
  }
  }
</script>
