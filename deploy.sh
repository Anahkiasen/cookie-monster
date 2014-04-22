# Finalize new version
grunt
git commit -am "Rebuild files"
git push origin develop

# Deploy to develop
ssh Autopergamene/Autopergamene <<'ENDSSH'
cd /home/www/cookie-monster-dev
git pull
ENDSSH

# Merge into master
git checkout master
git merge develop
git push origin master

# Deploy to master
ssh Autopergamene/Autopergamene <<'ENDSSH'
cd /home/www/cookie-monster
git pull
ENDSSH