import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RouterModule } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { HeroesComponent } from "./heroes/heroes.component";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: "dashboard",
        component: DashboardComponent
      },
      { path: "heroes", component: HeroesComponent },
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
      },
      {
        path: "**",
        redirectTo: "dashboard",
        pathMatch: "full"
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
