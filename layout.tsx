import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { ShoppingBag, User, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { user, logout } = useAuth();
  const [location] = useLocation();

  return (
    <nav className="border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="font-serif text-2xl font-bold tracking-widest uppercase">
              AURELIA
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/products" className={`text-sm font-medium hover:text-primary transition-colors ${location.startsWith('/products') ? 'text-primary' : 'text-foreground/80'}`}>
              SHOP
            </Link>
            <Link href="/products?category=women" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              WOMEN
            </Link>
            <Link href="/products?category=men" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              MEN
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/products" className="text-foreground/80 hover:text-primary">
              <Search className="w-5 h-5" />
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href={user.role === 'admin' ? '/admin' : '/orders'} className="text-sm font-medium hover:text-primary">
                  {user.name}
                </Link>
                <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground hover:text-foreground">
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/login" className="text-foreground/80 hover:text-primary">
                <User className="w-5 h-5" />
              </Link>
            )}

            <Link href="/cart" className="text-foreground/80 hover:text-primary relative">
              <ShoppingBag className="w-5 h-5" />
              {/* Optional: Add cart item count badge here */}
            </Link>

            <button className="md:hidden text-foreground/80 hover:text-primary">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-lg font-bold mb-4 uppercase tracking-widest">Aurelia</h3>
            <p className="text-background/70 text-sm">
              Curated luxury for the modern individual. Elevate your everyday with our carefully selected pieces.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link href="/products?category=new">New Arrivals</Link></li>
              <li><Link href="/products?category=women">Women</Link></li>
              <li><Link href="/products?category=men">Men</Link></li>
              <li><Link href="/products?category=accessories">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Help</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/shipping">Shipping & Returns</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Newsletter</h4>
            <p className="text-background/70 text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="flex">
              <input type="email" placeholder="Enter your email address" className="bg-background/10 border border-background/20 px-4 py-2 w-full text-sm focus:outline-none focus:border-primary" />
              <Button variant="default" className="rounded-none border-l-0">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-background/20 text-center text-sm text-background/50">
          <p>&copy; {new Date().getFullYear()} AURELIA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
