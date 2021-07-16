const { execSync: exec } = require('child_process');
const core = require('@actions/core');
const uuid = require('uuid');

module.exports = function (host, username, password, name, group, version) {
  const temp = uuid.v4();
  const imagetag = `${host}/${group}/${name}`;
  core.info(exec(`docker login -u ${username} -p ${password} artifactory.allegrogroup.com`).toString());
  core.info(exec(`docker build -t ${imagetag}:${temp} .`).toString());
  core.info(exec(`docker tag ${imagetag}:${temp} ${imagetag}:${version}`).toString());
  core.info(exec('echo \'{"auths": \' >> config.json').toString());
  core.info(exec(`docker push ${imagetag}:${version}`).toString());
};