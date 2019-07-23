import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(
  	private http: HttpClient
  ) { }

  getUserList(next_url:string, sex_data, relation_data, race_data): Observable<Object>{
	let catogery_sex = sex_data ? sex_data : []
	let catogery_rel = relation_data ? relation_data : []
	let catogery_race = race_data ? race_data : []

	let page_get_url = next_url ? next_url : 'http://localhost:8000/user/';  	
	if(next_url){
		page_get_url = page_get_url + '&catogery_sex='+catogery_sex+'&catogery_rel='+catogery_rel+'&catogery_race='+catogery_race;
	}else{
		page_get_url = page_get_url + '?catogery_sex='+catogery_sex+'&catogery_rel='+catogery_rel+'&catogery_race='+catogery_race;
	}
	return this.http.get(page_get_url);
  }

  getCatogeryList(): Observable<Object>{
  	return this.http.get('http://localhost:8000/list_catogery/');
  }

}
