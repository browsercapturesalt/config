. env.sh
rm repo.tar.gz
git archive --format=tar.gz --output=repo.tar.gz HEAD
node utils.js uploadtargz
rm repo.tar.gz