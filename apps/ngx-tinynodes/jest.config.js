module.exports = {
  name: 'ngx-tinynodes',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ngx-tinynodes/',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
