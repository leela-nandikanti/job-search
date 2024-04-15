import { Routes } from '@angular/router';
import { JobsListComponent } from './Components/jobs-list/jobs-list.component';
import { FavoriteJobsComponent } from './Components/favorite-jobs/favorite-jobs.component';
import { JobDetailsComponent } from './Components/job-details/job-details.component';

export const routes: Routes = [

    {path:"", component:JobsListComponent},
    {path:"jobsList", component:JobsListComponent},
    {path:"favJob", component:FavoriteJobsComponent},
    {path:"jobDetails", component:JobDetailsComponent}
];
