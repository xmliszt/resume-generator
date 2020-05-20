# !/usr/bin/env sh
npm run build
cd dist
git init
git remote add origin https://github.com/xmliszt/resume-generator.git
git fetch origin
git add . && git commit -m "Deploy"
git push origin master -f