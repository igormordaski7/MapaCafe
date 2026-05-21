using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MapaCafe.Migrations
{
    /// <inheritdoc />
    public partial class OOMigrations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BebidasFavoritas");

            migrationBuilder.DropTable(
                name: "ComidasFavoritas");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "DadosUsuario",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Cafeterias",
                newName: "Id");

            migrationBuilder.AddColumn<string>(
                name: "bebidaFavorita",
                table: "Cafeterias",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "comidaFavorita",
                table: "Cafeterias",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "bebidaFavorita",
                table: "Cafeterias");

            migrationBuilder.DropColumn(
                name: "comidaFavorita",
                table: "Cafeterias");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "DadosUsuario",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Cafeterias",
                newName: "id");

            migrationBuilder.CreateTable(
                name: "BebidasFavoritas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CafeteriaId = table.Column<int>(type: "int", nullable: false),
                    Nome = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BebidasFavoritas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BebidasFavoritas_Cafeterias_CafeteriaId",
                        column: x => x.CafeteriaId,
                        principalTable: "Cafeterias",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ComidasFavoritas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CafeteriaId = table.Column<int>(type: "int", nullable: false),
                    Nome = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ComidasFavoritas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ComidasFavoritas_Cafeterias_CafeteriaId",
                        column: x => x.CafeteriaId,
                        principalTable: "Cafeterias",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_BebidasFavoritas_CafeteriaId",
                table: "BebidasFavoritas",
                column: "CafeteriaId");

            migrationBuilder.CreateIndex(
                name: "IX_ComidasFavoritas_CafeteriaId",
                table: "ComidasFavoritas",
                column: "CafeteriaId");
        }
    }
}
