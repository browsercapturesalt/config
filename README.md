[![npm version](https://badge.fury.io/js/@browsercapturesalt%2Fconfig.svg)](https://badge.fury.io/js/@browsercapturesalt%2Fconfig)

# config

Edit your env var config, encrypt and upload it to a git repo.

```
yarn serve
```

Get your config decrypted from the git repo and work export it to env vars.

```
yarn add --dev @browsercapturesalt/config

eval $(node_modules/@browsercapturesalt/config/bin/env)
```

## Environment

#### ADMIN_PASS

Admin pass for the web page.

#### EXPRESSMIN_GITHUB_TOKEN

GitHub token with repo scope. Necessary for config upload.

## [Open in GitPod](https://gitpod.io/#https://github.com/browsercapturesalt/config)
