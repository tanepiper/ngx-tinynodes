module.exports = {
  name: 'ngx-tinynodes',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ngx-tinynodes/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
