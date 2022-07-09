# atom-questionnaire

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

## End to End Testing (after launching the local web app)

```
npm run test
```

```
after npm run staging,
npx cypress open
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).


## specificing a test file
> ./node_modules/cypress/bin/cypress run  --spec="cypress/e2e/record2.cy.js"  --env atom_env=local --headed