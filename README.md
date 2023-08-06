This repo is a reproducible example of a GitHub issue.

# To reproduce it

- Clone the repo
- `yarn install`
- `cd apps/myapp`
- `yarn run android`

See the [metro.config.js](./apps/myapp/metro.config.js) file, and toggle between options 1 and 2.

```
const config = {
  // OPTION 1 - DOES NOT WORK
  // resolver: {
  //   unstable_enableSymlinks: true,
  // },

  // OPTION 2 - WORKS
  watchFolders: [
    path.resolve(__dirname, './node_modules/@my-app/foo')
  ]
};
```

## Monorepo structure

This is the intended project structure:

- apps
  - Deployable applications
- packages
  - Shared packages

Apps should be able to import and build code from the shared packages.

## nohoist

this project workspace is using `"nohoist": [ "**" ]`, as I had some errors when trying to `yarn run android` without it.

##  `unstable_enableSymlinks` issue

After reading the following article, I was under the impression that the only thing I had to do was to add `resolver: { unstable_enableSymlinks: true }` to my Metro config and everything would work.

[React Native 0.72 - Symlink Support, Better Errors, and more](https://reactnative.dev/blog/2023/06/21/0.72-metro-package-exports-symlinks#enabling-beta-features)

This is the import I'm making in `App.tsx`:

```
import { FOO } from '@my-app/foo';
```

Note: `@my-app/foo` is listed as a dependency of `myapp` and I can correctly see the symlink on `myapp` `node_modules` added by the yarn workspace.

Unfortunately, when I tried that, I got the following error:

> error: Error: Unable to resolve module @my-app/foo from /apps/myapp/App.tsx: @my-app/foo could not be found within the project or in these directories:
  node_modules
  ../../node_modules

Meaning Metro it's not following symlinks correctly.

The weird thing is that if I remove the `unstable_enableSymlinks` resolve config and simply add the path as a watch folder, it works.

This works:

```
watchFolders: [
  path.resolve(__dirname, './node_modules/@my-app/foo')
]
```

This does not work:

```
resolver: {
  unstable_enableSymlinks: true,
}
```