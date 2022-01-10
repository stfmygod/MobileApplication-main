import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  Logger,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { uuid } from 'uuidv4';

@Controller()
export class AppController {
  private PRODUCTSPERPAGE = 5;
  productsList = [
    {
      id: uuid(),
      title: 'Title 1',
      description: 'Description 1',
      launchDate: new Date(),
      price: 20,
      isAvailable: true,
      userId: 1,
    },
    {
      id: uuid(),
      title: 'Title 12',
      description: 'Description dasda1',
      launchDate: new Date(),
      price: 231,
      isAvailable: true,
      userId: 1,
    },
    {
      id: uuid(),
      title: 'Title 34',
      description: 'Description 42',
      launchDate: new Date(),
      price: 263,
      isAvailable: true,
      userId: 2,
    },
    {
      id: uuid(),
      title: 'NewTitle 112',
      description: 'Description 1',
      launchDate: new Date(),
      price: 201,
      isAvailable: true,
      userId: 1,
    },
  ];

  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('products')
  getProducts(@Request() req: any) {
    const filterCriterias = req.body;

    let filteredProductsByUser = this.productsList.filter(
      (prd) => prd.userId === req.user.userId,
    );

    if (filterCriterias.title !== null && filterCriterias.title != '') {
      filteredProductsByUser = filteredProductsByUser.filter((prd) =>
        prd.title.toLowerCase().includes(filterCriterias?.title.toLowerCase()),
      );
    }

    filteredProductsByUser = filteredProductsByUser
      .sort((p1, p2) =>
        filterCriterias.isAscending ? p1.price - p2.price : p2.price - p1.price,
      )
      .slice(
        filterCriterias.pageNumber * this.PRODUCTSPERPAGE,
        (filterCriterias.pageNumber + 1) * this.PRODUCTSPERPAGE,
      );

    return {
      products: filteredProductsByUser,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('product')
  addProduct(@Request() req: any) {
    const { user, body: product } = req;
    const idx = this.productsList.findIndex((prod) => prod.id === product.id);
    let productWithId = { ...product, userId: user.userId };

    if (idx !== -1) {
      this.productsList[idx] = {
        ...this.productsList[idx],
        ...product,
      };
    } else {
      productWithId = { ...productWithId, id: uuid() };

      this.productsList = [
        ...this.productsList,
        {
          ...productWithId,
        },
      ];
    }

    return {
      status: 200,
      message: 'Product added.',
      product: productWithId,
    };
  }
}
