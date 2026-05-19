import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/lib/auth";
import { Navbar, Footer } from "@/components/layout";

// Pages
import Home from "@/pages/home";
import Products from "@/pages/products";
import ProductDetail from "@/pages/product-detail";
import Cart from "@/pages/cart";
import Checkout from "@/pages/checkout";
import Orders from "@/pages/orders";
import OrderDetail from "@/pages/order-detail";
import Login from "@/pages/login";
import Register from "@/pages/register";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminProducts from "@/pages/admin/products";
import AdminProductForm from "@/pages/admin/product-form";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function ProtectedRoute({ component: Component, adminOnly = false, ...rest }: any) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!user) {
    return <Redirect to="/login" />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Redirect to="/" />;
  }

  return <Component {...rest} />;
}

function AppRoutes() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/products" component={Products} />
          <Route path="/products/:id" component={ProductDetail} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          
          {/* Protected User Routes */}
          <Route path="/cart">
            {(params) => <ProtectedRoute component={Cart} {...params} />}
          </Route>
          <Route path="/checkout">
            {(params) => <ProtectedRoute component={Checkout} {...params} />}
          </Route>
          <Route path="/orders">
            {(params) => <ProtectedRoute component={Orders} {...params} />}
          </Route>
          <Route path="/orders/:id">
            {(params) => <ProtectedRoute component={OrderDetail} {...params} />}
          </Route>

          {/* Protected Admin Routes */}
          <Route path="/admin">
            {(params) => <ProtectedRoute component={AdminDashboard} adminOnly={true} {...params} />}
          </Route>
          <Route path="/admin/products">
            {(params) => <ProtectedRoute component={AdminProducts} adminOnly={true} {...params} />}
          </Route>
          <Route path="/admin/products/new">
            {(params) => <ProtectedRoute component={AdminProductForm} adminOnly={true} {...params} />}
          </Route>
          <Route path="/admin/products/:id/edit">
            {(params) => <ProtectedRoute component={AdminProductForm} adminOnly={true} {...params} />}
          </Route>

          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <AppRoutes />
          </WouterRouter>
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
