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
import { CategoriesComponent } from './pages/categories/categories.component';
import { NewGenderComponent } from './pages/new-gender/new-gender.component';
import { NewPegiComponent } from './pages/new-pegi/new-pegi.component';
import { NewGamemodeComponent } from './pages/new-gamemode/new-gamemode.component';
import { NewThemeComponent } from './pages/new-theme/new-theme.component';
import { NewTypeofferComponent } from './pages/new-typeoffer/new-typeoffer.component';
import { EditGenderComponent } from './pages/edit-gender/edit-gender.component';
import { EditPegiComponent } from './pages/edit-pegi/edit-pegi.component';
import { EditGamemodeComponent } from './pages/edit-gamemode/edit-gamemode.component';
import { EditThemeComponent } from './pages/edit-theme/edit-theme.component';
import { EditTypeofferComponent } from './pages/edit-typeoffer/edit-typeoffer.component';
import { NewDeveloperComponent } from './pages/new-developer/new-developer.component';
import { EditDeveloperComponent } from './pages/edit-developer/edit-developer.component';

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
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'gender/create',
    component: NewGenderComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'pegi/create',
    component: NewPegiComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'gamemode/create',
    component: NewGamemodeComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'theme/create',
    component: NewThemeComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'typeoffer/create',
    component: NewTypeofferComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'developer/create',
    component: NewDeveloperComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'gender/edit/:id',
    component: EditGenderComponent,
  },
  {
    path: 'pegi/edit/:id',
    component: EditPegiComponent,
  },
  {
    path: 'gamemode/edit/:id',
    component: EditGamemodeComponent,
  },
  {
    path: 'theme/edit/:id',
    component: EditThemeComponent,
  },
  {
    path: 'typeoffer/edit/:id',
    component: EditTypeofferComponent,
  },
  {
    path: 'developer/edit/:id',
    component: EditDeveloperComponent,
  },
];
