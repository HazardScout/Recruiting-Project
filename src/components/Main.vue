<template>
  <div>
    <div>
      <div class="grid-table">
        <span class="grid-header">Email</span>
        <span class="grid-header">Number of Tickets</span>
      </div>
      <div v-for="(guest, index) in guests" :key="index">
        <form v-if="guestToEdit.email === guest.email" @submit.prevent="updateGuest">
          <div class="grid-table">
            <div>
              <input v-model="updatedEmail" type="email">
            </div>
            <div>
              <input v-model="updatedTickets" type="number" min="1">
            </div>
            <div class="actions">
              <button type="submit">Save</button>
              <button @click="cancelEdit()">Cancel</button>
            </div>
          </div>
        </form>
        <div v-else class="grid-table">
          <div>
            {{ guest.email }}
          </div>
          <div>
            {{ guest.tickets }}
          </div>
          <div class="actions">
            <button @click="editGuestInfo(guest)">Edit</button>
            <button @click="removeGuest(guest)">Remove</button>
          </div>
        </div>
      </div>
    </div>
    <div class="guest-count">
      Total Number of Guests: {{ totalGuests }}
    </div>
    <div class="new-guest-form">
      <div class="form-header">Add a new guest</div>
      <div class="form-body">
        <form @submit.prevent="addGuest">
          <label for="newGuestEmail">Email:</label>
          <input v-model="newGuestEmail" type="email" id="newGuestEmail">
          <label for="newGuestTickets">Number of Tickets:</label>
          <input v-model="newGuestTickets" type="number" id="newGuestTickets" min="1">
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  // eslint-disable-next-line no-unused-vars
  const GuestRepository = require('../guest-repository');
  const repo = new GuestRepository();

  export default {
    data: () => {
      return {
        guests: [],
        newGuestEmail: '',
        newGuestTickets: 1,
        guestToEdit: {},
        updatedEmail: '',
        updatedTickets: 1,
       };
    },

    computed: {
      totalGuests() {
        let total = 0;
        for (let i = 0; i < this.guests.length; i++) {
          total += this.guests[i].tickets;
        }
        return total;
      },
    },

    async created() {
      const response = await repo.load();
      this.guests = response;
    },

    methods: {
      async addGuest() {
        this.guests.push({ email: this.newGuestEmail, tickets: parseInt(this.newGuestTickets) });
        this.newGuestEmail = '';
        this.newGuestTickets = 0;
        await repo.save(this.guests);
      },

      async removeGuest(guestToRemove) {
        const removeIndex = this.guests.findIndex(guest => guest.email === guestToRemove.email);
        this.guests.splice(removeIndex, 1);
        await repo.save(this.guests);
      },

      editGuestInfo(guest) {
        this.guestToEdit = guest;
        this.updatedEmail = guest.email;
        this.updatedTickets = guest.tickets;
      },

      cancelEdit() {
        this.guestToEdit = {};
      },

      async updateGuest() {
        this.guests = this.guests.map(guest => {
          if (guest === this.guestToEdit) {
            return {
              email: this.updatedEmail,
              tickets: parseInt(this.updatedTickets),
            }
          }
          return guest;
        });
        await repo.save(this.guests);
        this.updatedEmail = '';
        this.updatedTickets = 0;
        this.guestToEdit = {};
      },
    }
  }
</script>

<style scoped>
  .guest-count {
    margin-top: 15px;
    font-weight: bold;
  }

  .grid-table {
    display: grid;
    grid-template-columns: repeat(auto-fill, 33%);
    padding: 10px;
    border-bottom: 1px solid #000;
  }

  .grid-table:nth-of-type(even) {
    background-color: #f2f2f2;
  }

  .grid-header {
    font-weight: bold;
  }

  .actions button {
    margin-right: 10px;
  }

  .new-guest-form {
    margin-top: 72px;
  }

  .form-header {
    background-color: #333;
    color: #fff;
    padding: 10px;
    font-size: 20px;
    margin-bottom: 20px;
  }

  .new-guest-form input, .new-guest-form label {
    display: block;
  }

  .new-guest-form label {
    font-weight: bold;
    margin-bottom: 3px;
  }

  .new-guest-form input {
    margin-bottom: 15px;
    width: 50%;
    padding: 8px;
  }

  .new-guest-form  button {
    cursor: pointer;
    padding: 5px 20px;
    font-size: 18px;
  }
</style>