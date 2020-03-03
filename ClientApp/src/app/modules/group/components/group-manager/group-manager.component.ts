import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupClientService } from 'src/app/core/services/group-client.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { RecipeClientService } from 'src/app/core/services/recipe-client.service';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { VotingClientService } from 'src/app/core/services/voting-client.service';

@Component({
  selector: 'app-group-manager',
  templateUrl: './group-manager.component.html',
  styleUrls: ['./group-manager.component.scss']
})
export class GroupManagerComponent implements OnInit, OnDestroy {
  paramsSubscription: Subscription;
  groupId: number;
  unselectedRecipes: Recipe[] = [];
  selectedRecipes: Recipe[] = [];
  get isVotingListFilled(): boolean {
    return this.selectedRecipes.length >= 3;
  }

  constructor(
    private route: ActivatedRoute,
    private recipeClient: RecipeClientService,
    private votingClient: VotingClientService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.groupId = params.id;
    });

    this.recipeClient.getRecipes().subscribe(recipes => (this.unselectedRecipes = recipes));
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  onAddRecipe(index: number) {
    const selectedRecipe = this.unselectedRecipes[index];
    this.unselectedRecipes.splice(index, 1);
    this.selectedRecipes.push(selectedRecipe);
  }

  onRemoveRecipe(index: number) {
    const removedRecipe = this.selectedRecipes[index];
    this.selectedRecipes.splice(index, 1);
    this.unselectedRecipes.push(removedRecipe);
  }

  onSetForVoting() {
    if (!this.isVotingListFilled) return;
    this.votingClient.setRecipesForVoting(this.groupId, this.selectedRecipes).subscribe(_ => {
      this.alertifyService.success('Recipes were set for voting!');
    }, error => {
      this.alertifyService.error('Unable to set recipes for voting.');
    });
  }
}
