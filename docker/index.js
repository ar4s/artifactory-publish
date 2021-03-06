const { execSync: exec } = require('child_process');
const core = require('@actions/core');
const uuid = require('uuid');

const host = core.getInput('host');
const username = core.getInput('username');
const password = core.getInput('password');
const name = core.getInput('name');
const path = core.getInput('path');
const version = core.getInput('version');

const temp = uuid.v4();
const imageTag = `${host}/${path}/${name}`;

try {
  exec(`docker login -u ${username} -p ${password} ${host}`);
  core.info(`logged into ${host}`);
  exec(`docker build -t ${imageTag}:${temp} .`);
  core.info('docker build successfully');
  exec(`docker tag ${imageTag}:${temp} ${imageTag}:${version}`);
  core.info(`docker tag created ${imageTag}:${temp} ${imageTag}:${version}`);
  exec(`docker push ${imageTag}:${version}`);
  core.info(`docker push finished ${imageTag}:${temp} ${imageTag}:${version}`);
} catch (e) {
  core.setFailed(e);
}