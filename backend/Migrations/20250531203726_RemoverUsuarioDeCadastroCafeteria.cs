using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MapaCafe.Migrations
{
    /// <inheritdoc />
    public partial class RemoverUsuarioDeCadastroCafeteria : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cafeterias_DadosUsuario_CadastroUsuarioId",
                table: "Cafeterias");

            migrationBuilder.DropForeignKey(
                name: "FK_Cafeterias_DadosUsuario_UsuarioId",
                table: "Cafeterias");

            migrationBuilder.DropIndex(
                name: "IX_Cafeterias_CadastroUsuarioId",
                table: "Cafeterias");

            migrationBuilder.DropColumn(
                name: "CadastroUsuarioId",
                table: "Cafeterias");

            migrationBuilder.AlterColumn<int>(
                name: "UsuarioId",
                table: "Cafeterias",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Cafeterias_DadosUsuario_UsuarioId",
                table: "Cafeterias",
                column: "UsuarioId",
                principalTable: "DadosUsuario",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cafeterias_DadosUsuario_UsuarioId",
                table: "Cafeterias");

            migrationBuilder.AlterColumn<int>(
                name: "UsuarioId",
                table: "Cafeterias",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CadastroUsuarioId",
                table: "Cafeterias",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Cafeterias_CadastroUsuarioId",
                table: "Cafeterias",
                column: "CadastroUsuarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cafeterias_DadosUsuario_CadastroUsuarioId",
                table: "Cafeterias",
                column: "CadastroUsuarioId",
                principalTable: "DadosUsuario",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Cafeterias_DadosUsuario_UsuarioId",
                table: "Cafeterias",
                column: "UsuarioId",
                principalTable: "DadosUsuario",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
