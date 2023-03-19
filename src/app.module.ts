import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchModule } from './search/search.module';
import { AddressModule } from './address/address.module';
import { PersonModule } from './person/person.module';
import { SeedsModule } from './seeds/seeds.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'filter',
      useFactory:async () => {
        const config = configuration()
        return ({
          uri: `${config.database.url}/${config.database.dbname}`,
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
      }
    }),
    SearchModule,
    AddressModule,
    PersonModule,
    SeedsModule
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
