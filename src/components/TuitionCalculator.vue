<script>
export default {
  name: "TuitionCalculator",

  data: () => ({
    slider: 0,
    progress: 0,
    e1: 1,
    previousIndex: null,
    userChoices: ["", "", "", ""],
    stepOneFields: {
      campuses: {
        options: ["California", "Texas", "Florida"],
      },
      areaOfStudy: {
        options: null,
        disabled: true,
      },
      degreeLevel: {
        options: null,
        disabled: true,
      },
      program: {
        options: null,
        disabled: true,
      },
    },
    wcuData: {
      California: {
        "Dental Hygiene": {
          "Bachelor's": {
            "Bachelor of Science in Dental Hygiene": {},
          },
        },
        Nursing: {
          "Bachelor's": {
            "LVN to Bachelor of Science in Nursing": {},
            "Bachelor of Science in Nursing": {},
          },
        },
        "Occupational Therapy": {
          Doctorate: {
            "Occupational Therapy Doctorate": {},
          },
          "Master's": {
            "Master of Science in Occupational Therapy": {},
          },
        },
        Pharmacy: {
          Doctorate: {
            "Doctor of Pharmacy": {},
          },
        },
        "Physical Therapy": {
          Doctorate: {
            "Doctor of Physical Therapy": {},
          },
        },
      },
      Florida: {
        Nursing: {
          Associate: {
            "Associate Degree in Nursing": {},
          },
          "Bachelor's": {
            "Bachelor of Science in Nursing": {},
            "LPN to Bachelor of Science in Nursing": {},
          },
        },
      },
      Texas: {
        Nursing: {
          "Bachelor's": {
            "Bachelor of Science in Nursing": {},
            "LPN to Bachelor of Science in Nursing": {},
          },
        },
        "Occupational Therapy": {
          "Master's": {
            "Master of Science in Occupational Therapy": {},
          },
        },
        "Physician Assistant": {
          "Master's": {
            "Master of Physician Assistant": {},
          },
        },
      },
    },
  }),
  methods: {
    setFields(nextField, options) {
      for (const program of Object.keys(options)) {
        this.stepOneFields[nextField].options.push(program);
      }
      this.stepOneFields[nextField].disabled = false;
    },
    clearSuccessiveFields(index) {
      console.log(index, this.previousIndex);
      let clearIndex = index + 1;
      while (clearIndex < 4) {
        this.userChoices[clearIndex] = "";
        clearIndex++;
      }
    },
    handleSelection(currentField, nextField, index) {
      console.log(
        currentField + " changed,",
        nextField + " set,",
        "index: " + index
      );
      this.stepOneFields[nextField].options = [];
      if (this.previousIndex !== null && index < this.previousIndex) {
        this.clearSuccessiveFields(index);
      }
      let options;
      if (index == 0) {
        options = this.wcuData[this.userChoices[0]];
      } else if (index == 1) {
        options = this.wcuData[this.userChoices[0]][this.userChoices[1]];
      } else if (index == 2) {
        options =
          this.wcuData[this.userChoices[0]][this.userChoices[1]][
            this.userChoices[2]
          ];
      }
      console.log(options);
      this.setFields(nextField, options);
      this.previousIndex = index;
    },
  },
};
</script>

<template>
  <v-container class="mt-8" style="border: 1px solid black">
    <v-row no-gutters>
      <v-col cols="12" sm="6" md="8">
        <v-stepper v-model="e1" elevation="0">
          <v-progress-linear v-model="progress" color="blue" height="25">
            <template v-slot:default="{ value }">
              <strong>{{ Math.ceil(value) }}%</strong>
            </template>
          </v-progress-linear>

          <v-stepper-items>
            <v-stepper-content step="1">
              <p>Select a Program</p>

              <v-select
                outlined
                label="Choose a WCU Campus"
                :items="stepOneFields.campuses.options"
                @change="handleSelection('campus', 'areaOfStudy', 0)"
                v-model="userChoices[0]"
              ></v-select>
              <v-select
                outlined
                label="Choose Area of Study"
                :disabled="stepOneFields.areaOfStudy.disabled"
                :items="stepOneFields.areaOfStudy.options"
                @change="handleSelection('areaOfStudy', 'degreeLevel', 1)"
                v-model="userChoices[1]"
              ></v-select>
              <v-select
                outlined
                label="Choose Degree Level"
                :disabled="stepOneFields.degreeLevel.disabled"
                :items="stepOneFields.degreeLevel.options"
                @change="handleSelection('degreeLevel', 'program', 2)"
                v-model="userChoices[2]"
              ></v-select>
              <v-select
                outlined
                label="Choose Program"
                :disabled="stepOneFields.program.disabled"
                :items="stepOneFields.program.options"
                v-model="userChoices[3]"
              ></v-select>

              <div class="nav-btn-container d-flex align-center justify-end">
                <v-btn color="primary" @click="(e1 = 2), (progress += 25)">
                  Continue
                </v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-content step="2">
              <p>Select a Tuition Rate</p>

              <p>
                Special tuition rates are available for specific student
                populations, including Indiana residents, military
                servicemembers and veterans, alumni, and more.&nbsp;Select
                <strong>Standard Rate</strong>&nbsp;if none apply and see other
                ways to save on tuition.
              </p>

              <v-select outlined label="Choose a Tuition Rate"></v-select>

              <div
                class="nav-btn-container d-flex align-center justify-space-between"
              >
                <v-btn text @click="(e1 = 1), (progress -= 25)">
                  Previous
                </v-btn>

                <v-btn color="primary" @click="(e1 = 3), (progress += 25)">
                  Continue
                </v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-content step="3">
              <p>Select Your Preferred Schedule</p>

              <p>
                Purdue Global offers monthly start dates, so you can begin
                classes when it’s most convenient for you. Select&nbsp;one
                below.
              </p>

              <p>Expected Start Date</p>
              <v-radio-group row>
                <v-radio
                  label="September 21 2022"
                  value="start-date-1"
                ></v-radio>
                <v-radio label="October 19 2022" value="start-date-2"></v-radio>
                <v-radio label="December 7 2022" value="start-date-3"></v-radio>
                <v-radio label="January 4 2023" value="start-date-4"></v-radio>
              </v-radio-group>

              <p>Courses Per Term</p>

              <p>
                Full-time undergraduate students typically take&nbsp;2 courses
                per term. Certain programs may require you to meet academic
                requirements or receive prior approval to take more than&nbsp;2
                courses per term.
              </p>

              <v-radio-group row>
                <v-radio label="1" value="radio-1"></v-radio>
                <v-radio label="2" value="radio-2"></v-radio>
                <v-radio label="3" value="radio-3"></v-radio>
              </v-radio-group>

              <div
                class="nav-btn-container d-flex align-center justify-space-between"
              >
                <v-btn text @click="(e1 = 2), (progress -= 25)">
                  Previous
                </v-btn>

                <v-btn color="primary" @click="(e1 = 4), (progress += 25)">
                  Continue
                </v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-content step="4">
              <p>Credit for Prior Learning & Experience</p>

              <p>
                Prior&nbsp;coursework and life experiences can translate into
                college credit, saving time and money. Estimate quarter credits
                you earned from a prior college or university.&nbsp;1 semester
                credit hour = 1.5 quarter credit hours.
              </p>

              <p>Transfer Credits</p>

              <v-slider
                v-model="slider"
                class="align-center"
                :max="97"
                :min="0"
                hide-details
              >
                <template v-slot:append>
                  <v-text-field
                    v-model="slider"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 60px"
                  ></v-text-field>
                </template>
              </v-slider>

              <p>
                Do you plan on completing a credit-for-work-experience course?
              </p>

              <v-radio-group row>
                <v-radio label="Yes" value="Yes"></v-radio>
                <v-radio label="No" value="No"></v-radio>
              </v-radio-group>

              <div
                class="nav-btn-container d-flex align-center justify-space-between"
              >
                <v-btn text @click="(e1 = 3), (progress -= 25)">
                  Previous
                </v-btn>

                <v-btn color="primary" @click="(e1 = 5), (progress += 25)">
                  Continue
                </v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-content step="5">
              <p>Your Estimate</p>

              <v-simple-table fixed-header height="300px">
                <thead>
                  <tr>
                    <th class="text-left">Program</th>
                    <th class="text-right">
                      Bachelor's of Science in Communication
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-left">Total Quarter Credits</td>
                    <td class="text-right">180</td>
                  </tr>
                  <tr>
                    <td class="text-left">Tuition Rate</td>
                    <td class="text-right">California Residents</td>
                  </tr>
                  <tr>
                    <td class="text-left">Estimated Transfer Credits</td>
                    <td class="text-right">0</td>
                  </tr>
                  <tr>
                    <td class="text-left">Estimated Tuition Cost</td>
                    <td class="text-right">$50,000</td>
                  </tr>
                </tbody>
              </v-simple-table>

              <v-simple-table class="mt-4" fixed-header height="300px">
                <tbody>
                  <tr>
                    <td class="text-left">Start Date</td>
                    <td class="text-right">October 19th, 2022</td>
                  </tr>
                  <tr>
                    <td class="text-left">Course Length</td>
                    <td class="text-right">10</td>
                  </tr>
                  <tr>
                    <td class="text-left">Courses per Term</td>
                    <td class="text-right">2</td>
                  </tr>
                  <tr>
                    <td class="text-left">Terms to Graduate</td>
                    <td class="text-right">18</td>
                  </tr>
                  <tr>
                    <td class="text-left">Estimate Graduation Date</td>
                    <td class="text-right">Spring 2026</td>
                  </tr>
                </tbody>
              </v-simple-table>

              <div
                class="nav-btn-container d-flex align-center justify-space-between"
              >
                <v-btn text @click="(e1 = 4), (progress -= 25)">
                  Previous
                </v-btn>

                <v-btn color="primary"> Apply </v-btn>
              </div>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
      <v-col cols="6" md="4">
        <v-container>
          <v-row>
            <v-col>
              <p>$30,000</p>
              <p>Estimated Tuition</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p>Fall 2026</p>
              <p>Estimated Graduation Date</p>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
