import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    profile: new Object(),
    social: new Object(),
    educations: [{ docID: undefined }],
    experiences: [{ docID: undefined }],
    projects: [{ docID: undefined }],
    skills: [{ docID: undefined }]
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setSocial(state, social) {
      state.social = social;
    },
    setEducations(state, educations) {
      state.educations = educations;
    },
    setExperiences(state, experiences) {
      state.experiences = experiences;
    },
    setProjects(state, projects) {
      state.projects = projects;
    },
    setSkills(state, skills) {
      state.skills = skills;
    }
  },
  getters: {
    profile: state => state.profile,
    social: state => state.social,
    educations: state => state.educations,
    experiences: state => state.experiences,
    projects: state => state.projects,
    skills: state => state.skills
  }
});

export default store;
