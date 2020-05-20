<template>
  <div style="margin-bottom: 20px">
    <el-card class="single-skill" shadow="hover">
      <el-form
        ref="skillForm"
        :model="skillForm"
        :rules="rules"
        label-width="120px"
        label-position="left"
        status-icon
      >
        <el-form-item label="Skill Title" prop="title">
          <el-input
            v-model="skillForm.title"
            placeholder="Your skill title"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="content">
          <el-input
            v-model="skillForm.content"
            type="textarea"
            prop="desc"
            placeholder="Sub skills..."
            maxlength="150"
            :autosize="{ minRows: 2 }"
            clearable
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="deleteDisabled"
            type="warning"
            @click="updateSkill"
            size="small"
            >Add</el-button
          >
          <div v-else>
            <el-button
              v-if="username"
              type="primary"
              @click="updateSkill"
              size="small"
              >Update</el-button
            >
            <el-button type="danger" @click="deleteSkill" size="small"
              >Delete</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { db } from "./../firebase";
export default {
  props: ["skill", "fromArray", "userID"],
  data() {
    return {
      skillForm: {
        title: "",
        content: ""
      },
      rules: {
        title: [
          {
            required: true,
            message: "Please input your skill title!",
            trigger: "blur"
          }
        ]
      },
      docID: "",
      deleteDisabled: false,
      username: null
    };
  },
  created: function() {
    this.username = window.localStorage.getItem("user");
    if (this.$props.fromArray != undefined) {
      this.skillForm.title = this.$props.skill.title;
      this.skillForm.content = this.$props.skill.content;
      this.docID = this.$props.skill.docID;
      if (!this.docID || this.docID == undefined) {
        this.deleteDisabled = true;
      } else {
        this.deleteDisabled = false;
      }
    }
  },
  methods: {
    updateSkill() {
      this.$refs.skillForm.validate(valid => {
        if (valid) {
          if (this.docID == undefined) {
            this.docID = makeid(11);
          }
          if (window.localStorage.getItem("user")) {
            db.collection("resumes")
              .doc(this.$props.userID)
              .collection("resume")
              .doc("skills")
              .collection("skills")
              .doc(this.docID)
              .set({
                docID: this.docID,
                title: this.skillForm.title,
                content: this.skillForm.content ? this.skillForm.content : ""
              })
              .then(() => {
                if (this.$props.skill.title == undefined) {
                  this.$refs.skillForm.resetFields();
                  this.docID = this.$props.skill.docID;
                }
              });
          } else {
            var skill = {
              docID: this.docID,
              title: this.skillForm.title,
              content: this.skillForm.content ? this.skillForm.content : ""
            };
            var skills = this.$store.getters.skills;
            skills.push(skill);
            this.$store.commit("setSkills", skills);
            if (this.$props.skill.title == undefined) {
              this.$refs.skillForm.resetFields();
              this.docID = undefined;
            }
          }
        }
      });
    },
    deleteSkill() {
      if (window.localStorage.getItem("user")) {
        db.collection("resumes")
          .doc(this.$props.userID)
          .collection("resume")
          .doc("skills")
          .collection("skills")
          .doc(this.docID)
          .delete();
      } else {
        var skills = this.$store.getters.skills;
        skills.forEach((skill, idx) => {
          if (skill.docID == this.docID) {
            skills.splice(idx, idx + 1);
          }
        });
      }
    }
  }
};

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
</script>
