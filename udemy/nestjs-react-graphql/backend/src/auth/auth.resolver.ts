import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { SignInResponse } from './dto/signinResponse';
import { SignInInput } from './dto/signin.input';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => SignInResponse)
    @UseGuards(GqlAuthGuard)
    async signIn(
        @Args('signInInput') signInInput: SignInInput,
        @Context() context: any,
    ) {
        return await this.authService.signIn(context.user);
    }
}
