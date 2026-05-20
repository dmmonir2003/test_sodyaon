// 'use client';

// import { useRouter, usePathname } from 'next/navigation';
// import { useAppSelector } from '@/store/hooks';
// import Link from 'next/link';

// export default function MobileBottomNav() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const cartItems = useAppSelector(state => state.cart.items);
//   const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   const navItems = [
//     {
//       id: 'home',
//       icon: '🏠',
//       label: 'HOME',
//       href: '/',
//     },
//     {
//       id: 'menu',
//       icon: '☰',
//       label: 'MENU',
//       href: '/products',
//     },
//     {
//       id: 'cart',
//       icon: '🛒',
//       label: 'CART',
//       href: '/cart',
//       badge: cartCount > 0 ? cartCount : null,
//     },
//     {
//       id: 'search',
//       icon: '🔍',
//       label: 'SEARCH',
//       href: '/search',
//     },
//     {
//       id: 'account',
//       icon: '👤',
//       label: 'ACCOUNT',
//       href: '/account',
//     },
//   ];

//   const isActive = (href: string) => {
//     if (href === '/') {
//       return pathname === '/';
//     }
//     return pathname.startsWith(href);
//   };

//   return (
//     <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shadow-lg">
//       <div className="flex items-center justify-around h-20">
//         {navItems.map((item) => {
//           const active = isActive(item.href);
//           return (
//             <Link
//               key={item.id}
//               href={item.href}
//               className={`flex flex-col items-center justify-center w-full h-full relative transition-colors ${
//                 active
//                   ? 'text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20'
//                   : 'text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400'
//               }`}
//             >
//               <span className="text-2xl">{item.icon}</span>
//               <span className="text-xs font-medium mt-1 leading-none">{item.label}</span>
//               {item.badge && (
//                 <span className="absolute top-2 right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
//                   {item.badge}
//                 </span>
//               )}
//             </Link>
//           );
//         })}
//       </div>
//     </nav>
//   );
// }


'use client';

import { usePathname } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setMobileMenuOpen, toggleMobileSearch } from '@/store/ui/uiSlice';
import { setCartOpen } from '@/store/user/cart/cartSlice';
import Link from 'next/link';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  interface NavItem {
    id: string;
    icon: string;
    label: string;
    href: string;
    action?: () => void;
    badge?: number | null;
  }

  const navItems: NavItem[] = [
    {
      id: 'home',
      icon: '🏠',
      label: 'HOME',
      href: '/',
    },
    {
      id: 'menu',
      icon: '☰',
      label: 'MENU',
      href: '#',
      action: () => dispatch(setMobileMenuOpen(true)),
    },
    {
      id: 'cart',
      icon: '🛒',
      label: 'CART',
      href: '#',
      action: () => dispatch(setCartOpen(true)),
      badge: cartCount > 0 ? cartCount : null,
    },
    {
      id: 'search',
      icon: '🔍',
      label: 'SEARCH',
      href: '#',
      action: () => dispatch(toggleMobileSearch()),
    },
    {
      id: 'profile',
      icon: '👤',
      label: 'PROFILE',
      href: '/profile',
    },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href) && href !== '#';
  };

  // Do not show on Product Details, Cart, or Order pages
  const isProductDetails = pathname.startsWith('/shop/products/');
  const isCartPage = pathname === '/cart';
  const isOrderPage = pathname.startsWith('/order') || pathname.startsWith('/checkout');

  if (isProductDetails || isCartPage || isOrderPage) {
    return null;
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shadow-lg">
      <div className="flex items-center justify-around h-20">
        {navItems.map((item) => {
          const active = isActive(item.href);

          // If item has an action (like menu), use button instead of Link
          if (item.action) {
            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`flex flex-col items-center justify-center w-full h-full relative transition-colors ${
                  active
                    ? 'text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400'
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs font-medium mt-1 leading-none">{item.label}</span>
                {item.badge && (
                  <span className="absolute top-2 right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                    {item?.badge}
                  </span>
                )}
              </button>
            );
          }

          // For regular links
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full relative transition-colors ${
                active
                  ? 'text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-medium mt-1 leading-none">{item.label}</span>
              {item.badge && (
                <span className="absolute top-2 right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}