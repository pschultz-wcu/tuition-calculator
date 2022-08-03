<script>
import TuitionCalculator from './components/TuitionCalculator';

export default {
  name: 'App',

  components: {
    TuitionCalculator,
  },

  data: () => ({
    //
  }),
};
</script>
<template>
  <v-app>
    <v-main>
      <TuitionCalculator />
    </v-main>
  </v-app>
</template>


