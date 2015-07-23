# Contributing

- Fork it!
- Create a remote link with main repository: `git remote add upstream git@github.com:fdaciuk/ajax.git`;
- Update your local repository: `git fetch upstream`;
- Link `dev` branch with main repository: `git checkout upstream/dev -b dev`;
- Create your feature branch based on `dev`: `git checkout -b my-new-feature`;

## Running

You need to install `gulp`, `mocha`, `karma-cli` and `istanbul` globally:

```sh
[sudo] npm i -g gulp mocha istanbul karma-cli
```

After that, you need to install local modules:

```sh
npm i
```

Then, you can start the webserver and execute tests with the following command:

```sh
gulp
```

- Write tests for your feature;

When you're ready, continue with next steps:

- Run `gulp webserver test lint` to run tests and assure that the code has no lint errors;
- Add your changes: `git add .`;
- Commit your changes: `git commit -m 'Add some feature'`;
- Push to the branch: `git push origin my-new-feature`;
- Submit a pull request for `dev` branch :D

## Tips

- Send only one feature for Pull Request;
- Send small Pull Requests;
- Write tests for all features.
