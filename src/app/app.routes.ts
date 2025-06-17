import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DevgadComponent } from './product/page/devgad/devgad.component';
import { AboutComponent } from './about/about.component';
import { GoaMankuradComponent } from './product/page/goa-mankurad/goa-mankurad.component';
import { KesarMangoComponent } from './product/page/kesar-mango/kesar-mango.component';
import { LangraMangoComponent } from './product/page/langra-mango/langra-mango.component';
import { RatnaAlphonsoComponent } from './product/page/ratna-alphonso/ratna-alphonso.component';
import { PayariMangoesComponent } from './product/page/payari-mangoes/payari-mangoes.component';
import { BlogComponent } from './blog/blog.component';
import { PageComponent } from './blog/page/page.component';
import { RatnagiriAlphonsoComponent } from './product/page/ratnagiri-alphonso/ratnagiri-alphonso.component';
import { ProfileComponent } from './profile/profile.component';
import { TermsComponent } from './terms/terms.component';
import { ReturnRefundComponent } from './return-refund/return-refund.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { WikiComponent } from './wiki/wiki.component';
import { RecipesComponent } from './recipes/recipes.component';
import { AuthGuard } from './auth.guard';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminProductComponent } from './admindash/admin-product/admin-product.component';


export const routes: Routes = [{ path: "", component: HomeComponent },
{ path: "home", component: HomeComponent ,canActivate: [AuthGuard]},
{ path: "products", component: ProductComponent,canActivate: [AuthGuard] },
{ path: "contact", component: ContactUsComponent,canActivate: [AuthGuard] },
{ path: "cart", component: CartComponent ,canActivate: [AuthGuard]},
{ path: "login", component: LoginComponent },
{ path: "signup", component: SignupComponent },
{ path: "about", component: AboutComponent ,canActivate: [AuthGuard]},
{ path: "blog", component: BlogComponent ,canActivate: [AuthGuard]},
{path:"profile",component:ProfileComponent,canActivate: [AuthGuard]},
{path:"term&cond",component:TermsComponent,canActivate: [AuthGuard]},
{path:"return&refund",component:ReturnRefundComponent,canActivate: [AuthGuard]},
{path:"privacy",component:PrivacyComponent,canActivate: [AuthGuard]},
{path:"wiki",component:WikiComponent,canActivate: [AuthGuard]},
{path:"recipes",component:RecipesComponent,canActivate: [AuthGuard]},

// product details page
{ path: "devgad", component: DevgadComponent,canActivate: [AuthGuard] },
{ path: "goa", component: GoaMankuradComponent,canActivate: [AuthGuard] },
{ path: "kesar", component: KesarMangoComponent,canActivate: [AuthGuard] },
{ path: "langra", component: LangraMangoComponent,canActivate: [AuthGuard] },
{ path: "ratnagiri", component: RatnagiriAlphonsoComponent,canActivate: [AuthGuard] },
{ path: "payari", component: PayariMangoesComponent,canActivate: [AuthGuard] },
{ path: "ratna", component: RatnaAlphonsoComponent,canActivate: [AuthGuard] },

// blog page
{ path: "blog/:id", component: PageComponent,canActivate: [AuthGuard] },

{path:"admin-login",component:AdminLoginComponent},
{path:"admin-dash",component:AdminDashboardComponent},
{path:"admin-product",component:AdminProductComponent}
];