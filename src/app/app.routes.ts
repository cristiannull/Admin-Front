import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { NewProductComponent } from './pages/new-product/new-product.component';
import { loginGuard } from './guards/login.guard';
import { SearchComponent } from './pages/search/search.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  /* { path: 'register', component: RegisterComponent }, */
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'products/edit/:id',
    component: EditProductComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'products/create',
    component: NewProductComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'search/:name',
    component: SearchComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'users',
    component: UserListComponent,
  },
  {
    path: 'users/edit/:id',
    component: EditUserComponent,
  },
];
