using Application.Articles.Commands.CreateArticle;
using FluentValidation;

namespace Application.Articles.Commands
{
    // https://docs.fluentvalidation.net/en/latest/custom-validators.html#predicate-validator

    // NOTE 3 Execution Order
    public static class ArticlesRules
    {

        public static IRuleBuilderOptions<T, string> Title<T>(this IRuleBuilder<T, string> ruleBuilder) =>
        ruleBuilder.NotEmpty().Length(4, 120).WithMessage("Minim 4 chars or Max 120"); // if dont specified uses default message in my case in spanish dont know why


        public static IRuleBuilderOptions<T, string> Message<T>(this IRuleBuilder<T, string> ruleBuilder) =>
        ruleBuilder.NotEmpty().WithMessage("Message is required");


        public static IRuleBuilderOptions<T, int> CategoryId<T>(this IRuleBuilder<T, int> ruleBuilder) =>
        ruleBuilder.NotEmpty().WithMessage("Must Have a Category");

    }


}