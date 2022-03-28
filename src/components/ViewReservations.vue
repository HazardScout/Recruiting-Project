<template>
  <div>
        <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Email Address:
          </th>
          <th class="text-left">
            Tickets
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
    }
  }
  }
</script>
