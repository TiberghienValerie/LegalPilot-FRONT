import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Collection} from "../models/collection";
import {environment} from "../../environments/environment";



export abstract class AbstractApiService<T, L> {
  readonly baseUrl: string;
  apiURL = environment.apiURL;

  constructor(
    private httpClient: HttpClient,
    resourceName: string,
  ) {
    this.baseUrl = `${this.apiURL}/${resourceName}/`;
  }

  getCollection(page: number = 1 ): Observable<Collection<L>> {
    return this.httpClient.get<Collection<L>>(this.baseUrl, {
      params: {
        page: page.toString(),
      },
    });
  }

  getCollectionSearch(equipe: number, page: number = 1): Observable<Collection<L>> {

   let params = new HttpParams();

   

   
   if(equipe!=0) {
      params = params.append('equipe.id', equipe);
    }

    

    params = params.append(page.toString(), page);


    return this.httpClient.get<Collection<L>>(this.baseUrl,
        { params: params }
    );
  }

  getItem(id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}${id}`);
  }

  getCollectionSpecifique(url: string): Observable<Collection<L>> {
    return this.httpClient.get<Collection<L>>(url);
  }


}
