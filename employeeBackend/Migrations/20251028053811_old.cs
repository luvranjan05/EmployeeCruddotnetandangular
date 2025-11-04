using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace employeeBackend.Migrations
{
    /// <inheritdoc />
    public partial class old : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GeoFenceSettings");

            migrationBuilder.DropColumn(
                name: "CheckInLatitude",
                table: "Attendance");

            migrationBuilder.DropColumn(
                name: "CheckInLocation",
                table: "Attendance");

            migrationBuilder.DropColumn(
                name: "CheckInLongitude",
                table: "Attendance");

            migrationBuilder.DropColumn(
                name: "CheckInPhoto",
                table: "Attendance");

            migrationBuilder.DropColumn(
                name: "CheckOutLatitude",
                table: "Attendance");

            migrationBuilder.DropColumn(
                name: "CheckOutLocation",
                table: "Attendance");

            migrationBuilder.DropColumn(
                name: "CheckOutLongitude",
                table: "Attendance");

            migrationBuilder.DropColumn(
                name: "CheckOutPhoto",
                table: "Attendance");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "CheckInLatitude",
                table: "Attendance",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CheckInLocation",
                table: "Attendance",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "CheckInLongitude",
                table: "Attendance",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CheckInPhoto",
                table: "Attendance",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "CheckOutLatitude",
                table: "Attendance",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CheckOutLocation",
                table: "Attendance",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "CheckOutLongitude",
                table: "Attendance",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CheckOutPhoto",
                table: "Attendance",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "GeoFenceSettings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OfficeAddress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OfficeLatitude = table.Column<double>(type: "float", nullable: false),
                    OfficeLongitude = table.Column<double>(type: "float", nullable: false),
                    RadiusInMeters = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GeoFenceSettings", x => x.Id);
                });
        }
    }
}
