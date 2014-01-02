git checkout master
git merge develop

ssh digitalocean <<'ENDSSH'
cd /home/www/cookie-monster
git pull
ENDSSH