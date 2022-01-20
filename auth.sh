. env.sh
printf "//registry.npmjs.org/:_authToken=${BROWSERCAPTURESALT_NPM_TOKEN}\n" >> ~/.npmrc
npm whoami