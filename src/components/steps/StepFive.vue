<script>
export default {
  name: "StepFive",
  props: {
    userChoices: Object,
    stepData: Object,
    calculatorData: Object,
  },
  methods: {
    resetClicked() {
      this.$emit("reset")
    },
  },
};
</script>
<template>
  <div>
    <p>Your Estimate</p>

    <v-simple-table fixed-header height="300px">
      <thead>
        <tr>
          <th class="text-left">Program</th>
          <th class="text-right">
            {{ userChoices.stepOne[3] }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left">Total Credits</td>
          <td class="text-right">{{ userChoices.programData.total_credits }}</td>
        </tr>
        <tr>
          <td class="text-left">Tuition Rate</td>
          <td class="text-right">
            {{ userChoices.stepTwo.tuition.option }} - ${{
              userChoices.stepTwo.tuition.rate
            }}/credit
          </td>
        </tr>
        <tr>
          <td class="text-left">Estimated Transfer Credits</td>
          <td class="text-right">
            {{ userChoices.stepFour.transferCredits }}
          </td>
        </tr>
        <tr>
          <td class="text-left">Supplies & Fees</td>
          <td class="text-right">${{ calculatorData.fees }}</td>
        </tr>
        <tr>
          <td class="text-left">Estimated Tuition Cost</td>
          <td class="text-right">
            {{ calculatorData.estimatedTuition }}
          </td>
        </tr>
      </tbody>
    </v-simple-table>

    <v-simple-table class="mt-4" fixed-header height="300px">
      <tbody>
        <tr>
          <td class="text-left">Start Date</td>
          <td class="text-right">
            {{ userChoices.stepThree.startDate }}
          </td>
        </tr>
        <tr>
          <td class="text-left">Courses per Term</td>
          <td class="text-right">2</td>
        </tr>
        <tr>
          <td class="text-left">Terms to Graduate</td>
          <td class="text-right">{{ Math.ceil(userChoices.programData.total_credits / parseInt(userChoices.stepThree.courseLoad)) }}</td>
        </tr>
        <tr>
          <td class="text-left">Estimated Graduation</td>
          <td class="text-right">Spring 2026</td>
        </tr>
      </tbody>
    </v-simple-table>

    <div class="nav-btn-container d-flex align-center justify-space-between">
      <v-btn text @click="resetClicked"> Start Over </v-btn>
      <v-btn color="primary"> Apply Now</v-btn>
    </div>
  </div>
</template>
