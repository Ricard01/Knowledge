using FluentValidation;

namespace Application.Articles.Querys;

// https://docs.fluentvalidation.net/en/latest/custom-validators.html#predicate-validator
public static class ArticlesPaginationRules
{
    public static IRuleBuilderOptions<T, string> Title<T>(this IRuleBuilder<T, string> ruleBuilder) =>
ruleBuilder.NotEmpty().WithMessage("An error occurred, no search term was specified");

    public static IRuleBuilderOptions<T, string> CategoryId<T>(this IRuleBuilder<T, string> ruleBuilder) =>
    ruleBuilder.NotEmpty().WithMessage("Category is required.");

    public static IRuleBuilderOptions<T, int> PageNumber<T>(this IRuleBuilder<T, int> ruleBuilder) =>
 ruleBuilder.GreaterThanOrEqualTo(1).WithMessage("PageSize at least greater than or equal to 1.");

    public static IRuleBuilderOptions<T, int> PageSize<T>(this IRuleBuilder<T, int> ruleBuilder) =>
 ruleBuilder.GreaterThanOrEqualTo(1).WithMessage("PageSize at least greater than or equal to 1.");

}


