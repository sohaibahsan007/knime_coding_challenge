import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, SharedModule, HomeRoutingModule, NgSelectModule, FormsModule, DragDropModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
