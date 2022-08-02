using Application.Common.Interfaces;
using MediatR.Pipeline;
using Microsoft.Extensions.Logging;

namespace Application.Common.Behaviours;

// https://codewithmukesh.com/blog/mediatr-pipeline-behaviour/
// https://codeopinion.com/logging-mediatr-requests/

// MediatR takes cares of DI registration ( services.AddMediatR(Assembly.GetExecutingAssembly()); )

// NOTE 5 Execution Order 
// Service starts
public class LoggingBehaviour<TRequest> : IRequestPreProcessor<TRequest> where TRequest : notnull
{
    private readonly ILogger _logger;
    private readonly ICurrentUserService _currentUserService;
    private readonly IIdentityService _identityService;

    public LoggingBehaviour(ILogger<TRequest> logger, ICurrentUserService currentUserService, IIdentityService identityService)
    {
        _logger = logger;
        _currentUserService = currentUserService;
        _identityService = identityService;
    }
    // NOTE 7 Execution Order

    public async Task Process(TRequest request, CancellationToken cancellationToken)
    {
        var requestName = typeof(TRequest).Name;
        var userId = _currentUserService.UserId ?? string.Empty;
        string userName = string.Empty;

        if (!string.IsNullOrEmpty(userId))
        {
            userName = await _identityService.GetUserNameAsync(userId);
        }

        _logger.LogInformation("Anysolution Request: {Name} {@UserId} {@UserName} {@Request}",
        requestName, userId, userName, request);
    }
}


