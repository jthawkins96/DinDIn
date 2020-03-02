import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GroupClientService } from '../services/group-client.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanEditGroupGuard implements CanActivate {
  constructor(private groupClient: GroupClientService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.groupClient.canEditGroup(next.params.id).pipe(
      tap(canEdit => {
        if (!canEdit) {
          this.router.navigate(['/groups']);
        }
      })
    );
  }
}
