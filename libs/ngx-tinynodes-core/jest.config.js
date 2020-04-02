module.exports = {
  name: 'ngx-tinynodes-core',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ngx-tinynodes-core',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
