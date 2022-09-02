<script>
export default {
  name: "BackButton",
  data: () => ({}),
  methods: {
    handleClick() {
      this.$emit("clicked");
    },
  },
};
</script>
<template>
  <v-btn color="primary" @click="handleClick()"> Previous </v-btn>
</template>
