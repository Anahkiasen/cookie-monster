# Finalize new version
grunt
git commit -am "Rebuild files"
git push origin develop

# Merge into master
git checkout master
git merge develop
git push origin master

# Deploy
ssh digitalocean <<'ENDSSH'
cd /home/www/cookie-monster
git pull
ENDSSH