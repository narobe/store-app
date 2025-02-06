<x-layout>

  <x-nav.navbar />

  <div class="flex justify-center items-stretch px-12 py-12 max-sm:px-2 w-full">
    <x-card.card class="md:w-96">
      <x-h2 hr class="text-left">Messages</x-h2>

      <x-dash-card-wrap class=" ">
        @foreach ($message as $m)
        <x-card.card-message :message="$m" />
        @endforeach
      </x-dash-card-wrap>

      {{-- <p class="text-3xl text-center text-nl-450">
        (❁´◡`❁)</b> <br> empty inbox
      </p> --}}
    </x-card.card>
  </div>

</x-layout>