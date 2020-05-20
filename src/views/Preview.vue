<template>
  <div class="preview">
    <div class="placeholder"></div>
    <div class="preview-view hover-box-shadow" id="preview">
      <router-view
        :profile="profile"
        :educations="educations"
        :experiences="experiences"
        :projects="projects"
        :skills="skills"
      ></router-view>
    </div>
    <div class="placeholder"></div>
    <el-button id="downloadBtn" type="primary" @click="downloadPDF" plain
      >DOWNLOAD AS PDF</el-button
    >
  </div>
</template>

<script>
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
export default {
  props: ["profile", "educations", "experiences", "projects", "skills"],
  methods: {
    downloadPDF() {
      this.$confirm(
        `Do you want to continue download with the selected template?`
      )
        .then(() => {
          var preview = document.getElementById("preview");
          preview.style.width = 793.7;
          preview.style.height = 1122.5;
          html2canvas(preview, {
            scale: 2
          }).then(canvas => {
            var img = canvas.toDataURL("image/png");
            var imgWidth = 210;
            var imgHeight = (canvas.height * imgWidth) / canvas.width;
            var doc = new jsPDF("p", "mm", "a4");
            var position = 0;

            doc.addImage(img, "PNG", 0, position, imgWidth, imgHeight);
            console.log("Saving...");

            doc.save("test.pdf");
          });
        })
        .catch(err => {
          console.log(err);
          console.log("User cancel download PDF.");
        });
    }
  }
};
</script>

<style>
.preview {
  font-family: "Times", "Arial";
  text-align: center;
}
</style>
