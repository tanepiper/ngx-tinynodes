module.exports = {
  name: 'ngx-tinynodes-core',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ngx-tinynodes-core',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
