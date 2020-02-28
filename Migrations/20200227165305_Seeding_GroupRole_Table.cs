using Microsoft.EntityFrameworkCore.Migrations;

namespace DinDin.Migrations
{
    public partial class Seeding_GroupRole_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO GroupRole(Name) VALUES('Owner'), ('Member')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM GroupRole WHERE Name IN ('Owner', 'Member')");
        }
    }
}
