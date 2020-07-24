import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableHeadData, TableDummyData } from './filter-data';

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss']
})
export class FilterTableComponent implements OnInit {

  filterValues = {};
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'phone', 'website', 'status'];

  filterSelectObj = [];

  constructor() {
    this.filterSelectObj = TableHeadData;
  }

  ngOnInit() {
    this.getRemoteData();
    this.dataSource.filterPredicate = this.createFilter();
  }

  getFilterObject(fullObj, key) {
    const uniqChk = [];
    fullObj.filter((obj) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }

  getRemoteData() {
    const remoteDummyData = TableDummyData;

    this.dataSource.data = remoteDummyData;
    this.filterSelectObj.filter((o) => {
      o.options = this.getFilterObject(remoteDummyData, o.columnProp);
    });
  }

  filterChange(filter, event) {
    this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      console.log(data,filter);
      
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col].trim().toLowerCase().split(' ').forEach(word => {
              if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
                found = true
              }
            });
          }
          return found
        } else {
          return true;
        }
      }
      return nameSearch()
    }
    return filterFunction
  }

  resetFilters() {
    this.filterValues = {}
    this.filterSelectObj.forEach((value, key) => {
      value.modelValue = undefined;
    })
    this.dataSource.filter = "";
  }

  downloadFile() {
    const blob = new Blob((this.dataSource.filteredData) as Blob[], { type: 'application/vnd.ms-excel' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

}