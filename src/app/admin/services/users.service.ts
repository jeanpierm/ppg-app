import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ApiResponse,
  PaginatedApiResponse,
} from '../../core/models/api-response.model';
import { PaginatedApiQueryParams } from '../../core/models/paginated-api-query-params.interface';
import { CreateUserRequest } from '../interfaces/create-user-request.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  static readonly USERS_URL: string = environment.ppgApi.users;

  users: User[] = [];
  fetchLoading: boolean = true;
  resultsLength = 0;

  constructor(private http: HttpClient) {}

  loadUsers(params: PaginatedApiQueryParams): void {
    if (!this.fetchLoading) {
      this.fetchLoading = true;
    }

    this.getUsers(params).subscribe((res) => {
      this.users = res.data;
      this.resultsLength = res.totalItems;
      this.fetchLoading = false;
    });
  }

  getUsers({
    size: sizePerPage,
    page: pageIndex,
    search,
  }: PaginatedApiQueryParams): Observable<any> {
    const url = new URL(`${UsersService.USERS_URL}`);
    if (sizePerPage) {
      url.searchParams.set('size', sizePerPage.toString());
    }
    if (pageIndex) {
      url.searchParams.set('page', pageIndex.toString());
    }
    if (search) {
      url.searchParams.set('search', search);
    }
    return this.http.get<PaginatedApiResponse<User>>(url.toString());
  }

  saveUser(user: CreateUserRequest) {
    const url = `${UsersService.USERS_URL}`;
    const body = user;
    return this.http.post<ApiResponse>(url, body);
  }

  inactive(userId: string) {
    const url = `${UsersService.USERS_URL}/${userId}`;
    return this.http.delete<ApiResponse>(url);
  }

  active(userId: string) {
    const url = `${UsersService.USERS_URL}/${userId}`;
    return this.http.post<ApiResponse>(url, null);
  }
}
