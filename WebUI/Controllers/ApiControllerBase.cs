using MediatR;
using Microsoft.AspNetCore.Mvc;


namespace WebUI.Controllers;

// With this you don't need to inject IMediator to the constructor of BaseController.
// and to all sub classes of BaseController. So it's saves some boilerplate, but also makes the dependency less explicit. 
// https://stackoverflow.com/questions/59041523/httpcontext-requestservices-getservicet-vs-services-addscopet

[ApiController]
[Route("api/[controller]")]
public abstract class ApiControllerBase : ControllerBase
{
    private ISender _mediator = null!;

    protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetService<ISender>();
}

