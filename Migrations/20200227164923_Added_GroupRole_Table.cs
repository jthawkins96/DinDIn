using Microsoft.EntityFrameworkCore.Migrations;

namespace DinDin.Migrations
{
    public partial class Added_GroupRole_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserGroup_AspNetRoles_RoleId",
                table: "UserGroup");

            migrationBuilder.AlterColumn<int>(
                name: "RoleId",
                table: "UserGroup",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "GroupRole",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupRole", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_UserGroup_GroupRole_RoleId",
                table: "UserGroup",
                column: "RoleId",
                principalTable: "GroupRole",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserGroup_GroupRole_RoleId",
                table: "UserGroup");

            migrationBuilder.DropTable(
                name: "GroupRole");

            migrationBuilder.AlterColumn<string>(
                name: "RoleId",
                table: "UserGroup",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_UserGroup_AspNetRoles_RoleId",
                table: "UserGroup",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
