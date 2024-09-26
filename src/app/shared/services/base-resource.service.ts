import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";
import { BaseResourceModel } from "../models/base-resource.model";
import { Injector } from "@angular/core";

export abstract class BaseResourceService<T extends BaseResourceModel> {
 
    protected http: HttpClient;

    constructor(
        protected apiPath: string,
        protected injector: Injector,
        protected jsonDataToResourceFn: (jsonData: any) => T
    ) { 
        this.http = injector.get(HttpClient);
    }

    listarResources(): Observable<T[]> {
        return this.http.get(this.apiPath).pipe(
            map((jsonData: any) => this.jsonDataToResources(jsonData)),
            catchError(this.handleError)
        )
    }

    getById(id: number): Observable<T> {
        const url = `${this.apiPath}/${id}`;
        return this.http.get(url).pipe(
            map((jsonData: any) => this.jsonDataToResource(jsonData)),
            catchError(this.handleError)
        )
    }

    delete(id: number): Observable<any> {
        const url = `${this.apiPath}/${id}`
        return this.http.delete(url).pipe(
            map(() => null),
            catchError(this.handleError)
        )
    }

    update(resource: T): Observable<T> {
        return this.http.put(`${this.apiPath}/${resource.id}`, resource).pipe(
            map(() => resource),
            catchError(this.handleError)
        )
    }

    create<T extends BaseResourceModel>(resource: T): Observable<T> {
        return this.http.post(`${this.apiPath}`, resource).pipe(
            map(() => resource),
            catchError(this.handleError)
        )
    }


    protected jsonDataToResources(jsonData: any[]): T[] {
        const resources: T[] = [];
        jsonData.forEach(element => resources.push( this.jsonDataToResourceFn(element) ));
        return resources;
    }

    protected jsonDataToResource(jsondata: any): T {
        return this.jsonDataToResourceFn(jsondata);
    }

    protected handleError(error: any): Observable<any> {
        return throwError(error);
    }
}