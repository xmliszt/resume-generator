<template>
  <div>
    <sideNav />
    <el-divider>Edit Your Profile</el-divider>
    <placeholder />
    <div class="edit">
      <placeholder />
      <div id="intro"></div>
      <el-divider>Basic</el-divider>
      <editProfile :userID="user" v-on:profileData="profileData" />
      <div id="edu"></div>
      <placeholder />
      <el-divider>Education</el-divider>
      <editEducation :userID="user" v-on:educationData="educationData" />
      <div id="exp"></div>
      <placeholder />
      <el-divider>Experience</el-divider>
      <editExperience :userID="user" v-on:experienceData="experienceData" />
      <div id="proj"></div>
      <placeholder />
      <el-divider>Projects</el-divider>
      <editProjects :userID="user" v-on:projectData="projectData" />
      <div id="skill"></div>
      <placeholder />
      <el-divider>Skills</el-divider>
      <editSkills :userID="user" v-on:skillData="skillData" />
      <hr />
      <div class="placeholder"></div>
      <div class="generate">
        <el-popover placement="top" trigger="click">
          <templateSelection />
          <el-button type="success" slot="reference" plain
            >SELECT YOUR TEMPLATES</el-button
          >
        </el-popover>
      </div>
      <router-view
        :profile="profile"
        :educations="educations"
        :experiences="experiences"
        :projects="projects"
        :skills="skills"
      />
    </div>
  </div>
</template>

<script>
import editProfile from "@/components/editProfile.vue";
import editEducation from "@/components/editEducation.vue";
import editExperience from "@/components/editExperience.vue";
import editProjects from "@/components/editProjects.vue";
import editSkills from "@/components/editSkill.vue";
import placeholder from "@/components/placeholder.vue";
import sideNav from "@/components/sidenav.vue";
import templateSelection from "@/components/templateSelection.vue";
import { makeid } from "./../utils/appUtil.js";
import { db } from "./../firebase";
export default {
  data() {
    return {
      user: "",
      profile: {},
      educations: [],
      experiences: [],
      projects: [],
      skills: [],
      showSelection: false
    };
  },
  components: {
    editProfile,
    editEducation,
    editExperience,
    editProjects,
    editSkills,
    placeholder,
    sideNav,
    templateSelection
  },
  created: function() {
    // fetch database data if have any, otherwise initialize one
    this.user = window.localStorage.getItem("user");
    if (this.user) {
      db.collection("resumes")
        .doc(this.user)
        .get()
        .then(doc => {
          if (doc.exists) {
            console.log("exists");
          } else {
            console.log("non exist!");
            db.collection("resumes")
              .doc(this.user)
              .set({});
            db.collection("resumes")
              .doc(this.user)
              .collection("resume")
              .doc("profile")
              .set({});
            db.collection("resumes")
              .doc(this.user)
              .collection("resume")
              .doc("education")
              .set({});
            db.collection("resumes")
              .doc(this.user)
              .collection("resume")
              .doc("experience")
              .set({});
            db.collection("resumes")
              .doc(this.user)
              .collection("resume")
              .doc("projects")
              .set({});
            db.collection("resumes")
              .doc(this.user)
              .collection("resume")
              .doc("skills")
              .set({});
            db.collection("resumes")
              .doc(this.user)
              .collection("resume")
              .doc("social")
              .set({});
            db.collection("resumes")
              .doc(this.user)
              .collection("resume")
              .doc("education")
              .collection("education")
              .doc(makeid(11))
              .set({});
            db.collection("resumes")
              .doc(this.user)
              .collection("resume")
              .doc("experience")
              .collection("experience")
              .doc(makeid(11))
              .set({});
            db.collection("resumes")
              .doc(this.user)
              .collection("resume")
              .doc("projects")
              .collection("projects")
              .doc(makeid(11))
              .set({});
            db.collection("resumes")
              .doc(this.user)
              .collection("resume")
              .doc("skills")
              .collection("skills")
              .doc(makeid(11))
              .set({});
          }
        });
    }
  },
  methods: {
    profileData(value) {
      this.profile = value;
    },
    educationData(value) {
      this.educations = value.slice(1);
    },
    experienceData(value) {
      this.experiences = value.slice(1);
    },
    projectData(value) {
      this.projects = value.slice(1);
    },
    skillData(value) {
      this.skills = value.slice(1);
    },
    generateResume() {
      this.showSelection = true;
    }
  }
};
</script>

<style>
.tootip {
  margin: 4px;
}
.edit {
  margin-left: 20%;
  margin-right: 20%;
}
.el-textarea .el-input__count {
  opacity: 0.5;
}
.floating-home {
  position: fixed;
  left: 10px;
  top: 10px;
}
.generate {
  display: flex;
  justify-content: center;
}
@media (max-width: 768px) {
  .edit {
    margin-left: 30px;
    margin-right: 30px;
  }
}
</style>
