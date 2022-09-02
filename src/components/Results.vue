<script>
export default {
  name: "Results",
  props: {
    calculatorData: Object,
  },
};
</script>
<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{ calculatorData.estimatedTuition }}</h1>
        <p>Estimated Tuition</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h1>{{ calculatorData.estimatedGradDate }}</h1>
        <p>Estimated Graduation Date</p>
      </v-col>
    </v-row>
  </v-container>
</template>
