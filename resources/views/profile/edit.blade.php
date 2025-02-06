<x-layout>

  <x-nav.navbar />

  <div class="py-8 max-sm:px-2  w-full flex items-center justify-center mt-12 md:mt-32">

    <x-card.card>
      <x-h2 hr class="text-center">Edit Profile</x-h2>

      <form action="{{url('profile/'.$user->i)}}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        <x-form-field name="name" label="Name" value="{{old('name') ?? $user->name}}" />
        <x-form-field name="avatar" type="file" label="Profile Picture" />
        <x-form-field name="email" label="Email" type="email" value="{{old('email') ?? $user->email}}" />
        <x-form-field name="password" type="password" label="Password" />
        <x-form-field name="password_confirmation" type="password" label="Confirm Password" />
        <x-button class="w-full mt-4" type="submit">Save</x-button>
      </form>
    </x-card.card>
  </div>


</x-layout>