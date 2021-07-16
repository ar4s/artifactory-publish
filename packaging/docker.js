const { execSync: exec } = require('child_process');
const core = require('@actions/core');
const uuid = require('uuid');

module.exports = function (host, username, password, name, group, version) {
  const temp = uuid.v4();
  const imagetag = `${host}/${group}/${name}`;
  core.info(exec(`docker build -t ${imagetag}:${temp} .`).toString());
  core.info(exec(`docker tag ${imagetag}:${temp} ${imagetag}:${version}`).toString());
  core.info(exec('echo \'{"auths": \' >> config.json').toString());
  core.info(exec(`curl -u ${username}:${password} -s "${host}/v2/auth" >> config.json`).toString());
  core.info(exec('echo " }" >> config.json').toString());
  core.info(exec(`sed -i 's%localhost:8081%${host}%' config.json`).toString());
  core.info(exec(`docker --config=./ push ${imagetag}:${version}`).toString());
};