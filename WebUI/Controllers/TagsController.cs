using Application.Tags.Commands.CreateTag;
using Application.Tags.Commands.DeleteTag;
using Application.Tags.Commands.UpdateTag;
using Application.Tags.Queries.GetTags;
using Application.Tags.Queries.GetTagsByCategory;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers;


public class TagsController : ApiControllerBase
{
    
    [HttpPost]
    public async Task<int> Create(CreateTagCommand command)
    {
     
        return await Mediator.Send(command);

    }

    // [Produces("application/json")]
    [HttpGet]
    public async Task<ActionResult<TagsVm>> GetTags()
    {
        return await Mediator.Send(new GetTagsQuery());
    }

    /// <summary>
    /// Get the tags by the Category Id
    /// </summary>
    /// <remarks>
    /// When creating a new article and the Category has been selected search the tags by that Category Id
    /// </remarks>

    [HttpGet("Category/{id}")]
    public async Task<ActionResult<TagsCategoryVm>> GetTagsByCategory(int id)
    {
        return await Mediator.Send(new GetTagsByCategoryQuery(id));

    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(int id, UpdateTagCommand command)
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

        var x = await Mediator.Send(new DeleteTagCommand(id));

        return NoContent();

    }


}
