import { Action } from '@ngrx/store';
import { OutputData } from '@editorjs/editorjs';

export enum EditorJSActionTypes {
  SaveStart = '[ngx-editorjs] Start Save',
  SaveEnd = '[ngx-editorjs] Start End',
  NotReady = '[ngx-editorjs] Not Ready',
  Ready = '[ngx-editorjs] Ready',
  Changed = '[ngx-editorjs] Changed'
}

export class SaveStart implements Action {
  readonly type = EditorJSActionTypes.SaveStart;
  constructor(public payload: { holder: string }) {}
}

export class SaveEnd implements Action {
  readonly type = EditorJSActionTypes.SaveEnd;
  constructor(public payload: { holder: string; data: OutputData }) {}
}

export class NotReady implements Action {
  readonly type = EditorJSActionTypes.NotReady;
  constructor(public payload: { holder: string }) {}
}

export class Ready implements Action {
  readonly type = EditorJSActionTypes.Ready;
  constructor(public payload: { holder: string }) {}
}

export class Changed implements Action {
  readonly type = EditorJSActionTypes.Changed;
  constructor(public payload: { holder: string; data: OutputData }) {}
}

export type NgxEditorJSActions = SaveStart | SaveEnd | NotReady | Ready | Changed;
