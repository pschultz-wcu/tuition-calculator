<script>
import NextButton from "../form/NextButton.vue";
import BackButton from "../form/BackButton.vue";
export default {
  name: "StepThree",
  components: {
    NextButton,
    BackButton,
  },
  props: {
    userChoices: Object,
    stepData: Object,
  },
  methods: {
    nextButtonClicked() {
      this.$emit("next-step");
    },
    backButtonClicked() {
      this.$emit("previous-step");
    },
  },
};
</script>
<template>
  <div>
    <p>Select Your Preferred Schedule</p>

    <p>
      WCU offers monthly start dates, so you can begin classes when it’s most
      convenient for you. Select&nbsp;one below.
    </p>

    <v-form v-model="stepData.stepThree.valid">
      <p>Expected Start Date</p>
      <v-radio-group
        row
        class="mx-8"
        :required="stepData.stepThree.startDate.isRequired"
        v-model="userChoices.stepThree.startDate"
        :rules="stepData.stepThree.fieldRules"
      >
        <v-radio label="September 21 2022" value="September 21 2022"></v-radio>
        <v-radio label="October 19 2022" value="October 19 2022"></v-radio>
        <v-radio label="December 7 2022" value="December 7 2022"></v-radio>
      </v-radio-group>

      <p>Courses Per Semester</p>

      <p>
        Full-time undergraduate students typically take&nbsp;2 - 3 courses per semester.
      </p>

      <v-radio-group
        row
        class="mx-8"
        :required="stepData.stepThree.courseLoad.isRequired"
        v-model="userChoices.stepThree.courseLoad"
        :rules="stepData.stepThree.fieldRules"
      >
        <v-radio label="1" value="6"></v-radio>
        <v-radio label="2" value="12"></v-radio>
        <v-radio label="3" value="18"></v-radio>
      </v-radio-group>
    </v-form>

    <div class="nav-btn-container d-flex align-center justify-space-between">
      <BackButton @clicked="backButtonClicked()" />
      <NextButton @clicked="nextButtonClicked()" :fields="stepData.stepThree" />
    </div>
  </div>
</template>
