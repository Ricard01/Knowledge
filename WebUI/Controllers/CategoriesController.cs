using System.Threading.Tasks;
using Application.Categories.Commands.CreateCategory;
using Application.Categories.Commands.DeleteCategory;
using Application.Categories.Commands.UpdateCategory;
using Application.Categories.Queries.GetCategories;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers;


    public class CategoriesController : ApiControllerBase
    {

        [HttpPost]
        public async Task<int> Create(CreateCategoryCommand command)
        {
            return await Mediator.Send(command);
        }


        [HttpGet]
        public async Task<ActionResult<CategoriesVm>> GetCategories()
        {
            return await Mediator.Send(new GetCategoriesQuery());
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, UpdateCategoryCommand command)
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

           await Mediator.Send(new DeleteCategoryCommand (id));

            return NoContent();

        }


    }
