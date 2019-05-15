import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Block, NgxEditorJSService } from '@tinynodes/ngx-editorjs';
import { map, switchMap } from 'rxjs/operators';
import { EditorJSActionTypes, SaveEnd, SaveStart } from '../actions/ngx-editorjs.actions';

@Injectable()
export class NgxEditorJSEffects {
  constructor(private readonly actions$: Actions, private readonly editorService: NgxEditorJSService) {}

  @Effect({ dispatch: false })
  saveStart$ = this.actions$.pipe(
    ofType(EditorJSActionTypes.SaveStart),
    switchMap((action: SaveStart) => {
      this.editorService.save(action.payload.holder);
      return this.editorService.getBlocks(action.payload.holder).pipe(
        map((blocks: Block[]) => {
          return new SaveEnd({
            holder: action.payload.holder,
            data: {
              version: '',
              time: Date.now(),
              blocks
            }
          });
        })
      );
    })
  );

  @Effect()
  saveEnd$ = this.actions$;
}
