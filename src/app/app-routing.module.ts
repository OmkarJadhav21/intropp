import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilterTableComponent } from './filter-table/filter-table.component';
import { AiDropComponent } from './ai-drop/ai-drop.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'ai-drop', pathMatch: 'full'
  },
  {
    path: 'filter', component: FilterTableComponent
  },
  {
    path: 'ai-drop', component: AiDropComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
