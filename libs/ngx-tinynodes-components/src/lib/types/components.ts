import { ControlValueAccessor } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { AfterContentInit, DoCheck, OnDestroy, OnInit } from '@angular/core';

export interface NgxTinynodesMatFieldComponent<T> extends ControlValueAccessor,
  MatFormFieldControl<T>,
  OnInit,
  OnDestroy,
  DoCheck,
  AfterContentInit {
}
