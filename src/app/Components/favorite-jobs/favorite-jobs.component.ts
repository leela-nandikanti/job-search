import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JobsService } from '../../jobs.service';

export interface JobData {
  id: number,
  companyName: string,
  title: string,
  companyLogo: string,
  reference: string,
  isSelectedFav: boolean
} 

@Component({
  selector: 'app-favorite-jobs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-jobs.component.html',
  styleUrl: './favorite-jobs.component.css'
})
export class FavoriteJobsComponent implements OnInit {
  nofavoriteJob: string | undefined;
  isFavoriteMarked: boolean = false;

  constructor(private jobsService: JobsService,
    private router: Router){}
    favoriteJobList: JobData[] = [];

  ngOnInit(): void {
    if(this.jobsService.favoriteJob.length !== 0) {
      this.isFavoriteMarked = true;
      this.favoriteJobList = this.jobsService.favoriteJob;
    } else {
      this.isFavoriteMarked = false;
      this.nofavoriteJob = 'No favorite Jobs selected'
    }
  }

  jobDetail(selectedJob: JobData) {
    this.jobsService.SelectedJob = selectedJob;
    this.router.navigate(['/jobDetails']);
  }

}
