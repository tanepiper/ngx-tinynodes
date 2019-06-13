module.exports = {
  name: 'ngx-editorjs',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ngx-editorjs',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
