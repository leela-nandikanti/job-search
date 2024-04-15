import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { JobsService } from '../../jobs.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface JobData {
  id: number,
  companyName: string,
  title: string,
  companyLogo: string,
  reference: string,
  isSelectedFav: boolean
}

@Component({
  selector: 'app-jobs-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jobs-list.component.html',
  styleUrl: './jobs-list.component.css'
})
export class JobsListComponent implements OnInit {
  http = inject(HttpClient)
  jobsList: JobData[] = [];
  isSelected: boolean = false;
  error: string = "data not loading";
  constructor(private jobsService: JobsService, private router: Router){}

  ngOnInit(): void {
    if (this.jobsService.selectedJobArray.length != 0) {
      this.jobsList = this.jobsService.DuplicateJobList;
    } else {
      this.getJobList();
    }
  }

  getJobList() {
    this.jobsService.featch().subscribe(data => {
      this.jobsList = data;
      this.jobsService.DuplicateJobList = this.jobsList;
    })
    }

    FavoriteMarked(job: JobData) {
      const item = this.jobsList.filter(x => x.id === job.id);
      if(item[0].isSelectedFav){
        item[0].isSelectedFav = false;
      } else {
        item[0].isSelectedFav = true;
      }
      this.onSelectJob(job);
    }

    onSelectJob(job: JobData) {
      if(this.jobsService.selectedJobArray.length === 0) {
        this.jobsService.selectedJobArray.push(job);
        this.jobsService.duplicateArray = this.jobsService.selectedJobArray;
        this.jobsService.favoriteJob = this.jobsService.selectedJobArray;
      } 
      else {
        for(let i = 0; i < this.jobsService.selectedJobArray.length ; i++){
            if(this.jobsService.selectedJobArray.find(x => x.id === job.id) === undefined) {
              this.jobsService.duplicateArray.push(job);
              break;
            } else {
              this.jobsService.duplicateArray.forEach((item, index) => {
                if(item.id === job.id) {
                  this.jobsService.duplicateArray.splice(index, 1);
                }
              });
              break;
            }
          }
          this.jobsService.selectedJobArray = this.jobsService.duplicateArray;
          this.jobsService.favoriteJob = this.jobsService.selectedJobArray;
        }
    }

    jobDetail(selectedJob: JobData) {
      this.jobsService.SelectedJob = selectedJob;
      this.router.navigate(['/jobDetails']);
    }

}
