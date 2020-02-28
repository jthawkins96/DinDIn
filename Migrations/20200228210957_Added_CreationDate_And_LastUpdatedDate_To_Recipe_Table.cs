using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DinDin.Migrations
{
    public partial class Added_CreationDate_And_LastUpdatedDate_To_Recipe_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "Recipes",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdatedDate",
                table: "Recipes",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "LastUpdatedDate",
                table: "Recipes");
        }
    }
}
