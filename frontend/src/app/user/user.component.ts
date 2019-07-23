import { Component, OnInit, ViewChild,  HostListener, HostBinding  } from '@angular/core';
import { UserServiceService } from './user-service.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers:  [ UserServiceService ]
})
export class UserComponent implements OnInit {

	form: FormGroup;

	displayedColumns = ['age','work','fnlwgt','education','education_num','marital_status',
		'occupation','relationship','race','sex','capital_gain','capital_loss',
		'hours_per_week','native_country','salary']

	dataSource;
	up_data = []
	sex = []
	relationship = []
	race = []
	selected_sex_data = []
	selected_relation_data = []
	selected_race_data = []

	next_url = '';
	total_users_count = 0;
	isLoadingResults = true;

	@ViewChild(MatSort) sort: MatSort;


  	constructor(
  		private userservice: UserServiceService,
  	) { 
  	}

  	ngOnInit() {
  		this.getUserList(this.next_url, this.selected_sex_data, this.selected_relation_data, this.selected_race_data);
  		this.getCatogeryDetails();
  	}

  	getUserList(next_url, selected_sex_data, selected_relation_data, selected_race_data){
  		this.userservice.getUserList(next_url, selected_sex_data, selected_relation_data, selected_race_data).subscribe(
  			data => this.setResponseTableData(data),
  			error => console.log(error)
  		)
  	}

  	setResponseTableData(data){
        // updating the up_data array
        this.next_url = data.next;
        this.up_data = this.up_data.concat(data.results)
        // updating table datasource
        this.dataSource = this.up_data;
        this.dataSource = new MatTableDataSource(this.up_data);
        this.dataSource.sort = this.sort;
        this.total_users_count = data.count;
        this.isLoadingResults = false;
    }

    onScroll() {
        if(this.next_url){
            this.getUserList(this.next_url, this.selected_sex_data, this.selected_relation_data, this.selected_race_data);
        }
    }

    getCatogeryDetails(){
    	this.userservice.getCatogeryList().subscribe(
    		data=> this.setResponseCatogery(data),
    		error=> console.log(error)
    	)
    }

    setResponseCatogery(data){
    	this.sex =  data.sex_c;
		this.relationship = data.relationship_c;
		this.race = data.race_c
    }

    onChange(data, status, value_type){
    	if(status){
    		if(value_type == 'sex'){
    			this.selected_sex_data.push(data);
    			this.next_url = '';
    		}else if(value_type == 'relationship'){
    			this.selected_relation_data.push(data);
    			this.next_url = '';
    		}else{
    			this.selected_race_data.push(data);
    			this.next_url = '';
    		}
    	}else{
    		if(value_type == 'sex'){
    			if(this.selected_sex_data.indexOf(data) > -1){
    				this.selected_sex_data.splice(this.selected_sex_data.indexOf(data), 1);
    			}
    			this.next_url = '';
    		}else if(value_type == 'relationship'){
    			if(this.selected_relation_data.indexOf(data) > -1){
    				this.selected_relation_data.splice(this.selected_relation_data.indexOf(data), 1);
    			}
    			this.next_url = '';
    		}else{
    			if(this.selected_race_data.indexOf(data) > -1){
    				this.selected_race_data.splice(this.selected_race_data.indexOf(data), 1);
    			}
    			this.next_url = '';
    		}
    	}
    }

    submit_catogery(){
    	this.up_data = [];
    	this.getUserList(this.next_url, this.selected_sex_data, this.selected_relation_data, this.selected_race_data);
    }

}


export interface UserDataInterface{
	age: number;
	work: string;
	fnlwgt: number;
	education: string;
	education_num: number;
	marital_status: string;
	occupation: string;
	relationship: string;
	race: string;
	sex: string;
	capital_gain: number;
	capital_loss: number;
	hours_per_week: number;
	native_country: string;
	salary: string;
}