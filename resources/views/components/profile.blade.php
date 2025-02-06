<div {{$attributes}} id="profile"
  class="rounded-md sm:-my-4 p-1 flex items-center gap-3 border border-nl-250 bg-nl-550 max-sm:col-span-2 max-sm:hidden">
  <a href="{{route('profile.edit')}}" class="rounded-sm h-10 w-10 bg-center bg-cover"
    style="background-image: url({!! App\avail::avatar_url() !!})"></a>
  <a href="{{route('profile.edit')}}" class=" flex flex-col gap-0 justify-center">
    <p class="font-medium">{!! Auth::user()->name !!}</p>
    <p class="text-sm text-nl-250 font-medium">{!! Auth::user()->email !!}</p>
  </a>
  <a href="{{route('profile.edit')}}"
    class="self-stretch flex flex-col justify-center max-sm:grow max-sm:items-end py-1 pl-2 border-l max-sm:border-none border-nl-250 -m-1 ml-0">
    <x-icon class="h-5" icon="pen_to_field" />
    <p class="text-sm text-nl-250 font-medium">edit</p>
  </a>
  <button form="logout"
    class="self-stretch flex flex-col justify-center items-center max-sm:grow  py-1 px-2 border-l max-sm:border-none border-nl-250 -m-1 ml-0">
    <x-icon class="h-5" icon="logout" />
    <p class="text-sm text-nl-250 font-medium">logout</p>
  </button>
</div>
<form id="logout" class="hidden" action="{{route('logout')}}" method="POST">
  @csrf
</form>