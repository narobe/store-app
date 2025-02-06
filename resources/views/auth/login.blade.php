<x-layout>
  <x-nav.navbar />

  <div class="max-sm:px-2 py-8 w-full flex items-center justify-center mt-12 md:mt-32">

    <x-card.card>
      <x-h2 hr class="text-center">Login</x-h2>
      <x-form-error class="text-center" name="login"></x-form-error>
      <form action="{{route('login')}}" method="post">
        @csrf
        <x-form-field name="email" type="email" label="Email" />
        <x-form-field name="password" type="password" label="password" />
        <x-button class="w-full mt-4" type="submit">Login</x-button>
      </form>
    </x-card.card>
  </div>
</x-layout>