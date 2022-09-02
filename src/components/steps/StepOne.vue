<script>
import NextButton from "../form/NextButton.vue";
export default {
  name: "StepOne",
  components: {
    NextButton,
  },
  props: {
    stepData: Object,
    userChoices: Object,
  },
  methods: {
    handleChange(index) {
      console.log(index);
      this.$emit("field-changed", index);
    },
    nextButtonClicked() {
      this.$emit("next-step");
    },
  },
};
</script>
<template>
  <div>
    <p>Select a Program</p>

    <v-form v-model="stepData.stepOne.valid">
      <v-select
        outlined
        v-for="field in stepData.stepOne.fields"
        :key="field.label"
        :label="field.label"
        :disabled="field.disabled"
        :items="field.options"
        @change="field._id !== 3 ? handleChange(field._id) : null"
        v-model="userChoices.stepOne[field._id]"
        :required="field.isRequired"
        :rules="stepData.stepOne.fieldRules"
      ></v-select>
    </v-form>

    <p class="legal-disclaimer">
      This tool is provided for informational purposes only and does not
      represent a guarantee of the time required to complete a program or the
      total program cost. Completion time is based on the assumptions that you
      will enroll in time to begin classes on the start date selected, will
      remain enrolled for each consecutive term, and will maintain satisfactory
      academic standing in each term to progress toward completion of your
      program. Tuition estimates do not include general program specific fees.
    </p>

    <div class="nav-btn-container d-flex align-center justify-end">
      <NextButton @clicked="nextButtonClicked()" :fields="stepData.stepOne" />
    </div>
  </div>
</template>
