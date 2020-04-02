module.exports = {
  name: 'ngx-tinynodes-components',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ngx-tinynodes-components',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
