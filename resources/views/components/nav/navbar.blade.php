@if (Auth::check())
<x-nav.nav>
  <x-profile />
  <x-nav.nav-link-wrap>
    <x-link class="{{ request()->is('message') ? 'text-nl-100' : 'text-nl-250' }}" href="{{ route('message.index') }} "
      icon="message">
      Message
    </x-link>

    <x-link class="{{ request()->is('store') | request()->is('store/*') ? 'text-nl-100' : 'text-nl-250' }}"
      href="{{ route('store.index') }} " icon="store">
      Store
    </x-link>
    <x-link class="{{ request()->is('product') | request()->is('product/*') ? 'text-nl-100' : 'text-nl-250' }}"
      href="{{route('product.index')}} " icon="product">
      Product
    </x-link>
    <x-link class="{{ request()->is('dashboard') ? 'text-nl-100' : 'text-nl-250' }}" href="{{ route('dashboard') }} "
      icon="dashboard">
      Dashboard
    </x-link>
  </x-nav.nav-link-wrap>
</x-nav.nav>

@else

<x-nav.nav>
  <x-nav.nav-link-wrap>
    <x-link class="{{ request()->is('store') | request()->is('store/*') ? 'text-nl-100' : 'text-nl-250' }}"
      href="{{ route('store.index') }} " icon="store">Store</x-link>
    <x-link class="{{ request()->is('product') | request()->is('product/*') ? 'text-nl-100' : 'text-nl-250' }}"
      href="{{route('product.index')}} " icon="product">Product</x-link>
    <x-link class="{{ request()->is('register') ? 'text-nl-100' : 'text-nl-250' }}" href="{{ route('register') }} "
      icon="register">Register</x-link>
    <x-link class="{{ request()->is('login') ? 'text-nl-100' : 'text-nl-250' }}" href="{{ route('login') }}"
      icon="login"> Login</x-link>

  </x-nav.nav-link-wrap>
</x-nav.nav>

@endif