import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsService } from '../../jobs.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface JobDetailsData {
  id: number,
  companyName: string,
  title: string,
  companyLogo: string,
  reference: string,
  location: string,
  industries: string,
  types: string,
  description: string,
  publishDate: string
}

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit{
  constructor(private jobsService: JobsService,
              private router: Router){}

    http = inject(HttpClient)
    detailsOfJob!: JobDetailsData;

  backToList() {
    this.router.navigate(['/jobsList']);
  }

  ngOnInit(): void {
    const ListId = this.jobsService.SelectedJob.id;
    this.getJobDetails(ListId);
  }

  getJobDetails(id: number) {
    const url = `${'/jobs'}/${id}`;
     this.http.get<JobDetailsData>(url).subscribe((respdata => {
      this.detailsOfJob = respdata;
    }))
  }

}
