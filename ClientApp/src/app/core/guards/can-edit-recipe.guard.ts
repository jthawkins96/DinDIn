import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeClientService } from '../services/recipe-client.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanEditRecipeGuard implements CanActivate {
  constructor(private recipeClient: RecipeClientService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.recipeClient.canEditRecipe(next.params.id).pipe(
        tap(canEdit => {
          console.log(canEdit)
          if (!canEdit) {
            this.router.navigate(['/recipes']);
          }
        })
      );
  }

}
