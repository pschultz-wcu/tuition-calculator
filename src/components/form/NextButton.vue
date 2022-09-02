<script>
export default {
  name: "NextButton",
  props: {
    fields: Object
  },
  data: () => ({}),
  methods: {
    handleClick() {
      this.$emit("clicked");
    },
  },
};
</script>
<template>
  <v-btn
    color="primary"
    @click="handleClick()"
    :disabled="!fields.valid"
  >
    Continue
  </v-btn>
</template>
