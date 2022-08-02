using FluentValidation;

namespace Application.Articles.Querys.GetArticlesWithPagination;

    public class GetArticlesWithPaginationValidator : AbstractValidator<GetArticlesWithPaginationQuery>
    {

        public GetArticlesWithPaginationValidator()
        {
            RuleFor(art => art.PageNumber).PageNumber();
            RuleFor(art => art.PageSize).PageSize();

        }

    }

