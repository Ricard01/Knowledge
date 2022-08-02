using FluentValidation;
using MediatR;
using ValidationException = Application.Common.Exceptions.ValidationException;


namespace Application.Common.Behaviours;

// https://medium.com/the-cloud-builders-guild/validation-without-exceptions-using-a-mediatr-pipeline-behavior-278f124836dc
// https://www.youtube.com/watch?v=2JzQuIvxIqk&t=221s&ab_channel=NickChapsas 
// NOTE 6 Execution Order
// Service starts

public class ValidationBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
where TRequest : IRequest<TResponse> //  : notnull
{
    private readonly IEnumerable<IValidator<TRequest>> _validators;

    public ValidationBehaviour(IEnumerable<IValidator<TRequest>> validators)
    {
        _validators = validators;
    }

    // NOTE 8 Execution Order
    public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
    {

        if (_validators.Any())
        {
            var context = new ValidationContext<TRequest>(request);

            var validationResults = await Task.WhenAll(_validators.Select(v => v.ValidateAsync(context, cancellationToken)));
            var failures = validationResults.Where(r => r.Errors.Any()).SelectMany(r => r.Errors).ToList();

            if (failures.Any())
                throw new ValidationException(failures);
        }
        return await next();
    }
    // NOTE 12 Execution Order

}

