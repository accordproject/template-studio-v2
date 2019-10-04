# Accord Project Template Studio (v2)

[![Netlify Status](https://api.netlify.com/api/v1/badges/088bd784-321b-49d4-940b-8c1c0af6942f/deploy-status)](https://app.netlify.com/sites/accordproject-studio/deploys)
[![Netlify](https://img.shields.io/badge/Netlify-Netlify%20preview%20of%20Template%20Studio%20V2-green)](https://accordproject-studio.netlify.com/)
[![GitHub license](https://img.shields.io/github/license/accordproject/cicero?color=bright-green)](./LICENSE)
[![join slack](https://img.shields.io/badge/Slack-Join%20Slack-blue)](https://accord-project-slack-signup.herokuapp.com/)

[Preview Template Studio V2 on Netlify](https://accordproject-studio.netlify.com/)

## Notes for development:

In order to link another React component to template-studio-v2 for development, following these steps:
1. Ensure template-studio-v2 is on your local machine.
2. Ensure your React component has been built - in its root directory, run `npm run build`.
3. In the root directory of your React component intended to link, run `npm link`.
4. Copy the `name` property of this React component from its `package.json` file.
5. In the root directory of template-studio-v2, run `npm link <INSERT NAME HERE>`.
6. Refresh and ensure the `<NAME>` is in the `node_modules` directory.
7. Run `npm run start`.

(Adding `npm` modules to this repository will unlink anything linked by `npm link`.)

---

## Available Scripts

In the project directory, you can run:

#### `npm run start`

Runs the app in the development mode.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm run test`

Launches JEST over the repository.
Current snapshot tests require `npm test -- -u` in order to update when all changes are final.

#### `npm run lint`

Runs ESLint.

#### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

---

<p align="center">
  <a href="https://www.accordproject.org/">
    <img src="assets/APLogo.png" alt="Accord Project Logo" width="400" />
  </a>
</p>

Accord Project is an open source, non-profit, initiative working to transform contract management and contract automation by digitizing contracts. Accord Project operates under the umbrella of the [Linux Foundation][linuxfound]. The technical charter for the Accord Project can be found [here][charter].

## Learn More About Accord Project

### Overview
* [Accord Project][apmain]
* [Accord Project News][apnews]
* [Accord Project Blog][apblog]
* [Accord Project Slack][apslack]
* [Accord Project Technical Documentation][apdoc]
* [Accord Project GitHub][apgit]


### Documentation
* [Getting Started with Accord Project][docwelcome]
* [Concepts and High-level Architecture][dochighlevel]
* [How to use the Cicero Templating System][doccicero]
* [How to Author Accord Project Templates][docstudio]
* [Ergo Language Guide][docergo]

## Contributing

The Accord Project technology is being developed as open source. All the software packages are being actively maintained on GitHub and we encourage organizations and individuals to contribute requirements, documentation, issues, new templates, and code.

Find out what’s coming on our [blog][apblog].

Join the Accord Project Technology Working Group [Slack channel][apslack] to get involved!

For code contributions, read our [CONTRIBUTING guide][contributing] and information for [DEVELOPERS][developers].

## License <a name="license"></a>

Accord Project source code files are made available under the [Apache License, Version 2.0][apache].
Accord Project documentation files are made available under the [Creative Commons Attribution 4.0 International License][creativecommons] (CC-BY-4.0).

Copyright 2018-2019 Clause, Inc. All trademarks are the property of their respective owners. See [LF Projects Trademark Policy](https://lfprojects.org/policies/trademark-policy/).

[sagaGuide]: https://blog.logrocket.com/understanding-redux-saga-from-action-creators-to-sagas-2587298b5e71
[reduxSaga]: https://redux-saga.js.org/

[linuxfound]: https://www.linuxfoundation.org
[charter]: https://github.com/accordproject/template-studio-v2/blob/master/CHARTER.md
[apmain]: https://accordproject.org/ 
[apworkgroup]: https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=MjZvYzIzZHVrYnI1aDVzbjZnMHJqYmtwaGlfMjAxNzExMTVUMjEwMDAwWiBkYW5AY2xhdXNlLmlv&tmsrc=dan%40clause.io
[apblog]: https://medium.com/@accordhq
[apnews]: https://www.accordproject.org/news/
[apgit]:  https://github.com/accordproject/
[apdoc]: https://docs.accordproject.org/
[apslack]: https://accord-project-slack-signup.herokuapp.com

[docspec]: https://docs.accordproject.org/docs/spec-overview.html
[docwelcome]: https://docs.accordproject.org/docs/accordproject.html
[dochighlevel]: https://docs.accordproject.org/docs/spec-concepts.html
[docergo]: https://docs.accordproject.org/docs/logic-ergo.html
[docstart]: https://docs.accordproject.org/docs/accordproject.html
[doccicero]: https://docs.accordproject.org/docs/basic-use.html
[docstudio]: https://docs.accordproject.org/docs/advanced-latedelivery.html

[contributing]: https://github.com/accordproject/template-studio-v2/blob/master/CONTRIBUTING.md
[developers]: https://github.com/accordproject/template-studio-v2/blob/master/DEVELOPERS.md

[apache]: https://github.com/accordproject/template-studio-v2/blob/master/LICENSE
[creativecommons]: http://creativecommons.org/licenses/by/4.0/
