---
name: Ocean Fresh
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#43474f'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#737780'
  outline-variant: '#c3c6d1'
  surface-tint: '#3a5f94'
  primary: '#001e40'
  on-primary: '#ffffff'
  primary-container: '#003366'
  on-primary-container: '#799dd6'
  inverse-primary: '#a7c8ff'
  secondary: '#a43c12'
  on-secondary: '#ffffff'
  secondary-container: '#fe7e4f'
  on-secondary-container: '#6b1f00'
  tertiary: '#0f2028'
  on-tertiary: '#ffffff'
  tertiary-container: '#25353e'
  on-tertiary-container: '#8c9ea9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#a7c8ff'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#1f477b'
  secondary-fixed: '#ffdbcf'
  secondary-fixed-dim: '#ffb59c'
  on-secondary-fixed: '#380c00'
  on-secondary-fixed-variant: '#822800'
  tertiary-fixed: '#d3e5f1'
  tertiary-fixed-dim: '#b7c9d5'
  on-tertiary-fixed: '#0c1e26'
  on-tertiary-fixed-variant: '#384953'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  price-display:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 22px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-margin: 16px
  gutter: 12px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
  section-gap: 32px
---

## Brand & Style

The design system is anchored in the "Ocean Fresh" narrative, targeting high-end consumers who value traceability and culinary excellence. The personality is **Professional, Vital, and Premium**. 

The style utilizes a **Modern Corporate** foundation with **Lifestyle** influences. It prioritizes high-fidelity seafood photography as the hero element, framed by a clean, white environment that mimics the pristine nature of the deep sea. By balancing the weight of Deep Sea Blue with the energetic pop of Coral Orange, the interface feels both trustworthy and appetizing. The emotional response should be one of "immediate freshness"—as if the product was just plucked from the water.

## Colors

The palette is derived from maritime environments. 
- **Primary (Deep Sea Blue):** Used for navigation, headers, and primary branding to establish authority and depth.
- **Secondary (Coral Orange):** Reserved strictly for Call-to-Action (CTA) elements, price highlights, and "Add to Cart" functions to drive conversion.
- **Tertiary (Ice Blue):** Used for subtle backgrounds, tag backgrounds, and secondary information containers.
- **Neutrals:** A range of cool grays (Blue-tinged) is used for typography and borders to maintain a cohesive atmospheric temperature.

The design defaults to a **light mode** to emphasize cleanliness and food safety.

## Typography

The typography system uses **Plus Jakarta Sans** for Latin characters and numbers, paired with standard system sans-serifs (such as PingFang SC) for Chinese characters. 

The type scale is optimized for legibility in a mobile commerce context:
- **Numbers:** Product prices must use the `price-display` style to ensure clarity.
- **Chinese Characters:** Line heights are slightly increased (1.5x - 1.7x) compared to standard English settings to accommodate the complexity of Chinese glyphs.
- **Hierarchy:** Use Deep Sea Blue for headlines and a Dark Slate Gray (#334155) for body text to reduce visual fatigue while maintaining high contrast.

## Elevation & Depth

Depth is conveyed through **Ambient Shadows** and **Tonal Layering**. 

- **Surface Tiers:** The main background is a very light cool gray (#F8FAFC). Interactive cards and containers sit on a pure white (#FFFFFF) surface.
- **Shadow Profile:** Shadows are soft and diffused (Blur: 15-20px, Opacity: 4-8%) with a slight Deep Sea Blue tint (#003366) to prevent them from looking "dirty" or "muddy" against the cool palette.
- **Active State:** When a user interacts with a card or button, the shadow Y-offset increases slightly to simulate the element being lifted toward the user.

## Shapes

The shape language is defined by **Roundedness Level 2**. 

- **Product Cards:** Use a 16px (1rem) corner radius to soften the high-quality photography and make the items feel more approachable and "hand-picked."
- **Buttons:** Use a 12px corner radius for standard buttons and fully rounded "pill" shapes for small tags/chips (e.g., "In Stock", "Daily Fresh").
- **Icons:** Use rounded caps and joins to match the soft-cornered UI elements.

## Components

### Buttons
- **Primary (Coral Orange):** High-contrast buttons for "Buy Now" or "Checkout." Text is White.
- **Secondary (Deep Sea Blue):** Used for "Add to Cart" or secondary navigational actions.
- **Ghost:** Used for "Filter" or "View All" actions, featuring a thin Deep Sea Blue border.

### Product Cards
- Cards must feature a 1:1 or 4:3 aspect ratio image at the top.
- Typography within the card should lead with the product name in Bold, followed by a smaller "Origin" tag.
- The Price must be prominent in Coral Orange.

### Chips & Tags
- **Freshness Indicators:** Small, pill-shaped tags with a subtle Ice Blue background and Deep Sea Blue text (e.g., "Caught Today").

### Input Fields
- Understated borders (1px, Light Blue-Gray) that change to Deep Sea Blue on focus.
- Placeholder text in a muted cool gray.

### Navigation (Mini-program Tab Bar)
- Icons should be custom-drawn with a consistent 2px stroke weight.
- The active state is indicated by a color shift to Deep Sea Blue and a small dot indicator below the icon.