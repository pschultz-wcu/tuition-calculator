export default class DataModule {
  setData(that) {
    that.calculatorData = {
      progress: 0,
      step: 1,
      estimatedTuition: "$0",
      estimatedGradDate: "TBD",
      fees: 10000,
    };
    that.userChoices = {
      stepOne: ["", "", "", ""],
      stepTwo: {
        tuition: {
          option: null,
          rate: null,
        },
      },
      stepThree: {
        startDate: "",
        courseLoad: "",
      },
      stepFour: {
        transferCredits: 0,
        workExperience: "",
      },
    };
    that.fields = {
      stepOne: {
        valid: false,
        fieldRules: [(v) => !!v || "This field is required"],
        campuses: {
          options: ["California", "Texas", "Florida"],
          isRequired: true,
        },
        areaOfStudy: {
          options: null,
          disabled: true,
          isRequired: true,
        },
        degreeLevel: {
          options: null,
          disabled: true,
          isRequired: true,
        },
        program: {
          options: null,
          disabled: true,
          isRequired: true,
        },
      },
      stepTwo: {
        valid: false,
        fieldRules: [(v) => !!v || "This field is required"],
        tuition: {
          options: ["Standard Rate", "Active Duty", "Veteran"],
          rates: [460, 391, 250],
          isRequired: true,
        },
      },
      stepThree: {
        valid: false,
        fieldRules: [(v) => !!v || "This field is required"],
        startDate: {
          isRequired: true,
        },
        courseLoad: {
          isRequired: true,
        },
      },
      stepFour: {
        valid: false,
        fieldRules: [(v) => !!v || "This field is required"],
        workExperience: {
          isRequired: true,
          value: "",
        },
      },
    };
    that.wcuProgramData = {
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
    };
  }
}