module.exports = {
  name: 'ngx-editorjs-demo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ngx-editorjs-demo',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
