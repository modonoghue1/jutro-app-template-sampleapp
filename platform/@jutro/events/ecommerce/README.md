
# Example of usage

Jutro ecommerce is a wrapper for Google Analytics Enhanced Ecomemrce. More info here - 
https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce

```javascript
import { initializeEnhancedEcommerce } from '@jutro/events';

initializeEnhancedEcommerce(GA_TRACKING_ID);

```

```javascript
import { ecommerce } from '@jutro/events';

const {
    productView,
    productDetailView,
    clickProductLink,
    addToCart,
    removeFromCart,
    checkoutStepView,
    addCheckoutOption,
    purchaseView,
} = ecommerce;

productView(
    {
        id: 'P12345',
        name: 'Android Warhol T-Shirt',
        category: 'Apparel/T-Shirts',
        brand: 'Google',
        variant: 'black',
        list: 'Search Results',
        position: 1,
    },
    {
        id: 'P67890',
        name: 'YouTube Organic T-Shirt',
        category: 'Apparel/T-Shirts',
        brand: 'YouTube',
        variant: 'gray',
        list: 'Search Results',
        position: 2,
    }
);

clickProductLink(
    {
        id: 'P12345',
        name: 'Android Warhol T-Shirt',
        category: 'Apparel',
        brand: 'Google',
        variant: 'black',
        position: 1,
    },
    { list: 'Main Page Recommendations' }
);

productDetailView({
    id: 'P12345',
    name: 'Android Warhol T-Shirt',
    category: 'Apparel',
    brand: 'Google',
    variant: 'black',
});

addToCart({
    id: 'P12345',
    name: 'Android Warhol T-Shirt',
    category: 'Apparel/T-Shirts',
    brand: 'Google',
    variant: 'black',
    price: 2345,
    quantity: 1,
});

removeFromCart({
    id: 'P67890',
    name: 'YouTube Organic T-Shirt',
    category: 'Apparel/T-Shirts',
    brand: 'YouTube',
    variant: 'gray',
});

checkoutStepView(
    {
        id: 'P67890',
        name: 'YouTube Organic T-Shirt',
        category: 'Apparel/T-Shirts',
        brand: 'YouTube',
        variant: 'gray',
    },
    {
        step: 1,
        option: 'Visa',
    }
);

checkoutStepView(
    {
        id: 'P67890',
        name: 'YouTube Organic T-Shirt',
        category: 'Apparel/T-Shirts',
        brand: 'YouTube',
        variant: 'gray',
    },
    {
        step: 2,
    }
);

addCheckoutOption(
    {
        id: 'P67890',
        name: 'YouTube Organic T-Shirt',
        category: 'Apparel/T-Shirts',
        brand: 'YouTube',
        variant: 'gray',
    },
    {
        step: 2,
        option: 'Post',
    }
);

purchaseView(
    {
        id: 'P67890',
        name: 'YouTube Organic T-Shirt',
        category: 'Apparel/T-Shirts',
        brand: 'YouTube',
        variant: 'gray',
    },
    {
        id: 'T12345',
        affiliation: 'Google Store - Online',
        revenue: '37.39',
        tax: '2.85',
        shipping: '5.34',
        coupon: 'SUMMER2013',
    }
);
```