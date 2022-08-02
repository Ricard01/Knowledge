using Application.Articles.Commands.CreateArticle;
using Application.Articles.Commands.DeleteArticle;
using Application.Articles.Commands.UpdateArticle;
using Application.Articles.Dto;
using Application.Articles.Querys.GetArticleById;
using Application.Articles.Querys.GetArticlesCategoryWithPagination;
using Application.Articles.Querys.GetArticlesSearchWithPagination;
using Application.Articles.Querys.GetArticlesTitlesSearch;
using Application.Articles.Querys.GetArticlesWithPagination;
using Application.Common.Models;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers;

public class ArticlesController : ApiControllerBase
{


    // NOTE 0 Execution Order
    // Request Comes In

    [HttpPost]
    public async Task<int> Create(CreateArticleCommand command)
    {
        // For debug purpose           
        var create = await Mediator.Send(command);

        // NOTE 13 Execution Order
        return create; //await Mediator.Send(command);
    }


    /// <summary>
    /// Get Article by ID
    /// </summary>
    /// <remarks>
    ///  Get The Article by ID 
    /// </remarks>

    [HttpGet("{id}")]
    public async Task<ActionResult<ArticleDto>> Get(int id)
    {
        var x = await Mediator.Send(new GetArticleByIdQuery(id));

        return x;
    }


    /// <summary>
    /// Search the TOP 1000 titles from query
    /// </summary>
    /// <remarks>
    /// Gets the titles for search-autocomplete to work.
    /// </remarks>

    [HttpGet("search/titlesByTerm")]
    public async Task<ActionResult<ArticlesTitlesVm>> GetArticlesTitlesSearch([FromQuery] GetArticlesTitlesSearchQuery query)
    {
        return await Mediator.Send(query);

    }



    [HttpGet("search")]
    public async Task<ActionResult<PaginatedList<ArticleDto>>> GetArticlesSearch([FromQuery] GetArticlesSearchWithPaginationQuery query)
    {
        return await Mediator.Send(query);
    }

    /// <summary>
    /// Get All The Articles
    /// </summary>
    /// <remarks>
    ///  Get All The Articles For the Article List Component
    /// </remarks>

    [HttpGet]
    public async Task<ActionResult<PaginatedList<ArticleDto>>> GetArticles([FromQuery] GetArticlesWithPaginationQuery query)
    {

        return await Mediator.Send(query);

    }



    /// <summary>
    /// Get  The Articles by Category
    /// </summary>
    /// <remarks>
    ///  Get  The Articles by Category in Article List Component if the CategoriId !=0
    /// </remarks>
    [HttpGet("Category")]
    public async Task<ActionResult<PaginatedList<ArticleDto>>> GetArticlesCategory([FromQuery] GetArticlesCategoryWithPaginationQuery query)
    {

        return await Mediator.Send(query);

    }


    [HttpPut("{id}")]
    public async Task<ActionResult> Update(int id, UpdateArticleCommand command)
    {
        if (id != command.Id)
        {
            return BadRequest();
        }

        await Mediator.Send(command);

        return NoContent();
    }


    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        await Mediator.Send(new DeleteArticleCommand(id));

        return NoContent();
    }


}


