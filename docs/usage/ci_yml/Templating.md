# Templating .ci.yml

## Environment Variables

In addition to [Jenkins build
variables](https://wiki.jenkins-ci.org/display/JENKINS/Building+a+software+project#Buildingasoftwareproject-JenkinsSetEnvironmentVariables),
DotCi provides the following global variables:

* `DOTCI_BRANCH` -  current branch
* `DOTCI` - always true
* `CI` - always true
* `DOTCI_SHA` - current sha being built
* `GIT_URL` - git url
* `DOTCI_PUSHER` - github username whose git push triggred this build
* `DOTCI_PULL_REQUEST` - pull request number being built

## Groovy templating

`.ci.yml` acts as a [groovy
template](http://groovy.codehaus.org/Groovy+Templates) which is run
through a groovy preprocessor before build starts.

### Examples
Send extra notification to yourself for a build you started:
```groovy
notifications:
  <% if (DOTCI_PUSHER == 'joe') { %>
  - sms: 1234344453
  <% } %>
```

Run certain commands after tests when `DOTCI_BRANCH` is `production`:
```groovy
build:
   run: rake spec
   #run integration tests only on production branch
   <% if (DOTCI_BRANCH == 'production') { %>
   after: rake integration
   <%} %>
```

Notify hipchat room `DevOps` when `DOTCI_BRANCH` is `master`:
```groovy
notifications:
  <% if (DOTCI_BRANCH == 'master') { %>
  - hipchat: 'DevOps'
  <%}%>
```

Pass `DOTCI_BRANCH` as a parameter to webhook:
```groovy
plugins:
  - webhook:
      url: http://example.com/hook
      params:
        branch: ${DOTCI_BRANCH}
```

Artifact files when `DOTCI_BRANCH` is `master`:
```groovy
build:
  <% if( DOTCI_BRANCH != 'master') {%>
  - artifacts: 'packages/**/*.war'
  <%}%>
```
