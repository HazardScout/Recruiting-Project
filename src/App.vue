<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <v-btn text href="/">KPA EHS Recruiting Project</v-btn>
     <v-spacer></v-spacer>
   <v-btn href="/view-reservations">
   Reservation Table
   </v-btn>
    </v-app-bar>
 <v-main>
  <router-view/>
  </v-main>
    
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
