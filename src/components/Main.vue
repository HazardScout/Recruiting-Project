

<template>
  <div>
    <h4>Nyan Cat guestlist</h4>
    <p>add your name and number of tickets</p>
    <ul>
    <li :style="{color: index == selectedItemIndex ? 'red' : 'black'}" v-for="(item, index) in guests" 
    v-bind:key="index" @click="setSelectedItem(index)" >{{item.email}} - tickets reserved: {{item.tickets}}</li>
    <button v-on:click="deleteEvent(index)"> Delete </button>
    </ul>
  <!-- <button v-on:click="generateGuests">add new guests</button> -->
  
  <hr/>
  <h4>input new guest information to guestlist</h4>
  <h5>* to edit an item on the list, silmply click the item above and input correction in the text field below</h5>
  <input type="email" v-model="newGuestEmail" placeholder="email" />
  <input type="number" v-model="newGuestTickets" placeholder="number of tickets"/>
  <div>Selected item {{selectedItemIndex }} </div>
  <button v-on:click="addNewGuest">Add New Guest</button>
  <button v-on:click="reset">Reset Guest List</button>
  <div> Total number of Tickets: '{{totalTickets}}' </div>
  </div>
  
</template>


<script>
  // eslint-disable-next-line no-unused-vars
  const GuestRepository = require('../guest-repository');
  
  const repo = new GuestRepository();
  let emailCounter = 0;
  export default {
    data: () => {
      return {
        newGuestEmail: '',
        newGuestTickets: '',
        guests: [],
        selectedItemIndex: null,
       };
    },
    mounted() {
      // debugger;
      repo.load()
      .then(result=> {
        // console.log(result);
        this.guests = result;
      });
    },
    methods: {
      addNewGuest() {
        if(this.selectedItemIndex !== null) {
          let existingGuest = this.guests[this.selectedItemIndex];
          existingGuest.email = this.newGuestEmail;
          existingGuest.tickets = parseInt(this.newGuestTickets);
          this.selectedItemIndex = null;
          return;
        }
        console.log("adding new guest...")
        this.guests.push({
          email: this.newGuestEmail,
          tickets: parseInt(this.newGuestTickets)
        })
        this.save()
      },
      reset() {
        console.log("reseting...")
        repo.reset()
        this.guests = [];
      },
      generateGuests: function(){
        console.log("adding a guest");
        this.guests.push({email: emailCounter++ 
          + "-some@email.com"})
        this.save()
      },
      save() {
        console.log("saving to localstorage...")
        repo.save(this.guests)
      },
      deleteEvent: function (index) {
        this.guests.splice(index, 1);
      },
      setSelectedItem(index) {
        this.selectedItemIndex = index;
      },
      liStyle(index) {
        console.log("index", index);
        if(this.selectedItemIndex == index) {
          console.log("red");
          return {
            "color": "red"
          }
        }

        return {
          "color": "blue"
        }
      },
    
    },
    computed: {
      totalTickets: function () {
        let countTickets = this.guests.reduce((acc, curr) => {
              console.log(countTickets);
              return acc + curr.tickets;   
        }, 0);

        return countTickets;
      },
      liStyleComputed(index) {
        console.log("index computed", index);
        if(this.selectedItemIndex == index) {
          console.log("red");
          return {
            "color": "red"
          }
        }

        return {
          "color": "blue"
        }
      }
    }
  }
</script>
