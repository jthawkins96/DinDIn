using Microsoft.EntityFrameworkCore.Migrations;

namespace DinDin.Migrations
{
    public partial class Added_VotingSets_Table_And_VotingSetItems_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VotingSets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GroupId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VotingSets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VotingSets_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VotingSetItems",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VotingSetId = table.Column<int>(nullable: false),
                    NumberOfVotes = table.Column<int>(nullable: false),
                    RecipeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VotingSetItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VotingSetItems_Recipes_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VotingSetItems_VotingSets_VotingSetId",
                        column: x => x.VotingSetId,
                        principalTable: "VotingSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VotingSetItems_RecipeId",
                table: "VotingSetItems",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_VotingSetItems_VotingSetId",
                table: "VotingSetItems",
                column: "VotingSetId");

            migrationBuilder.CreateIndex(
                name: "IX_VotingSets_GroupId",
                table: "VotingSets",
                column: "GroupId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VotingSetItems");

            migrationBuilder.DropTable(
                name: "VotingSets");
        }
    }
}
