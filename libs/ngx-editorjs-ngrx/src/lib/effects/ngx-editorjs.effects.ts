import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { NgxEditorJSService, Block } from '@tinynodes/ngx-editorjs';
import { EditorJSActionTypes, SaveStart, SaveEnd } from '../actions/ngx-editorjs.actions';
import { switchMap, map, withLatestFrom, tap, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import EditorJS from '@editorjs/editorjs';

@Injectable()
export class NgxEditorJSEffects {
  constructor(private readonly actions$: Actions, private readonly editorService: NgxEditorJSService) {}

  @Effect({ dispatch: false })
  $save = this.actions$.pipe(
    ofType(EditorJSActionTypes.SaveStart),
    map((action: SaveStart) => {
      this.editorService.save(action.payload.holder);
      return action;
    }),
    withLatestFrom([
      map((action: SaveStart) => action),
      (action: SaveStart): Observable<Block[]> => this.editorService.getBlocks(action.payload.holder)
    ]),
    mergeMap(([action, blocks]) => {
      return new SaveEnd({
        holder: action.payload.holder,
        data: {
          time: Date.now(),
          version: EditorJS.version,
          blocks: blocks
        }
      });
    })
  );
}
