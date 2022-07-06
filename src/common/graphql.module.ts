import { Module } from '@nestjs/common';
import { GraphQLModule, GqlModuleOptions } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';

// @Module({
//   imports: [
//     GraphQLModule.forRoot<ApolloDriverConfig>({
//       driver: ApolloDriver,
//       autoSchemaFile: './schema.gql',
//       debug: true,
//       playground: true,
//     }),
//   ],
// })

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigService],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          autoSchemaFile: config.get<string>('GRAPHQL_SCHEMA_FILEPATH'),
          sortSchema: true,
          debug: (config.get<string>('NODE_ENV') !== 'production') as boolean,
          uploads: false,
          path: '/graphql',
          introspection: config.get<boolean>('GRAPHQL_INTROSPECTION', false),
          playground: true,
        } as GqlModuleOptions;
      },
    })
  ]
})

export class GraphqlModule {}