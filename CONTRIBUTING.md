# Contributing

- Fork it!
- Create a remote link with main repository: `git remote add upstream git@github.com:fdaciuk/ajax.git`;
- Update your local repository: `git fetch upstream`;
- Link `dev` branch with main repository: `git checkout upstream/dev -b dev`;
- Create your feature branch based on `dev`: `git checkout -b my-new-feature`;

## Running

Install local modules:

```console
npm i
```

Then, you can start the webserver and execute tests with the following command:

```console
npm run test:watch
```

- Write tests for your feature;

When you're ready, continue with next steps:

- Assure that the code has no lint errors;
- If some error was displayed, execute `npm run format` to fix it;
- Add your changes: `git add .`;
- Commit your changes: `git commit -m 'Add some feature'`;
- Push to the branch: `git push origin my-new-feature`;
- Submit a pull request for `dev` branch, and summon `@fdaciuk` :D

## Running tests once

Just execute `npm test`.

## Tips

- Send only one feature for Pull Request;
- Send small Pull Requests;
- Write tests for all features.

## Build steps

> If you are sending a pull request, you don't need run this commands.

With the latest code version on `dev` branch, it will be executed the following steps:

On `dev` branch, just Run this command:

```console
npm version <version>
```

When `<version>` may be `patch`, `minor` ou `major`.

And done ;)
