import { Body, Controller, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import type { Response } from 'express';

@Controller('/management')
export class AppController {
  constructor(private appService: AppService) {}
}
