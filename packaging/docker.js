const { execSync: exec } = require('child_process');
const core = require('@actions/core');

module.exports = function (host, username, password, name, group, version) {
  const imagetag = `${host}/${group}/${name}`;
  const command = `
    docker build -t ${imagetag}:${version} .
    docker tag ${imagetag}:${version}
    echo '{"auths": ' >> config.json
    curl -u ${username}:${password} -s "${host}/v2/auth" >> config.json
    echo " }" >> config.json
    sed -i 's%localhost:8081%${host}%' config.json
    docker --config=./ push ${imagetag}:${version}
  `.replace(/\n/g, ' \\\n');
  const stdout = exec(command);
  core.info(String(stdout).trim());
};