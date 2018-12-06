import express, { Router } from 'express';
import bootstrap from './bootstrap';

const app = express();
bootstrap(app, Router());
