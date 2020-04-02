import { ControlValueAccessor } from '@angular/forms';
import { AfterContentInit, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';

export interface NgxTinynodesMatFieldComponent<T>
  extends ControlValueAccessor,
    MatFormFieldControl<T>,
    OnInit,
    OnDestroy,
    DoCheck,
    AfterContentInit {}
