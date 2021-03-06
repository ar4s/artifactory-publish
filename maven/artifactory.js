module.exports = {
  deployArtifactUrl(username, password, host, group, name, version, currentBranch, isSnapshot) {
    return artifactUrl(username, password, host, group, name, version, currentBranch, isSnapshot, '-deploy.zip');
  },

  provisioningArtifactUrl(username, password, host, group, name, version, currentBranch, isSnapshot) {
    return artifactUrl(username, password, host, group, name, version, currentBranch, isSnapshot, '-provisioning.zip');
  }
};

function artifactUrl(username, password, host, group, name, version, currentBranch, isSnapshot, fileNameSuffix = '.zip') {
  const snapshotSuffix = isSnapshot ? '-SNAPSHOT' : '';
  const brachSuffix = isSnapshot ? `-${slugify(currentBranch)}` : '';
  const targetPath = group.replace(/\./g, '/');
  const targetVersion = `${version}${brachSuffix}${snapshotSuffix}`;
  const targetFileName = `${name}-${targetVersion}${fileNameSuffix}`;
  return new URL(
    `/artifactory/allegro-${isSnapshot ? 'snapshots' : 'releases'}-local/${targetPath}/${name}/${targetVersion}/${targetFileName}`,
    `https://${username}:${password}@${host}`
  );
}

function slugify(input) {
  return input.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/\/+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}