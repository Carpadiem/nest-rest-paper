import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { User } from './entities/user.entity';
import { AdminModule } from './admin/admin.module';
import { RegisterModule } from './register/register.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mysqlpassword123!',
      database: 'paper_database',
      entities: [User],
      synchronize: true,
      retryAttempts: 1
    }),
    ProductsModule,
    AdminModule,
    RegisterModule,
    AuthModule
  ]
})
export class AppModule {}
