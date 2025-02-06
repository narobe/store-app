<x-layout>
  <x-nav.navbar />

  <div class="max-sm:px-2  py-8  w-full flex items-center justify-center mt-12 md:mt-32">

    <x-card.card>
      <x-h2 hr class="text-center">Register</x-h2>

      <form action="{{route('register')}}" method="post" enctype="multipart/form-data">
        @csrf
        <x-form-field name="name" label="Name" />
        <x-form-field name="avatar" type="file" label="Profile Picture" />
        <x-form-field name="email" type="email" label="Email" />
        <x-form-field name="password" type="password" label="Password" />
        <x-form-field name="password_confirmation" type="password" label="Confirm Password" />
        <x-button class="w-full mt-4" type="submit">Register</x-button>
      </form>
    </x-card.card>
  </div>
</x-layout>