git push origin develop
git checkout master
git merge develop
git push origin master

ssh digitalocean <<'ENDSSH'
cd /home/www/cookie-monster
git pull
ENDSSH