module.exports = {
  name: 'ngx-editorjs',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ngx-editorjs',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
