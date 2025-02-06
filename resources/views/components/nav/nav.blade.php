<nav
  class="flex justify-between items-center bg-nl-400 py-6 lg:pr-32 md:pl-4 sm:px-4 max-sm:p-4 sm:gap-12 max-md:w-full">
  {{$slot}}
  <x-theme-toggle class="" />
  <x-nav.nav-mobile />
</nav>
<div id="mobile_nav_dropdown" class="mt-[0.5px] sm:hidden hidden w-full bg-nl-400"></div>