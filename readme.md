# Knowledge Base

This is a solution for create a Knowledge Base a Single Page App (SPA) with Angular and ASP.NET Core following the principles of Clean Architecture.

Articles
![Articles-preview](https://github.com/Ricard01/img/blob/main/knowledge/Article.png)

Tags
![Tags-preview](https://github.com/Ricard01/img/blob/main/knowledge/Tags.png)


## Technologies

* ASP .NET Core 6.0
* Entity Framework Core 5.0
* Angular 13
* MediatR
* AutoMapper
* FluentValidation
* NUnit, FluentAssertions, Moq & Respawn
* Mysql

### Database Configuration

The template is configured to use an MySql database by default. Verify that the **DefaultConnection** connection string within **appsettings.json** points to a valid MySQL Server instance.

If you would like to use SQL Server, you will need to update **WebUI/appsettings.json** as follows:

```json
  "UseMysql": false,
```

When you run the application the database will be automatically created (if necessary) and the latest migrations will be applied.

## Started

* Inside WebUI Folder.
  * `dotnet run`

### Migrations

* Install in the root of the repository (if it is not installed)
  * `dotnet new tool-manifest`
  * `dotnet tool install dotnet-ef`
* `dotnet ef migrations add Initial -p Infrastructure/ -s WebUI/ -o Persistence/Migrations` (for more info add -v)
* `dotnet ef migrations remove -p Infrastructure/ -s WebUI/`

### Notes

* Default Email: admin@localhost Password: nolose.
* If u need to create the InitialMigration for SQL Server first make sure to comment **WebUI.csproj>Nswag Command**.
* In ArticleController u can find comments to help understan the request flow.
* I Didn't use nullable on the projects because i found confusing on Commands Dto and entitys. Is hard to read without an explanation.
* Install Todo Tree <https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree> and Add the tags NOTE and QN (Questions)to find 'special' comments.
