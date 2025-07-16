import { GqlModuleOptions } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

export async function graphqlConfig(): Promise<GqlModuleOptions> {
  return {
    driver: ApolloDriver,
    autoSchemaFile: true,
    sortSchema: true
  }

}