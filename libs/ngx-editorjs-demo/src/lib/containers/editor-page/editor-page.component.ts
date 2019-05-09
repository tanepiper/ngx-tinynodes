import { AfterContentInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Block, NgxEditorJSService } from '@tinynodes/ngx-editorjs';
import { combineLatest, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'ngx-editor-page',
  templateUrl: 'editor-page.component.html',
  styleUrls: ['editor-page.component.scss']
})
export class EditorPageComponent implements AfterContentInit {
  constructor(private readonly fb: FormBuilder, private readonly editor: NgxEditorJSService) {}

  private form$ = this.fb.group({
    pageTitle: ['', [Validators.required]],
    pageTags: this.fb.array([])
  });

  private pageData$: Observable<(FormGroup | Observable<Block<any>[]>)[]>;

  get form(): FormGroup {
    return this.form$;
  }

  ngAfterContentInit() {
    console.log(this);
    this.pageData$ = combineLatest([this.form$, this.editor.blocks]);
  }

  public onSubmit() {
    this.pageData$.pipe(
      tap(console.log),
      switchMap(([form, blocks]) => {
        console.log(form, blocks);
        return [];
      })
    );
  }
}
