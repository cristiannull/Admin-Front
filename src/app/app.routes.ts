import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { NewProductComponent } from './pages/new-product/new-product.component';

export const routes: Routes = [

    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "products", component: ProductListComponent },
    { path: "products/edit/:id", component: EditProductComponent },
    { path: "products/create", component: NewProductComponent }
];
