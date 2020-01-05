import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Policy } from '../policy/policy';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PoliciesService {
    apiUrl = 'http://localhost:5000/api';

    constructor (private http: HttpClient) {}

    getPolicies(): Observable<Policy[]> {
        return this.http.get<Policy[]>(this.apiUrl + '/policy');
    }

    getPolicy(policyNumber): Observable<Policy> {
        return this .http.get<Policy>(this.apiUrl + '/policy/' + policyNumber);
    }
    
    create(policy: Policy){
        return this.http.post(this.apiUrl + '/policy', policy)
        .pipe(map(res => res));
    }

    update(policy: Policy){
        return this.http.put(this.apiUrl + '/policy/' + policy.policyNumber, policy)    
          .pipe(map(res => res));    
    }
    
    delete(id:any){    
    return this.http.delete(this.apiUrl + '/policy/' + id)    
        .pipe(map(res => res));    
    }   

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
    
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
    
          // TODO: better job of transforming error for user consumption
          this.log(`${operation} failed: ${error.message}`);
    
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
    }
    
    /** Log a message with the MessageService */
    private log(message: string) {
        console.log(message);
    }
}