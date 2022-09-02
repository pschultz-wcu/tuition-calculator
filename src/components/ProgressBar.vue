<script>
export default {
  name: "ProgressBar",
  props: {
    calculatorData: Object,
  },
};
</script>
<template>
  <v-progress-linear
    v-model="calculatorData.progress"
    color="secondary"
    height="25"
    ><template v-slot:default="{ value }">
      <strong>{{ Math.ceil(value) }}%</strong>
    </template>
  </v-progress-linear>
</template>
